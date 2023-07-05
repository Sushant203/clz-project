import React from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  FirstName: yup.string().required("firstname is required"),
  LastName: yup.string().required("lastname is required"),
  email: yup.string().required("email is required"),
  password: yup
    .string()
    .min(8, "password is too short!!")
    .required("password is required"),
});
const Signup = () => {
  const Data = [
    {
      name: "FirstName",
      type: "text",
    },
    {
      name: "MiddleName(optional)",
      type: "text",
    },
    {
      name: "LastName",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "Password",
      type: "password",
    },
    {
      name: "confirm Password",
      type: "password",
    },
    {
      name: "Address",
      type: "text",
    },
    {
      name: "Contact",
      type: "number",
    },
    {
      name: "Contact",
      type: "number",
    },
    {
      name: "Contact",
      type: "number",
    },
    {
      name: "Gender",
      as: "select",
      genderOptions: [],
    },
  ];

  //gender options
  const genderOptions = [
    {
      value: "select your gender",
    },
    {
      value: "male",
    },
    {
      value: "female",
    },
    {
      value: "other",
    },
  ];
  return (
    <div className="flex items-center justify-center ">
      <div className="w-fit p-8 bg-slate-300 border border-primary mt-5 rounded-lg shadow-lg shadow-purple-700 backdrop-filter backdrop-blur-lg bg-opacity-20">
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            email: "",
            password: "",
            cpassword: "",
            address: "",
            contact: "",
            gender: "",
          }}
          validationSchema={schema}
          onSubmit={(val, resetform) => {
            console.log(val);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  <h2 className="text-2xl text-center border-b-2 border-primary font-bold mb-6">
                    Create an account - Client
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-16 col-start-3  px-40 py-10">
                  {Data.map((val, i) => {
                    if (val.as === "select") {
                      return (
                        <div key={i}>
                          <div>
                            <div>
                              <label htmlFor={val.name}>{val.name}</label>
                            </div>
                            <div>
                              <Field as={val.as} name={val.name}>
                                {genderOptions.map((option, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={option.value}
                                      className=""
                                    >
                                      {option.value}
                                    </option>
                                  );
                                })}
                              </Field>
                            </div>
                          </div>
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-500 text-center text-sm"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} className="">
                          <div className="flex flex-col ">
                            <label htmlFor={val.name}>{val.name}</label>
                            <Field
                              type={val.type}
                              name={val.name}
                              placeholder={`enter your ${val.name}`}
                              className="border-b-2 border-primary rounded-sm shadow-md shadow-white focus:outline-none focus:border-black py-2 px-12 capitalize"
                            />
                          </div>
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-500 text-center text-sm"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none"
                >
                  Signup
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
