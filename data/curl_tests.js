// CURL testing

// create a booking:
curl -X POST -H "Content-type: application/json" -d '{"listing_uuid":"b13a526d-169e-5cc8-b92d-0fd0bf7dbf4d","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","pa_rating":3,"booking_start_date":"2019-10-20","booking_end_date":"2019-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2018-10-01"}' http://localhost:3000/bookings/book_with_calendar_table/b13a526d-169e-5cc8-b92d-0fd0bf7dbf4d



curl -X POST -H "Content-type: application/json" -d '{"listing_uuid":"81ac21ef-ff94-45d6-82ce-dc3d37f9ccec","user_uuid":"24f5aa40-4409-4e88-aaf6-91f42d7f5224","pa_rating":3,"booking_start_date":"2019-10-20","booking_end_date":"2019-10-30","booking_cost_per_night":50,"booking_length":10,"booking_total_cost":500,"booking_date":"2018-10-01"}' http://localhost:3000/bookings/book/81ac21ef-ff94-45d6-82ce-dc3d37f9ccec



// get availability for a specific listing
curl -X GET http://localhost:3000/bookings/availability/75e055ec-a23b-50e6-9e76-50aad45fdda3
curl -X GET http://localhost:3000/bookings/availability/93058eef-0338-5ea5-8373-dcb1fc616f52
curl -X GET http://localhost:3000/bookings/availability/03213088-85bc-52be-b0ec-5087de69d211
curl -X GET http://localhost:3000/bookings/availability/44f3e02f-03d0-588b-920b-95ef3e6273a6


curl -X GET http://localhost:3000/bookings/get_availability_with_calendar_table/75e055ec-a23b-50e6-9e76-50aad45fdda3
curl -X GET http://localhost:3000/bookings/get_availability_with_calendar_table/93058eef-0338-5ea5-8373-dcb1fc616f52
curl -X GET http://localhost:3000/bookings/get_availability_with_calendar_table/03213088-85bc-52be-b0ec-5087de69d211
curl -X GET http://localhost:3000/bookings/get_availability_with_calendar_table/44f3e02f-03d0-588b-920b-95ef3e6273a6





curl -X GET http://localhost:3000/bookings/get_availability_with_calendar_table/b13a526d-169e-5cc8-b92d-0fd0bf7dbf4d
