import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as yup from 'yup';
import DriverImage from '../resources/images/driver.png';

const DriverForm = () => {
    const [newImg, setNewImg] = useState("");

    const FormItems = [
        {
            name: "drivername",
            type: "text",
            label: "Driver's Name",
            placeholder: "Enter driver's name",
        },
        {
            name: "driverphone",
            type: "tel",
            label: "Phone Number",
            placeholder: "Enter phone number",
        },
        {
            name: "driverlicense",
            type: "number",
            label: "License Number",
            placeholder: "Enter license number",
        },
    ];

    const schema = yup.object().shape({
        drivername: yup.string().required("Driver's Name is Required").matches(/\S+/, "No whitespaces allowed"),
        driverphone: yup.string().required("Phone Number is required").matches(/\S+/, "No whitespaces allowed"),
        driverlicense: yup.string().required("License Number is required").length(12, "License Number must be exactly 12 digits"),
    });

    const postFormData = async (val) => {
        try {
            const response = await axios.post("http://localhost:8000/driverrequest", val);
            if (response.status === 200) {
                toast.success("Thank you for details We will contact you soon wait for approval");
            } else {
                toast.error("Cannot post data");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("License number is already registered. Cannot post it again.");
            } else {
                console.log(error);
            }
        }
    };

    return (
        <div
            className='flex items-center justify-center min-h-screen'
            style={{ backgroundImage: `url(${DriverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className='bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3'>
                <h2 className='text-2xl font-semibold mb-4 text-center text-gray-800'>Driver Registration</h2>
                <Formik
                    initialValues={{
                        drivername: "",
                        driverphone: "",
                        driverlicense: "",
                    }}
                    validationSchema={schema}
                    onSubmit={(val) => {
                        postFormData(val);
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className='grid grid-cols-1 gap-4'>
                                {FormItems.map((val, i) => (
                                    <div key={i}>
                                        <label className='text-sm font-semibold mb-1 capitalize' htmlFor={val.name}>
                                            {val.label}
                                        </label>
                                        <Field
                                            type={val.type}
                                            name={val.name}
                                            placeholder={val.placeholder}
                                            className='border p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                        <ErrorMessage
                                            name={val.name}
                                            component="div"
                                            className='text-red-600 text-sm'
                                        />
                                    </div>
                                ))}
                            </div>
                            <ToastContainer />

                            <div className='flex justify-center mt-6'>
                                <button
                                    type="submit"
                                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold'
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

export default DriverForm;
