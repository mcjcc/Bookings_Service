'use strict';

module.exports = {
  generateRandomBookings
};

const moment = require('moment');

function generateRandomBookings(bookingContext, events, done) {

  const listing_uuid = getRandomListing();
  const user_uuid = getRandomUser();
  const pa_rating = getRandomInt(0,6);
  const booking_start_date = formatDateToString( randomDate(new Date('1/1/2019'), new Date('12/31/2021') ) );
  const booking_length = getRandomInt(2,9);
  const booking_end_date = formatDateToString( addDaysToDate(booking_start_date, booking_length) );
  const booking_cost_per_night = getRandomInt(0,500);
  const booking_total_cost = booking_length * booking_cost_per_night;
  const booking_date = formatDateToString( subtractDaysToDate(booking_start_date, 7) );


  // add variables to virtual bookingContext's context:
  bookingContext.vars.listing_uuid = listing_uuid;
  bookingContext.vars.user_uuid = user_uuid;
  bookingContext.vars.pa_rating = pa_rating;
  bookingContext.vars.booking_start_date = booking_start_date;
  bookingContext.vars.booking_end_date = booking_end_date;
  bookingContext.vars.booking_cost_per_night = booking_cost_per_night;
  bookingContext.vars.booking_length = booking_length;
  bookingContext.vars.booking_total_cost = booking_total_cost;
  bookingContext.vars.booking_date = booking_date;
  // continue with executing the scenario:
  return done();
}

function getRandomListing() {
  let listings = [
                  '4d85a6cb-856c-53fb-a53b-33d0d679f094',
                  '133f1720-3f67-5acc-816a-42d477eac7a9',
                  '24ffa9c1-d400-5bcb-a0d7-29212d180578',
                  '2e1e1f1b-8686-55e6-b1ba-b806da69481d',
                  '694bd068-19d2-5806-8003-570054904072',
                  '9263f275-a7bd-50cc-8c78-e1440d51c535',
                  '12e3c96b-83e3-5f95-88ec-1661fb56b564',
                  'bc3b5e2d-70c2-5da2-bc8e-3dbab470eaa3',
                  'ef3e72ef-3508-5fff-82af-7f15eb0fc387',
                  '9c1cccfb-80c4-557b-9a93-53529858acf5',
                  'e03b248f-e53e-5bce-8c66-f1149e82c10c',
                  '54f06ae8-dbf8-5965-a272-4d3a9cd09f2f',
                  '69653eb5-7e53-5bd3-83ba-0dcae5e1beed',
                  '812ba37c-7c7c-5732-b180-a1ec4d543b13',
                  '9c236264-e26c-5145-92df-b2d65f5dc693',
                  '540ec5b5-290c-5fbb-a3ec-f0ad88a7bba5',
                  '2f63ae6a-70d7-5d8e-8a01-5c0d2c7796eb',
                  'd2645356-f5ba-5a9a-aa86-0a7b75fb130f',
                  '0b87bb9d-65e3-5db0-b5ce-4cb70df27db5',
                  '6f8e6ea3-6a0f-55d8-9166-9ce49c7bb125',
                  'a3be0cab-6e86-5b4a-8601-924625200836',
                  'b1f06f64-5ec2-527e-9b3d-3b7d73dd7221',
                  'b6564718-b94e-5ca5-926d-36e0bf1730f1',
                  '74f2663d-bfb2-5978-866c-30201bf21eef',
                  'f8160c02-d96c-5c2e-a71a-2bc905a9034c',
                  '8534f719-0e9a-5800-bd16-5a0c470e98e1',
                  '00d9d26b-5313-545c-8d8a-ad1745a9529e',
                  'e4570bc9-3de7-529e-b138-40596f3dfc58',
                  '6814b540-9720-52f1-bbdd-c9b1079fd03e',
                  '4b936d3f-ae8b-596d-b0ef-662c4c7276c5',
                  'c213c829-8d8e-57c3-9722-aa8278e02b55'
                 ];
  return listings[getRandomInt(0, 31)];
}

function getRandomUser() {
  let users = [
                  'b8383aef-327a-5096-85e4-2750179969cd',
                  'c19e3864-4df9-50f8-a400-f0f7819505a2',
                  '09da33f4-55ba-52a5-9e3e-be05e08d9cbe',
                  '4535cc46-8343-5a0c-9486-1c382e261163',
                  '6ddc06d5-2c3e-585a-a6a1-b93c405571dd',
                  'b61e35eb-450a-5079-a5ef-9e7d91bb81f9',
                  '7e5b9e62-ef70-51ae-8beb-65493268fb08',
                  'b3c6775f-b0bf-5939-9107-5cc334124d02',
                  'eb9092bf-685d-5ae5-b6df-a55b1c0322a3',
                  '448e445e-c992-5700-9c14-a0fae8378af4',
                  'fbdfc2be-83fe-56c7-b802-95d24b4564d8',
                  'cfb9ce8d-f188-56ca-b18b-78631a7f7859',
                  '2cda6a5b-116d-5587-b802-22cc912696f5',
                  '9bd5aeeb-05da-5e90-a16a-1899af3c8605',
                  '30df587e-c0fc-533d-8fb9-abcc837d95c1',
                  '47b41f20-7add-51d1-a506-6b0a0ab6b44e',
                  '44a1a772-f9db-575a-86ce-cae8b80034ff',
                  'a18542f4-4f8d-5e29-a670-53972ef8c1ba',
                  '7b139920-4464-504b-abf8-bcc90e64679f',
                  'ab1e6864-89be-5f5f-9ac7-176ab3741971',
                  '22f77f2a-a20f-5c9a-8a1e-94da222b1326',
                  '2fdba0a8-5629-5c40-8628-f68c061ebd2e',
                  'ea24fc36-d899-5752-a180-15a1ad3b0465',
                  '4ced091a-b29f-57ba-b1e2-f85b2988fc68',
                  '7b763f84-85b7-5784-9df4-511f704c4905',
                  '36f6916b-5676-5246-9b36-498d22f69c47',
                  '0d495def-4c22-51e9-8345-543f9b61521a',
                  '9abc4e51-21eb-535a-916d-9a2c70ad1a54',
                  'a47c05d1-4cb9-59fd-9a6f-358838720fef',
                  '99c6fee5-b791-508a-b4e5-51909bd21afc',
                  '8580f1ef-4f42-50e5-9ebb-e7012d89a0b6'
                 ];
  return users[getRandomInt(0, 31)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// takes a date object and formats to a string in this form 'YYYY-MM-DD'
function formatDateToString(date) {
  let formatted_date = moment(date).format('YYYY-MM-DD');
  return formatted_date;
}

// creates a random date between a date
// ex: randomDate( new Date('1/1/17'), new Date() )
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// formatDateToString( randomDate(new Date('1/1/2019'), new Date('12/31/2021') ) );

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
