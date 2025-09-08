import React from "react";
import { motion } from "framer-motion";

const RidePopUp = ({ 
    ride, 
    setRidePopupPanel, 
    setConfirmRidePopupPanel, 
    confirmRide 
}) => {
    
    // Graceful fallback in case ride data is missing
    if (!ride) {
        return (
            <div className="p-4 text-center">
                <p className="text-gray-600">No ride data available.</p>
            </div>
        );
    }

    const {
        user,
        pickup,
        destination,
        fare,
        distance = "N/A",
        paymentMethod = "Cash"
    } = ride;

    const handleAcceptRide = () => {
        setConfirmRidePopupPanel(true);
        confirmRide();
    };

    const handleIgnoreRide = () => {
        setRidePopupPanel(false);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-md p-4"
        >
            {/* Close button */}
            <button
                aria-label="Close ride popup"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={handleIgnoreRide}
            >
                <i className="ri-close-line text-2xl"></i>
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-center">
                New Ride Available!
            </h3>

            {/* Rider Info */}
            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={
                            user?.profilePic ||
                            "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        }
                        alt={`${user?.fullname?.firstname || ""}'s profile`}
                    />
                    <h2 className="text-lg font-medium">
                        {user?.fullname?.firstname || ""}{" "}
                        {user?.fullname?.lastname || ""}
                    </h2>
                </div>
                <h5 className="text-lg font-semibold">{distance}</h5>
            </div>

            {/* Ride Details */}
            <div className="mt-5 w-full">
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-user-fill text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-600">Pickup</p>
                        <h3 className="text-lg font-medium">{pickup}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-2-fill text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-600">Drop</p>
                        <h3 className="text-lg font-medium">{destination}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3">
                    <i className="ri-currency-line text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-600">Fare</p>
                        <h3 className="text-lg font-medium">₹{fare}</h3>
                        <p className="text-sm text-gray-500">{paymentMethod}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col gap-2">
                <button
                    onClick={handleAcceptRide}
                    className="bg-green-600 w-full text-white font-semibold p-2 rounded-lg hover:bg-green-700"
                >
                    Accept
                </button>
                <button
                    onClick={handleIgnoreRide}
                    className="bg-gray-300 w-full text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-400"
                >
                    Ignore
                </button>
            </div>
        </motion.div>
    );
};

export default RidePopUp;
