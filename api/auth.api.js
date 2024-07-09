const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailService = require('../service/mailer');
require('dotenv').config();


exports.Register = async (req, res, next) => {
    try {
        const { username, avata, phone, email, password } = req.body;

        const existingUser = await User.User.findOne({ email: email });
        if (existingUser) {
            return res.status(404).json({ message: "Người dùng đã đăng ký" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);

        const user = new User.User({
            username,
            avata: "https://cdn1.iconfinder.com/data/icons/project-management-8/500/worker-512.png",
            phone,
            email,
            password: hashPassword,
            otp: otp,
            otpCreateAt: Date.now(),
            otpVerifyed: false,
        });

        await user.save();

        await emailService.sentOTP(email, otp);
        return res.status(200).json(user);

    } catch (error) {
        console.log("Đã xảy ra lỗi khi đăng ký người dùng");
    }
};

exports.confirmOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Tìm người dùng với email và mã OTP đã cho
        const user = await User.User.findOne({ email: email, otp: otp });
        if (!user) {
            return res.status(404).json({ message: "Xác nhận OTP không thành công" });
        }

        const otpLifetime = 1 * 60 * 1000;
        if (Date.now() - user.otpCreateAt > otpLifetime) {
            return res.status(400).json({ message: "Mã OTP đã hết hạn" })
        }


        // Đánh dấu OTP đã được xác nhận
        user.otpVerifyed = true;
        // Xóa trường otp
        user.otp = undefined;
        await user.save();

        return res.status(200).json({ message: "Xác nhận OTP thành công" });

    } catch (error) {
        console.log("Đã xảy ra lỗi khi xác nhận OTP:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi xác nhận OTP" });
    }
};


exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Mật khẩu không chính xác" });
        }

        const userPayload = {
            id: existingUser._id,
            email: existingUser.email,
            phone:existingUser.phone,
            username:existingUser.username,
            password:existingUser.password,
            otp:existingUser.otp,
            otpCreateAt:existingUser.otpCreateAt,
            avata:existingUser.avata,
            otpVerifyed:existingUser.otpVerifyed,
        }
        
        const token = jwt.sign(
            userPayload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Thời gian sống của token, ví dụ 1 giờ
        );

        req.io.emit('login',{id:existingUser._id});
        return res.status(200).json({ token: token});

    } catch (error) {
        console.log("Lỗi đăng nhập " + error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập" });
    }
};
