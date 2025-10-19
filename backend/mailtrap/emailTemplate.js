const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Talent Bridge Account</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', sans-serif; margin:0; padding:0; background: #f2f5f7; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin-top:20px">
    <div style="background: linear-gradient(135deg, #4f46e5, #1e3a8a); text-align: center; padding: 40px;">
      <h1 style="color: #fff; margin: 0; font-weight: 600;">Welcome to Talent Bridge</h1>
      <p style="color: #d1d5db; margin-top: 10px;">Your professional job portal</p>
    </div>
    <div style="background: #fff; padding: 40px; text-align: center;">
      <p>Hi there,</p>
      <p>Thank you for joining <strong>Talent Bridge</strong>! To start exploring jobs or posting opportunities, please verify your email using the code below:</p>
      <div style="margin: 30px 0;">
        <span style="display:inline-block; font-size: 36px; font-weight: 600; color: #4f46e5; padding: 12px 24px; border-radius: 12px; background: rgba(79,70,229,0.1); letter-spacing: 6px;">{verificationCode}</span>
      </div>
      <p style="font-size: 14px; color: #6b7280;">Enter this code on the verification page. It expires in 5 minutes for security reasons.</p>
      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">If you didn’t create an account, just ignore this email.</p>
    </div>
    <div style="background: #f9fafb; text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
      <p>This is an automated message. Please do not reply.</p>
      <p>&copy; 2025 Talent Bridge. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Talent Bridge Password</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', sans-serif; margin:0; padding:0; background: #f2f5f7; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin-top:20px">
    <div style="background: linear-gradient(135deg, #4f46e5, #1e3a8a); text-align: center; padding: 40px;">
      <h1 style="color: #fff; margin: 0; font-weight: 600;">Talent Bridge Password Reset</h1>
      <p style="color: #d1d5db; margin-top: 10px;">Secure your account easily</p>
    </div>
    <div style="background: #fff; padding: 40px; text-align: center;">
      <p>Hi there,</p>
      <p>We received a request to reset your Talent Bridge account password. If you didn't request this, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #4f46e5; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display:inline-block;">Reset Password</a>
      </div>
      <p style="font-size: 14px; color: #6b7280;">This link will expire in 1 hour for security reasons.</p>
    </div>
    <div style="background: #f9fafb; text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
      <p>This is an automated message. Please do not reply.</p>
      <p>&copy; 2025 Talent Bridge. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', sans-serif; margin:0; padding:0; background: #f2f5f7; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin-top:20px">
    <div style="background: linear-gradient(135deg, #4f46e5, #1e3a8a); text-align: center; padding: 40px;">
      <h1 style="color: #fff; margin: 0; font-weight: 600;">Password Reset Successful</h1>
      <p style="color: #d1d5db; margin-top: 10px;">Your account is now secure</p>
    </div>
    <div style="background: #fff; padding: 40px; text-align: center;">
      <p>Hi there,</p>
      <p>Your Talent Bridge account password has been successfully reset.</p>
      <div style="margin: 30px 0;">
        <div style="background-color: #4f46e5; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 36px;">✓</div>
      </div>
      <p style="font-size: 14px; color: #6b7280;">If you did not reset your password, please contact our support team immediately.</p>
      <p style="margin-top: 20px;">For your account security, we recommend:</p>
      <ul style="text-align: left; display: inline-block; margin-top: 10px; font-size: 14px; color: #6b7280; padding-left: 20px;">
        <li>Using a strong, unique password</li>
        <li>Enabling two-factor authentication if available</li>
        <li>Avoiding the same password across multiple platforms</li>
      </ul>
    </div>
    <div style="background: #f9fafb; text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
      <p>This is an automated message. Please do not reply.</p>
      <p>&copy; 2025 Talent Bridge. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Talent Bridge</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', sans-serif; margin:0; padding:0; background: #f2f5f7; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin-top:20px ">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4f46e5, #1e3a8a); text-align: center; padding: 40px;">
      <h1 style="color: #fff; margin: 0; font-weight: 600;">Welcome to Talent Bridge</h1>
      <p style="color: #d1d5db; margin-top: 10px;">Your professional job portal</p>
    </div>

    <!-- Body -->
    <div style="background: #fff; padding: 40px; text-align: center;">
      <p>Hi {userName},</p>
      <p>We're excited to have you on board! Talent Bridge connects you with top employers and job opportunities tailored to your skills and career goals.</p>
      <p>Here’s what you can do next:</p>
      <ul style="text-align: left; display: inline-block; font-size: 14px; color: #6b7280; padding-left: 20px;">
        <li>Complete your profile to attract employers</li>
        <li>Browse and apply for jobs matching your skills</li>
        <li>Set up job alerts to never miss an opportunity</li>
      </ul>
      <div style="margin: 30px 0;">
        <a href="{http://localhost:5173/}" style="background-color: #4f46e5; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display:inline-block;">Go to Dashboard</a>
      </div>
      <p style="font-size: 14px; color: #6b7280;">If you have any questions, feel free to contact our support team anytime.</p>
    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
      <p>This is an automated message. Please do not reply.</p>
      <p>&copy; 2025 Talent Bridge. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE
};
