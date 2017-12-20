// bookings helper functions
const db = require('.');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

// id,booking_uuid,listing_uuid,user_uuid,PA_rating,booking_start_date,booking_end_date,booking_length,booking_cost_per_night,booking_total_cost,booking_date

const create_booking = function(listing_uuid, obj) {
  let booking_uuid = uuidv4();
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

module.exports.create_booking = create_booking;


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
