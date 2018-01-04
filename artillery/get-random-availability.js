'use strict';

module.exports = {
  getRandomListing
};

function getRandomListing(bookingContext, events, done) {
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

  // add variables to virtual bookingContext's context:
  bookingContext.vars.listing_uuid = listings[getRandomInt(0, 31)];

  return done();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
