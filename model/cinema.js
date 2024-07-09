const db = require('./db');

const cinemaSchema = new db.mongoose.Schema({
    nameCinema: { type: String, required: true },
    location: { type: String, required: true },
    imageCinema: { type: String, required: true },
    seat: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Seat' }]
}
);

const Cinema = db.mongoose.model('Cinema', cinemaSchema);

module.exports = { Cinema };
