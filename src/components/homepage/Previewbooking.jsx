import React from "react";

const Previewbooking = ({
  showPreview,
  setShowPreview,
  selectedCab,
  selectedSourceDestination,
  km,
  unitPrice,
}) => {
  // Calculate total fare
  const totalFare = km * unitPrice;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-200 h-fit border-2 border-primary p-8 w-full max-w-md">
          <h1 className="font-bold text-primary text-2xl mb-4">
            Preview Your Booking
          </h1>
          {selectedCab && (
            <div className="mb-4">
              <div className="">
                <img
                  src={`http://localhost:8000/${selectedCab.image}`}
                  alt="imag"
                  className="mx-auto p-3 border border-primary h-36 w-36"
                />
              </div>
              <p className="text-lg">Selected Cab: {selectedCab.name}</p>
              <p className="text-lg">Driver Name: {selectedCab.dname}</p>
              <p className="text-lg">
                Status:{" "}
                {selectedCab.status === 1 ? "Available" : "Not Available"}
              </p>
              <p className="text-lg">Km: {km} km</p>
              <p className="text-lg">Total Fare: Rs. {totalFare}</p>
              {/* Add more fields as per your cab data */}
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center">
            <button
              type="button"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0 sm:mr-2"
              onClick={() => setShowPreview(false)}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Previewbooking;
