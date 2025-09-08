import React from "react";
import PropTypes from "prop-types";

const LocationSearchPanel = ({
  suggestions = [],
  handleSuggestionClick,
  setPanelOpen,
  setVehiclePanel,
  setPickup,
  setDestination,
  activeField,
}) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return null; // No suggestions to render
  }

  return (
    <div>
      {suggestions.map((suggestion, index) => {
        const label =
          typeof suggestion === "string"
            ? suggestion
            : suggestion.description || "Unnamed Location";

        return (
          <button
            key={suggestion.place_id || index}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex gap-4 border-2 p-3 border-gray-50 hover:border-black rounded-xl items-center my-2 justify-start cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-black"
          >
            <span className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill" aria-hidden="true"></i>
            </span>
            <span className="font-medium truncate">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

LocationSearchPanel.propTypes = {
  suggestions: PropTypes.array.isRequired,
  handleSuggestionClick: PropTypes.func.isRequired,
};

export default LocationSearchPanel;
