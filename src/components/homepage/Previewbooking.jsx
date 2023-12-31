import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Previewbooking = ({
  setPopup,
  showPreview,
  setShowPreview,
  selectedCab,
  selectedSourceDestination,
  locationid,
  km,
  unitPrice,
  selectedDate,
  setIsPreviewActive
}) => {
  useEffect(() => {
    setIsPreviewActive(true); // Signal that Previewbooking is active
    return () => {
      setIsPreviewActive(false); // Reset when unmounting
    };
  }, [setIsPreviewActive]);
  const navigate = useNavigate();
  // Calculate total fare
  const totalFare = km * unitPrice;
  const userid = localStorage.getItem("user_id");
  console.log(userid, "useerid");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (selectedCab.status !== 1) {
        console.log(
          "Selected cab is not available. Cannot proceed with booking."
        );
        return; // Do not proceed with the API call
      }

      // Modify the URL as per your API endpoint
      const url = "http://localhost:8000/book";
      const dataToSubmit = {
        cabid: selectedCab.cid,
        driverid: selectedCab.driverid,
        locationid: locationid,
        userid: userid,
        selecteddate: selectedDate.toISOString(),

      };

      const response = await axios.post(url, dataToSubmit);
      console.log("Response:", response.data);
      if (response.status === 200) {
        toast.success("Cab booked Successfully wait for approval !!");
        setTimeout(() => {
          setShowPreview(false)
          setPopup(false)
        }, 2000);


      }
      // Handle success or any other logic here
    } catch (error) {
      toast.error("Please Select Location(Source and Destination)!");
      setTimeout(() => {
        setShowPreview(false)

      }, 1000);
      // Handle error here
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center mt-10">
        <div className="bg-gradient-to-tr from-[#2980B9] to-[#6DD5FA] h-fit border-2 border-primary p-8 w-[28rem]">
          <h1 className="font-bold text-primary text-center text-2xl mb-4">
            Booking Preview
          </h1>
          {selectedCab && (
            <div className="mb-4 ">
              {/* Display the selected cab information */}
              <div className="pb-4 ">
                <img
                  src={`http://localhost:8000/${selectedCab.cimage}`}
                  alt="imag"
                  className="mx-auto  border border-primary h-48 w-full rounded-md "
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-lg text">
                  <span className="font-semibold">Selected Cab</span>:{" "}
                  {selectedCab.name}
                </p>
                <p className="text-lg text">
                  <span className="font-semibold">Cab number</span>:{" "}
                  {selectedCab.cnumber}
                </p>
                <p className="text-lg text">
                  <span className="font-semibold">Cab Driver's Name</span>:{" "}
                  {selectedCab.dname}
                </p>

                <p className="text-lg font-semibold">
                  Status:{" "}
                  <span className="bg-green-500 rounded-lg px-2 text-white text-sm">{selectedCab.status === 1 ? "Available" : "Not Available"}</span>
                </p>
                <p className="text-lg font-semibold">Location: <span className="font-normal">{selectedSourceDestination}</span></p>
                <p className="text-lg font-bold">Km: {km} km</p>
                <p className="text-lg font-semibold">
                  Booked For:
                  <span className="font-normal">
                    {format(selectedDate, "MMMM d, yyyy h:mm aa")}
                  </span>
                </p>


                <p className="text-lg font-semibold">Total Fare: Rs. {totalFare}</p>
                {/* Add more fields as per your cab data */}
              </div>
            </div>
          )}

          {/* Formik form */}
          <Formik initialValues={{}} onSubmit={handleSubmit}>
            {() => (
              <Form className="">
                {/* Hidden fields for cabid, userid, locationid, and driverid */}
                <Field type="hidden" name="cabid" value={selectedCab.cid} />
                <Field type="hidden" name="driverid" value={selectedCab.driverid} />
                <Field type="hidden" name="locationid" value={locationid} />
                <Field type="hidden" name="userid" value={userid} />
                <Field type="hidden" name="selecteddate" value={selectedDate} />


                <div className="flex flex-col sm:flex-row justify-center">
                  <ToastContainer />
                  <button
                    type="button"
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0 sm:mr-2"
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
