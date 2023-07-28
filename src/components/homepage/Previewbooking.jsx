import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

const Previewbooking = (props) => {
  const [previewData, setPreviewData] = useState([]);
  const [previous, setPrevious] = useState(false);
  const { Source_destination, unitprice } = props;
  // const cabId = localStorage.getItem("id");
  // console.log("id:" + cabId);
  const getPreviewData = useCallback(() => {
    try {
      axios.get(`http://localhost:8000/cab`).then((res) => {
        setPreviewData(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPreviewData();
  }, [getPreviewData]);

  const handlePrevious = () => {
    setPrevious(true);
  };

  return (
    <>
      <div className="bg-slate-300 w-full h-full">
        <h1 className="font-bold text-primary">Preview Your Booking</h1>

        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          <Form className="bg-red-300">
            {previewData.map((val, i) => (
              <div key={i}>
                <p>Selected Cab: {val.name}</p>
                <p>Driver Name: {val.dname}</p>
                <p>Distance: {val.km}</p>
                <p>unit price: {unitprice}</p>
                <p>location: {Source_destination}</p>
                <hr />
              </div>
            ))}
            <button type="submit" onClick={handlePrevious}>
              Back
            </button>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Previewbooking;
