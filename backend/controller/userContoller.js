const createToken = require('../helper/createToken');
require('dotenv').config();
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const axios = require('axios');
const { sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require('../mailtrap/email');
const User = require('../model/User.model');

const userController = {
    check: async (req, res) => {
        return res.json(req.user);
    },

    signup: async (req, res) => {
        try {
            let { email, password, name, captchaToken } = req.body;
            // Verify reCAPTCHA before creating user
            if (!captchaToken) {
                return res.status(400).json({ msg: "Captcha token missing!" });
            }

            const secretKey = process.env.GOOGLEAPI;
            const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
            const captchaRes = await axios.post(verificationURL);
            if (!captchaRes.data.success) {
                return res.status(400).json({ msg: "Captcha verification failed!" });
            }
            let user = await User.signup(email, password, name);

            let token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true, //XSS attack prevention
                secure: process.env.NODE_ENV === 'production', // https
                sameSite: 'strict', // csrf prevention
                maxAge: 2 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                success: true,
                msg: "Signup Successful! Please verify your email.",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
        } catch (e) {
            return res.status(400).json({ msg: e.message });
        }
    },

    verifyEmail: async (req, res) => {
        const { code } = req.body;
        try {
            const user = await User.findOne({
                verificationToken: code,
                verificationTokenExpiresAt: { $gt: Date.now()}
            })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid or Expired verification code",
                })
            }

            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();

            await sendWelcomeEmail(user.email, user.name);
            return res.status(200).json({
                success: true,
                msg: "Email verified successfully",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
        } catch (e) {
            return res.status(400).json({ msg: e.message });
        }
    },

    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await User.login(email, password);
            let token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true, //XSS attack prevention
                secure: process.env.NODE_ENV === 'production', // https
                sameSite: 'strict', // csrf prevention
                maxAge: 2 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                success: true,
                msg: "Login Successful!!!",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
        } catch (e) {
            return res.status(400).json({ msg: e.message });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            let { email } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "User not found!!!" })
            }

            // Generate resetToken
            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1hr

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpiresAt = resetPasswordExpiresAt;

            await user.save();

            //send email
            await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)
            return res.status(200).json({
                success: true,
                msg: "Password reset link sent to your email"
            })
        } catch (e) {
            console.log("Error is forgotPassword", e);
            res.status(400).json({
                success: false,
                msg: e.message
            })
        }
    },

    resetPassword: async (req, res) => {
        try {
            let { token } = req.params;
            let { password } = req.body;

            // Find user by reset token and check expiry
            let user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpiresAt: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid or expired reset token",
                });
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiresAt = undefined;

            await user.save();
            // Send success email
            await sendResetSuccessEmail(user.email);

            return res.status(200).json({
                success: true,
                msg: "Password reset successful",
            });
        } catch (e) {
            console.log("Error in resetPassword", e);
            res.status(400).json({
                success: false,
                msg: e.message,
            });
        }
    },
    logout: async (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 })
        return res.status(200).json({
            success: true,
            msg: "Logged out sccessfully"
        })
    }

}

module.exports = userController;