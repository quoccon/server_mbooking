const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Server_MBooking')
    .then(() => {
        console.log("Đã kết nối tới mongodb");
    }).catch((e) => {
        console.log("Kết nối thất bại : " + e);
    });
module.exports = { mongoose };
