import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Previewbooking from "./Previewbooking";

const BookCab = ({ popup, setPopup, selectedCab }) => {
  const [locationData, setlocationData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSourceDestination, setSelectedSourceDestination] = useState("");
  const [km, setKm] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [unitPrice, setUnitPrice] = useState(50);
  const [locationid, setLocationId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize date with current date
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const handleNextButtonClick = () => {
    setShowPreview(true);
  };

  const handleClick = () => {
    setPopup(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    // Make the Axios POST request
    // axios.post("http://localhost:8000/book", { ...values, km })
    //   .then((response) => {
    //     // Handle successful response
    //     console.log(response.data);
    //     resetForm();
    //     // setPopup(false);
    //     console.log(handleSubmit);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error(error);
    //   });
  };

  const Data = [
    {
      label: "source_destination:",
      name: "source_destination",
      as: "select",
      options: "choose source and destination",
      locationData: [],
    },
    // {
    //   label: "price per KM:",
    //   name: "unitprice",
    //   type: "text",
    //   value: `Rs. ${unitPrice}`,
    //   readOnly: true,
    // },
    {
      label: "Total KM:",
      name: "km",
      type: "text",
      value: totalKm,
      readOnly: true,
    },
  ];
  const handleDateChange = (date) => {
    const currentTime = new Date();
    if (date >= currentTime) {
      setSelectedDate(date);
    }
  };
  const getLocationData = useCallback(() => {
    try {
      axios.get("http://localhost:8000/location").then((res) => {
        console.log(res.data);
        setlocationData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getLocationData();
  }, [getLocationData]);

  const handleSourceDestinationChange = (e) => {
    const selectedLocation = locationData.find(
      (location) => location.source_destination === e.target.value
    );
    if (selectedLocation) {
      setSelectedSourceDestination(selectedLocation.source_destination);
      setKm(selectedLocation.km);
      setTotalKm(selectedLocation.km);
      setLocationId(selectedLocation.lid);
    }
  };

  const locationDataa = [
    {
      lid: "0",
      value: "choose source and destination",
      readOnly: true,
    },
  ];

  Data[0].locationData.push(...locationDataa, ...locationData);

  return (
    <div className="relative">
      {showPreview && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-80`}
        >
          <Previewbooking
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            selectedCab={selectedCab}
            selectedSourceDestination={selectedSourceDestination}
            km={km}
            totalKm={totalKm}
            unitPrice={unitPrice}
            locationid={locationid}
            setPopup={setPopup}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setIsPreviewActive={setIsPreviewActive}
          />
        </div>
      )}
      <div className="border border-none rounded-md py-2 px-2 bg-slate-2 w-96 h-fit block  z-10   bg-slate-300">
        <h2 className="py-4 px-4 font-bold text-2xl text-center border-b-2 border-primary">
          Book Cab
        </h2>
        <div>
          <Formik
            initialValues={{
              source_destination: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="py-4 px-4">
                    {Data.map((val, i) => {
                      if (val.as === "select") {
                        return (
                          <div key={i}>
                            <div className="py-2">
                              <label
                                htmlFor={val.name}
                                className="font-medium capitalize  "
                              >
                                {val.label}
                              </label>
                              <Field
                                as={val.as}
                                name={val.name}
                                value={val.value}
                                placeholder={val.placeholder}
                                className="border outline-none rounded-md px-4 py-2 w-full "
                                onChange={(e) =>
                                  handleSourceDestinationChange(e)
                                }
                              >
                                <option readOnly={true}>{val.options}</option>
                                {locationData.map((item, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={item.value}
                                      className="text-slate-200 bg-primary"
                                    >
                                      {item.source_destination}
                                    </option>
                                  );
                                })}
                              </Field>
                              <ErrorMessage
                                name={val.name}
                                component={"div"}
                                className="text-red-500 text-center text-sm"
                              />
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i}>
                            <div>
                              <label
                                htmlFor={val.label}
                                className="capitalize font-medium"
                              >
                                {val.label}
                              </label>
                              <Field
                                as={val.as}
                                name={val.name}
                                value={val.value}
                                placeholder={val.placeholder}
                                className="border outline-none rounded-md px-4 py-2 w-full"
                                readOnly={val.readOnly || false}
                              />
                              <ErrorMessage
                                name={val.name}
                                component={"div"}
                                className="text-red-500 text-center text-sm"
                              />
                            </div>
                          </div>
                        );
                      }
                    })}

                    {/* Date Field */}
                    <div className="py-2">
                      <label htmlFor="date" className="font-medium capitalize">
                        Select Date
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        className={`border outline-none rounded-md px-4 py-2 w-full ${isPreviewActive ? 'hidden' : 'block'
                          }`}
                      />

                    </div>
                  </div>
                  <div className="flex justify-end py-2 gap-3 px-4">
                    {showPreview ? (
                      <button
                        type="button"
                        onClick={() => setShowPreview(false)}
                        className="px-4 py-1 border-none rounded-lg text-center bg-primary text-slate-50"
                      >
                        Previous
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextButtonClick}
                        className="px-4 py-1 border-none rounded-lg text-center bg-primary text-slate-50"
                      >
                        Next
                      </button>
                    )}
                    <button
                      type="reset"
                      onClick={handleClick}
                      className="px-4 py-1 border-none text-center rounded-lg bg-red-500 text-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BookCab;
