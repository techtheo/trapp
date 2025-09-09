const router = require('express').Router();
const multer = require('multer');
const mediaController = require('../controllers/mediaController');
const authController = require('../controllers/authController');
const b2Storage = require('../services/b2Storage');
const AppError = require('../utils/AppError');

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File too large. Maximum size allowed is 50MB', 400));
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(new AppError('Too many files. Maximum 5 files allowed', 400));
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(new AppError('Unexpected field name for file upload', 400));
    }
  }
  next(err);
};

// Avatar upload route (single file, smaller size limit)
router.post(
  '/upload-avatar',
  authController.protect,
  (req, res, next) => {
    const upload = b2Storage.createSingleUploadMiddleware({
      maxFileSize: 5 * 1024 * 1024, // 5MB for avatars
      fieldName: 'avatar'
    });
    upload(req, res, next);
  },
  handleMulterError,
  mediaController.uploadAvatar
);

// Multiple media files upload
router.post(
  '/upload-media',
  authController.protect,
  (req, res, next) => {
    const upload = b2Storage.createUploadMiddleware({
      maxFileSize: 50 * 1024 * 1024, // 50MB per file
      maxFiles: 5,
      fieldName: 'files'
    });
    upload(req, res, next);
  },
  handleMulterError,
  mediaController.uploadMedia
);

// Single media file upload
router.post(
  '/upload-single',
  authController.protect,
  (req, res, next) => {
    const upload = b2Storage.createSingleUploadMiddleware({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      fieldName: 'file'
    });
    upload(req, res, next);
  },
  handleMulterError,
  mediaController.uploadSingleMedia
);

// Chat media upload (for messages)
router.post(
  '/upload-chat-media',
  authController.protect,
  (req, res, next) => {
    const upload = b2Storage.createSingleUploadMiddleware({
      maxFileSize: 25 * 1024 * 1024, // 25MB for chat media
      fieldName: 'media'
    });
    upload(req, res, next);
  },
  handleMulterError,
  mediaController.uploadChatMedia
);

// Delete media file
router.delete(
  '/delete/:fileName',
  authController.protect,
  mediaController.deleteMedia
);

// Get file info
router.get(
  '/info/:fileName',
  authController.protect,
  mediaController.getFileInfo
);

// Get user's media files
router.get(
  '/my-media',
  authController.protect,
  mediaController.getUserMedia
);

module.exports = router;