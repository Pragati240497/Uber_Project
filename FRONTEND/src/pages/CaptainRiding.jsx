import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  // Animate finish ride panel
  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative flex flex-col justify-end">
      
      {/* Header */}
      <div className="fixed top-0 w-screen p-6 flex items-center justify-between bg-transparent z-50">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Ride Action Panel */}
      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 cursor-pointer"
        onClick={() => setFinishRidePanel(true)}
      >
        <h5 className="absolute top-0 w-[90%] text-center p-1">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold px-10 py-3 rounded-lg">
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 w-full z-[500] translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

      {/* Live Tracking Map */}
      <div className="fixed top-0 w-screen h-screen z-[-1]">
        <LiveTracking />
      </div>
    </div>
  );
};

export default CaptainRiding;
