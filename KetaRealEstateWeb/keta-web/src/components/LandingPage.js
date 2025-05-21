import React from "react";
import Sobha from "../assets/Sobha.png";
import R from "../assets/rPartner.png";
import Omniyat from "../assets/omniyatPartner.png";
import Emar from "../assets/emarPartner.png";
import Group85 from "../assets/Group 85.svg";
import Investment from "../assets/Investment.svg";
import MaskGroup from "../assets/Mask group.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const formatText = (text) => {
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

function LandingPage() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // State to store the fetched posts
  const [loading, setLoading] = useState(false); // To handle loading state
  const location = useLocation();
  const carouselExploreRef = useRef(null);
  const [currentExploreSlide, setCurrentExploreSlide] = useState(0);
  const carouselRef = useRef(null); // Reference for the carousel component
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide

  const handleExploreSlideChange = (index) => {
    setCurrentExploreSlide(index);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      searchTerm: searchTerm || "",
      selectedCategory: selectedCategory || "",
      selectedLocation: selectedLocation || "",
    });

    navigate(`/properties?${searchParams.toString()}`);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index); // Update current slide state
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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
      const response = await fetch(`${backendUrl}/api/send-listproperty`, {
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
          phone: "",
          email: "",
          address: "",
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
    const fetchProperties = async () => {
      try {
        const propertyResponse = await axios.get(
          `${backendUrl}/api/properties`
        );
        // console.log(propertyResponse.data);
        setProperties(propertyResponse.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          `${backendUrl}/api/categories`
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const locationResponse = await axios.get(`${backendUrl}/api/locations`);
        setLocations(locationResponse.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/posts`);
        setPosts(response.data); // Assuming response.data contains the array of posts
        //console.log("postet", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    fetchCategories();
    fetchLocations();
    fetchPosts();
  }, []);

  const chunkProperties = (properties, size) => {
    const result = [];
    for (let i = 0; i < properties.length; i += size) {
      result.push(properties.slice(i, i + size));
    }
    return result;
  };

  const propertyChunks = chunkProperties(properties, 3);

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties2/${propertyId}`);
  };
  const handlePropertyClick2 = (blogId) => {
    navigate(`/BlogInfo/${blogId}`);
  };

  return (
    <div className="bg-custom-color font-montserrat">
      {/* Main Section */}
      {/* Background Section */}
      <div className="relative h-[600px]">
        <img
          src={require("../assets/Group 44.png")}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />
        {/* Overlay Section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4 md:px-8 lg:px-16">
          <div className="space-y-4">
            {/* Logo */}
            <img src={Group85} alt="Group 85" className="mx-auto" />
            {/* Subtitle */}
            <p className="text-white text-sm md:text-lg uppercase">
              SECURE YOUR FUTURE IN DUBAI
            </p>
          </div>
          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 py-6">
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, category, loca..."
              className="px-4 py-2 border rounded-full bg-white text-custom-color w-72"
            />
            {/* Location Dropdown */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-full bg-white text-custom-color w-60"
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
              className="px-4 py-2 border rounded-full bg-white text-custom-color w-60"
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-custom-color text-white rounded-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Explore Properties Section */}
      <div className="mt-16 flex items-center justify-center pb-4 px-14 relative">
        <p className="uppercase text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat text-white">
          Explore Our Properties
        </p>
        <div className="mr-20 border-t border-white flex-grow"></div>
        <button
          type="button"
          className="text-white text-lg pr-3"
          onClick={() =>
            carouselExploreRef.current.moveTo(currentExploreSlide - 1)
          }
        >
          &#10094;
        </button>
        <ul className="flex space-x-2">
          {propertyChunks.map((_, index) => (
            <li
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentExploreSlide === index ? "bg-white" : "bg-gray-500"
              } cursor-pointer`}
              onClick={() => carouselExploreRef.current.moveTo(index)}
            />
          ))}
        </ul>
        <button
          type="button"
          className="text-white text-lg pl-3"
          onClick={() =>
            carouselExploreRef.current.moveTo(currentExploreSlide + 1)
          }
          disabled={currentExploreSlide === propertyChunks.length - 1}
        >
          &#10095;
        </button>
      </div>
      {/* Property Carousel */}
      <div className="relative mt-8 z-10">
        {properties.length > 0 ? (
          <Carousel
            ref={carouselExploreRef}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            autoPlay={true}
            className="w-full"
            interval={4000}
            selectedItem={currentExploreSlide}
            showIndicators={false}
            showArrows={false}
            onChange={handleExploreSlideChange}
          >
            {propertyChunks.map((chunk, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 px-4 md:px-[50px]"
              >
                {chunk.map((property, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundImage: `url(${backendUrl}/uploads/${property.photos[0]})`,
                    }}
                    onClick={() => handlePropertyClick(property.id)}
                    className=" bg-cover bg-center h-64 w-full md:w-80 mb-4 md:mb-0 rounded-lg shadow-lg border-t border-l border-r "
                  >
                    {/* Property Content Here */}
                    <div className="p-4 text-white bg-custom-color rounded-[8px]">
                      <h3 className="text-lg font-semibold">
                        {property.category_name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-white text-center">No properties available.</p>
        )}
      </div>
      {/* Our Services Section */}
      <div className="mt-16 flex items-center justify-center pb-4">
        <div className="border-t border-white flex-grow mr-4 ml-20"></div>
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-white font-montserrat uppercase">
          Our Services
        </p>
        <div className="ml-10 border-t border-white flex-grow mr-20"></div>
      </div>
      <div className="flex flex-wrap justify-center p-6">
        {/* First Box */}
        <div className="p-4 text-center w-full sm:w-1/2 md:w-1/4">
          <div className="text-6xl mb-4">
            <img
              src={require("../assets/building.png")}
              className="mx-auto"
              alt="home Icon"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 text-white uppercase">
            Residential Properties
          </h3>
          <p className="mb-6 text-white">
            Embark on a journey to discover the finest residential properties in
            Dubai.
          </p>
        </div>

        {/* Second Box */}
        <div className="p-4 text-center w-full sm:w-1/2 md:w-1/4">
          <div className="text-6xl mb-4">
            <img
              src={require("../assets/building1.png")}
              className="mx-auto"
              alt="building Icon"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 text-white uppercase">
            Commercial Spaces
          </h3>
          <p className="mb-6 text-white">
            Unlock the potential of your business with our curated selection of
            prime commercial spaces.
          </p>
        </div>

        {/* Third Box */}
        <div className="p-4 text-center w-full sm:w-1/2 md:w-1/4">
          <div className="text-6xl mb-4">
            <img src={Investment} className="mx-auto" alt="grow Icon" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-white uppercase">
            Investment Opportunities
          </h3>
          <p className="mb-6 text-white">
            Position yourself for success with our expert insights into Dubai's
            real estate market.
          </p>
        </div>

        {/* Fourth Box */}
        <div className="p-4 text-center w-full sm:w-1/2 md:w-1/4">
          <div className="text-6xl mb-4">
            <img
              src={require("../assets/SVGRepo_iconCarrier.png")}
              className="mx-auto"
              alt="Alarm Icon"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 text-white uppercase">
            Property Management
          </h3>
          <p className="mb-6 text-white">
            Experience peace of mind with our comprehensive property management
            services.
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-center pb-4 bg-white">
        <div className="border-t border-custom-color flex-grow mr-4 ml-7"></div>
        <p className="py-12 text-lg md:text-xl lg:text-2xl font-light tracking-wider text-custom-color text-center font-montserrat">
          ABOUT US
        </p>
        <div className="border-t border-custom-color flex-grow ml-4 mr-7"></div>
      </div>
      <div className="h-auto px-7 bg-white">
        <div className="relative h-1/2 rounded-lg overflow-hidden mb-7 mx-auto flex justify-center items-center">
          <img src={MaskGroup} alt="Mask Group" className="mb-9" />
        </div>
      </div>

      <div className=" flex items-center justify-center pb-4">
        <div className="border-t border-whiter flex-grow mr-4 ml-7"></div>
        <p className="py-12 text-lg md:text-xl lg:text-2xl font-light tracking-wider text-white text-center font-montserrat">
          REASONS TO INVEST IN DUBAI
        </p>
        <div className="border-t border-white flex-grow ml-4 mr-7"></div>
      </div>
      <div
        className="p-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${require("../assets/writemsgbg.png")})`,
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
          {/* First Box */}
          <div className="p-4 flex flex-col items-center text-center min-h-[250px]">
            <img
              src={require("../assets/taxfee.png")}
              className="w-16 h-16 mb-4"
              alt="Tax Efficient Icon"
            />
            <h3 className="text-xl font-bold mb-4 text-white uppercase">
              TAX EFFICIENT
            </h3>
            <p className="text-white">
              Dubai provides a tax-free lifestyle for residents, with no Income
              Tax and no VAT on residential properties, making it ideal for
              investors.
            </p>
          </div>

          {/* Second Box */}
          <div className="p-4 flex flex-col items-center text-center min-h-[250px]">
            <img
              src={require("../assets/secureicon.png")}
              className="w-16 h-16 mb-4"
              alt="Secure Environment Icon"
            />
            <h3 className="text-xl font-bold mb-4 text-white uppercase">
              Secure Environment
            </h3>
            <p className="text-white">
              The UAE is among the world's safest countries, boasting a refined
              law enforcement system and low crime rates.
            </p>
          </div>

          {/* Third Box */}
          <div className="p-4 flex flex-col items-center text-center min-h-[250px]">
            <img
              src={require("../assets/premiumicon.png")}
              className="w-16 h-16 mb-4"
              alt="Premium Facilities Icon"
            />
            <h3 className="text-xl font-bold mb-4 text-white uppercase">
              Premium Facilities
            </h3>
            <p className="text-white">
              A community-centered environment with premium infrastructure,
              comprehensive legal systems, public transport, parks, and a
              variety of entertainment options.
            </p>
          </div>

          {/* Fourth Box */}
          <div className="p-4 flex flex-col items-center text-center min-h-[250px]">
            <img
              src={require("../assets/ueareidence.png")}
              className="w-16 h-16 mb-4"
              alt="UAE Residence Icon"
            />
            <h3 className="text-xl font-bold mb-4 text-white uppercase">
              UAE RESIDENCE VISA
            </h3>
            <p className="text-white">
              Available to UAE expats aged 55 and above who have lived in Dubai
              for more than 10 years.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        {/* Main Content Section */}
        <div className="mt-16 flex items-center justify-center pb-4 bg-white">
          <div className="container mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-start bg-white">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
              <div className="relative">
                <img
                  src={require("../assets/home3.png")}
                  alt="Property"
                  className="w-full object-cover rounded-lg"
                />
                <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-montserrat text-center text-white uppercase">
                  Our Experts Make Selling Easy and Fast
                </p>
              </div>
            </div>

            {/* Right Title and Form Section */}
            <div className="w-full md:w-1/2 pl-8">
              {/* Title with Borders */}
              <div className="flex items-center justify-center pb-4 pt-4">
                <div className="border-t border-custom-color flex-grow mr-4"></div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-custom-color font-montserrat uppercase">
                    List Your Property
                    <br />
                    <span className="text-center">Today</span>
                  </p>
                </div>

                <div className="border-t border-custom-color flex-grow ml-4"></div>
              </div>

              {/* Form Section */}
              <form
                className="grid grid-cols-1 gap-6 w-full mt-8"
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
                    className="w-full py-2 px-3 rounded-full bg-transparent border-l border-r border-t border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Additional Input Fields */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 rounded-full bg-transparent border-l border-r border-t border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none"
                    placeholder="+971 58 113 4252"
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
                    className="w-full py-2 px-3 rounded-full bg-transparent border-l border-r border-t border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none"
                    placeholder="my@gmail.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-custom-color mb-1 font-montserrat"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 rounded-full bg-transparent border-l border-r border-t border-custom-color text-gray-600 placeholder-gray-400 focus:outline-none"
                    placeholder="Your address"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-custom-color font-montserrat rounded-full text-white px-20 py-4"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between pb-4 px-4 md:px-14">
          <div className="flex items-center mb-4 md:mb-0">
            <p className="uppercase text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat text-white">
              Our Real Estate Blog
            </p>
          </div>

          {/* Separator */}
          <div className="hidden md:block mr-20 border-t border-white flex-grow"></div>

          {/* Arrows and Dots */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="text-white text-lg"
              onClick={() => carouselRef.current.moveTo(currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              &#10094;
            </button>

            <ul className="flex space-x-1">
              {posts.map((_, index) => (
                <li
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-gray-500"
                  } cursor-pointer`}
                  onClick={() => carouselRef.current.moveTo(index)}
                />
              ))}
            </ul>

            <button
              type="button"
              className="text-white text-lg"
              onClick={() => carouselRef.current.moveTo(currentSlide + 1)}
              disabled={currentSlide === posts.length - 1}
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="relative mt-8">
          {posts.length > 0 ? (
            <Carousel
              ref={carouselRef}
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
              autoPlay={true}
              className="w-full"
              interval={5000}
              selectedItem={currentSlide}
              showArrows={false}
              showIndicators={false}
              onChange={handleSlideChange}
            >
              {posts.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => handlePropertyClick2(blog.id)}
                  className="flex flex-col md:flex-row items-center p-2 md:p-4 border-b border-gray-600"
                >
                  {/* Image */}
                  <div className="relative flex flex-col items-center mb-2 md:mb-0 md:mr-4 w-full md:w-auto">
                    <img
                      src={`${backendUrl}${blog.photo_url}`}
                      alt={blog.title}
                      className="w-full h-40 md:h-64 md:w-64 object-cover rounded-lg"
                    />
                    <p className="absolute inset-0 flex items-center justify-center text-white px-2 py-1 bg-black bg-opacity-50 rounded text-sm">
                      {new Date(blog.date)
                        .toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/,/, "")}
                    </p>
                  </div>

                  {/* Title and Description */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-sm md:text-lg font-semibold text-white">
                      {blog.title}
                    </h3>
                    <p className="text-white text-xs md:text-sm mt-1">
                      {formatText(blog.metadescription.slice(0, 100))}...
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-white text-center">No posts available.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pb-8 px-4 text-center">
        {/* Title with lines on each side */}
        <div className="flex items-center w-full pb-4">
          <div className="border-t border-white flex-grow mr-4 ml-7"></div>
          <p className="py-12 text-lg md:text-xl lg:text-2xl font-light tracking-wider text-white font-montserrat uppercase">
            KETA REAL ESTATE BROCHURE
          </p>
          <div className="border-t border-white flex-grow ml-4 mr-7"></div>
        </div>

        {/* Paragraph below title */}
        <p className="text-white text-sm md:text-base max-w-2xl mb-6 font-light">
          Explore our latest brochure and get exclusive insights into Dubai's
          most luxurious properties, investment opportunities, and lifestyle
          offerings.
        </p>

        <a
          href="/test.pdf"
          download="Mytest.pdf"
          className="bg-white text-[#001F3F] font-semibold py-2 px-6 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
        >
          Download
        </a>
      </div>
      <div className=" flex items-center justify-center pb-4">
        <div className="border-t border-whiter flex-grow mr-4 ml-7"></div>
        <p className="py-12 text-lg md:text-xl lg:text-2xl font-light tracking-wider text-white text-center font-montserrat uppercase">
          our partners
        </p>
        <div className="border-t border-white flex-grow ml-4 mr-7"></div>
      </div>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        autoPlay={true}
        className="w-full"
        interval={5000}
        showArrows={true}
        showIndicators={false}
      >
        <div>
          <img
            src={Sobha}
            alt="Sobha"
            className="object-cover w-full h-72 md:h-[400px] lg:h-[500px] scale-50 "
          />
        </div>
        <div>
          <img
            src={Emar}
            alt="Emar"
            className="object-cover w-full h-72 md:h-[400px] lg:h-[500px] scale-50"
          />
        </div>
        <div>
          <img
            src={R}
            alt="R"
            className="object-cover w-full h-72 md:h-[400px] lg:h-[500px] scale-50"
          />
        </div>
        <div>
          <img
            src={Omniyat}
            alt="Omniyat"
            className="object-cover w-full h-72 md:h-[400px] lg:h-[500px] scale-50"
          />
        </div>
      </Carousel>
      <div className="mt-16 flex items-center justify-center pb-4">
        <div className="border-t border-white flex-grow mr-4 ml-20"></div>
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-white font-montserrat uppercase">
          Our companies
        </p>
        <div className="ml-10 border-t border-white flex-grow mr-20"></div>
      </div>

      <div className="flex flex-wrap justify-center p-6 font-montserrat">
        {/* First Box */}
        <a
          href="https://ketajob.ch/"
          className="p-4 text-center w-full sm:w-1/2 md:w-1/4 border-r "
        >
          <div>
            <h3 className="text-xl font-montserrat mb-4 text-gray-500 uppercase">
              RECRUITMENT
            </h3>
            <div className="text-6xl mb-4">
              <img
                src={require("../assets/ketajob.png")}
                className="mx-auto hover:scale-[1.07] transition-transform duration-300 scale-[0.7]"
                alt="Recruitment Icon"
              />{" "}
            </div>
          </div>
        </a>
        {/* Second Box */}
        <a
          href="https://ketapromo.com/"
          className="p-4 text-center w-full sm:w-1/2 md:w-1/4  border-r"
        >
          <div>
            <h3 className="text-xl mb-4 text-gray-500 uppercase">MARKETING</h3>
            <div className="text-6xl mb-4">
              <img
                src={require("../assets/PROMO LOGO WHITE.png")}
                className="mx-auto hover:scale-75 transition-transform duration-300 scale-50 "
                alt="Marketing Icon"
              />
            </div>
          </div>
        </a>{" "}
        {/* Third Box */}
        <a
          href="https://ketaimmotreu.ch/"
          className="p-4 text-center w-full sm:w-1/2 md:w-1/4 border-r "
        >
          <div>
            <h3 className="text-xl mb-4 text-gray-500 uppercase">FIDUCIARY</h3>
            <div className="text-6xl mb-4">
              <img
                src={require("../assets/LOGO WHITEimmotreu.png")}
                className="mx-auto hover:scale-75 transition-transform duration-300 scale-50"
                alt="Fiduciary Icon"
              />
            </div>
          </div>
        </a>
        {/* Fourth Box (No Border) */}
        <a
          href="https://ketacoin.io/"
          className="p-4 text-center w-full sm:w-1/2 md:w-1/4"
        >
          <div>
            <h3 className="text-xl mb-4 text-gray-500 uppercase">BLOCKCHAIN</h3>
            <div className="text-6xl mb-4">
              <img
                src={require("../assets/Logo white COIN.png")}
                className="mx-auto hover:scale-75 transition-transform duration-300 scale-50"
                alt="Blockchain Icon"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
