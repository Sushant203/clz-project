import React, { useState, useCallback, useEffect } from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Previewbooking from "./Previewbooking";

const schema = yup.object().shape({
  Source: yup.string().required("required"),
  destination: yup.string().required("required"),
});
const BookCab = ({ popup, setPopup, props }) => {
  const [locationData, setlocationData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleNextButtonClick = () => {
    setShowPreview(true);
  };

  const handleClick = () => {
    setPopup(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    // Make the Axios POST request
    axios
      .post("http://localhost:8000/book", values)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        resetForm();
        // setPopup(false);
        console.log(handleSubmit);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  const Data = [
    {
      label: "Source_destination:",
      name: "Source_destination",
      as: "select",
      // placeholder: "choose source and destination ",
      options: "choose source and destination",
      locationData: [],
    },

    {
      label: "unitprice:",
      name: "unitprice",
      type: "text",
      value: 10,
      readOnly: true,
    },
  ];

  //data for source-destination field
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

  const locationDataa = [
    {
      id: "0",
      value: "choose source and destination",
      readOnly: true,
    },
  ];
  Data[0].locationData.push(...locationDataa, ...locationData);
  return (
    <div className="relative">
      {Previewbooking && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-80 ${
            Previewbooking
              ? "hidden"
              : "ease-in-out duration-200 delay-100 ml-48"
          }`}
        >
          <Previewbooking
            showPreview={showPreview}
            setShowPreview={setShowPreview}
          />
        </div>
      )}
      <div
        className="
      border-2 border-primary bg-slate-2 w-96 h-fit block  z-10 bg-white"
      >
        <h2 className="py-4 px-4 font-bold text-2xl text-center border-b-2 border-primary">
          Book Cab
          {/* <span>{Images ? Images.car : "No car information"}</span> */}
        </h2>
        <div>
          <Formik
            initialValues={{
              Source: "",
              destination: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="py-2 px-4">
                    {Data.map((val, i) => {
                      if (val.as === "select") {
                        return (
                          <div key={i}>
                            <div>
                              <label htmlFor={val.label} className="capitalize">
                                {val.label}
                              </label>
                              <Field
                                as={val.as}
                                name={val.name}
                                value={val.value}
                                placeholder={val.placeholder}
                                className="border outline-none rounded-md px-4 py-2 w-full"
                              >
                                <option disabled>{val.options}</option>
                                {locationData.map((item, index) => {
                                  return (
                                    <option key={index} value={item.value}>
                                      <li>{item.source_destination}</li>
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
                              <label htmlFor={val.label} className="capitalize">
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
                  </div>
                  <div className="flex justify-end py-2 gap-3 px-4">
                    {showPreview ? (
                      <Previewbooking
                        Source_destination={Data[0].value}
                        unitprice={Data[1].value}
                      />
                    ) : (
                      <button
                        onClick={handleNextButtonClick}
                        type="submit"
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
