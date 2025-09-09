const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// OAuth2 setup for Gmail
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error("❌ Failed to create access token:", err);
          reject(err);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "domaintrapp@gmail.com",
        accessToken,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    return transporter;
  } catch (error) {
    console.error("❌ Error creating transporter:", error);
    throw error;
  }
};

const sendNodemailerEmail = async ({
  to,
  sender,
  subject,
  html,
  content,
  attachments,
  text,
  from,
}) => {
  try {
    const fromEmail = from || sender || "domaintrapp@gmail.com";

    const mailOptions = {
      from: fromEmail,
      to: to,
      subject: subject,
      html: html,
      text: text,
      attachments: attachments,
    };

    console.log("📧 Attempting to send email via Nodemailer:", {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject
    });

    const transporter = await createTransporter();
    const result = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully:", {
      messageId: result.messageId,
      response: result.response
    });
    
    return result;
  } catch (error) {
    console.error("❌ Nodemailer Error:", {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    throw error; // Re-throw so calling code can handle it
  }
};

exports.sendEmail = async (args) => {
  // Always send emails, but log in development mode for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Sending email (Development Mode):", {
      to: args.to,
      subject: args.subject,
      from: args.from || "domaintrapp@gmail.com"
    });
  }
  
  return sendNodemailerEmail(args);
};


