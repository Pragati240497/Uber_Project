import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMap } from "../Context/MapProvider";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Fallback location (Delhi)
const fallbackCenter = { lat: 28.6139, lng: 77.209 };

const LiveTracking = ({
  captainLocation,           // Optional: pass for captain mode
  rideRequests = [],         // Optional: array of { pickup: { lat, lng } }
  showRideMarkers = false    // Optional: true for captain mode
}) => {
  const { mapRef, setMapLoaded } = useMap();
  const [currentCenter, setCurrentCenter] = useState(fallbackCenter);
  const [geoError, setGeoError] = useState(null);

  // If no captainLocation passed, fall back to user's geolocation
  useEffect(() => {
    if (captainLocation) {
      setCurrentCenter(captainLocation);
      return;
    }

    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoError(null);
      },
      () => {
        setGeoError("Unable to retrieve your location.");
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [captainLocation]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {geoError && (
        <div style={{ color: "red", padding: "8px", background: "#fff" }}>
          {geoError}
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={14}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        onLoad={(map) => {
          mapRef.current = map;
          setMapLoaded(true);
        }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* Captain or User Marker */}
        <Marker
          position={currentCenter}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: { width: 40, height: 40 },
          }}
        />

        {/* Ride request pickup markers (for captain) */}
        {showRideMarkers &&
          rideRequests.map((req, idx) => (
            req.pickup?.lat && req.pickup?.lng && (
              <Marker
                key={idx}
                position={{ lat: req.pickup.lat, lng: req.pickup.lng }}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  scaledSize: { width: 40, height: 40 },
                }}
              />
            )
          ))}
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
