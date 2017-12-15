const fs = require('fs');

var outputFile = './bookings-data.json';

// es6 styled IIFE
console.time('create-listing');
{
  let wstream = fs.createWriteStream(outputFile);

  // make 1mm objects
  for (let i = 0; i < 1000000; i++) {

    let user_id = getRandomInt( 1,10000 );
    let PA_rating = getRandomInt( 0, 6 );
    let booking_start_date = formatDateToString( randomDate( new Date('1/1/17'), new Date() ) );
    let number_of_days = getRandomInt( 1, 32 );
    let booking_end_date = formatDateToString( addDaysToDate( booking_start_date, number_of_days ) );
    // let number_of_days = daysBetween(booking_start_date, booking_end_date);
    let booking_cost_per_night = getRandomInt( 20, 501 );
    let total_cost = totalCost( number_of_days, booking_cost_per_night );

    let obj = {
      user_id: user_id,
      PA_rating: PA_rating,
      booking_start_date: booking_start_date,
      booking_end_date: booking_end_date,
      number_of_days: number_of_days,
      booking_cost_per_night: booking_cost_per_night,
      total_cost: total_cost
    }

    let string = JSON.stringify(obj) + '\n';
    wstream.write(string);
  }

  wstream.end(() => {
    console.log('Bookings data has been created!');
    console.timeEnd('create-listing');
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function totalCost(number_of_days, booking_cost_per_night) {
  return number_of_days * booking_cost_per_night;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function addDaysToDate(date, days) {
  var newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + days));
}

function formatDateToString(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;
}

// var daysBetween = function( date1, date2 ) {
//   //Get 1 day in milliseconds
//   var one_day=1000*60*60*24;
//
//   // Convert both dates to milliseconds
//   var date1_ms = date1.getTime();
//   var date2_ms = date2.getTime();
//
//   // Calculate the difference in milliseconds
//   var difference_ms = date2_ms - date1_ms;
//
//   // Convert back to days and return
//   return Math.round(difference_ms/one_day);
// }



/*
{
  listing_uuid: Integer,
  booking_uuid: Integer,
  user_id: Integer,
  PA_rating: Integer,
  booking_start_date: YYYY-MM-DD HH:MM:SS,
  booking_end_date: YYYY-MM-DD HH:MM:SS,
  number_of_days: Integer,
  booking_cost_per_night: Integer,
  total_cost: Integer
  created_at: TimeStamp
}
*/
