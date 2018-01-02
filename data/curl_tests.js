// CURL testing

// create a booking:
curl -X POST -H "Content-type: application/json" -d '{"listing_uuid":"81ac21ef-ff94-45d6-82ce-dc3d37f9ccec","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","pa_rating":3,"booking_start_date":"2019-10-20","booking_end_date":"2019-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2018-10-01"}' http://localhost:3000/bookings/book/81ac21ef-ff94-45d6-82ce-dc3d37f9ccec

// get availability for a specific listing
curl -X GET http://localhost:3000/bookings/availability/9c1cccfb-80c4-557b-9a93-53529858acf5
