import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../resources/images/logo.png";
import BookCab from "./BookCab";
import Previewbooking from "./Previewbooking";

const AvailableCabs = () => {
  const [popup, setPopup] = useState(false);
  const [selectedCab, setSelectedCab] = useState(null);

  const [Cabs, setCabs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const getCabs = () => {
    try {
      axios.get("http://localhost:8000/cab").then((res) => {
        setCabs(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCabs();
  }, []);

  const handlePopup = (cab) => {
    setSelectedCab(cab);
    setPopup(true);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filtered = Cabs.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.model.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const getStatusLabel = (status) => {
    return status === 0 ? (
      <span className="px-3 py-1 text-xs rounded-full bg-red-500 text-white">
        Not Available
      </span>
    ) : (
      <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white">
        Available
      </span>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {popup && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-80 z-40`}
        >
          <BookCab
            popup={popup}
            setPopup={setPopup}
            selectedCab={selectedCab}
          />
        </div>
      )}

      <div className="flex-grow">
        <div className="container border-b-2 border-primary flex justify-center gap-24">
          <img src={logo} alt="logos" height={70} width={70} />
          <h2 className="block text-2xl font-bold py-4">Available Cabs</h2>
        </div>
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
              <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-5">
                {filteredItems.map((val, i) => (
                  <div key={i} className="w-full">
                    <div
                      className={`border-2 rounded-lg p-3 capitalize flex flex-col items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-purple-400 ${
                        val.status === 0 ? "opacity-70 pointer-events-none" : ""
                      }`}
                    >
                      <img
                        src={`http://localhost:8000/${val.cimage}`}
                        alt="alt"
                        className="w-full h-36 object-cover mb-4 rounded-md"
                      />
                      <h2 className="text-xl font-bold capitalize text-white">
                        Cab name: {val.name}
                      </h2>
                      <p className="text-white">Capacity: {val.capacity}</p>
                      <p className="text-white">Model: {val.model}</p>
                      <p>Status: {getStatusLabel(val.status)}</p>
                      <button
                        className="border rounded-md px-4 mt-4 bg-white py-2 text-purple-600"
                        onClick={() => handlePopup(val)}
                        disabled={val.status === 0}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No results found.</p>
          )
        ) : (
          <div className="flex-grow">
            <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center cursor-pointer">
              {Cabs.map((val, i) => (
                <div key={i} className="w-full">
                  <div
                    className={`rounded-lg p-3 capitalize flex flex-col items-center bg-gray-100 border-2 hover:translate-y-0.5 ${
                      val.status === 0 ? "opacity-70 pointer-events-none" : ""
                    }`}
                    onClick={() => handlePopup(val)}
                  >
                    <img
                      src={`http://localhost:8000/${val.cimage}`}
                      alt="alt"
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <div className="">
                      <h2 className=" font-bold capitalize">
                        <span className="font-bold">Cab Name:</span> {val.name}
                      </h2>
                      <p>
                        <span className="font-bold">Capacity:</span>{" "}
                        {val.capacity}
                      </p>
                      <p>
                        <span className="font-bold">Model:</span> {val.model}
                      </p>
                      <p>
                        <span className="font-bold">Status:</span>{" "}
                        {getStatusLabel(val.status)}
                      </p>
                      <button
                        className="border rounded-md px-4 mt-4 bg-white py-2 text-blue-600"
                        disabled={val.status === 0}
                      >
                        Book Now
                      </button>
                    </div>
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
