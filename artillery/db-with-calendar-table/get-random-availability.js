'use strict';

module.exports = {
  getRandomListing
};

function getRandomListing(bookingContext, events, done) {
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

  // add variables to virtual bookingContext's context:
  bookingContext.vars.listing_uuid = listings[getRandomInt(0, 31)];

  return done();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
