import React, { useState } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import logo from "../resources/images/logo.png";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  FirstName: yup
    .string()
    .matches(
      /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]$/,
      "Username can only contain letters, numbers, and whitespace"
    )
    .required("firstname is required"),
  LastName: yup
    .string()
    .matches(
      /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]$/,
      "Username can only contain letters, numbers, and whitespace"
    )
    .required("lastname is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup
    .string()
    .min(8, "password is too short!!")
    .max(16, "password is too long")
    .required("password is required"),
});
const Signup = () => {
  const [newImg, setnewImg] = useState("");
  const [clickedCheckBox, setClickedCheckBox] = useState(false);
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
    // {
    //   name: "Avatar",
    //   type: "file",
    // },
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
  const handleChange = (e) => {
    setnewImg(e.target.files[0]);
  };
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
                <div className="flex  border-b-2 border-primary">
                  <img
                    src={logo}
                    alt="cab"
                    height={80}
                    width={100}
                    className=""
                  />
                  <h2 className="text-2xl  w-full pt-8 text-center font-bold mb-6">
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
                              <Field
                                as={val.as}
                                name={val.name}
                                className="border-b-2 border-primary rounded-sm shadow-md shadow-white focus:outline-none py-2 px-16 capitalize"
                              >
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
                <div className="flex flex-col gap-3 justify py-4 items-center">
                  <label htmlFor="image">
                    <img
                      src={
                        newImg
                          ? URL.createObjectURL(newImg)
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSeH9llEv5AAEqHYkOwwIjcJa0VFPVERRUuw&usqp=CAU"
                      }
                      className='className=" w-44 h-44 rounded-full mx-auto p-4 border-2 border-primary '
                      alt="preview"
                    />
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleChange}
                    className=""
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex  gap-3 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 "
                      onClick={() => setClickedCheckBox(!clickedCheckBox)}
                    />
                    <div className="text-sm Poppins font-regular capitalize">
                      I agree to the
                      <button className="text-primary font-bold capitalize mx-1">
                        {" "}
                        terms and conditions
                      </button>
                    </div>
                    <div>
                      <Link to="/login">
                        <h2>Already have an account?</h2>
                      </Link>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`px-5 py-2 capitalize bg-primary text-white w-full font-bold
                        
                      ${
                        clickedCheckBox
                          ? "opacity-100 cursor-pointer transition-all hover:scale-105 ease-in-out duration-300 "
                          : " opacity-50 cursor-not-allowed"
                      } rounded-md
                     `}
                  disabled={clickedCheckBox ? "" : "disabled "}
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
