const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./router/authRouter');
const movieRouter = require('./router/movieRouter');
const bookingRouter = require('./router/bookingRouter');
const path = require('path');
const http = require('http');


const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next) => {
    req.io = io;
    next();
});

app.use('/auth',authRouter);
app.use('/movie',movieRouter);
app.use('/booking',bookingRouter);

app.listen(PORT, () => {
    console.log("listening on port : " + PORT);
});
