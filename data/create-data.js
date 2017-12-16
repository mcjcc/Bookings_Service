// This file when run will generate objects that I should

const fs = require('fs');

var outputFile = './bookings-data.json';

// es6 styled IIFE
console.time('create-listing');
{
  let wstream = fs.createWriteStream(outputFile);

  // make 1mm objects
  for (let i = 0; i < 1000000; i++) {

    let user_uuid = getRandomInt( 1, 10000 );
    let listing_uuid = getRandomInt( 1, 10000 );
    let booking_uuid = getRandomInt( 1, 10000 );

    let PA_rating = getRandomInt( 0, 6 );
    let booking_start_date = formatDateToString( randomDate( new Date('1/1/17'), new Date() ) );
    let booking_length = getRandomInt( 1, 32 );
    let booking_end_date = formatDateToString( addDaysToDate( booking_start_date, booking_length ) );
    let booking_cost_per_night = getRandomInt( 20, 501 );
    let booking_total_cost = totalCost( booking_length, booking_cost_per_night );

    // let number_of_days = daysBetween(booking_start_date, booking_end_date);


    let obj = {
      user_uuid: user_uuid,
      listing_uuid: listing_uuid,
      booking_uuid: booking_uuid,
      PA_rating: PA_rating,
      booking_start_date: booking_start_date,
      booking_end_date: booking_end_date,
      booking_cost_per_night: booking_cost_per_night,
      booking_length: booking_length,
      booking_total_cost: booking_total_cost
    };

    let string = JSON.stringify(obj) + '\n';
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
