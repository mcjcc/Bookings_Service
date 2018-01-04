const pg = require('pg');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// bookings_db with a bookings table
// const sequelize = new Sequelize('bookings_db', 'johnnychen', '', {
//   host: 'localhost',
//   dialect: 'postgres',
//
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//
//   // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//   operatorsAliases: false
// });

// bookings db with a bookings table and calendar tables
const sequelize = new Sequelize('bookings_calendars_db', 'johnnychen', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// ================================================
// TODO: set up db if not exists
// ================================================



// ================================================
// set up db schema
// ================================================

const Booking = sequelize.define('booking', {
    // id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    booking_uuid: {type: Sequelize.UUID, unique: true, primaryKey: true},
    listing_uuid: Sequelize.UUID,  // belongs to a listing
    user_uuid: Sequelize.UUID,     // belongs to a user
    pa_rating: Sequelize.INTEGER,
    booking_start_date: Sequelize.DATEONLY,
    booking_end_date: Sequelize.DATEONLY,
    booking_length: Sequelize.INTEGER,
    booking_cost_per_night: Sequelize.INTEGER,
    booking_total_cost: Sequelize.INTEGER,
    booking_date: Sequelize.DATEONLY
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['listing_uuid', 'booking_end_date']
      }
    ]
  }
);


const create365DaysSchemaObj = function(leap) {
  let schemaObj = {
    listing_uuid: {type: Sequelize.UUID, unique: true, primaryKey: true},
  };
  let numDays = leap ? 366 : 365;
  for(let i = 1; i <= numDays; i++) {
    schemaObj[i] = {type: Sequelize.UUID, unique: true };
  }
  return schemaObj;
}

let regularCalendarSchemaObj = create365DaysSchemaObj(false);
let leapYearCalendarSchemaObj = create365DaysSchemaObj(true);

const Calendar_2018 = sequelize.define('calendar_2018',
  regularCalendarSchemaObj,
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['listing_uuid']
      }
    ]
  }
);

const Calendar_2019 = sequelize.define('calendar_2019',
  regularCalendarSchemaObj,
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['listing_uuid']
      }
    ]
  }
);

const Calendar_2020 = sequelize.define('calendar_2020',
  leapYearCalendarSchemaObj,
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['listing_uuid']
      }
    ]
  }
);

const Calendar_2021 = sequelize.define('calendar_2020',
  regularCalendarSchemaObj,
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['listing_uuid']
      }
    ]
  }
);



sequelize.sync();


module.exports.Booking = Booking;
module.exports.Op = Op;
