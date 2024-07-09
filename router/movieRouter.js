const express = require('express');
const router = express.Router();
const movieApi = require('../api/movies.api');

router.post('/api/addMovie',movieApi.AddMovie);
router.get('/api/getfilm',movieApi.getFilm);


router.post('/api/addCinema',movieApi.AddCinema);


router.post('/api/addSeat',movieApi.AddSeat);

router.post('/api/addMovieSchedule',movieApi.addDate);

module.exports = router;