import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BedIcon from "../assets/BedIcon.svg";
import ToiletIcon from "../assets/ToiletIcon.svg";
import LocationIcon from "../assets/LocationIcon.svg";
import RightSightPhoto from "../assets/RighSightPhoto.svg";
import Background from "../assets/prop-about-background.png";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get("searchTerm") || "");
    setSelectedCategory(searchParams.get("selectedCategory") || "");
    setSelectedLocation(searchParams.get("selectedLocation") || "");

    const fetchProperties = async () => {
      try {
        const propertyResponse = await axios.get(
          `${backendUrl}/api/properties`
        );
        // console.log(propertyResponse.data);
        setProperties(propertyResponse.data);
      } catch (error) {
        // console.error("Error fetching properties:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          `${backendUrl}/api/categories`
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        // console.error("Error fetching categories:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const locationResponse = await axios.get(`${backendUrl}/api/locations`);
        setLocations(locationResponse.data);
      } catch (error) {
        // console.error("Error fetching locations:", error);
      }
    };

    fetchProperties();
    fetchCategories();
    fetchLocations();
  }, []);

  // Filter properties based on search term, selected category, or selected location
  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      selectedCategory === "" || property.category_name === selectedCategory;
    const matchesLocation =
      selectedLocation === "" || property.location_name === selectedLocation;
    const matchesSearchTerm =
      property.properties_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.category_name.toLowerCase().includes(searchTerm.toLowerCase());

    // Return properties that match at least one of the criteria
    return matchesCategory && matchesLocation && matchesSearchTerm;
  });

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties2/${propertyId}`);
  };

  return (
    <div className="bg-custom-color font-montserrat">
      {/* Main Section */}
      <div className="relative h-[400px]">
        <img
          src={Background}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 text-center">
          <p className="text-white text-4xl md:text-5xl font-semibold">
            PROPERTIES
          </p>
          <p className="text-white text-sm md:text-lg">
            <a href="/"> HOME</a>
            <span className="mx-2 pr-3 pl-3">|</span>
            <a href="/about">ABOUT US</a>
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-6 text-black font-montserrat">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border rounded-full bg-white text-custom-color w-full sm:w-60"
        >
          <option value="">Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.location_name}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-full bg-white text-custom-color w-full sm:w-60"
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
              className="font-montserrat"
            >
              {category.category_name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, cat...."
          className="px-4 py-2 border rounded-full bg-white text-custom-color w-full sm:w-60"
        />
        <button className="px-6 py-2 bg-white text-custom-color rounded-full">
          Search
        </button>
      </div>

      {/* Properties List (Vertical Layout) */}
      <div className="flex flex-col space-y-4 px-4 sm:px-12 py-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property.id}
              className="border-t border-white flex flex-col sm:flex-row sm:space-x-4 pb-2"
            >
              <div
                className="bg-custom-color flex flex-col sm:flex-row items-center justify-between p-4 cursor-pointer mt-5 sm:mt-0"
                onClick={() => handlePropertyClick(property.id)}
              >
                {/* Property Image */}
                <div className="flex-shrink-0 border rounded w-full sm:w-auto">
                  {property.photos && property.photos.length > 0 ? (
                    <img
                      src={`${backendUrl}/uploads/${property.photos[0]}`}
                      alt="Property"
                      className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] object-cover rounded-lg sm:w-64"
                    />
                  ) : (
                    <div className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-gray-300 flex items-center justify-center text-white rounded-lg sm:w-64">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="mt-4 sm:mt-0 sm:ml-4 w-full flex flex-col">
                  <p className="text-lg font-semibold text-white text-center sm:text-left">
                    {property.properties_title}
                  </p>
                  <p className="text-sm font-semibold text-white text-center sm:text-left">
                    {property.currency} {property.price}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start text-gray-300 mt-2 flex-wrap space-x-2">
                    <p>{property.type}</p>
                    <span>|</span>
                    <img src={BedIcon} alt="bed-icon" className="h-5" />
                    <p>{property.bedroom}</p>
                    <img src={ToiletIcon} alt="toilet-icon" className="h-5" />
                    <p>{property.bathroom}</p>
                    <span>|</span>
                    <p>
                      {" "}
                      {new Intl.NumberFormat("en-US").format(
                        property.maxarea
                      )}{" "}
                      m²
                    </p>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start text-gray-400 mt-2 flex-wrap">
                    <img
                      src={LocationIcon}
                      alt="location-icon"
                      className="h-5 mr-2"
                    />
                    <p>{property.location_name}</p>
                  </div>
                </div>

                {/* Right Side Button */}
                <div className="mt-4 sm:mt-0">
                  <button className="bg-[#194f63] p-1 rounded-full">
                    <img src={RightSightPhoto} alt="right-sight" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No properties found</p>
        )}
      </div>
    </div>
  );
}

export default Properties;
