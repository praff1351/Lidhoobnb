import React from "react";
import {
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property }) => {
  return (
<main className="flex justify-center items-start md:items-center px-4 py-10 min-h-screen">
<div className="w-full max-w-4xl mx-4 "> {/* Added max width and horizontal margin */}
        
        {/* Property Header */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-gray-500 mb-4">{property.type}</div>
          <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
          <div className="text-gray-500 mb-4 flex align-middle justify-center">
            <FaMapMarker className="text-orange-700 mt-1 mr-1" />
            <p className="text-orange-700">
              {property.location.street}, {property.location.city}{" "}
              {property.location.state}, {property.location.zipcode}
            </p>
          </div>

          {/* Rates & Options */}
          <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 rounded">
            Rates & Options
          </h3>
          <div className="flex flex-col md:flex-row justify-around max-w-2xl mx-auto"> {/* Centered the rates container */}
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Nightly</div>
              <div className="text-2xl font-bold text-slate-500">
                {property.rates.nightly ? (
                  `$${property.rates.nightly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Weekly</div>
              <div className="text-2xl font-bold text-slate-500">
                {property.rates.weekly ? (
                  `$${property.rates.weekly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold">Monthly</div>
              <div className="text-2xl font-bold text-slate-500">
                {property.rates.monthly ? (
                  `$${property.rates.monthly.toLocaleString()}`
                ) : (
                  <FaTimes className="text-red-700" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description & Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6 text-center md:text-left">Description & Details</h3>
          <div className="flex justify-center gap-8 text-blue-500 mb-4 text-xl"> {/* Increased gap and centered */}
            <p className="flex items-center">
              <FaBed className="mr-2"/> 
              {property.beds}
              <span className="hidden sm:inline ml-1">Beds</span>
            </p>
            <p className="flex items-center">
              <FaBath className="mr-2"/> 
              {property.baths}
              <span className="hidden sm:inline ml-1">Baths</span>
            </p>
            <p className="flex items-center">
              <FaRulerCombined className="mr-2"/>
              {property.square_feet}
              <span className="hidden sm:inline ml-1">sqft</span>
            </p>
          </div>
          <p className="text-gray-500 mb-4 text-center md:text-left">{property.description}</p>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold mb-6 text-center md:text-left">Amenities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none gap-2 justify-items-center md:justify-items-start"> {/* Centered on mobile */}
            {property.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <FaCheck className="text-green-600 mr-2"/> 
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
         <PropertyMap property={property}/>
      </div>
      </div>
    </main>
  );
};

export default PropertyDetails;