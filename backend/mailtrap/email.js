const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE
} = require("./emailTemplate.js");
const { mailtrapClient, sender } = require("./mailtrap.config.js");

// =============================
// 1. Verification Email
// =============================
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    const response = await mailtrapClient.sendMail(mailOptions);
    console.log("Verification email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

// =============================
// 2. Welcome Email
// =============================
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Talent Bridge!",
      html: WELCOME_EMAIL_TEMPLATE
        .replace("{userName}", name)
        .replace("{dashboardURL}", "https://testing/dashboard"),
    };

    const response = await mailtrapClient.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

// =============================
// 3. Password Reset Request
// =============================
const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const response = await mailtrapClient.sendMail(mailOptions);
    console.log("Password reset email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

// =============================
// 4. Password Reset Success
// =============================
const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const response = await mailtrapClient.sendMail(mailOptions);
    console.log("Password reset success email sent:", response.messageId);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
};
