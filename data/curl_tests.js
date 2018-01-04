// CURL testing

// create a booking:
curl -X POST -H "Content-type: application/json" -d '{"listing_uuid":"81ac21ef-ff94-45d6-82ce-dc3d37f9ccec","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","pa_rating":3,"booking_start_date":"2019-10-20","booking_end_date":"2019-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2018-10-01"}' http://localhost:3000/bookings/book/81ac21ef-ff94-45d6-82ce-dc3d37f9ccec

// get availability for a specific listing
curl -X GET http://localhost:3000/bookings/availability/9c1cccfb-80c4-557b-9a93-53529858acf5
curl -X GET http://localhost:3000/bookings/availability/ff0c379a-9a04-533b-997b-5ab8595410c2
curl -X GET http://localhost:3000/bookings/availability/77d987ff-e24b-5e42-b877-d4dba541430f
curl -X GET http://localhost:3000/bookings/availability/81ac21ef-ff94-45d6-82ce-dc3d37f9ccec

^ takes about 4 seconds to respond
