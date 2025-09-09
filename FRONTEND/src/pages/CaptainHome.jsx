import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { SocketContext } from '../Context/SocketContext';
import { CaptainDataContext } from "../Context/CaptainContext";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import LiveTracking from '../components/LiveTracking'; // Same component as Home.jsx

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // Get & share captain location and listen for new rides
  useEffect(() => {
    if (!captain?._id || !socket) return;

    // Emit join event for captain
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    let locationUpdateTimeout;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const location = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setCaptainLocation(location);
            socket.emit('update-location-captain', { userId: captain._id, location });
            locationUpdateTimeout = setTimeout(updateLocation, 10000);
          },
          (err) => {
            if (err.code === 3 && err.message.includes('Timeout')) {
              locationUpdateTimeout = setTimeout(updateLocation, 5000);
            } else {
              locationUpdateTimeout = setTimeout(updateLocation, 15000);
            }
          },
          { enableHighAccuracy: false, maximumAge: 10000, timeout: 20000 }
        );
      }
    };

    updateLocation();

    // Listen for new-ride event
    const handleNewRide = (data) => {
      setRide(data);
      setRideRequests((prev) => [...prev, data]);
      setRidePopupPanel(true);
    };
    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
      if (locationUpdateTimeout) clearTimeout(locationUpdateTimeout);
    };
  }, [socket, captain]);

  // Confirm ride API
  const confirmRide = async () => {
    if (!ride) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id, captainId: captain._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (err) {
      console.error('Error confirming ride:', err);
    }
  };

  // Reject ride
  const rejectRide = async () => {
    if (!ride) return;
    try {
      socket.emit('reject-ride', { rideId: ride._id, captainId: captain._id });
      setRidePopupPanel(false);
      setRide(null);
    } catch (err) {
      console.error('Error rejecting ride:', err);
    }
  };

  // GSAP animations
  const animatePanel = useCallback((ref, show) => {
    if (!ref.current) return;
    gsap.to(ref.current, { transform: show ? 'translateY(0)' : 'translateY(100%)', duration: 0.3 });
  }, []);

  useGSAP(() => animatePanel(ridePopupPanelRef, ridePopupPanel), [ridePopupPanel]);
  useGSAP(() => animatePanel(confirmRidePopupPanelRef, confirmRidePopupPanel), [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-10">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link to="/" className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Google Map Section (Same as Home.jsx) */}
      <div className="h-3/5 w-full">
        <LiveTracking 
          captainLocation={captainLocation}
          rideRequests={rideRequests}
          showRideMarkers // You’ll need to support this prop inside LiveTracking
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div ref={ridePopupPanelRef} className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg">
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg">
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
