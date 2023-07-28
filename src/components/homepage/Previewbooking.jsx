import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const Previewbooking = ({
  showPreview,
  setShowPreview,
  selectedCab,
  selectedSourceDestination,
  km,
  unitPrice,
  locationid,
}) => {
  // Calculate total fare
  const totalFare = km * unitPrice;
  const userid = localStorage.getItem("user_id");
  console.log(userid, "useerid");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (selectedCab.status !== 1) {
        console.log("Selected cab is not available. Cannot proceed with booking.");
        return; // Do not proceed with the API call
      }

      // Modify the URL as per your API endpoint
      const url = "http://localhost:8000/book";
      const dataToSubmit = {
        cabid: selectedCab.cid,
        userid: userid,
        locationid: locationid,
        driverid: selectedCab.driverid,
      };

      const response = await axios.post(url, dataToSubmit);
      console.log("Response:", response.data);
      // Handle success or any other logic here
    } catch (error) {
      // Handle error here
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-200 h-fit border-2 border-primary p-8 w-full max-w-md">
          <h1 className="font-bold text-primary text-2xl mb-4">
            Preview Your Booking
          </h1>
          {selectedCab && (
            <div className="mb-4">
              {/* Display the selected cab information */}
              <div className="">
                <img
                  src={`http://localhost:8000/${selectedCab.image}`}
                  alt="imag"
                  className="mx-auto p-3 border border-primary h-36 w-36"
                />
              </div>
              <p className="text-lg">Selected Cab: {selectedCab.name}</p>
              <p className="text-lg">Selected Cabid: {selectedCab.cid}</p>
              <p className="text-lg">Driver Name: {selectedCab.dname}</p>
              <p className="text-lg">Driver id: {selectedCab.driverid}</p>
              <p className="text-lg">
                Status:{" "}
                {selectedCab.status === 1 ? "Available" : "Not Available"}
              </p>
              <p className="text-lg">Location: {selectedSourceDestination}</p>
              <p className="text-lg">locationid: {locationid}</p>
              <p className="text-lg">Km: {km} km</p>
              <p className="text-lg">Total Fare: Rs. {totalFare}</p>
              {/* Add more fields as per your cab data */}
            </div>
          )}

          {/* Formik form */}
          <Formik initialValues={{}} onSubmit={handleSubmit}>
            {() => (
              <Form>
                {/* Hidden fields for cabid, userid, locationid, and driverid */}
                <Field type="hidden" name="cabid" value={selectedCab.cid} />
                <Field type="hidden" name="userid" value={userid} />
                <Field type="hidden" name="locationid" value={locationid} />
                <Field type="hidden" name="driverid" value={selectedCab.driverid} />

                {/* You can add additional fields here for user input */}
                {/* For example: */}
                {/* <div>
                  <label htmlFor="name">Name:</label>
                  <Field type="text" name="name" />
                </div> */}

                <div className="flex flex-col sm:flex-row justify-center">
                  <button
                    type="button"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0 sm:mr-2"
                    onClick={() => setShowPreview(false)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Previewbooking;
