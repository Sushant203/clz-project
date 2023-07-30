import React from "react";
import cab4 from "../resources/images/cab4.jpg";
import cab1 from "../resources/images/cab1.png";
import cab2 from "../resources/images/cab2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserAuthContextapi from "../../hoc/contextapi/Userauth";
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    <UserAuthContextapi>
      <div className="">
        {/* upper body */}
        <div className="border-none shadow-lg shadow-slate-400 flex justify-center h-[41rem] items-center w-full">
          <div className="w-full pb-8 overflow-x-hidden  ">
            <Slider {...settings}>
              <div className="ml-96">
                <img src={cab4} alt="hello" />
              </div>
              <div className="ml-96">
                <img src={cab4} alt="" />
              </div>
              <div className="ml-96">
                <img src={cab4} alt="" />
              </div>
              <div className="ml-96">
                <img src={cab2} alt="" className="mix-blend-lighten" />
              </div>
              <div className="ml-96">
                <img src={cab1} alt="" />
              </div>
            </Slider>
          </div>
        </div>

        {/* body section */}
        <div className="pb-5">
          <div className="py-10 text-center ">
            <h2 className="text-3xl font-bold">why choose us?</h2>
          </div>
          <div className="grid grid-cols-3 px-6 gap-3">
            {Description.map((val, i) => {
              return (
                <div key={i} className="">
                  <div className="flex flex-col gap-2 border-b-2 border-purple-400 shadow-lg h-32 shadow-purple-400 rounded-md">
                    <h2 className="font-bold text-2xl text-purple-700 text-center  py-2 capitalize">
                      {val.title}
                    </h2>
                    <p
                      className="description text-sm px-3 
                  capitalize overflow-scroll text-slate-500"
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
    </UserAuthContextapi>
  );
};

export default Home;
