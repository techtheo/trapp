const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user");
const TokenBlacklist = require("../models/TokenBlacklist");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Check if token is blacklisted
  const blacklistedToken = await TokenBlacklist.findOne({ token });
  if (blacklistedToken) {
    return next(
      new AppError("Token has been invalidated. Please log in again.", 401)
    );
  }

  // 3) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4) Check if user still exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist.", 401)
    );
  }

  // 5) Check if user is verified
  if (!currentUser.verified) {
    return next(
      new AppError("Please verify your email before accessing this resource.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

module.exports = { protect };