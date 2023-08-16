import React from "react";

const About = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p>
          Welcome to
          <span className="text-blue-500 font-bold">
            Online Cab Booking System
          </span>
          , your trusted partner in hassle-free and convenient online cab
          booking services.
        </p>
        <p className="mt-2">
          Our mission is to provide you with a seamless travel experience by
          connecting you with reliable rides whenever and wherever you need
          them.
        </p>
        <p className="mt-2">
          At <span className="text-blue-500 font-bold">Your Company Name</span>,
          we're committed to safety, comfort, and affordability, ensuring you
          can focus on enjoying your journey.
        </p>
        <p className="mt-2">
          Whether you're commuting to work, catching a flight, or exploring the
          city, our diverse fleet of vehicles and user-friendly app are designed
          to cater to your unique travel needs.
        </p>
        <p className="mt-2">
          Join us in transforming the way you travel. Let us be your travel
          companion on every adventure!
        </p>
      </div>
    </div>
  );
};

export default About;
