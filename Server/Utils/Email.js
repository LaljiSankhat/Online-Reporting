const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();

const generateEmail = (mail, otp) => {

  const mailOptions = {
    from: {
      name: "Online Reporting",
      address: process.env.USER,
    },
    to: mail,
    subject: "Reset Password",
    text: `Otp for reset-password is : ${otp}`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const Email = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error)
    }
  }


  // email = mail;
  console.log(mail);
  console.log(otp);
  Email(transporter, mailOptions);
}

module.exports = generateEmail;

