const db = require('./db');

const movieSchema = new db.mongoose.Schema({
    movieName: { type: String, required: true },
    imageMovie: { type: String, required: true },
    trailer: { type: String, required: true },
    language: { type: String, required: true },
    duration: { type: Number, required: true },
    director: { type: String, required: true },
    plot: { type: String, required: true },
    actor: [{ type: String, required: true }],
    age_limit: { type: Number, required: true },
    release_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    cinemas: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Cinema' }],
    showDate:[{type:db.mongoose.Schema.Types.ObjectId,ref:'MovieSchedule'}],
    isHide: { type: Boolean, default: false }
});

const Movie = db.mongoose.model('Movie', movieSchema);

module.exports = { Movie };
