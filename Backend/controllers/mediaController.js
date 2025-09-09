const b2Storage = require('../services/b2Storage');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Upload avatar/profile picture
exports.uploadAvatar = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please provide an image file', 400));
  }

  // Upload to B2
  const uploadResult = await b2Storage.uploadFile(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype,
    'avatars'
  );

  // Update user's avatar URL
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: uploadResult.downloadUrl },
    { new: true, runValidators: true }
  ).select('-password -otp -passwordResetToken');

  res.status(200).json({
    status: 'success',
    message: 'Avatar uploaded successfully',
    data: {
      user: updatedUser,
      fileInfo: {
        fileName: uploadResult.fileName,
        downloadUrl: uploadResult.downloadUrl,
        size: uploadResult.size,
      },
    },
  });
});

// Upload multiple media files
exports.uploadMedia = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError('Please provide at least one file', 400));
  }

  const uploadPromises = req.files.map(file => 
    b2Storage.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      'media'
    )
  );

  const uploadResults = await Promise.all(uploadPromises);

  res.status(200).json({
    status: 'success',
    message: `${uploadResults.length} file(s) uploaded successfully`,
    data: {
      files: uploadResults,
    },
  });
});

// Upload single media file
exports.uploadSingleMedia = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please provide a file', 400));
  }

  const uploadResult = await b2Storage.uploadFile(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype,
    'media'
  );

  res.status(200).json({
    status: 'success',
    message: 'File uploaded successfully',
    data: {
      file: uploadResult,
    },
  });
});

// Delete media file
exports.deleteMedia = catchAsync(async (req, res, next) => {
  const { fileName } = req.params;

  if (!fileName) {
    return next(new AppError('File name is required', 400));
  }

  await b2Storage.deleteFile(fileName);

  res.status(200).json({
    status: 'success',
    message: 'File deleted successfully',
  });
});

// Get file info
exports.getFileInfo = catchAsync(async (req, res, next) => {
  const { fileName } = req.params;

  if (!fileName) {
    return next(new AppError('File name is required', 400));
  }

  const fileInfo = await b2Storage.getFileInfo(fileName);

  res.status(200).json({
    status: 'success',
    data: {
      fileInfo,
      downloadUrl: b2Storage.getDownloadUrl(fileName),
    },
  });
});

// Upload chat media (for messages)
exports.uploadChatMedia = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please provide a file', 400));
  }

  const uploadResult = await b2Storage.uploadFile(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype,
    'chat-media'
  );

  res.status(200).json({
    status: 'success',
    message: 'Chat media uploaded successfully',
    data: {
      file: uploadResult,
    },
  });
});

// Get user's media files (if you want to track user uploads)
exports.getUserMedia = catchAsync(async (req, res, next) => {
  // This would require a Media model to track user uploads
  // For now, we'll return a placeholder response
  res.status(200).json({
    status: 'success',
    message: 'Feature coming soon - user media tracking',
    data: {
      files: [],
    },
  });
});

module.exports = exports;