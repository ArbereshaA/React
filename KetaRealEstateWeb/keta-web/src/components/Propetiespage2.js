import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import BedIcon from "../assets/BedIcon.svg";
import ToiletIcon from "../assets/ToiletIcon.svg";
import LocationIcon from "../assets/LocationIcon.svg";
import LeftSide from "../assets/LeftSide.svg";
import RightSide from "../assets/RightSide.svg";
import Belconblue from "../assets/BeIconblue.png";
import Bed from "../assets/bedblue.png";
import lociconblue from "../assets/lociconblue.png";

function Properties2() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [otherProperties, setOtherProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4; // Display 4 properties per page
  const totalPages = Math.ceil(otherProperties.length / propertiesPerPage);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(null);
  const carouselRef = useRef(null); // Reference for the carousel component
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/scheduletoure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          "Email sent successfully! We will reach out as soon as possible."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an issue sending your email. Please try again later");
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/properties/${id}`);
        //console.log(response.data);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    const fetchOtherProperties = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/properties`);
        setOtherProperties(response.data);
      } catch (error) {
        console.error("Error fetching other properties:", error);
      }
    };

    fetchProperty();
    fetchOtherProperties();
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  // Pagination logic to slice properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = otherProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePropertyClick = (propertyId) => {
    // Fetch the clicked property details and update the state
    const fetchClickedProperty = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/properties/${propertyId}`
        );
        setProperty(response.data); // Set the clicked property
        
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchClickedProperty();
  };

  const formatText = (text) => {
    if (!text) return null;

    // Split text into paragraphs by line breaks (\n)
    const paragraphs = text.split("\n");

    return paragraphs.map((paragraph, index) => {
      // Detect headings (e.g., if it starts with '##' or '**')
      if (paragraph.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl font-bold my-4 text-white">
            {paragraph.substring(2).trim()} {/* Remove '##' from the text */}
          </h2>
        );
      } else if (paragraph.startsWith("**")) {
        return (
          <strong key={index} className="block font-bold my-2 text-white">
            {paragraph.substring(2).trim()} {/* Remove '**' from the text */}
          </strong>
        );
      }

      // Otherwise, render it as a regular paragraph
      return (
        <p key={index} className="mb-4 text-gray-300">
          {paragraph.trim()}
        </p>
      );
    });
  };

  return (
    <div className="bg-custom-color font-montserrat">
      {/* Photo Carousel */}
      <div className="relative">
        {property.photos && property.photos.length > 0 ? (
          <Carousel
            ref={carouselRef}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            autoPlay={true}
            className="w-full"
          >
            {property.photos.map((photo, index) => (
              <div key={index}>
                <img
                  src={`${backendUrl}/uploads/${photo}`}
                  alt={`Property ${index + 1}`}
                  className="w-full object-cover"
                  style={{ height: "600px" }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No images available</p>
        )}

        {/* Overlay Property Title and Price */}
        <div className="absolute inset-0 flex flex-col justify-end text-white p-6 bg-gradient-to-t from-black via-transparent px-14">
          <h1 className="text-4xl font-bold">{property.properties_title}</h1>
          <p className="text-3xl mt-2">
            {property.currency} {property.price}
          </p>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="flex flex-wrap space-x-4 md:space-x-6 mt-4 text-white shadow-lg p-4 rounded-lg bg-transparent px-4 md:px-14">
        <div className="flex items-center space-x-2 md:space-x-4 scale-90 md:scale-100">
          <img src={BedIcon} alt="bed-icon" className="h-4 w-4 mr-1 md:mr-2" />
          <p className="mr-1 md:mr-4">{property.bedroom}</p>
          <img
            src={ToiletIcon}
            alt="toilet-icon"
            className="h-4 w-4 mr-1 md:mr-2"
          />
          <p className="mr-1 md:mr-4">{property.bathroom} |</p>
          <p className="mr-2 md:mr-6">
            {new Intl.NumberFormat("en-US").format(property.maxarea)} m²
          </p>
          <img
            src={LocationIcon}
            alt="location-icon"
            className="h-3 w-4 mr-1 md:mr-2"
          />
          <p className="text-sm md:text-lg">{property.location_name}</p>
        </div>
      </div>

      {/* Main Property Description */}
      <div className="mt-8 px-4 md:px-14">
        <h3 className="text-xl md:text-2xl text-white mb-4 underline">
          DESCRIPTION
        </h3>
        <p className="text-sm md:text-md text-white">
          {formatText(property.properties_description)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 px-4 md:px-14">
        {/* What's Nearby Section */}
        <div className="text-white">
          <h3 className="text-xl md:text-2xl mb-4 underline">WHAT'S NEARBY?</h3>
          <ol className="list-decimal ml-4 md:ml-6 list-none">
            {property.nearby.split(",").map((item, index) => (
              <li key={index} className="mb-2">
                {item.trim()}
              </li>
            ))}
          </ol>
        </div>

        {/* Floor Plans Section */}
        <div className="text-white">
          <h3 className="text-xl md:text-2xl mb-4 underline">Floor Plans</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.floor_description &&
              property.floor_description.map((description, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFloorIndex(index)}
                  className="bg-[#1e3a4a] text-white p-4 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] focus:bg-[#294e64] text-left"
                >
                  {description}
                </button>
              ))}
          </div>
        </div>

        {/* Display Floor Photos Based on Selected Floor Description */}
        <div className="text-white">
          <div className="mt-2">
            {selectedFloorIndex !== null && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(property.floor_photos[selectedFloorIndex]) ||
                typeof property.floor_photos[selectedFloorIndex] ===
                  "string" ? (
                  (typeof property.floor_photos[selectedFloorIndex] === "string"
                    ? property.floor_photos[selectedFloorIndex]
                        .replace(/[{}]/g, "") // Remove curly braces
                        .split(",") // Split by comma
                        .map((photo) => photo.trim()) // Trim whitespace
                    : property.floor_photos[selectedFloorIndex]
                  ).map((photoUrl, idx) => (
                    <img
                      key={idx}
                      src={`${backendUrl}/uploads/${photoUrl}`}
                      alt={`No images available`}
                      className="w-full max-w-xs rounded-lg shadow-md"
                    /> //console.log({`Floor ${selectedFloorIndex + 1} Photo ${idx + 1}`})
                  ))
                ) : (
                  <p className="text-white">
                    No photos available for this floor.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center pb-4 pt-20 px-4">
          <div className="border-t border-custom-color flex-grow mr-0 md:mr-4 md:ml-20"></div>
          <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-custom-color font-montserrat mt-4 md:mt-0">
            SCHEDULE A TOUR?
          </p>
          <div className="ml-0 md:ml-10 border-t border-custom-color flex-grow md:mr-20"></div>
        </div>

        <div className="mt-16 flex items-center justify-center pb-4 bg-white">
          <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col md:flex-row justify-between items-start bg-white">
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <div className="relative">
                <img
                  src={require("../assets/properties2.png")}
                  alt="Property"
                  className="w-full object-cover"
                />
                <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-montserrat text-center text-white uppercase px-2">
                  Our Experts will give you the perfect tour
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 pl-0 md:pl-8">
              <form
                className="grid grid-cols-1 gap-6 w-full"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full md:w-2/3 py-2 px-3 rounded-full bg-transparent border-t border-l border-r border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full md:w-2/3 py-2 px-3 rounded-full bg-transparent border-t border-l border-r border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="my@gmail.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Phone
                  </label>
                  <input
                    required
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full md:w-2/3 py-2 px-3 rounded-full bg-transparent border-t border-l border-r border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="+971 58 113 4252"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full md:w-2/3 py-6 px-3 rounded-lg bg-transparent border-t border-l border-r border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Add more information"
                  ></textarea>
                </div>

                <div className="flex justify-center md:justify-start px-7">
                  <button
                    type="submit"
                    className="bg-custom-color font-montserrat rounded-full text-white text-sm md:text-base px-12 md:px-[140px] py-4"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center pb-4 pt-20">
        <div className="border-t border-white flex-grow mr-4 ml-20"></div>
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-white font-montserrat uppercase">
          Check out more properties
        </p>
        <div className="ml-10 border-t border-white flex-grow mr-20"></div>
      </div>

      <div className=" relative mt-8 px-8 pb-8">
        <div className="relative mt-8 px-8 ">
          {/* Grid layout for properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProperties.map((property, index) => (
              <div
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
                key={index}
                onClick={() => handlePropertyClick(property.id)}
              >
                <img
                  src={`${backendUrl}/uploads/${property.photos[0]}`} // Assuming each property has at least one photo
                  alt={`Property ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />{" "}
                <div className="mt-2">
                  <h3 className="text-sm text-custom-color">
                    {property.properties_title}
                  </h3>
                  <p className="text-xs text-custom-color font-bold">
                    {property.currency} {property.price}
                  </p>

                  {/* Flex container for bedroom and bathroom data */}
                  <p className="text-xs text-custom-color flex items-center space-x-2  mb-2">
                    <img src={Bed} alt="bed-icon" className="h-3 w-3" />
                    {""}
                    <span>{property.bedroom}</span>
                    <img
                      src={Belconblue}
                      alt="toilet-icon"
                      className="h-3 w-3 mr-1 text-custom-color"
                    />
                    <span>{property.bathroom}</span>
                  </p>

                  {/* Flex container for location data */}
                  <p className="text-xs text-custom-color flex items-center">
                    <img
                      src={lociconblue}
                      alt="location-icon"
                      className="h-3 w-3 mr-1"
                    />
                    <span>{property.location_name}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Left and Right Arrow Buttons for Pagination */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1} // Disable if on the first page
            style={{ marginLeft: "-40px" }}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg ${
              currentPage === 1 ? " invisible" : "text-white"
            }`}
          >
            <img src={LeftSide}></img>
          </button>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages} // Disable if on the last page
            style={{ marginRight: "-40px" }}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg  ${
              currentPage === totalPages ? "invisible" : " text-white"
            }`}
          >
            <img className="ml-12 " src={RightSide}></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Properties2;
