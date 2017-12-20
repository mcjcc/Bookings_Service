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
  // input is a listing id
  let listing_uuid = req.params.listing_uuid;

  Booking.get_availability(listing_uuid)
    .then((results) => {
      res.send(results);
    })
    .catch(() => {
      console.error('Cannot get availability for listing');
    });

});


// create a booking for a specific listing
app.post('/bookings/book/:listing_uuid', (req, res) => {

  let listing_uuid = req.params.listing_uuid;

  console.log(req.body);

  Booking.create_booking(listing_uuid, req.body)
  .then(() => {
    let obj = {isBooked: true};
    res.send(obj);
  }).catch(() => {
    let obj = {isBooked: false};
    res.send(obj);
  });


});

// SQS msg bus to Events Service

// SQS msg bus to Inventory Service
