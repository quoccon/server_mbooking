const db = require('./db');

const bookingSchema = new db.mongoose.Schema(
    {
        user: { type: db.mongoose.Schema.Types.ObjectId, ref: "User" },
        movie: { type: db.mongoose.Schema.Types.ObjectId, ref: "Movie" },
        totalPrice: { type: Number, required: true },
        paymentMethod:{type:String},
        selectSeat:[{type:db.mongoose.Schema.Types.ObjectId,ref:"Seat"}],
        cinema:{type:db.mongoose.Schema.Types.ObjectId,ref:"Cinema"},
        date:{type:Date,required:true},
        time:{type:String,required:true},
        paid:{type:Boolean,default:false},
        expiresAt: { type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000), index: { expires: 0 } }  // TTL index
    }
);

let Booking = db.mongoose.model('Booking', bookingSchema);

module.exports = { Booking };