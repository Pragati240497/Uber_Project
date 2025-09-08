import React, { useContext } from 'react';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainDetails = () => {
  const { captain, isLoading } = useContext(CaptainDataContext);

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading captain details...</p>;
  }

  if (!captain) {
    return <p className="text-center text-red-500">No captain data available</p>;
  }

  return (
    <div className="p-3">
      {/* Captain Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border border-gray-300"
            src={captain.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"}
            alt={`${captain.fullname.firstname}`}
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-semibold text-green-700">
            ₹{captain.earnings || 0}
          </h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Captain Stats */}
      <div className="flex p-4 bg-gray-100 rounded-xl justify-between items-center gap-5">
        <div className="text-center">
          <i className="text-3xl mb-1 ri-timer-2-line text-gray-700"></i>
          <h5 className="text-lg font-semibold">{captain.hoursOnline || 0}</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-1 ri-speed-up-line text-gray-700"></i>
          <h5 className="text-lg font-semibold">{captain.totalRides || 0}</h5>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-1 ri-star-line text-gray-700"></i>
          <h5 className="text-lg font-semibold">
            {captain.rating || 5.0} ⭐
          </h5>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
