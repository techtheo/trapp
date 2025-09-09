# Backblaze B2 Storage Integration

This document explains how to use the Backblaze B2 storage integration for media files in the Trapp chat application.

## 🚀 Features

- **Avatar Upload**: Profile picture upload with automatic user profile update
- **Media Upload**: Multiple file uploads for chat media
- **Single File Upload**: Individual file uploads
- **Chat Media**: Specialized endpoint for chat attachments
- **File Management**: Delete and get file information
- **Security**: Protected routes with JWT authentication
- **File Validation**: Automatic file type and size validation

## 📋 Supported File Types

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Videos
- MP4 (.mp4)
- MPEG (.mpeg)
- QuickTime (.mov)
- WebM (.webm)

### Audio
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)

### Documents
- PDF (.pdf)
- Text files (.txt)

## 🔧 Configuration

Your B2 credentials are already configured in `config.env`:

```env
B2_KEY_ID=your_key_id
B2_APPLICATION_KEY=your_application_key
B2_BUCKET_ID=your_bucket_id
B2_BUCKET_NAME=your_bucket_name
```

## 📡 API Endpoints

### 1. Upload Avatar
**POST** `/api/v1/media/upload-avatar`

Upload a profile picture and automatically update the user's avatar.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `avatar`: Image file (max 5MB)

**Response:**
```json
{
  "status": "success",
  "message": "Avatar uploaded successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "https://f005.backblazeb2.com/file/bucket-name/avatars/uuid.jpg"
    },
    "fileInfo": {
      "fileName": "avatars/uuid.jpg",
      "downloadUrl": "https://f005.backblazeb2.com/file/bucket-name/avatars/uuid.jpg",
      "size": 1024000
    }
  }
}
```

### 2. Upload Multiple Media Files
**POST** `/api/v1/media/upload-media`

Upload multiple files at once (max 5 files, 50MB each).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `files`: Array of files

**Response:**
```json
{
  "status": "success",
  "message": "3 file(s) uploaded successfully",
  "data": {
    "files": [
      {
        "fileId": "file_id_1",
        "fileName": "media/uuid1.jpg",
        "downloadUrl": "https://f005.backblazeb2.com/file/bucket-name/media/uuid1.jpg",
        "contentType": "image/jpeg",
        "size": 2048000
      }
    ]
  }
}
```

### 3. Upload Single File
**POST** `/api/v1/media/upload-single`

Upload a single file (max 50MB).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `file`: Single file

### 4. Upload Chat Media
**POST** `/api/v1/media/upload-chat-media`

Upload media for chat messages (max 25MB).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `media`: Media file

### 5. Delete File
**DELETE** `/api/v1/media/delete/:fileName`

Delete a file from B2 storage.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `fileName`: The file name in B2 (e.g., "media/uuid.jpg")

### 6. Get File Info
**GET** `/api/v1/media/info/:fileName`

Get information about a file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## 🧪 Testing

Run the B2 storage test to verify everything is working:

```bash
node test-b2-storage.js
```

This will test:
- B2 authorization
- File upload
- Download URL generation
- File info retrieval
- File deletion

## 📁 File Organization

Files are organized in folders within your B2 bucket:

```
your-bucket/
├── avatars/          # User profile pictures
├── media/            # General media uploads
├── chat-media/       # Chat attachments
└── test-uploads/     # Test files (can be deleted)
```

## 🔒 Security Features

1. **Authentication**: All endpoints require JWT authentication
2. **File Type Validation**: Only allowed file types can be uploaded
3. **File Size Limits**: Different limits for different endpoints
4. **Unique File Names**: UUIDs prevent filename conflicts
5. **Error Handling**: Comprehensive error messages

## 💡 Usage Examples

### Frontend JavaScript (using fetch)

#### Upload Avatar:
```javascript
const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch('/api/v1/media/upload-avatar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};
```

#### Upload Multiple Files:
```javascript
const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch('/api/v1/media/upload-media', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};
```

### React Component Example:
```jsx
import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('/api/v1/media/upload-media', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>
    </div>
  );
};
```

## 🚨 Error Handling

Common error responses:

```json
{
  "status": "error",
  "message": "File type not allowed. Please upload images, videos, audio files, PDFs, or text files only."
}
```

```json
{
  "status": "error",
  "message": "File too large. Maximum size allowed is 50MB"
}
```

```json
{
  "status": "error",
  "message": "Failed to upload file to B2 storage"
}
```

## 🔧 Troubleshooting

1. **Authorization Failed**: Check B2 credentials in config.env
2. **Upload Failed**: Verify bucket permissions and file size
3. **File Not Found**: Ensure the file name is correct
4. **Network Issues**: Check internet connection and B2 service status

## 📈 Performance Tips

1. **Compress Images**: Use image compression before upload
2. **Batch Uploads**: Use multiple file upload for efficiency
3. **Progress Tracking**: Implement upload progress indicators
4. **Error Retry**: Add retry logic for failed uploads
5. **Caching**: Cache download URLs on the frontend

## 🔄 Integration with Chat

To integrate with your chat system:

1. Upload media using `/upload-chat-media`
2. Store the returned `downloadUrl` in your message model
3. Display media in chat using the download URL
4. Implement lazy loading for better performance

## 📊 Monitoring

Monitor your B2 usage:
- Check B2 dashboard for storage usage
- Monitor API calls and bandwidth
- Set up alerts for quota limits
- Track upload success/failure rates

---

Your Backblaze B2 storage integration is now ready! 🎉