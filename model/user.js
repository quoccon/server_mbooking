const db = require('./db');

const userChema = new db.mongoose.Schema(
    {
        username:{type:String,required:true},
        avata:{type:String,required:false},
        phone:{type:Number,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        otp:{type:String},
        otpCreateAt:{type:Date},
        otpVerifyed:{type:Boolean,default:false},
    },{
        collection:"users",
    }
);

let User = db.mongoose.model('User',userChema);
module.exports = { User };