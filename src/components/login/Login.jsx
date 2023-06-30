import React from "react";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { BsFillKeyFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Signup from "./Signup";
// formik yup validation
const schema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .min(8, "password is too short!!")
    .required("password is required"),
});
const Login = () => {
  const Data = [
    {
      name: "username",
      type: "text",
      icon: <CgProfile className="text-white" />,
    },
    {
      name: "password",
      type: "password",
      icon: <BsFillKeyFill />,
    },
    // {
    //   name: "submit",
    //   type: "button",
    // },
  ];
  return (
    <div>
      <div>{/* <h2>Login Form </h2> */}</div>
      <div className="">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(val) => {
            console.log(val);
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 justify-center items-center absolute top-40 left-64 capitalize border-none shadow-md shadow-slate-500 rounded-md bg-red-600 h-72 w-96"
              >
                {Data.map((val, i) => {
                  return (
                    <div key={i} className="flex flex-col gap-1 relative">
                      <label
                        htmlFor={val.name}
                        className="font-bold text-white text-center"
                      >
                        {val.name}
                      </label>
                      {/* inserting icons */}
                      <div className="">
                        {val.name === "username" && (
                          <CgProfile className="font-medium text-2xl absolute top-11 ml-3 " />
                        )}
                        {val.name === "password" && (
                          <BsFillKeyFill className="text-green text-2xl absolute top-11 ml-3" />
                        )}
                      </div>
                      <Field
                        type={val.type}
                        // icon={val.icon}
                        name={val.name}
                        placeholder={`enter your ${val.name}`}
                        className="border-none rounded-lg shadow-md shadow-white outline-none py-2.5 px-12 capitalize"
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
                  className="border-none py-2 px-10 rounded-lg text-xl font-semibold shadow-md shadow-white text-white"
                >
                  Login
                </button>

                <div className="flex gap-5 capitalize text-white">
                  <h4>forgot password?</h4>
                  <a href={Signup}>Create new account</a>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
