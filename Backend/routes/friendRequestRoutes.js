const express = require("express");
const friendRequestController = require("../controllers/friendRequestController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Friend request routes
router.post("/send", friendRequestController.sendFriendRequest);
router.patch("/accept/:requestId", friendRequestController.acceptFriendRequest);
router.patch("/reject/:requestId", friendRequestController.rejectFriendRequest);

// Get requests and friends
router.get("/pending", friendRequestController.getPendingRequests);
router.get("/sent", friendRequestController.getSentRequests);
router.get("/friends", friendRequestController.getFriends);

// Get all verified users and search users
router.get("/verified-users", friendRequestController.getVerifiedUsers);
router.get("/search", friendRequestController.searchUsers);

module.exports = router;