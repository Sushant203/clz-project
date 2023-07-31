import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
// yup validation
const schema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  message: yup.string().required("Message is required"),
});
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

  const postFormData = (values) => {
    try {
      axios.post("http://localhost:8000/contact", values).then((res) => {
        if (res.status === 200) {
          toast.success("data posted successfully");
        }
      });
    } catch (error) {
      toast.error("Data cannot be posted")
      console.log(error);
    }
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <div className="border-t-2 rounded-sm p-4 border-primary mx-32 my-10">
        <h1 className="text-4xl text-primary font-bold text-center border-b-2 border-primary">
          Contact Us from here
        </h1>
      </div>
      {/* Icon plotting */}
      <div className="fixed right-0 border-2 shadow-primary shadow-lg w-16 rounded-md bg-slate-200 overflow-hidden">
        {contactMethods.map((val, i) => (
          <a
            key={i}
            href={val.href}
            target={val.target}
            className={`py-1 flex items-center gap-1 ${hoveredIndex === i ? "bg-white" : ""
              }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p className="cursor-pointer">{val.icon}</p>
          </a>
        ))}
      </div>
      {/* Contact form */}
      <div className="flex-grow">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            postFormData(values);
            resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
              <div className="py-2">
                <h2 className="font-bold text-2xl leading-10">
                  Send a Quick Message
                </h2>
                <p className="text-sm">
                  You can give us your suggestions & feedback as per the address
                  below by post, by phone, or send us using the attached online
                  form.
                </p>
              </div>
              {formData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 items-center justify-center gap-2 py-2"
                >
                  <label htmlFor={item.name} className="text-justify">
                    {item.label}
                  </label>
                  <Field
                    type={item.type}
                    name={item.name}
                    className="border rounded-md py-2"
                  />
                  <ErrorMessage
                    name={item.name}
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ))}
              <div className="w-full text-center">
                <ToastContainer />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md mt-4 text-white bg-primary"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
