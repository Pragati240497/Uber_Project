import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_LIBRARIES } from "../components/googleMapConfig";

const MapContext = createContext();

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Helper function to assign map instance safely
  const setMapInstance = useCallback((mapInstance) => {
    mapRef.current = mapInstance;
    setMapLoaded(!!mapInstance);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAP_LIBRARIES}
      onLoad={() => setMapLoaded(true)}
      onError={(error) => console.error("Google Maps failed to load:", error)}
    >
      <MapContext.Provider value={{ mapRef, mapLoaded, setMapLoaded, setMapInstance }}>
        {children}
      </MapContext.Provider>
    </LoadScript>
  );
};

export default MapProvider;
