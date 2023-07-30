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

  return (
    <div className="relative h-full">
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

      <div className="bg-slate-100 h-full">
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
              <div className="py-5 grid grid-cols-3 gap-4 ml-5">
                {filteredItems.map((val, i) => (
                  <div key={i}>
                    <div className="border w-64 rounded-lg px-3 capitalize">
                      <img
                        src={`http://localhost:8000/${val.cimage}`}
                        alt="alt"
                        className="w-full h-36  border-b-2 border-primary rounded-lg"
                      />
                      <h2 className="py-2 capitalize font-bold">
                        Cab name: {val.name}
                      </h2>
                      <p className="text-slate-600">Capacity: {val.capacity}</p>
                      <p className="text-slate-600">model: {val.model}</p>
                      <p className="text-slate-600">
                        Status:{" "}
                        {val.status === 1 ? "Available" : "Not Available"}
                      </p>
                      <button
                        className="border rounded-md px-4 bg-primary py-2 text-white"
                        onClick={() => handlePopup(val)}
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
          <div>
            <div className="py-5 px-5 grid grid-cols-3 gap-4 justify-items-center cursor-pointer">
              {Cabs.map((val, i) => (
                <div key={i}>
                  <div
                    className="border w-64 rounded-lg capitalize pb-4"
                    onClick={() => handlePopup(val)}
                  >
                    <img
                      src={`http://localhost:8000/${val.cimage}`}
                      alt="alt"
                      className="w-full h-36 border-b-2 border-primary rounded-tr-lg rounded-tl-lg"
                    />
                    <div className="px-3 text-slate-700">
                      <h2 className="pt-4 capitalize">
                        <span className="font-bold">Cabname</span>: {val.name}
                      </h2>
                      <p>
                        <span className="font-bold">Capacity</span>:{" "}
                        {val.capacity}
                      </p>
                      <p>
                        <span className="font-bold">Model</span>: {val.model}
                      </p>
                      <button className="border rounded-md px-4 bg-primary py-2 text-white">
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
