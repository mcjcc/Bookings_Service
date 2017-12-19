const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

let app = express();

let port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// get availability for a specific listing
app.get('/bookings/availability/:listing_id', (req, res) => {

});


// create a booking for a specific listing
app.post('/bookings/book/:listing_id', (req, res) => {

});
