const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const path = require('path');

// Load your AWS credentials and try to instantiate the object.
let aws_config_path = path.join(__dirname, '../config/AWS.json');
aws.config.loadFromPath(aws_config_path);


let sqs = new aws.SQS();

const Booking = require('../db/booking');

let app = express();

let port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Thesis Bookings API');
})


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
// queue_url: https://sqs.us-west-1.amazonaws.com/732263591912/update_inventory_queue

app.get('/update-inventory-service', (req, res) => {
    let update_inventory_queue_url = 'https://sqs.us-west-1.amazonaws.com/732263591912/update_inventory_queue';

    var params = {
        MessageBody: 'Hello world!',
        QueueUrl: update_inventory_queue_url,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
