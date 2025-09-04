const sgMail = require("@sendgrid/mail");

const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  content,
  attachments,
  text,
}) => {
  try {
    const from = "realidolo98@gmail.com";

    const msg = {
      to: to, // email of  recipient
      from: from, //  verified sender
      subject: subject,
      html: html,
      // text: text,
      attachments,
    };

    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};

// const sgMail = require("@sendgrid/mail");

// // Initialize SendGrid
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendSGMail = async ({
//   to,
//   sender,
//   subject,
//   html,
//   text,
//   attachments,
//   templateId,
//   dynamicTemplateData,
// }) => {
//   try {
//     // Validation
//     if (!to) {
//       throw new Error("Recipient email is required");
//     }
//     if (!subject && !templateId) {
//       throw new Error("Subject or templateId is required");
//     }
//     if (!html && !text && !templateId) {
//       throw new Error("Email content (html, text, or templateId) is required");
//     }

//     const from = sender || process.env.DEFAULT_FROM_EMAIL || "noreply@trapp.com";

//     const msg = {
//       to: Array.isArray(to) ? to : [to],
//       from: from,
//       subject: subject,
//       html: html,
//       text: text,
//     };

//     // Add attachments if provided
//     if (attachments && attachments.length > 0) {
//       msg.attachments = attachments;
//     }

//     // Use dynamic template if provided
//     if (templateId) {
//       msg.templateId = templateId;
//       msg.dynamicTemplateData = dynamicTemplateData || {};
//       // Remove subject/html/text when using template
//       delete msg.subject;
//       delete msg.html;
//       delete msg.text;
//     }

//     const result = await sgMail.send(msg);

//     console.log(`Email sent successfully to ${to}. Message ID: ${result[0].headers['x-message-id']}`);

//     return {
//       success: true,
//       messageId: result[0].headers['x-message-id'],
//       statusCode: result[0].statusCode
//     };

//   } catch (error) {
//     console.error("SendGrid Error:", {
//       message: error.message,
//       code: error.code,
//       response: error.response?.body
//     });

//     // Handle specific SendGrid errors
//     if (error.code === 401) {
//       throw new Error("SendGrid API key is invalid");
//     } else if (error.code === 400) {
//       throw new Error(`SendGrid validation error: ${error.response?.body?.errors?.[0]?.message || error.message}`);
//     } else if (error.code === 413) {
//       throw new Error("Email content or attachments too large");
//     }

//     throw new Error(`Email sending failed: ${error.message}`);
//   }
// };

// // Main export function
// exports.sendEmail = async (args) => {
//   // Skip sending in development unless explicitly enabled
//   if (process.env.NODE_ENV === "development" && !process.env.SEND_EMAILS_IN_DEV) {
//     console.log("Development mode: Email simulation", {
//       to: args.to,
//       subject: args.subject,
//       from: args.sender || process.env.DEFAULT_FROM_EMAIL
//     });
//     return Promise.resolve({
//       success: true,
//       messageId: "dev-simulation-" + Date.now(),
//       statusCode: 202
//     });
//   }

//   return sendSGMail(args);
// };

// // Specific email functions for common use cases
// exports.sendVerificationEmail = async (email, verificationToken, username) => {
//   const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

//   return exports.sendEmail({
//     to: email,
//     subject: "Verify your Trapp account",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #007bff;">Welcome to Trapp! 🎉</h1>
//         </div>

//         <p>Hi ${username},</p>

//         <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>

//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${verificationUrl}"
//              style="background-color: #007bff; color: white; padding: 12px 30px;
//                     text-decoration: none; border-radius: 5px; font-weight: bold;">
//             Verify Email Address
//           </a>
//         </div>

//         <p>Or copy and paste this link into your browser:</p>
//         <p style="word-break: break-all; color: #007bff;">${verificationUrl}</p>

//         <p style="color: #666; font-size: 14px; margin-top: 30px;">
//           This link will expire in 24 hours. If you didn't create an account, you can ignore this email.
//         </p>
//       </div>
//     `,
//     text: `Welcome to Trapp! Please verify your email by visiting: ${verificationUrl}`
//   });
// };

// exports.sendPasswordResetEmail = async (email, resetToken, username) => {
//   const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

//   return exports.sendEmail({
//     to: email,
//     subject: "Reset your Trapp password",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <h2 style="color: #dc3545;">Password Reset Request</h2>

//         <p>Hi ${username},</p>

//         <p>You requested to reset your password. Click the button below to create a new password:</p>

//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${resetUrl}"
//              style="background-color: #dc3545; color: white; padding: 12px 30px;
//                     text-decoration: none; border-radius: 5px; font-weight: bold;">
//             Reset Password
//           </a>
//         </div>

//         <p>Or copy and paste this link:</p>
//         <p style="word-break: break-all; color: #dc3545;">${resetUrl}</p>

//         <p style="color: #666; font-size: 14px; margin-top: 30px;">
//           This link will expire in 1 hour. If you didn't request this, please ignore this email.
//         </p>
//       </div>
//     `,
//     text: `Reset your password by visiting: ${resetUrl}`
//   });
// };

// exports.sendWelcomeEmail = async (email, username) => {
//   return exports.sendEmail({
//     to: email,
//     subject: "Welcome to Trapp - Start chatting now! 🚀",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <h2 style="color: #28a745;">Welcome to Trapp, ${username}! 🎉</h2>

//         <p>Your account is now verified and ready to use!</p>

//         <h3>What you can do now:</h3>
//         <ul style="line-height: 1.6;">
//           <li>💬 Start chatting with friends and family</li>
//           <li>👥 Create or join group chats</li>
//           <li>📁 Share files and images</li>
//           <li>🤖 Chat with our AI assistant</li>
//           <li>🔔 Customize your notifications</li>
//         </ul>

//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${process.env.FRONTEND_URL}"
//              style="background-color: #28a745; color: white; padding: 12px 30px;
//                     text-decoration: none; border-radius: 5px; font-weight: bold;">
//             Start Chatting Now
//           </a>
//         </div>

//         <p style="color: #666; font-size: 14px;">
//           Need help? Reply to this email or contact our support team.
//         </p>
//       </div>
//     `
//   });
// };

// // Bulk email function
// exports.sendBulkEmail = async (emails) => {
//   try {
//     const results = await Promise.allSettled(
//       emails.map(email => exports.sendEmail(email))
//     );

//     const successful = results.filter(r => r.status === 'fulfilled').length;
//     const failed = results.filter(r => r.status === 'rejected').length;

//     console.log(`Bulk email results: ${successful} successful, ${failed} failed`);

//     return {
//       successful,
//       failed,
//       results
//     };
//   } catch (error) {
//     console.error("Bulk email error:", error);
//     throw error;
//   }
// };
