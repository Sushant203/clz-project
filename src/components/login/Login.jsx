import React from "react";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { BsFillKeyFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserAuthContextapi from "../../hoc/contextapi/Userauth";
import { UserAuthContext } from "../../hoc/contextapi/Userauth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// formik yup validation
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Username is required"),
  password: yup
    .string()
    .min(8, "Password is too short!!")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const Data = [
    {
      name: "email",
      type: "email",
      icon: <IoMail />,
    },
    {
      name: "password",
      type: "password",
      icon: <BsFillKeyFill />,
    },
  ];

  const submit = async (val) => {
    try {
      const res = await axios.post("http://localhost:8000/user", val);
      if (res.status === 200) {
        toast.success("Logged in successfully");
        console.log("sgsafg");
        const user_id = res.data.user[0].id;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/");

        }, 1000);
      }
      console.log(res);
    } catch (error) {
      toast.error("Email or Password Does not Match")
      console.log(error);
    }
  };

  return (
    <div>
      <UserAuthContextapi>
        <UserAuthContext.Consumer>
          {(context) => (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#A2F2FC] via-[#379299] to-primary">
              <div className="w-full">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={schema}
                  onSubmit={(val) => {
                    console.log(val);
                    submit(val);
                    // toast.success("log in susccess");
                  }}
                >
                  {({ handleSubmit }) => (
                    <div className="flex justify-center items-center">
                      <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 justify-center items-center capitalize border-none shadow-xl shadow-slate-500 rounded-lg h-fit w-96 py-8 backdrop-filter backdrop-blur-md bg-opacity-0 bg-white"
                      >
                        <div className="flex flex-col gap-3 text-center font-bold text-2xl py-5">
                          <h2>Welcome</h2>
                          <h2>Login to your account</h2>
                        </div>

                        {Data.map((val, i) => (
                          <div key={i} className="flex flex-col gap-1 relative">
                            <label htmlFor={val.name} className="text-center">
                              {val.name}
                            </label>
                            {/* Inserting icons */}
                            <div className="">
                              {val.name === "email" && (
                                <IoMail className="font-medium text-2xl absolute top-11 ml-3" />
                              )}
                              {val.name === "password" && (
                                <BsFillKeyFill className="border-r-2 border-slate-600 text-2xl absolute top-11 ml-3" />
                              )}
                            </div>
                            <Field
                              type={val.type}
                              name={val.name}
                              placeholder={`Enter your ${val.name}`}
                              className="border-b border-black rounded-sm shadow-md shadow-white focus:outline-none focus:border-black py-2.5 px-12"
                            />
                            <ErrorMessage
                              name={val.name}
                              component={"div"}
                              className="text-red-500"
                            />
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="border-none py-2 px-10 rounded-lg text-xl font-semibold shadow-md shadow-white hover:bg-primary"
                        >
                          Login
                        </button>
                        <div className="flex gap-5 capitalize hover:underline hover:font-bold">
                          <Link to="/signup">
                            <h4>Create new account</h4>
                          </Link>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
              <ToastContainer />
            </div>
          )}
        </UserAuthContext.Consumer>
      </UserAuthContextapi>
    </div>
  );
};

export default Login;
