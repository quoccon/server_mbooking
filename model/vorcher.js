const db = require('./db');

const vorcherSchema = new db.mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        discount: { type: Number, required: true },
        content:{type:String, required: true},
        expiryDate: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
        maxUsage: { type: Number, default: 1 },
        currentUsage: {type: Number,default: 0,},
        user:{type:db.mongoose.Schema.Types.ObjectId,ref:"User"},
        createAt: { type: Date, default: Date.now() },
    }
);

const Vorcher = db.mongoose.model("Vorcher", vorcherSchema);
module.exports = { Vorcher };
