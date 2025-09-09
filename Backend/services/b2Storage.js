const B2 = require('backblaze-b2');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

class B2StorageService {
  constructor() {
    this.b2 = new B2({
      applicationKeyId: process.env.B2_KEY_ID,
      applicationKey: process.env.B2_APPLICATION_KEY,
    });
    this.bucketId = process.env.B2_BUCKET_ID;
    this.bucketName = process.env.B2_BUCKET_NAME;
    this.authorized = false;
  }

  async authorize() {
    if (!this.authorized) {
      try {
        const authResponse = await this.b2.authorize();
        this.authorized = true;
        // Store the download URL base from the authorization response
        this.downloadUrlBase = authResponse.data.downloadUrl;
        console.log('✅ B2 Storage authorized successfully');
      } catch (error) {
        console.error('❌ B2 Storage authorization failed:', error.message);
        throw new AppError('Failed to authorize B2 storage', 500);
      }
    }
  }

  async uploadFile(fileBuffer, fileName, contentType, folder = 'media') {
    try {
      await this.authorize();

      // Generate unique filename to prevent conflicts
      const fileExtension = path.extname(fileName);
      const uniqueFileName = `${folder}/${crypto.randomUUID()}${fileExtension}`;

      // Get upload URL first
      const uploadUrlResponse = await this.b2.getUploadUrl({
        bucketId: this.bucketId,
      });

      // Upload the file using the upload URL
      const uploadResponse = await this.b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: uniqueFileName,
        data: fileBuffer,
        mime: contentType,
        info: {
          originalName: fileName,
          uploadedAt: new Date().toISOString(),
        },
      });

      // Generate download URL using the proper B2 download URL format
      const downloadUrl = this.getDownloadUrl(uniqueFileName);

      return {
        fileId: uploadResponse.data.fileId,
        fileName: uniqueFileName,
        originalName: fileName,
        downloadUrl,
        contentType,
        size: fileBuffer.length,
        uploadedAt: new Date(),
      };
    } catch (error) {
      console.error('❌ B2 Upload failed:', error.message);
      throw new AppError('Failed to upload file to B2 storage', 500);
    }
  }

  async deleteFile(fileName) {
    try {
      await this.authorize();

      // Get file info first
      const fileInfo = await this.b2.getFileInfo({ fileName });
      
      // Delete the file
      await this.b2.deleteFileVersion({
        fileId: fileInfo.data.fileId,
        fileName: fileName,
      });

      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      console.error('❌ B2 Delete failed:', error.message);
      throw new AppError('Failed to delete file from B2 storage', 500);
    }
  }

  async getFileInfo(fileName) {
    try {
      await this.authorize();
      const fileInfo = await this.b2.getFileInfo({ fileName });
      return fileInfo.data;
    } catch (error) {
      console.error('❌ B2 Get file info failed:', error.message);
      throw new AppError('Failed to get file info from B2 storage', 500);
    }
  }

  // Get download URL for a file
  getDownloadUrl(fileName) {
    // Use the download URL base from the authorization response
    if (this.downloadUrlBase) {
      return `${this.downloadUrlBase}/file/${this.bucketName}/${fileName}`;
    }
    // Fallback to generic format if downloadUrlBase is not available
    return `https://f005.backblazeb2.com/file/${this.bucketName}/${fileName}`;
  }

  // Create multer storage configuration
  createMulterStorage() {
    return multer.memoryStorage();
  }

  // File filter for allowed file types
  fileFilter(req, file, cb) {
    // Define allowed file types
    const allowedTypes = {
      'image/jpeg': true,
      'image/jpg': true,
      'image/png': true,
      'image/gif': true,
      'image/webp': true,
      'video/mp4': true,
      'video/mpeg': true,
      'video/quicktime': true,
      'video/webm': true,
      'audio/mpeg': true,
      'audio/wav': true,
      'audio/ogg': true,
      'application/pdf': true,
      'text/plain': true,
    };

    if (allowedTypes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new AppError('File type not allowed. Please upload images, videos, audio files, PDFs, or text files only.', 400), false);
    }
  }

  // Create multer upload middleware
  createUploadMiddleware(options = {}) {
    const {
      maxFileSize = 50 * 1024 * 1024, // 50MB default
      maxFiles = 5,
      fieldName = 'files'
    } = options;

    return multer({
      storage: this.createMulterStorage(),
      fileFilter: this.fileFilter.bind(this),
      limits: {
        fileSize: maxFileSize,
        files: maxFiles,
      },
    }).array(fieldName, maxFiles);
  }

  // Create single file upload middleware
  createSingleUploadMiddleware(options = {}) {
    const {
      maxFileSize = 10 * 1024 * 1024, // 10MB default for single files
      fieldName = 'file'
    } = options;

    return multer({
      storage: this.createMulterStorage(),
      fileFilter: this.fileFilter.bind(this),
      limits: {
        fileSize: maxFileSize,
      },
    }).single(fieldName);
  }
}

// Create singleton instance
const b2Storage = new B2StorageService();

module.exports = b2Storage;