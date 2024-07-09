const { populate } = require('dotenv');
const { Booking } = require('../model/booking');
const { Vorcher } = require('../model/vorcher');

exports.addBooking = async (req, res) => {
    try {
        const { user, movie, totalPrice, selectSeat, cinema, date, time } = req.body;

        const booking = new Booking({
            user,
            movie,
            totalPrice,
            selectSeat,
            cinema,
            date,
            time,
            paymentMethod: "",
            paid: false,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        console.log("Lỗi :" + error);
    }
};

exports.payBooking = async (req, res) => {
    try {
        const { bookingId, paymentMethod, vorcherCode } = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Hóa đơn không tồn tại" });
        }

        let discount = 0;
        if (vorcherCode) {
            const vorcher = await Vorcher.findOne({ code: vorcherCode });

            if (!vorcher) {
                return res.status(404).json({ message: "Voucher không tồn tại" });
            }

            const currentDate = new Date();
            if (vorcher.expiryDate < currentDate) {
                return res.status(400).json({ message: "Voucher đã hết hạn" });
            }

            if (vorcher.currentUsage >= vorcher.maxUsage) {
                return res.status(400).json({ message: "Voucher đã được sử dụng" });
            }

            discount = (vorcher.discount / 100) * booking.totalPrice;

            vorcher.currentUsage += 1;
            await vorcher.save();
        }

        const finalAmount = booking.totalPrice - discount;


        booking.paid = true;
        booking.paymentMethod = paymentMethod;
        booking.expiresAt = null;
        booking.totalPrice = finalAmount;

        booking.save();
        res.status(200).json(booking);
    } catch (error) {
        console.log("Đã có lỗi :" + error);
    }
};


exports.getBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId).populate('user').populate('movie').populate('user').populate('selectSeat').populate('cinema');
        if (!booking) {
            return res.status(404).json({ message: "Hóa đơn không tồn tại" });
        }

        res.status(200).json(booking);

    } catch (error) {
        console.log("Lỗi : " + error);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.log("Xóa lỗi " + error);
    }
};


exports.AddVorcher = async (req, res) => {
    try {
        const {user, code, discount, content, expiryDate, maxUsage } = req.body;

        const existingVorcher = await Vorcher.findOne({ code: code });
        if (existingVorcher) {
            return res.status(400).json({ message: "Vorcher đã tồn tại" });
        }

        const vorcher = new Vorcher({
            user,
            code,
            discount,
            content,
            expiryDate,
            maxUsage,
        });

        await vorcher.save();
        res.status(200).json(vorcher);
    } catch (error) {
        console.log("Lỗi : " + error);
    }
};


exports.getVorcher = async (req, res) => {
    try {
        const vorcher = await Vorcher.find({isActive:true});
        if(!vorcher) {
            return res.status(404).json({ message: "Vorcher không tồn tại"});
        }

        res.status(200).json(vorcher);
    } catch (error) {
        console.log("Lỗi :" +error);
    }
};