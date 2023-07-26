import React from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  Source: yup.string().required("required"),
  destination: yup.string().required("required"),
});
const BookCab = ({ popup, setPopup, Images }) => {
  const handleClick = () => {
    setPopup(false);
  };
  const handleSubmit = (values, { resetForm }) => {
    // Make the Axios POST request
    axios
      .post("https://dummyjson.com/posts/1", values)
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
      label: "Cab_id:",
      name: "id",
      type: "text",
    },

    {
      label: "pickup location:",
      name: "destination",
      type: "text",
      placeholder: "where should we drop you off?",
    },
    {
      label: "dropoff location:",
      name: "destination",
      type: "text",
      placeholder: "where should we drop you off?",
    },
    {
      label: "unitprice:",
      name: "priceperkm",
      type: "text",
      value: 10,
      readOnly: true,
    },
    {
      label: "total fare:",
      name: "total fare",
      type: "text",
      // value: totalFare(),
    },
  ];
  //calculating total fare of cab

  const totalFare = () => {};

  return (
    <div className="relative">
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
                      return (
                        <div key={i}>
                          <div>
                            <label htmlFor={val.label} className="capitalize">
                              {val.label}
                            </label>
                            <Field
                              type={val.type}
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
                    })}
                  </div>
                  <div className="flex justify-end py-2 gap-3 px-4">
                    <button
                      type="submit"
                      className="px-4 py-1 border-none rounded-lg text-center bg-primary text-slate-50"
                    >
                      Book
                    </button>
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
