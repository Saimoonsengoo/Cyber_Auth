
const nodemailer = require("nodemailer");

// Looking to send emails in production
var mailtrapClient = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e9afea287620dd",
    pass: "91852ae4517edc"
  }
});

const sender = {
  email: "talentbridge.info.com", // you can use any fake email
  name: "Talent Bridge Sandbox",
};

module.exports = { mailtrapClient, sender };
