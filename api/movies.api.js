const Movie = require('../model/movie');
const Cinema = require('../model/cinema');
const Seat = require('../model/seat');
const MovieSchedule = require('../model/movieSchedule');


exports.AddMovie = async (req, res) => {
    try {
        const { movieName, imageMovie, trailer, language, duration, plot, director, actor, age_limit, release_date, end_date, cinemas, showDate } = req.body;

        const existingMovie = await Movie.Movie.findOne({ movieName: movieName });

        if (existingMovie) {
            return res.status(400).json({ message: "Phim đã tồn tại" });
        }

        const newMovie = new Movie.Movie(
            {
                movieName,
                imageMovie,
                trailer,
                language, duration,
                director,
                actor,
                plot,
                age_limit,
                release_date,
                end_date,
                cinemas,
                showDate,
            }
        );

        await newMovie.save();
        res.status(200).json({ newMovie });
    } catch (error) {
        console.log("Lỗi thêm phim mới :" + error);
    }
};


exports.getFilm = async (req, res) => {
    try {
        const movie = await Movie.Movie.find({ isHide: false }).populate({path:'cinemas',populate:'seat'}).populate('showDate').exec();
        if (!movie) {
            return res.status(400).json({ message: "Phim không tồn tại" });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.log("Lỗi lấy danh sách phim :" + error);
    }
};



exports.AddCinema = async (req, res) => {
    try {
        const { nameCinema, location, imageCinema, seat } = req.body;
        const existingCinema = await Cinema.Cinema.findOne({ nameCinema: nameCinema });
        if (existingCinema) {
            return res.status(404).json({ message: "Rạp đã tồn tại" });
        };

        const cinema = new Cinema.Cinema({
            nameCinema,
            location,
            imageCinema,
            seat,
        });

        cinema.save();

        res.status(200).json(cinema);
    } catch (error) {
        console.log("Đã có lỗi khi thêm rạp mới :" + error);
    }
};

exports.AddSeat = async (req, res) => {
    try {
        const { row, number, price } = req.body;
        const existingSeat = await Seat.Seat.findOne({ row: row, number: number });
        if (existingSeat) {
            return res.status(400).json({ message: "Ghế đã tồn tại" });
        }

        const seat = new Seat.Seat({
            row,
            number,
            price,
        });

        await seat.save();
        res.status(200).json(seat);
    } catch (error) {
        console.log("Có lỗi :" + error);
    }
};


exports.addDate = async (req, res) => {
    try {
        const { showDate, time } = req.body;
        const existingDate = await MovieSchedule.MovieSchedule.findOne({ showDate: showDate });
        if (existingDate) {
            return res.status(400).json({ message: "Khung giờ đã tồn tại" });
        }

        const datemovie = new MovieSchedule.MovieSchedule({
            showDate,
            time,
        });

        await datemovie.save();
        res.status(200).json(datemovie);
    } catch (error) {
        console.log("Lỗi :" + error);
    }
};
