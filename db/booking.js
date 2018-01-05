// bookings helper functions
const db = require('.');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

// id,booking_uuid,listing_uuid,user_uuid,PA_rating,booking_start_date,booking_end_date,booking_length,booking_cost_per_night,booking_total_cost,booking_date

const get_availability = (listing_uuid) => {
  // inputs are a listing_uuid and a month in integer format

  // turns today's date into a string with a form of 'YYYY-MM-DD'
  var todays_date = _formatDateToString(new Date());

  return db.Booking.findAll({
    attributes: ['booking_start_date', 'booking_end_date', 'booking_length'],
    where: {
      listing_uuid: listing_uuid,
      booking_end_date: {
        [db.Op.gte]: todays_date
      }
    }
  })
  .then((results) => {
    let availability_obj = _createAvailabilityObject(listing_uuid);
    // construct an array of booked dates

    results.forEach((result) => {
      // find the start date of the booking and then loop through teh booking length and switch the values in the corresponding availability_obj to false

      let booking_start_date = result.booking_start_date;
      let booking_length = result.booking_length;

      for (let i = 0; i < booking_length; i++) {
        let date_key = moment(booking_start_date).add(i, 'days').format('YYYY-MM-DD');
        availability_obj['availability_dates'][date_key] = false;
      }

    });
    return availability_obj;
  })
  .catch((e) => {
    console.log(e); // "oh, no!"
  });

}


const get_availability_with_calendar_table = (listing_uuid) => {
  // inputs are a listing_uuid and a month in integer format

  // turns today's date into a string with a form of 'YYYY-MM-DD'
  let todays_date = _formatDateToString(new Date());
  let current_year = moment(todays_date).format('YYYY');
  // search calendar  table for listing
  // output days that are available
  // convert the number days to dates
  // return ann array of those dates

  // TODO: add way to search other calendar years
  return db.Calendar_2018.findAll({
    where: {
      listing_uuid: listing_uuid,
    }
  })
  .then((results) => {
    return results;
  })
  .catch((e) => {
    console.log(e);
  });
}

const create_booking = (listing_uuid, obj) => {
  let booking_uuid = uuidv4();
  return db.Booking.create({
    booking_uuid: booking_uuid,
    listing_uuid: listing_uuid,
    user_uuid: obj.user_uuid,
    pa_rating: obj.pa_rating,
    booking_start_date: _formatDateToString(obj.booking_start_date),
    booking_end_date: _formatDateToString(obj.booking_end_date),
    booking_cost_per_night: obj.booking_cost_per_night,
    booking_length: obj.booking_length,
    booking_total_cost: obj.booking_total_cost,
    booking_date : _formatDateToString(obj.booking_date)
  })
  .then(() => {
    return console.log('a booking was created!');
  })
  .catch((e) => {
    console.log(e); // "oh, no!"
  });
}

const create_booking_with_calendar_table = (listing_uuid, obj) => {
  let booking_uuid = uuidv4();
  let booking_start_date = _formatDateToString(obj.booking_start_date);
  let booking_start_year = moment(booking_start_date).format('YYYY');
  let first_day_of_start_year = _getFirstDayOfYear(booking_start_year);
  let booking_length = obj.booking_length;

  let calendar_table = `Calendar_${booking_start_year}`;

  let calendar_table_obj = {
    listing_uuid: listing_uuid
  };

  let start_day_integer = _daysBetween(new Date(first_day_of_start_year), new Date(booking_start_date)) + 1;

  console.log('start day int', start_day_integer);
  console.log('booking length', booking_length);
  for (let i = start_day_integer; i < start_day_integer + booking_length; i++) {
    calendar_table_obj[i] = booking_uuid;
  }

  console.log('calendar table obj', calendar_table_obj);
  return Promise.all([
    db.Booking.create({
      booking_uuid: booking_uuid,
      listing_uuid: listing_uuid,
      user_uuid: obj.user_uuid,
      pa_rating: obj.pa_rating,
      booking_start_date: _formatDateToString(obj.booking_start_date),
      booking_end_date: _formatDateToString(obj.booking_end_date),
      booking_cost_per_night: obj.booking_cost_per_night,
      booking_length: obj.booking_length,
      booking_total_cost: obj.booking_total_cost,
      booking_date : _formatDateToString(obj.booking_date)
    }),
    db[`${calendar_table}`].upsert(calendar_table_obj)
  ])
  .then(() => {
    return console.log('a booking was created!');
  })
  .catch((e) => {
    console.log(e); // "oh, no!"
  });
}

function _daysBetween(date1, date2) {
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

function _formatDateToString(date) {
  let formatted_date = moment(date).format('YYYY-MM-DD');
  return formatted_date;
}

function _getFirstDayOfYear(year) {
  let first_day_of_year = moment(`${year}-01-01`).format('YYYY-MM-DD');
  return first_day_of_year;
}

function _createAvailabilityObject(listing_uuid) {
  // creates an object with current date up to 730 days as keys with values that default to true
  let availability_obj = {listing_uuid: listing_uuid, availability_dates:{}};
  let first_date = moment().format('YYYY-MM-DD');
  let days_in_year = 365;

  for (let i = 0; i < days_in_year * 2; i++) {
    let date_key = moment(first_date).add(i, 'days').format('YYYY-MM-DD');
    availability_obj['availability_dates'][date_key] = true;
  }
  return availability_obj;
}

module.exports.create_booking = create_booking;
module.exports.get_availability = get_availability;
module.exports.create_booking_with_calendar_table = create_booking_with_calendar_table;
module.exports.get_availability_with_calendar_table = get_availability_with_calendar_table;
