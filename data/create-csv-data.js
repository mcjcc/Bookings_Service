/*
This file when run will generate booking records


cqsl:$ copy bookings_db.bookings_table (listing_uuid, bookings) to 'text.csv';   =>

999aa84a-4bba-411f-a4fb-38167a987cda,"[{user_uuid: 9994fb90-12c4-11e1-840d-7b25c5ee775a, listing_uuid: 999ec58a-a0f2-4ac4-8393-c866d813b8d1, booking_uuid: 999a765f-fc57-5604-a269-52a7df8164ec, pa_rating: 5, booking_start_date: '2017-11-28', booking_end_date: '2017-11-30', booking_cost_per_night: 100, booking_length: 3, booking_total_cost: 300, booking_date: '2017-10-02'}, {user_uuid: 7774fb90-12c4-11e1-840d-7b25c5ee775a, listing_uuid: 999ec58a-a0f2-4ac4-8393-c866d813b8d1, booking_uuid: 777cee75-cecc-5b56-8031-b6641c1ed1f1, pa_rating: 5, booking_start_date: '2017-12-10', booking_end_date: '2017-12-15', booking_cost_per_night: 100, booking_length: 6, booking_total_cost: 600, booking_date: '2017-10-04'}]"

*/

const fs = require('fs');
const uuidv1 = require('uuid/v1');

var outputFile = './bookings-csv-data.csv';

// es6 styled IIFE
console.time('create-listing');
{
  let wstream = fs.createWriteStream(outputFile);

  // make 1mm objects
  let records_amount = 1000000;
  for (let i = 0; i < records_amount; i++) {
    let listing_uuid = uuidv1();

    let record_str = '';
    let bookings_arr_str = '"[';

    let random_number_of_bookings = getRandomInt(2,10);
    for (let j = 0; j <= random_number_of_bookings; j++) {
      let user_uuid = uuidv1();
      let booking_uuid = uuidv1();
      let pa_rating = getRandomInt( 0, 6 );
      let booking_start_date = formatDateToString( randomDate( new Date('1/1/17'), new Date() ) );
      let booking_length = getRandomInt( 1, 32 );
      let booking_end_date = formatDateToString( addDaysToDate( booking_start_date, booking_length ) );
      let booking_cost_per_night = getRandomInt( 20, 501 );
      let booking_total_cost = totalCost( booking_length, booking_cost_per_night );
      let booking_date = formatDateToString( randomDate( new Date('1/1/16'), new Date('12/31/17') ) );

      if (j !== random_number_of_bookings) {
        bookings_arr_str += `{user_uuid: ${user_uuid}, listing_uuid: ${listing_uuid}, booking_uuid: ${booking_uuid}, pa_rating: ${pa_rating}, booking_start_date: '${booking_start_date}', booking_end_date: '${booking_end_date}', booking_cost_per_night: ${booking_cost_per_night}, booking_length: ${booking_length}, booking_total_cost: ${booking_total_cost}, booking_date: '${booking_date}'},`;
      } else {
        bookings_arr_str += `{user_uuid: ${user_uuid}, listing_uuid: ${listing_uuid}, booking_uuid: ${booking_uuid}, pa_rating: ${pa_rating}, booking_start_date: '${booking_start_date}', booking_end_date: '${booking_end_date}', booking_cost_per_night: ${booking_cost_per_night}, booking_length: ${booking_length}, booking_total_cost: ${booking_total_cost}, booking_date: '${booking_date}'}`;
      }
    }
    bookings_arr_str += ']"';

    record_str = `${listing_uuid},${bookings_arr_str}\r\n`;
    wstream.write(record_str);
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
