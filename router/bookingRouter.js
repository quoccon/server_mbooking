const express = require('express');
const router = express.Router();
const bookingApi = require('../api/booking.api');

router.post('/api/addBooking',bookingApi.addBooking);
router.post('/api/paybooking',bookingApi.payBooking);
router.get('/api/getbooking',bookingApi.getBooking);
router.delete('/api/deleteBooking',bookingApi.deleteBooking);


//vorcher

router.post('/api/addVorcher',bookingApi.AddVorcher);
router.get('/api/getVorcher',bookingApi.getVorcher);

module.exports = router;