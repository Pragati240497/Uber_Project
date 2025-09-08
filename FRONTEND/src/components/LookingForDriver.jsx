import React from "react";
import PropTypes from "prop-types";

const LookingForDriver = ({
  setVehicleFound,
  pickup,
  destination,
  fare = {},
  vehicleType,
}) => {
  const calculatedFare = fare?.[vehicleType] ?? 0;

  return (
    <div className="relative p-4">
      {/* Close Button */}
      <button
        type="button"
        className="p-1 text-center w-[93%] absolute top-0 focus:outline-none"
        onClick={() => setVehicleFound(false)}
        aria-label="Close Looking For Driver Panel"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </button>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-5 text-center">
        Looking for a Driver
      </h3>

      {/* Content */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20 object-contain"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Car icon"
        />

        <div className="w-full mt-5">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-lg" />
            <div>
              <h3 className="text-lg font-medium">Pickup Location</h3>
              <p className="text-sm -mt-1 text-gray-600 truncate">{pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg" />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600 truncate">
                {destination}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-lg" />
            <div>
              <h3 className="text-lg font-medium">₹{calculatedFare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LookingForDriver.propTypes = {
  setVehicleFound: PropTypes.func.isRequired,
  pickup: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  fare: PropTypes.object,
  vehicleType: PropTypes.string.isRequired,
};

export default LookingForDriver;
