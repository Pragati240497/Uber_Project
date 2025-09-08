import React from "react";

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, fare = {} }) => {
  // Helper array to map vehicle details dynamically
  const vehicles = [
    {
      id: "car",
      name: "UberGo",
      capacity: 4,
      eta: "2 mins away",
      desc: "Affordable, compact rides",
      img: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
      price: fare.car || 0,
    },
    {
      id: "moto",
      name: "Moto",
      capacity: 1,
      eta: "3 mins away",
      desc: "Affordable motorcycle rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      price: fare.moto || 0,
    },
    {
      id: "auto",
      name: "UberAuto",
      capacity: 3,
      eta: "3 mins away",
      desc: "Affordable Auto rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      price: fare.auto || 0,
    },
  ];

  const handleVehicleClick = (vehicleId) => {
    setConfirmRidePanel(true);
    selectVehicle(vehicleId);
  };

  return (
    <div>
      {/* Close panel button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      {/* Dynamic rendering of vehicles */}
      {vehicles.map((v) => (
        <div
          key={v.id}
          onClick={() => handleVehicleClick(v.id)}
          className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer"
        >
          <img className="h-10" src={v.img} alt={v.name} />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              {v.name} <span><i className="ri-user-3-fill"></i>{v.capacity}</span>
            </h4>
            <h5 className="font-medium text-sm">{v.eta}</h5>
            <p className="font-normal text-xs text-gray-600">{v.desc}</p>
          </div>
          <h2 className="text-lg font-semibold">₹{v.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;
