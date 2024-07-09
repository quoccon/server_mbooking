const db = require('./db');

const seatSchema = new db.mongoose.Schema(
    {
       row:{type:String,required:true},
       number:{type:Number,required:true},
       price:{type:Number,required:false},
       isSelected:{type:Boolean,default:false}
    },
    {
        collection: "seats"
    }
);
let Seat = db.mongoose.model('Seat', seatSchema);

module.exports = { Seat }
