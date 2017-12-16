// helper function that checks if a time slot has already been booked
const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], keyspace: 'ks1' });
const client = new cassandra.Client({ contactPoints: ['127.0.0.1']});
client.connect()
  .then(function() {
    const query = "CREATE KEYSPACE IF NOT EXISTS bookings_db WITH replication =" +
                  "{ 'class' : 'SimpleStrategy', 'replication_factor': '3'}";
    return client.execute(query);
  })
  .then(function() {
    const query = "CREATE TYPE IF NOT EXISTS bookings_db.booking" +
                  "(user_uuid UUID, listing_uuid UUID, booking_uuid UUID, PA_rating int, booking_start_date text, booking_end_date text, booking_cost_per_night int, booking_length int, booking_total_cost int)";
    return client.execute(query);
  })
  .then(function() {
    const query = "CREATE TABLE IF NOT EXISTS bookings_db.bookings_table" +
                  "(listing_uuid UUID PRIMARY KEY, bookings list<FROZEN<booking>>)"

    return client.execute(query);
  })
  .then(function () {
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
    console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
    return client.execute('SELECT * FROM system.local');
  })
  .catch(function (err) {
    console.error('There was an error when connecting', err);
    return client.shutdown();
  });

/*

CREATE KEYSPACE IF NOT EXISTS bookings_db WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor': 3};

CREATE TYPE IF NOT EXISTS bookings_db.booking (
  user_uuid UUID,
  listing_uuid UUID,
  booking_uuid UUID,
  PA_rating int,
  booking_start_date text,
  booking_end_date text,
  booking_cost_per_night int,
  booking_length int,
  booking_total_cost int
);

CREATE TABLE IF NOT EXISTS bookings_db.bookings_table (
  listing_uuid UUID PRIMARY KEY,
  bookings list<FROZEN<booking>>
);

INSERT INTO bookings_db.bookings_table JSON '{
  "listing_uuid": "829aa84a-4bba-411f-a4fb-38167a987cda",
  "bookings": [
    {
      "user_uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "listing_uuid": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
      "booking_uuid": "fdda765f-fc57-5604-a269-52a7df8164ec",
      "PA_rating": "3",
      "booking_start_date": "2017-11-28",
      "booking_end_date": "2017-11-30",
      "booking_cost_per_night": 100,
      "booking_length": 3,
      "booking_total_cost": 300
    },
    {
      "user_uuid": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
      "listing_uuid": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
      "booking_uuid": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
      "PA_rating": "3",
      "booking_start_date": "2017-12-10",
      "booking_end_date": "2017-12-15",
      "booking_cost_per_night": 100,
      "booking_length": 6,
      "booking_total_cost": 600
    }
  ]
}';

----------------------------------------------------

CREATE TABLE bookings_db.bookings (
  id UUID
  user_uuid UUID
  listing_uuid UUID
  booking_uuid UUID
  PA_rating int
  booking_start_date text
  booking_end_date text
  booking_cost_per_night int
  booking_length int
  booking_total_cost int
  PRIMARY KEY(id, listing_uuid, user_uuid)
);

// store data next


--
*/
