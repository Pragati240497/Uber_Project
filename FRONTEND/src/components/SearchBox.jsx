import React, { useEffect, useRef } from "react";
import { useMap } from "../Context/MapProvider";

const SearchBox = () => {
  const { mapRef } = useMap(); // shared map instance
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Ensure map and Google API are available
    if (!mapRef.current || !window.google?.maps?.places) return;

    // Initialize Autocomplete once
    if (!autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["geometry", "name"],
        types: ["geocode"], // change to ['establishment'] or other as needed
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry?.location) return;

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        // Smoothly move the map to selected location
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      });

      autocompleteRef.current = autocomplete;
    }

    // Cleanup listener on unmount
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [mapRef]);

  return (
    <div className="search-box">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search location..."
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          margin: "10px",
        }}
      />
    </div>
  );
};

export default SearchBox;
