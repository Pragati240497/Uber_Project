import React, { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import PropTypes from "prop-types";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 19.076, // Mumbai
  lng: 72.8777,
};

function MapWithMarker({ location, profileImage }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Ensure Google Maps API and AdvancedMarkerElement are available
    if (!window.google || !window.google.maps?.marker) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    if (mapRef.current && location) {
      // Remove old marker if exists
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }

      // Create custom HTML marker content
      const customMarker = document.createElement("div");
      Object.assign(customMarker.style, {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      });

      const img = document.createElement("img");
      img.src = profileImage || "https://i.pravatar.cc/100"; // fallback avatar
      Object.assign(img.style, {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });

      customMarker.appendChild(img);

      // Add Advanced Marker
      markerRef.current = new AdvancedMarkerElement({
        position: location,
        map: mapRef.current,
        content: customMarker,
      });
    }

    // Cleanup marker on unmount or location change
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [location, profileImage]);

  return (
    <GoogleMap
      onLoad={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={containerStyle}
      center={location || defaultCenter}
      zoom={location ? 15 : 10}
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID} // Required for Advanced Markers
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    />
  );
}

MapWithMarker.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  profileImage: PropTypes.string,
};

export default MapWithMarker;
