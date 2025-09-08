import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;

    // Animate the finish ride panel using GSAP
    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)',
            duration: 0.3,
            ease: 'power2.out'
        });
    }, [finishRidePanel]);

    return (
        <div className="h-screen relative flex flex-col justify-end">
            {/* Top Header */}
            <div className="fixed top-0 w-full p-6 flex items-center justify-between bg-transparent z-10">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
                    title="Logout"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Ride Info Bar */}
            <div
                className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 pt-10 relative cursor-pointer"
                onClick={() => setFinishRidePanel(true)}
            >
                <h5 className="p-1 text-center w-[90%] absolute top-0">
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className="text-xl font-semibold">4 KM away</h4>
                <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg shadow-md hover:bg-green-700 transition">
                    Complete Ride
                </button>
            </div>

            {/* Finish Ride Panel */}
            <div
                ref={finishRidePanelRef}
                className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-2xl rounded-t-2xl"
            >
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>

            {/* Live Tracking Map */}
            <div className="h-screen fixed w-screen top-0 z-[-1]">
                <LiveTracking />
            </div>
        </div>
    );
};

export default CaptainRiding;
