import React from "react";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { BsFillKeyFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import cab4 from "../resources/images/cab4.jpg";
import { Link } from "react-router-dom";
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
    <div className="">
      <div
        className=""
        // style={{
        //   backgroundImage: `url(${cab4})`,
        //   backgroundRepeat: "no-repeat",
        //   height: "900px",
        //   width: "600px",
        //   // opacity: "0.5",
        // }}
      >
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
              <div className="flex justify-center items-center mt-[10%]">
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 justify-center items-center capitalize border-none shadow-lg shadow-slate-500 rounded-lg h-fit w-96 py-8 backdrop-filter backdrop-blur-md bg-opacity-20 bg-white "
                >
                  <div className="flex flex-col gap-3 text-center font-bold text-2xl  py-5">
                    <h2>Welcome</h2>
                    <h2>Login to your account</h2>
                  </div>
                  {Data.map((val, i) => {
                    return (
                      <div key={i} className="flex flex-col gap-1 relative">
                        <label htmlFor={val.name} className=" text-center">
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
                    className="border-none py-2 px-10 rounded-lg text-xl font-semibold shadow-md shadow-white "
                  >
                    Login
                  </button>

                  <div className="flex gap-5 capitalize ">
                    <Link to="/signup">
                      <h4>Create new account</h4>
                    </Link>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
