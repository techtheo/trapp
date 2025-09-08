const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailService = require("../services/mailer");
const crypto = require("crypto");

const filterObj = require("../utils/filterObj");

// Model
const User = require("../models/user");
const TokenBlacklist = require("../models/TokenBlacklist");
const otp = require("../Templates/Mail/otp");
const resetPassword = require("../Templates/Mail/resetPassword");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

// this function will return you jwt token
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Default to 7 days if not set
});

// Register New User



exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  );

  // check if a verified user with given email exists

  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    // user with this email already exists, Please login
    return res.status(400).json({
      status: "error",
      message: "Email already trapped, Please login.",
    });
  } else if (existing_user) {
    // if not verified than update prev one

    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    });

    // generate an otp and send to email
    req.userId = existing_user._id;
    next();
  } else {
    // if user is not created before than create a new one
    const new_user = await User.create(filteredBody);

    // generate an otp and send to email
    req.userId = new_user._id;
    next();
  }
});

exports.sendOTP = catchAsync(async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

  const user = await User.findByIdAndUpdate(userId, {
    otp_expiry_time: otp_expiry_time,
  });

  user.otp = new_otp.toString();

  await user.save({ new: true, validateModifiedOnly: true });

  // Log OTP for development
  if (process.env.NODE_ENV === "development") {
    console.log("=".repeat(50));
    console.log("🔑 DEVELOPMENT MODE - REGISTRATION OTP:");
    console.log("📧 Email:", user.email);
    console.log("🔢 OTP:", new_otp);
    console.log("⏰ Expires in: 10 minutes");
    console.log("=".repeat(50));
  }

  // Send mail with error handling
  try {
    await mailService.sendEmail({
      from: "domaintrapp@gmail.com",
      to: user.email,
      subject: "Verification OTP for TRAPP",
      html: otp(user.firstName, new_otp),
      attachments: [],
    });
    console.log("📧 OTP email sent successfully to:", user.email);
  } catch (emailError) {
    console.error("📧 Email sending failed:", emailError.message);
    // Don't fail the registration if email fails - user can still use resend
  }

  res.status(200).json({
    status: "success",
    message: "OTP Sent Successfully!",
  });
});

exports.resendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found with this email",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "User is already verified",
    });
  }

  // Generate new OTP
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

  user.otp = new_otp.toString();
  user.otp_expiry_time = otp_expiry_time;

  await user.save({ new: true, validateModifiedOnly: true });

  // Log OTP for development
  if (process.env.NODE_ENV === "development") {
    console.log("=".repeat(50));
    console.log("🔄 DEVELOPMENT MODE - RESEND OTP:");
    console.log("📧 Email:", user.email);
    console.log("�� NEW OTP:", new_otp);
    console.log("⏰ Expires in: 10 minutes");
    console.log("=".repeat(50));
  }

  // Send mail with error handling
  try {
    await mailService.sendEmail({
      from: "domaintrapp@gmail.com",
      to: user.email,
      subject: "Verification OTP for TRAPP - Resent",
      html: otp(user.firstName, new_otp),
      attachments: [],
    });
    console.log("📧 Resend OTP email sent successfully to:", user.email);
  } catch (emailError) {
    console.error("📧 Resend email sending failed:", emailError.message);
    // Don't fail the request if email fails - OTP is still generated
  }

  res.status(200).json({
    status: "success",
    message: "OTP resent successfully!",
  });
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  // verify otp and update user accordingly
  const { email, otp } = req.body;
  
  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) { 
    return res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "Email is already verified",
    });
  }

  try {
    const isOTPCorrect = await user.correctOTP(otp, user.otp);
    
    if (!isOTPCorrect) {
      res.status(400).json({
        status: "error",
        message: "OTP is incorrect",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error verifying OTP",
      error: error.message
    });
    return;
  }

  // OTP is correct
  user.verified = true;
  user.otp = undefined;
  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP trapped Successfully!", 
    token,
    user_id: user._id,
  });
});

// User Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Both email and password are required",
    });
    return;
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !user.password) {
    res.status(400).json({
      status: "error",
      message: "Email or password is incorrect",
    });
    return;
  }

  if (!(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "Email or password is incorrect",
    });
    return;
  }

  // Check if user is verified
  if (!user.verified) {
    return res.status(401).json({
      status: "error",
      message: "Please verify your email before logging in. Check your email for the verification code.",
      requiresVerification: true,
      email: user.email
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "trapped in successfully!",
    token,
    user_id: user._id,
  });
});

// Protect
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not trapped in! Please log in to get access.",
    });
  }

  // 2) Check if token is blacklisted
  const blacklistedToken = await TokenBlacklist.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({
      message: "Token has been invalidated. Please log in again.",
    });
  }

  // 3) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log(decoded);

  // 4) Check if user still exists
  const this_user = await User.findById(decoded.userId);
  if (!this_user) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exists.",
    });
  }

  // 5) Check if user is verified
  if (!this_user.verified) {
    return res.status(401).json({
      message: "Please verify your email before accessing this resource.",
    });
  }

  // 6) Check if user changed password after the token was issued
  if (this_user.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: "User recently changed password! Please log in again.",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = this_user;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "There is no user with email address.",
    });
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;
    // TODO => Send Email with this Reset URL to user's email address

    console.log(resetURL);

    mailService.sendEmail({
      from: "domaintrapp@gmail.com",
      to: user.email,
      subject: "Reset Password",
      html: resetPassword(user.firstName, resetURL),
      attachments: [],
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "There was an error sending the email. Try again later!",
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has  expired or submission is out of time window
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Token is Invalid or Expired",
    });
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reseted (trapped) Successfully",
    token,
  });
});

// Logout User (Stateful JWT - Token Blacklisting)
exports.logout = catchAsync(async (req, res, next) => {
  // 1) Get token from header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "error",
      message: "No token provided",
    });
  }

  // 2) Verify token and get user info
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if token is already blacklisted
  const existingBlacklistedToken = await TokenBlacklist.findOne({ token });
  if (existingBlacklistedToken) {
    return res.status(400).json({
      status: "error",
      message: "Token already invalidated",
    });
  }

  // 4) Add token to blacklist
  await TokenBlacklist.create({
    token,
    userId: decoded.userId,
    expiresAt: new Date(decoded.exp * 1000), // Convert JWT exp to Date
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

// Logout from all devices (invalidate all tokens for a user)
exports.logoutAllDevices = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Add all active tokens for this user to blacklist
  // Note: This is a simplified approach. In production, you might want to 
  // track active tokens more efficiently
  const result = await TokenBlacklist.updateMany(
    { userId },
    { $set: { blacklistedAt: new Date() } },
    { upsert: false }
  );

  res.status(200).json({
    status: "success",
    message: "Logged out from all devices successfully",
    tokensInvalidated: result.modifiedCount,
  });
});
