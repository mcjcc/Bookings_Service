/*
This file when run will generate booking records

ex:
{
  "listing_uuid": "829aa84a-4bba-411f-a4fb-38167a987cda",
  "bookings": [
    {
      "user_uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "listing_uuid": "829aa84a-4bba-411f-a4fb-38167a987cda",
      "booking_uuid": "fdda765f-fc57-5604-a269-52a7df8164ec",
      "PA_rating": "3",
      "booking_start_date": "2017-11-28",
      "booking_end_date": "2017-11-30",
      "booking_cost_per_night": 100,
      "booking_length": 3,
      "booking_total_cost": 300,
      "booking_date": '2016-01-24'
    },
    {
      "user_uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "listing_uuid": "829aa84a-4bba-411f-a4fb-38167a987cda",
      "booking_uuid": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
      "PA_rating": 3,
      "booking_start_date": "2017-12-10",
      "booking_end_date": "2017-12-15",
      "booking_cost_per_night": 100,
      "booking_length": 6,
      "booking_total_cost": 600,
      "booking_date": '2016-05-24'
    }
  ]
}
*/

const fs = require('fs');
const uuidv1 = require('uuid/v1');
const path = require('path');

let outputFile = path.join(__dirname, './bookings-json-data.json');

// es6 styled IIFE
console.time('create-listing');
{
  let wstream = fs.createWriteStream(outputFile);

  // make 1mm objects
  for (let i = 0; i < 1000000; i++) {

    let listing_uuid = uuidv1();

    let record_obj = {
      listing_uuid: listing_uuid,
      bookings: []
    };

    for (let j = 0; j < getRandomInt(1,10); j++) {
      let user_uuid = uuidv1();
      let booking_uuid = uuidv1();
      let PA_rating = getRandomInt( 0, 6 );
      let booking_start_date = formatDateToString( randomDate( new Date('1/1/17'), new Date() ) );
      let booking_length = getRandomInt( 1, 32 );
      let booking_end_date = formatDateToString( addDaysToDate( booking_start_date, booking_length ) );
      let booking_cost_per_night = getRandomInt( 20, 501 );
      let booking_total_cost = totalCost( booking_length, booking_cost_per_night );
      let booking_date = formatDateToString( randomDate( new Date('1/1/16'), new Date('12/31/17') ) );

      let booking_obj = {
        user_uuid: user_uuid,
        booking_uuid: booking_uuid,
        listing_uuid: listing_uuid,
        PA_rating: PA_rating,
        booking_start_date: booking_start_date,
        booking_end_date: booking_end_date,
        booking_cost_per_night: booking_cost_per_night,
        booking_length: booking_length,
        booking_total_cost: booking_total_cost,
        booking_date: booking_date
      };

      record_obj.bookings.push(booking_obj);
    }

    let string = JSON.stringify(record_obj) + '\n';
    wstream.write(string);
  }

  wstream.end(() => {
    console.log('Bookings data has been created!');
    console.timeEnd('create-listing');
  });
}

// get a random integer between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// calculate total cost of a booking (number of days * booking cost per night)
function totalCost(number_of_days, booking_cost_per_night) {
  return number_of_days * booking_cost_per_night;
}

// creates a random date between a date
// ex: randomDate( new Date('1/1/17'), new Date() )
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// takes a date and adds a specified amount of days to that date and returns the new date
// addDaysToDate( new Date('1/1/17'), 7 )
function addDaysToDate(date, days) {
  var newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + days));
}

// takes a date object and formats to a string in this form 'YYYY-MM-DD'
function formatDateToString(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;
}

// takes two dates and calculates the amount of days between them
function daysBetween(date1, date2) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}
