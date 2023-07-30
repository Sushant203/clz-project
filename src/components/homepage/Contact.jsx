import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
//yup validation
const schema = yup.object().shape({});
const Contact = () => {
  const contactMethods = [
    {
      icon: <AiOutlinePhone className="text-4xl rounded-md  bg-[#10a310]" />,
      name: "phone",
      href: "tel:977-9802153267",
    },
    {
      icon: <AiOutlineMail className="text-4xl rounded-md bg-[#366adb]" />,
      name: "email",
      href: "mailto:shrestha.krisna99@gmail.com",
    },
    {
      icon: <AiOutlineFacebook className="text-4xl rounded-md bg-[#1777F2]" />,
      name: "Facebook",
      href: "https://www.facebook.com/himal.fullel",
      target: "_blank",
    },
    {
      icon: (
        <AiOutlineInstagram className="text-4xl rounded-md bg-gradient-to-tr from-[#FEDA77] via-[#DB171B] via-[#A9128C] via-[#A14BCA] to-[#6248CD] " />
      ),
      name: "Instagram",
      href: "https://www.instagram.com/sushant.stha22/",
      target: "_blank",
    },
  ];

  //contact form data
  const formData = [
    {
      label: "Fullname:",
      name: "fullname",
      type: "text",
    },
    {
      label: "Email:",
      name: "email",
      type: "email",
    },
    {
      label: "Phone:",
      name: "phone",
      type: "text",
    },
    {
      label: "Message:",
      name: "message",
      type: "textarea",
    },
  ];

  //posting form data
  const postFormData = (values) => {
    try {
      axios.post("http://localhost:8000/contact").then((res) => {
        if (res.status === 200) {
          console.log("data posted successfully");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="bg-slate-200 h-screen">
      <div className="border-t-2 rounded-sm  p-4  border-primary mx-32 my-10">
        <h1 className="text-4xl text-primary font-bold text-center border-b-2 border-primary">
          Contact Us from here
        </h1>
      </div>
      {/* icon plotting */}
      <div>
        <div className="fixed right-0 border-2 h-fit rounded-md bg-slate-200 overflow-hidden">
          {contactMethods.map((val, i) => {
            return (
              <a
                key={i}
                href={val.href}
                target={val.target}
                className=" py-1 flex items-center gap-1"
              >
                <p className="cursor-pointer">{val.icon}</p>
                {/* <p className=" capitalize">{val.name}</p> */}
              </a>
            );
          })}
        </div>
      </div>
      {/* contact form */}
      <div className="">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={schema}
          onSubmit={(item, values, { resetForm }) => {
            console.log(item);
            postFormData(values);
            resetForm();
          }}
        >
          <div className="w-8/12 mx-auto border-2 rounded-md border-primary p-4 ">
            <Form>
              <div className="py-2 ">
                <h2 className="font-bold text-2xl leading-10">
                  Send a Quick Message
                </h2>
                <p className="text-sm">
                  You can give us your suggestions & feedbacks as per below
                  address by post, by phone, or can send us using attached
                  online form.
                </p>
              </div>
              {formData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" grid grid-cols-1 items-center justify-center gap-2 py-2 "
                  >
                    <label htmlFor={item.label} className="text-justify">
                      {item.label}
                    </label>
                    <Field
                      type={item.type}
                      name={item.name}
                      className="border  rounded-md py-2 "
                    />
                    {/* <ErrorMessage component={"div"} className="text-red-500" /> */}
                  </div>
                );
              })}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md mt-4 text-slate-50  bg-primary"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
