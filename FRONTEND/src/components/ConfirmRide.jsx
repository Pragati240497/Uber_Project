import React from 'react';

const ConfirmRide = ({
    setConfirmRidePanel,
    pickup,
    destination,
    fare = {},
    vehicleType,
    setVehicleFound,
    createRide
}) => {
    const rideFare = fare?.[vehicleType] || 0;

    return (
        <div className="relative px-4 py-6">
            {/* Close / Collapse Button */}
            <h5
                className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
                onClick={() => setConfirmRidePanel(false)}
                title="Close"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5 text-center">Confirm your Ride</h3>

            <div className="flex flex-col items-center gap-4">
                {/* Vehicle Image */}
                <img
                    className="h-20 object-contain"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                    alt="Vehicle Preview"
                />

                {/* Ride Details */}
                <div className="w-full mt-5">
                    {/* Pickup */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-sm -mt-1 text-gray-600">{pickup || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-2-fill text-lg"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-sm -mt-1 text-gray-600">{destination || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line text-lg"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{rideFare}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={() => {
                        setVehicleFound(true);
                        setConfirmRidePanel(false);
                        createRide();
                    }}
                    className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition"
                >
                    Confirm Ride
                </button>
            </div>
        </div>
    );
};

export default ConfirmRide;
