import React, { useState } from "react";

import axios from "axios";
import logo from "../resources/images/logo.png";
import cab1 from "../resources/images/cab1.png";
import cab2 from "../resources/images/cab2.png";
import BookCab from "./BookCab";

const AvailableCabs = () => {
  const [popup, setPopup] = useState("");

  const handlePopup = () => {
    setPopup(true);
  };
  const Images = [
    {
      image: logo,
      car: "suzuki",
      seater: "5 seater",
      model: "maruti S22",
    },
    {
      image: cab1,
      car: "Hyundai",
      seater: "2 seater",
      model: "chevlon F1622",
    },
    {
      image: cab2,
      car: "Scorpio",
      seater: "6 seater",
      model: "galaxy-777",
    },
    {
      image: logo,
      car: "suzuki",
      seater: "5 seater",
      model: "maruti S22",
    },
    {
      image: cab1,
      car: "Hyundai",
      seater: "2 seater",
      model: "chevlon F1622",
    },
    {
      image: cab2,
      car: "Scorpio",
      seater: "6 seater",
      model: "galaxy-777",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  // const [showBox, setShowBox] = useState(false);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filtered = Images.filter(
      (item) =>
        item.car.toLowerCase().includes(searchText.toLowerCase()) ||
        item.model.toLowerCase().includes(searchText.toLowerCase()) ||
        item.seater.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="relative">
      {popup && (
        <div
          className={` fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-40 ${
            popup
              ? " transition-all duration-500 delay-100 transition-smooth"
              : "ease-in-out duration-500 delay-100 ml-80"
          }`}
        >
          <BookCab popup={popup} setPopup={setPopup} Images={Images} />
        </div>
      )}

      <div className="border-t-2 rounded-lg absolute top-6 left-20 right-6 border-purple-400 shadow-lg shadow-primary w-[80%] bg-slate-100 ">
        <div className="container  border-b-2 border-primary flex justify-center gap-24">
          <img src={logo} alt="logos" height={70} width={70} />
          <h2 className="block text-2xl font-bold py-4">Available Cabs</h2>
        </div>
        {/* search bar */}
        <div className="py-2 px-2 flex justify-center">
          <input
            type="text"
            name="search bar"
            placeholder="Search here"
            className="border outline-none hover:border-none hover:shadow-md hover:shadow-purple-500 rounded-md w-96 px-8 py-2"
            value={searchText}
            onInput={handleSearch}
            onChange={handleInputChange}
          />
          <button
            className="border rounded-md px-4 bg-primary py-2 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {searchText !== "" ? (
          filteredItems.length > 0 ? (
            <div>
              <div className="py-5 grid grid-cols-3 gap-4 ml-5">
                {filteredItems.map((val, i) => (
                  <div key={i}>
                    <div className="border w-64 rounded-lg px-3 capitalize">
                      <img
                        src={val.image}
                        alt="alt"
                        className="w-full h-36  border-b-2 border-primary rounded-lg"
                      />
                      <h2 className="py-2 capitalize font-bold">{val.car}</h2>
                      <p className="text-slate-600"> {val.seater} </p>
                      <p className="text-slate-600">{val.model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No results found.</p>
          )
        ) : (
          <div>
            <div
              className="py-5 px-5 grid grid-cols-3 gap-4 mx-auto cursor-pointer"
              onClick={handlePopup}
            >
              {Images.map((val, i) => (
                <div key={i}>
                  <div className="border w-64 rounded-lg  capitalize">
                    <img
                      src={val.image}
                      alt="alt"
                      className="w-full h-36  border-b-2 border-primary rounded-lg"
                    />
                    <h2 className="py-2 capitalize font-bold">{val.car}</h2>
                    <p className="text-slate-600"> {val.seater} </p>
                    <p className="text-slate-600">{val.model}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCabs;
