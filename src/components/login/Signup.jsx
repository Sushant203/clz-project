import React, { useState } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import logo from "../resources/images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .matches(
      /^[a-zA-Z]+[a-zA-Z\s]$/,
      "only letters and whitespace are allowed"
    )
    .required("firstname is required"),
  lastname: yup
    .string()
    .matches(
      /^[a-zA-Z]+[a-zA-Z\s]$/,
      " only letters and whitespace are allowed"
    )
    .required("lastname is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup
    .string()
    .min(8, "password is too short!!")
    .max(16, "password is too long")
    .required("password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  address: yup.string().required("address is required"),
  contact: yup.number().required(" please enter your contact number"),
  gender: yup.string().required(" please select your gender"),
});
const Signup = () => {
  const [newImg, setnewImg] = useState("");
  const [clickedCheckBox, setClickedCheckBox] = useState(false);
  const Data = [
    {
      label: "FirstName",
      name: "firstname",
      type: "text",
    },
    {
      label: "MiddleName(optional)",
      name: "middlename",
      type: "text",
    },
    {
      label: "LastName",
      name: "lastname",
      type: "text",
    },
    {
      label: "email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "confirm Password",
      name: "confirmpassword",
      type: "password",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
    },
    {
      label: "Contact",
      name: "contact",
      type: "text",
    },

    {
      label: "Gender",
      name: "gender",
      as: "select",
      genderOptions: [],
    },
    // {
    //   label: "Avatar",
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

  //append code for posting user informations to backend
  const Submit = (e) => {
    console.log(e, "e.target");
    try {
      const formData = new FormData();
      formData.append("firstname", e.firstname);
      formData.append("middlename", e.middlename);
      formData.append("lastname", e.lastname);
      formData.append("email", e.email);
      formData.append("password", e.password);
      formData.append("confirmpassword", e.confirmpassword);
      formData.append("address", e.address);
      formData.append("contact", e.contact);
      formData.append("gender", e.gender);
      formData.append("image", newImg);
      axios
        .post("http://localhost:8000/user/register", formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Registered successfully");
          } else if (res.status === 500) {
            toast.error("error occured!!");
          }
        })
        .catch((err) => {
          toast.error("Email is already Registered Use different email")

          console.log(err);
        });
    } catch (error) {
      toast.error("Email is already Registered Use different email")

      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-fit p-8 bg-slate-300 border border-primary mt-5 rounded-lg shadow-lg shadow-purple-700 backdrop-filter backdrop-blur-lg bg-opacity-20">
        <Formik
          initialValues={{
            firstname: "",
            middlename: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
            address: "",
            contact: "",
            gender: "",
          }}
          validationSchema={schema}
          onSubmit={(val) => {
            console.log(val);
            Submit(val);

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
                              <label htmlFor={val.label}>{val.label}</label>
                            </div>
                            <div>
                              <Field
                                as={val.as}
                                name={val.name}
                                className="border-b-2 border-primary rounded-sm shadow-md shadow-white focus:outline-none py-2 px-16 "
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
                            <label htmlFor={val.label}>{val.label}</label>
                            <Field
                              type={val.type}
                              name={val.name}
                              placeholder={`enter your ${val.name}`}
                              className="border-b-2 border-primary rounded-sm shadow-md shadow-white focus:outline-none focus:border-black py-2 px-12"
                            />
                          </div>
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-500 text-center text-sm "
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="flex flex-col gap-3 justify py-4 my-8 items-center">
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
                    <div className="text-sm  font-regular capitalize">
                      I agree to the
                      <button className="text-primary font-bold capitalize mx-1">
                        {" "}
                        terms and conditions
                      </button>
                    </div>
                  </div>
                  <div>
                    <h2 className=" pt-4">
                      <Link to="/login">
                        Already have an account?
                        <span className="font-bold text-primary underline">
                          Log In
                        </span>
                      </Link>
                    </h2>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`px-5 py-2 capitalize bg-primary text-white w-full font-bold
                        
                      ${clickedCheckBox
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
      <ToastContainer className=' absolute bottom-2' />

    </div>
  );
};

export default Signup;
