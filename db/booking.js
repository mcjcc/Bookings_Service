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


function _formatDateToString(date) {
  let formatted_date = moment(date).format('YYYY-MM-DD');
  return formatted_date;
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


/*


sample create_booking payload:

app.post('/bookings/book/:listing_uuid', (req, res) => {

let booking_payload = {
  listing_uuid: '81ac21ef-ff94-45d6-82ce-dc3d37f9ccec',
  user_uuid: '24f5aa40-4409-4e88-aaf6-91f42d7f5224',
  PA_rating: 3,
  booking_start_date: '2017-10-20',
  booking_end_date: '2017-10-30',
  booking_cost_per_night: 50,
  booking_length: 10,
  booking_total_cost: 500,
  booking_date : '2017-10-01'
}

JSON stringified
'{"listing_uuid":"81ac21ef-ff94-45d6-82ce-dc3d37f9ccec","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","PA_rating":3,"booking_start_date":"2017-10-20","booking_end_date":"2017-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2017-10-01"}'

curl -X POST -H "Content-type: application/json" -d '{"listing_uuid":"81ac21ef-ff94-45d6-82ce-dc3d37f9ccec","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","PA_rating":3,"booking_start_date":"2017-10-20","booking_end_date":"2017-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2017-10-01"}' http://localhost:3000/bookings/book/81ac21ef-ff94-45d6-82ce-dc3d37f9ccec


*/
