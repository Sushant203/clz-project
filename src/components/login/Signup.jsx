import React from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import cab4 from "../resources/images/cab4.jpg";

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
  ];
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-fit p-8 bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20"
        style={{
          backgroundImage: `url(${cab4})`,
          backgroundRepeat: "no-repeat",
          // height: "900px",
          width: "600px",
          // opacity: "0.7",
        }}
      >
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            email: "",
            password: "",
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
                  <h2 className="text-2xl font-bold mb-6">Signup</h2>
                </div>
                {Data.map((val, i) => {
                  return (
                    <div key={i} className="flex flex-col py-3 items-center">
                      <label htmlFor={val.name}>{val.name}</label>
                      <Field
                        type={val.type}
                        // icon={val.icon}
                        name={val.name}
                        placeholder={`enter your ${val.name}`}
                        className="border-b border-black rounded-sm shadow-md shadow-white focus:outline-none focus:border-black py-2.5 px-12 capitalize"
                      />
                      <ErrorMessage
                        name={val.name}
                        component={"div"}
                        className="text-red-500"
                      />
                    </div>
                  );
                })}
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
        <form>
          {/* <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
