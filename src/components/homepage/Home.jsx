import React from "react";
import cab4 from "../resources/images/cab4.jpg";
const Home = () => {
  const Description = [
    {
      title: "Convenience",
      description:
        "our online cab booking system offers convenience to users by allowing them to book cabs from the comfort of their own homes or anywhere with an internet connection.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Ensure that our system provides accurate and transparent pricing, including any additional charges or surcharges, to build trust and eliminate any surprises for our customers.",
    },
    {
      title: "Safety and Security",
      description:
        "safety is a significant concern when it comes to cab services. Highlight the safety measures your system has in place, such as background checks on drivers, real-time tracking of rides, and 24/7 customer support.",
    },
    {
      title: "Reliable and Punctual Service",
      description:
        "commited to timely pickups, accurate arrival estimates, and efficient routes to enhance customer satisfaction. ",
    },
    {
      title: "Feedback and Reviews",
      description:
        "We encourage our customers to provide feedback and reviews on our services. Positive reviews and ratings from our satisfied customers will significantly encourage us to consistently grow and proivde you better services. ",
    },
  ];
  return (
    <div>
      {/* upper body */}
      <div className="border-none shadow-lg shadow-slate-400 flex justify-center items-center">
        <div
          className=""
          style={{
            backgroundImage: `url(${cab4})`,
            backgroundRepeat: "no-repeat",
            height: "400px",
            width: "600px",
            opacity: "0.4",
          }}
        ></div>
      </div>

      {/* body section */}
      <div>
        <div className="py-5 text-center">
          <h2 className="text-3xl font-bold">why choose us?</h2>
        </div>
        <div className="grid grid-cols-3 px-6 gap-3">
          {Description.map((val, i) => {
            return (
              <div key={i} className="">
                <div className="flex flex-col gap-2 border-b-2 border-slate-400 shadow-lg shadow-purple-300 rounded-md">
                  <h2 className="font-bold text-2xl text-purple-700 text-center capitalize">
                    {val.title}
                  </h2>
                  <p
                    className="text-sm px-3 py-3
                  capitalize"
                  >
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
