// Test script for Nodemailer email functionality
// Run with: node test-email.js

const mailService = require('./services/mailer');
require('dotenv').config({ path: './config.env' });

async function testEmail() {
  try {
    console.log('🧪 Testing email functionality...');
    
    // Check if required environment variables are set
    const requiredVars = [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET', 
      'GOOGLE_REFRESH_TOKEN'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName] || process.env[varName].includes('your_'));
    
    if (missingVars.length > 0) {
      console.error('❌ Missing or placeholder environment variables:');
      missingVars.forEach(varName => {
        console.error(`   - ${varName}: ${process.env[varName] || 'not set'}`);
      });
      console.error('\n📖 Please check EMAIL_SETUP.md for configuration instructions');
      return;
    }
    
    console.log('✅ Environment variables configured');
    
    // Send test email
    const result = await mailService.sendEmail({
      to: 'domaintrapp@gmail.com', // Send to same email for testing
      subject: '🧪 Nodemailer Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #28a745;">✅ Nodemailer Setup Successful!</h2>
          <p>This is a test email to verify that your Nodemailer configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            If you received this email, your Gmail OAuth2 setup is working perfectly! 🎉
          </p>
        </div>
      `,
      text: `Nodemailer Test Email - Setup Successful! Timestamp: ${new Date().toISOString()}`
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📨 Check your inbox at domaintrapp@gmail.com');
    
  } catch (error) {
    console.error('❌ Test email failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n💡 This is likely an authentication issue. Please check:');
      console.error('   - Your Google OAuth2 credentials are correct');
      console.error('   - The Gmail API is enabled in Google Cloud Console');
      console.error('   - Your refresh token is valid');
    } else if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Network connectivity issue. Check your internet connection.');
    }
    
    console.error('\n📖 See EMAIL_SETUP.md for detailed setup instructions');
  }
}

// Run the test
testEmail();