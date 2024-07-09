const db = require('./db');

const movieScheduleSchema = new db.mongoose.Schema(
    {
        showDate: { type: Date, required: true },
        time: [{ type: String, required: true }],
    }
);

const MovieSchedule = db.mongoose.model('MovieSchedule', movieScheduleSchema);

module.exports = { MovieSchedule }