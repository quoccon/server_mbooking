const { text } = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
});


exports.sentOTP = async (toEmail, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Xác thực OTP cho đăng ký',
        text:`Mã OTP của bạn là ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent " +info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}