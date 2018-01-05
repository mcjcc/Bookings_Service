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
                  '85fc3a0f-deaa-531f-914b-1817612209ea',
                  '444d2bb2-17dd-50a9-a6c9-f46d00c0df1a',
                  '6aa23c06-7a65-57a2-9944-ae08e047f5d5',
                  'bfe89200-f44d-5f7e-84ba-a09162fe2b24',
                  '07402362-b5b9-5536-8dc4-2f686bef416d',
                  'b46d5683-7af7-5acf-8287-56d36b88ddc6',
                  '9e1356d8-a2cf-5cb9-8739-4c3aef2b3c3d',
                  '4d9f30da-ea25-5559-95e7-050a65aef012',
                  '6e191863-5db6-589f-9a06-9827eb506749',
                  'a19dc299-c1a4-5591-9892-554597a451cd',
                  'd439be34-dac0-5df3-8088-e6ab2bf92fb8',
                  'd04a391f-06c5-5af6-99cd-2ae1418d1c36',
                  '5d50bbf1-7cfb-54e5-888b-bebbf78caf01',
                  '8a1fb2eb-3ba5-5bbe-adfa-40acbd0f60b3',
                  '97701200-e757-52e7-96ea-233167ace5b5',
                  '54e54108-6cc7-516f-b9f0-039c9f4e0492',
                  'e8146bf8-1b3f-5f72-9cc0-14dac14a0aff',
                  'cf1bfe60-0cda-526e-9808-66ab00e4ebb7',
                  'f4193070-7e70-5e75-b015-a1f49402921c',
                  '1f0a72bb-b12a-56bd-8c19-6d8af26a9877',
                  'c2a6a9d4-4849-5b87-bd90-6cc96e29009d',
                  '6ccbf618-44a8-5bdd-b349-d68197441d95',
                  '0e0594b7-3666-5b82-a957-60cb6cf1e95d',
                  'ae3a0b55-6237-5e87-8b96-d3b7dfdd84e4',
                  '9223786a-a428-5b88-a352-255dcc047f71',
                  'bf7aec4d-6f1f-552a-a50f-352ef9ba4e07',
                  'b0e6d402-0cd4-5372-9ef4-afb1ff18f617',
                  '49b7b8d6-c9dc-5486-8542-358f9b967f7d',
                  '66b8c26f-268b-5922-8357-c5c18c7557d9',
                  '5db174e3-44de-58b8-b4f2-d0aa8e4a88d0',
                  'ec85e561-a2b8-55a3-a672-c834549a60a7'
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
