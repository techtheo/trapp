module.exports = (name, link) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Trapp Password</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #212B36;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
            position: relative;
        }
        
        .email-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(1, 98, 196, 0.5), transparent);
        }
        
        .header {
            background: linear-gradient(135deg, #FF4842 0%, #FFC107 100%);
            padding: 40px 40px 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .logo-container {
            display: inline-flex;
            padding: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            margin-bottom: 24px;
            position: relative;
            z-index: 2;
        }
        
        .logo {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: 700;
            color: #0162C4;
            text-decoration: none;
        }
        
        .header-title {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 48px 40px;
            text-align: center;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #212B36;
            margin-bottom: 16px;
        }
        
        .message {
            font-size: 16px;
            color: #637381;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #0162C4 0%, #5BE584 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            margin: 24px 0;
            transition: all 0.3s ease;
            box-shadow: 0 8px 16px rgba(1, 98, 196, 0.3);
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(1, 98, 196, 0.4);
        }
        
        .link-fallback {
            background: #F9FAFB;
            border: 1px solid #F4F6F8;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
            word-break: break-all;
        }
        
        .link-fallback-text {
            font-size: 14px;
            color: #637381;
            margin-bottom: 8px;
        }
        
        .link-fallback-url {
            font-size: 14px;
            color: #0162C4;
            font-family: 'Courier New', monospace;
        }
        
        .security-note {
            background: #FFF7CD;
            border-left: 4px solid #FFC107;
            padding: 20px;
            margin: 32px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .security-note-title {
            font-size: 14px;
            font-weight: 600;
            color: #212B36;
            margin-bottom: 8px;
        }
        
        .security-note-text {
            font-size: 14px;
            color: #637381;
            line-height: 1.5;
        }
        
        .footer {
            background: #F9FAFB;
            padding: 32px 40px;
            text-align: center;
            border-top: 1px solid #F4F6F8;
        }
        
        .footer-brand {
            font-size: 16px;
            font-weight: 600;
            color: #0162C4;
            margin-bottom: 8px;
        }
        
        .footer-text {
            font-size: 14px;
            color: #637381;
            margin-bottom: 16px;
        }
        
        .footer-contact {
            font-size: 14px;
            color: #637381;
        }
        
        .footer-contact a {
            color: #0162C4;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer-contact a:hover {
            text-decoration: underline;
        }
        
        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                border-radius: 16px;
            }
            
            .header {
                padding: 32px 24px 48px;
            }
            
            .content {
                padding: 32px 24px;
            }
            
            .footer {
                padding: 24px;
            }
            
            .header-title {
                font-size: 28px;
            }
            
            .reset-button {
                padding: 14px 24px;
                font-size: 15px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background: #1a1a1a;
                color: #ffffff;
            }
            
            .greeting {
                color: #ffffff;
            }
            
            .message {
                color: #b3b3b3;
            }
            
            .security-note {
                background: #2a2a2a;
                color: #ffffff;
            }
            
            .footer {
                background: #2a2a2a;
                border-top-color: #3a3a3a;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo-container">
                <div class="logo">T</div>
            </div>
            <h1 class="header-title">Reset Your Password</h1>
            <p class="header-subtitle">Secure your Trapp account</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hello ${name}! 🔐</div>
            
            <p class="message">
                We received a request to reset your password for your <strong>Trapp</strong> account. 
                Click the button below to create a new password. If you didn't request this, you can safely ignore this email.
            </p>
            
            <a href="${link}" class="reset-button">Reset My Password</a>
            
            <div class="link-fallback">
                <div class="link-fallback-text">If the button doesn't work, copy and paste this link:</div>
                <div class="link-fallback-url">${link}</div>
            </div>
            
            <div class="security-note">
                <div class="security-note-title">⚠️ Security Notice</div>
                <div class="security-note-text">
                    This password reset link will expire in 1 hour for your security. If you didn't request this reset, please contact our support team immediately.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">💙 Team Trapp</div>
            <div class="footer-text">
                Your account security is our priority!
            </div>
            <div class="footer-contact">
                Need help? Contact us at <a href="mailto:domaintrapp@gmail.com">domaintrapp@gmail.com</a>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};