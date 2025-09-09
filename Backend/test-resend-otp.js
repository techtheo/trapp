const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mailService = require("./services/mailer");

async function testResendOTP() {
  console.log("🧪 Testing Resend OTP functionality...");
  
  try {
    // Test the mail service directly
    const result = await mailService.sendEmail({
      from: "domaintrapp@gmail.com",
      to: "domaintrapp@gmail.com",
      subject: "🔄 Test Resend OTP Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>🔄 Test Resend OTP</h2>
          <p>This is a test email to verify the resend OTP functionality.</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
            123456
          </div>
          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
      attachments: [],
    });
    
    console.log("✅ Resend OTP test email sent successfully!");
    console.log("📧 Result:", result);
    
  } catch (error) {
    console.error("❌ Resend OTP test failed:");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
  }
}

testResendOTP();