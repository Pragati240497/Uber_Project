import React from "react";

const WaitingForDriver = ({ ride, waitingForDriver }) => {
  const captain = ride?.captain;
  const vehicle = captain?.vehicle;

  return (
    <div className="relative p-3">
      {/* Close Button */}
      <button
        className="p-1 text-center w-full absolute top-0 left-0"
        onClick={() => waitingForDriver(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </button>

      {/* Driver Info */}
      <div className="flex items-center justify-between mt-10">
        <img
          className="h-12 w-12 object-cover rounded-full"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Driver vehicle"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {captain?.fullname?.firstname || "Driver"}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {vehicle?.plate || "XXXX"}
          </h4>
          <p className="text-sm text-gray-600">{vehicle?.model || "Vehicle"}</p>
          <h1 className="text-lg font-semibold">{ride?.otp || "----"}</h1>
        </div>
      </div>

      {/* Ride Info */}
      <div className="flex flex-col gap-2 justify-between items-center w-full mt-5">
        {/* Pickup */}
        <div className="flex items-center gap-5 p-3 border-b-2 w-full">
          <i className="ri-map-pin-user-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">{ride?.pickup || "N/A"}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-5 p-3 border-b-2 w-full">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">{ride?.destination || "N/A"}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-5 p-3 w-full">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare || 0}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
