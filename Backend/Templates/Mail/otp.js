module.exports = (name, otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Verify Your Trapp Account</title>
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
            background: linear-gradient(135deg, #0162C4 0%, #5BE584 100%);
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
        
        .otp-container {
            background: linear-gradient(135deg, rgba(1, 98, 196, 0.05) 0%, rgba(91, 229, 132, 0.05) 100%);
            border: 2px solid rgba(1, 98, 196, 0.1);
            border-radius: 16px;
            padding: 32px;
            margin: 32px 0;
            position: relative;
        }
        
        .otp-label {
            font-size: 14px;
            font-weight: 500;
            color: #637381;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .otp-code {
            font-size: 36px;
            font-weight: 700;
            color: #0162C4;
            letter-spacing: 8px;
            margin-bottom: 16px;
            font-family: 'Courier New', monospace;
        }
        
        .otp-validity {
            font-size: 14px;
            color: #FF4842;
            font-weight: 500;
        }
        
        .security-note {
            background: #F9FAFB;
            border-left: 4px solid #0162C4;
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
            
            .otp-code {
                font-size: 32px;
                letter-spacing: 6px;
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
                <div class="logo"><img src="https://i.imghippo.com/files/cboV7672wJU.png" /></div>
            </div>
            <h1 class="header-title">Verify Your Account</h1>
            <p class="header-subtitle">Complete your Trapp registration</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">Hello ${name}! 👋</div>
            
            <p class="message">
                Welcome to <strong>Trapp</strong>! We're excited to have you join our community. 
                To complete your registration and secure your account, please use the verification code below.
            </p>
            
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-validity">⏰ Valid for 10 minutes</div>
            </div>
            
            <div class="security-note">
                <div class="security-note-title">🔒 Security Note</div>
                <div class="security-note-text">
                    Never share this code with anyone. Trapp will never ask for your verification code via phone, email, or any other method.
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">💙 Team Trapp</div>
            <div class="footer-text">
                Thanks for choosing Trapp for your communication needs!
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