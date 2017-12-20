const express = require('express');
const bodyParser = require('body-parser');

const Booking = require('../db/booking');

let app = express();

let port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// get availability for a specific listing
app.get('/bookings/availability/:listing_uuid', (req, res) => {

});


// create a booking for a specific listing
app.post('/bookings/book/:listing_uuid', (req, res) => {

  let listing_uuid = req.params.listing_uuid;

  console.log(req.body);

  Booking.create_booking(listing_uuid, req.body)


});

// SQS msg bus to Events Service

// SQS msg bus to Inventory Service
