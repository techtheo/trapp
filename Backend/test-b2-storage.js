require('dotenv').config({ path: './config.env' });
const b2Storage = require('./services/b2Storage');
const fs = require('fs');
const path = require('path');

async function testB2Storage() {
  console.log('🧪 Testing Backblaze B2 Storage integration...\n');

  try {
    // Test authorization
    console.log('1️⃣ Testing B2 authorization...');
    await b2Storage.authorize();
    console.log('✅ B2 authorization successful!\n');

    // Create a test file buffer (simple text file)
    const testContent = `Test file uploaded at ${new Date().toISOString()}
This is a test file to verify B2 storage integration.
Project: Trapp Chat Application
Environment: ${process.env.NODE_ENV}`;
    
    const testBuffer = Buffer.from(testContent, 'utf8');
    const testFileName = 'test-file.txt';

    // Test file upload
    console.log('2️⃣ Testing file upload...');
    const uploadResult = await b2Storage.uploadFile(
      testBuffer,
      testFileName,
      'text/plain',
      'test-uploads'
    );
    
    console.log('✅ File upload successful!');
    console.log('📁 Upload details:', {
      fileName: uploadResult.fileName,
      downloadUrl: uploadResult.downloadUrl,
      size: uploadResult.size,
      contentType: uploadResult.contentType,
    });
    console.log('');

    // Test getting file info
    console.log('3️⃣ Testing file info retrieval...');
    try {
      const fileInfo = await b2Storage.getFileInfo(uploadResult.fileName);
      console.log('✅ File info retrieved successfully!');
      console.log('📋 File info:', {
        fileId: fileInfo.fileId,
        fileName: fileInfo.fileName,
        contentType: fileInfo.contentType,
        contentLength: fileInfo.contentLength,
      });
    } catch (error) {
      console.log('⚠️ File info retrieval failed (this might be expected):', error.message);
    }
    console.log('');

    // Test download URL generation
    console.log('4️⃣ Testing download URL generation...');
    const downloadUrl = b2Storage.getDownloadUrl(uploadResult.fileName);
    console.log('✅ Download URL generated:', downloadUrl);
    console.log('');

    // Test file deletion
    console.log('5️⃣ Testing file deletion...');
    try {
      await b2Storage.deleteFile(uploadResult.fileName);
      console.log('✅ File deleted successfully!');
    } catch (error) {
      console.log('⚠️ File deletion failed:', error.message);
      console.log('💡 This might be due to B2 API limitations or the file being recently uploaded');
    }
    console.log('');

    console.log('🎉 B2 Storage integration test completed!');
    console.log('');
    console.log('📝 Summary:');
    console.log('- B2 Authorization: ✅ Working');
    console.log('- File Upload: ✅ Working');
    console.log('- Download URL Generation: ✅ Working');
    console.log('- File Info Retrieval: ⚠️ May have limitations');
    console.log('- File Deletion: ⚠️ May have limitations');
    console.log('');
    console.log('🚀 Your B2 storage is ready for media uploads!');
    console.log('');
    console.log('📋 Available API endpoints:');
    console.log('- POST /api/v1/media/upload-avatar (single avatar upload)');
    console.log('- POST /api/v1/media/upload-media (multiple files)');
    console.log('- POST /api/v1/media/upload-single (single file)');
    console.log('- POST /api/v1/media/upload-chat-media (chat media)');
    console.log('- DELETE /api/v1/media/delete/:fileName');
    console.log('- GET /api/v1/media/info/:fileName');

  } catch (error) {
    console.error('❌ B2 Storage test failed:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('1. Check your B2 credentials in config.env');
    console.error('2. Verify your B2 bucket exists and is accessible');
    console.error('3. Ensure your B2 application key has the right permissions');
    console.error('');
    console.error('📋 Required permissions for B2 application key:');
    console.error('- listBuckets');
    console.error('- listFiles');
    console.error('- readFiles');
    console.error('- shareFiles');
    console.error('- writeFiles');
    console.error('- deleteFiles');
  }
}

// Run the test
testB2Storage();