# Email Setup Guide - Nodemailer with Gmail OAuth2

This application now uses Nodemailer with Gmail OAuth2 instead of SendGrid for sending emails.

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API:
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click on it and press "Enable"

### 2. Create OAuth2 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the OAuth consent screen if prompted
4. Choose "Web application" as the application type
5. Add authorized redirect URIs:
   - `https://developers.google.com/oauthplayground`
6. Save and note down your `Client ID` and `Client Secret`

### 3. Get Refresh Token

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your `Client ID` and `Client Secret`
5. In the left panel, find "Gmail API v1"
6. Select `https://mail.google.com/` scope
7. Click "Authorize APIs"
8. Sign in with the Gmail account you want to send emails from (domaintrapp@gmail.com)
9. Click "Exchange authorization code for tokens"
10. Copy the `refresh_token` value

### 4. Update Environment Variables

Update your `config.env` file with the obtained values:

```env
GOOGLE_CLIENT_ID=your_actual_client_id
GOOGLE_CLIENT_SECRET=your_actual_client_secret
GOOGLE_REFRESH_TOKEN=your_actual_refresh_token
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground
```

### 5. Gmail Account Settings

Make sure the Gmail account (domaintrapp@gmail.com) has:
- 2-Step Verification enabled
- "Less secure app access" is NOT needed (OAuth2 is more secure)

## Testing

The application will automatically use the new Nodemailer setup. You can test email functionality through:
- User registration (verification emails)
- Password reset requests
- Any other email features in your app

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Double-check your Client ID, Client Secret, and Refresh Token
   - Make sure the Gmail API is enabled in Google Cloud Console

2. **"Insufficient Permission" error**
   - Ensure you selected the correct Gmail scope (`https://mail.google.com/`)
   - Re-generate the refresh token with proper scopes

3. **"Access token expired" error**
   - This should auto-refresh, but if it persists, generate a new refresh token

4. **"User not found" error**
   - Make sure the email address in the code matches the Gmail account used for OAuth2

## Benefits of Nodemailer over SendGrid

- ✅ No monthly email limits (uses your Gmail account)
- ✅ No API key management
- ✅ More secure with OAuth2
- ✅ Direct integration with Gmail
- ✅ No third-party service dependency
- ✅ Free to use with Gmail

## Security Notes

- Keep your OAuth2 credentials secure
- Never commit real credentials to version control
- Use environment variables for all sensitive data
- Refresh tokens don't expire unless revoked