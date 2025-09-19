const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Send friend request
exports.sendFriendRequest = catchAsync(async (req, res, next) => {
  const { recipientId } = req.body;
  const senderId = req.user.id;

  // Check if recipient exists and is verified
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return next(new AppError("User not found", 404));
  }

  if (!recipient.verified) {
    return next(new AppError("Can only send friend requests to verified users", 400));
  }

  // Check if trying to send request to self
  if (senderId === recipientId) {
    return next(new AppError("Cannot send friend request to yourself", 400));
  }

  // Check if friend request already exists
  const existingRequest = await FriendRequest.findOne({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId }
    ]
  });

  if (existingRequest) {
    return next(new AppError("Friend request already exists", 400));
  }

  // Create friend request
  const friendRequest = await FriendRequest.create({
    sender: senderId,
    recipient: recipientId
  });

  await friendRequest.populate([
    { path: "sender", select: "firstName lastName avatar verified" },
    { path: "recipient", select: "firstName lastName avatar verified" }
  ]);

  // Emit socket event to recipient
  const io = req.app.get("io");
  if (io) {
    io.to(recipientId).emit("friendRequestReceived", {
      request: friendRequest,
      message: `${req.user.firstName} ${req.user.lastName} sent you a friend request`
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      friendRequest
    }
  });
});

// Accept friend request
exports.acceptFriendRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const userId = req.user.id;

  const friendRequest = await FriendRequest.findById(requestId).populate([
    { path: "sender", select: "firstName lastName avatar verified" },
    { path: "recipient", select: "firstName lastName avatar verified" }
  ]);

  if (!friendRequest) {
    return next(new AppError("Friend request not found", 404));
  }

  // Check if user is the recipient
  if (friendRequest.recipient._id.toString() !== userId) {
    return next(new AppError("You can only accept requests sent to you", 403));
  }

  // Check if request is still pending
  if (friendRequest.status !== "pending") {
    return next(new AppError("Friend request is no longer pending", 400));
  }

  // Update request status
  friendRequest.status = "accepted";
  await friendRequest.save();

  // Add each other as friends in User model (if you have a friends field)
  await User.findByIdAndUpdate(friendRequest.sender._id, {
    $addToSet: { friends: friendRequest.recipient._id }
  });
  await User.findByIdAndUpdate(friendRequest.recipient._id, {
    $addToSet: { friends: friendRequest.sender._id }
  });

  // Emit socket event to sender
  const io = req.app.get("io");
  if (io) {
    io.to(friendRequest.sender._id.toString()).emit("friendRequestAccepted", {
      request: friendRequest,
      message: `${friendRequest.recipient.firstName} ${friendRequest.recipient.lastName} accepted your friend request`
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      friendRequest
    }
  });
});

// Reject friend request
exports.rejectFriendRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const userId = req.user.id;

  const friendRequest = await FriendRequest.findById(requestId).populate([
    { path: "sender", select: "firstName lastName avatar verified" },
    { path: "recipient", select: "firstName lastName avatar verified" }
  ]);

  if (!friendRequest) {
    return next(new AppError("Friend request not found", 404));
  }

  // Check if user is the recipient
  if (friendRequest.recipient._id.toString() !== userId) {
    return next(new AppError("You can only reject requests sent to you", 403));
  }

  // Check if request is still pending
  if (friendRequest.status !== "pending") {
    return next(new AppError("Friend request is no longer pending", 400));
  }

  // Update request status
  friendRequest.status = "rejected";
  await friendRequest.save();

  // Emit socket event to sender
  const io = req.app.get("io");
  if (io) {
    io.to(friendRequest.sender._id.toString()).emit("friendRequestRejected", {
      request: friendRequest,
      message: `${friendRequest.recipient.firstName} ${friendRequest.recipient.lastName} rejected your friend request`
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      friendRequest
    }
  });
});

// Get pending friend requests (received)
exports.getPendingRequests = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const pendingRequests = await FriendRequest.find({
    recipient: userId,
    status: "pending"
  }).populate("sender", "firstName lastName avatar verified").sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: pendingRequests.length,
    data: {
      requests: pendingRequests
    }
  });
});

// Get sent friend requests
exports.getSentRequests = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const sentRequests = await FriendRequest.find({
    sender: userId
  }).populate("recipient", "firstName lastName avatar verified").sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: sentRequests.length,
    data: {
      requests: sentRequests
    }
  });
});

// Get friends list
exports.getFriends = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const acceptedRequests = await FriendRequest.find({
    $or: [
      { sender: userId, status: "accepted" },
      { recipient: userId, status: "accepted" }
    ]
  }).populate([
    { path: "sender", select: "firstName lastName avatar verified" },
    { path: "recipient", select: "firstName lastName avatar verified" }
  ]).sort({ updatedAt: -1 });

  // Extract friends from the requests
  const friends = acceptedRequests.map(request => {
    return request.sender._id.toString() === userId 
      ? request.recipient 
      : request.sender;
  });

  res.status(200).json({
    status: "success",
    results: friends.length,
    data: {
      friends
    }
  });
});

// Get all verified users (excluding friends and pending requests)
exports.getVerifiedUsers = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Get existing friend requests and friends
  const existingRequests = await FriendRequest.find({
    $or: [
      { sender: userId },
      { recipient: userId }
    ]
  });

  const excludeIds = [userId]; // Exclude self
  existingRequests.forEach(request => {
    if (request.sender.toString() !== userId) {
      excludeIds.push(request.sender.toString());
    }
    if (request.recipient.toString() !== userId) {
      excludeIds.push(request.recipient.toString());
    }
  });

  // Get all verified users
  const users = await User.find({
    _id: { $nin: excludeIds },
    verified: true
  }).select("firstName lastName avatar verified").sort({ firstName: 1 }).limit(50);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users
    }
  });
});

// Search verified users (excluding friends and pending requests)
exports.searchUsers = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const userId = req.user.id;

  if (!query || query.trim().length < 2) {
    return next(new AppError("Search query must be at least 2 characters", 400));
  }

  // Get existing friend requests and friends
  const existingRequests = await FriendRequest.find({
    $or: [
      { sender: userId },
      { recipient: userId }
    ]
  });

  const excludeIds = [userId]; // Exclude self
  existingRequests.forEach(request => {
    if (request.sender.toString() !== userId) {
      excludeIds.push(request.sender.toString());
    }
    if (request.recipient.toString() !== userId) {
      excludeIds.push(request.recipient.toString());
    }
  });

  // Search for verified users
  const users = await User.find({
    _id: { $nin: excludeIds },
    verified: true,
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } }
    ]
  }).select("firstName lastName avatar verified").limit(20);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users
    }
  });
});