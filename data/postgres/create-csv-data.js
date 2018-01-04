/*
This file when run will generate booking records

booking_uuid,listing_uuid,user_uuid,pa_rating,booking_start_date,booking_end_date,booking_length,booking_cost_per_night,booking_total_cost,booking_date

COPY bookings (booking_uuid,listing_uuid,user_uuid,pa_rating,booking_start_date,booking_end_date,booking_length,booking_cost_per_night,booking_total_cost,booking_date) FROM '/Users/johnnychen/Projects/HR/hrsf84-thesis/data/postgres/bookings-postgres-csv-data.csv' DELIMITER ',' CSV;

// to generate fake data
node --max_old_space_size=50000 ./create-csv-data.js
*/



const fs = require('fs');
const Chance = require('chance');
const path = require('path');
const moment = require('moment');

let chance = new Chance();

let outputFile = path.join(__dirname, './bookings-postgres-csv-data.csv');

// es6 styled IIFE
console.time('create-listing');
{
  let wstream = fs.createWriteStream(outputFile);

  // generate 1 mil listings_uuid
  let listings_amount = 1000000;
  let listings_array = [];
  for (let i = 0; i < listings_amount; i++) {
    if (i % 100000 === 0) {
		  // console log every 100k to show progress
      console.log('Another 100k listings generated! ', i);
    }
    // [listing_uuid, pa_rating]
    listings_array.push([chance.guid(), getRandomInt(0, 6)]);
  }

  // generate 1mil user_uuids
  let users_amount = 1000000;
  let users_array = [];
  for (let i = 0; i < users_amount; i++) {
    if (i % 100000 === 0) {
		  // console log every 100k to show progress
      console.log('Another 100k users generated! ', i);
    }
      users_array.push(chance.guid());
  }


  let number_of_bookings_per_listing = 10;
  // lets generate 10 booking records per listing to make 10 million records
  for (let i = 0; i < listings_array.length; i++) {

    if (i % 100000 === 0) {
      console.log('Amount of bookings record generated! ', i * number_of_bookings_per_listing);
    }

    for (let j = 0; j < number_of_bookings_per_listing; j++) {
      let record_str = '';

      let listing = listings_array[i];

      let booking_uuid = chance.guid();
      let listing_uuid = listing[0];
      let user_uuid = users_array[getRandomInt(0, users_amount)];
      let PA_rating = listing[1];
      let booking_start_date = formatDateToString( new Date(`${j+1}/1/2018`) );
      let booking_length = getRandomInt( 3, 20 );
      let booking_end_date = formatDateToString( addDaysToDate( booking_start_date, booking_length ) );
      let booking_cost_per_night = getRandomInt( 20, 501 );
      let booking_total_cost = totalCost( booking_length, booking_cost_per_night );
      let booking_date = formatDateToString( subtractDaysToDate( booking_start_date, booking_length ) );

      record_str = `${booking_uuid},${listing_uuid},${user_uuid},${PA_rating},'${booking_start_date}','${booking_end_date}',${booking_length},${booking_cost_per_night},${booking_total_cost},'${booking_date}'\r\n`;
      wstream.write(record_str);
    }

  } // for listings_array loop

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

// takes a date and subracts a specified amount of days to that date and returns the new date
// subractDaysToDate( new Date('1/1/17'), 7 )
function subtractDaysToDate(date, days) {
  var newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() - days));
}

// takes a date object and formats to a string in this form 'YYYY-MM-DD'
function formatDateToString(date) {
  let formatted_date = moment(date).format('YYYY-MM-DD');
  return formatted_date;
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
