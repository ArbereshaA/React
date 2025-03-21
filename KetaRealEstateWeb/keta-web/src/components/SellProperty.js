import React from "react";
import { useState } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function SellProperty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyaddress: "",
    countrycity: "",
    message: "",
    imageproperty: [],
  });
  const [fileNames, setFileNames] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData({
      ...formData,
      imageproperty: [...formData.imageproperty, ...files],
    }); // Append new files to the existing array
    setFileNames([...fileNames, ...files.map((file) => file.name)]); // Append file names
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = formData.imageproperty.filter(
      (_, index) => index !== indexToRemove
    ); // Remove the file at the index
    const updatedFileNames = fileNames.filter(
      (_, index) => index !== indexToRemove
    ); // Remove the corresponding file name
    setFormData({ ...formData, imageproperty: updatedFiles });
    setFileNames(updatedFileNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("propertyaddress", formData.propertyaddress);
    data.append("countrycity", formData.countrycity);
    data.append("message", formData.message);
    formData.imageproperty.forEach((file) => {
      data.append("file", file);
    });

    try {
      // Send the form data to the server
      const response = await axios.post(
        `${backendUrl}/api/send-email-with-file`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Email sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyaddress: "",
        country: "",
        message: "",
        imageproperty: [],
      });
      setFileNames([]);
    } catch (error) {
      console.error("Error sending email", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div className="bg-custom-color">
      {/* Main Section */}
      <div className="relative h-[400px] md:h-[500px]">
        {/* Main background photo */}
        <img
          src={require("../assets/propertyimg.png")}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text overlay, centered and responsive */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 text-center p-4">
          {/* Large text */}
          <p className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold font-montserrat">
            LIST YOUR PROPERTY
          </p>
          {/* Secondary navigation */}
          <p className="text-white text-xs sm:text-sm md:text-lg font-montserrat">
            <a href="/"> HOME</a>{" "}
            <span className="mx-2 pr-3 pl-3 font-montserrat">|</span> SELL YOUR
            PROPERTY
          </p>
        </div>
      </div>
      {/* Main Content with Image and Text Overlay */}
      <div className="mt-16 flex items-center justify-center pb-4 px-14">
        <div className="ml-10 border-t border-white flex-grow"></div>
        <p className="uppercase text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat text-white uppercase">
          sell your property
        </p>
        <div className="ml-10 border-t border-white flex-grow"></div>
      </div>
      <div className="mt-8 md:mt-16 flex items-center justify-center pb-4">
        <div className="container mx-auto py-12 px-4 sm:px-6 flex flex-col md:flex-row justify-center items-start">
          <div className="relative flex flex-col justify-start text-white text-lg leading-relaxed max-w-3xl">
            {/* Image Section */}
            <div className="relative">
              <img
                src={require("../assets/property2.png")}
                alt="Property"
                className="w-full"
              />

              {/* Overlay Text - Centered */}
              <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-montserrat text-center">
                LIST, SELL & SUCCEED WITH US
              </p>
            </div>

            {/* Text Content Section */}
            <div className="mt-6 text-gray-400">
              <p className="mb-4">
                KETA is your premier partner in the real estate market. Our team
                is committed to maximizing your returns and providing a
                seamless, successful experience.
              </p>
              <p className="mt-4">
                Whether you are looking to buy, sell, or invest, we are here to
                guide you every step of the way.
              </p>
              <p className="mt-4">
                With KETA, you gain access to an extensive portfolio of
                properties, expert market insights, and personalized service
                tailored to your unique needs.
              </p>
              <p className="mt-4">
                Our dedication to excellence ensures that every transaction is
                smooth and rewarding.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="container mx-auto py-12 px-4 sm:px-6 flex justify-center items-start mt-8 md:mt-0">
            <div className="border-t hidden md:block mx-6 border-l border-gray-400 h-[700px]"></div>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
              onSubmit={handleSubmit}
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white mb-1 font-montserrat"
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
                  className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              {/* Email Address Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-1 font-montserrat"
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
                  className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Your Email Address"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white mb-1 font-montserrat"
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
                  className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="+41...."
                />
              </div>

              {/* Property Address Field */}
              <div>
                <label
                  htmlFor="propertyaddress"
                  className="block text-white mb-1 font-montserrat"
                >
                  Property Address
                </label>
                <input
                  required
                  type="text"
                  id="propertyaddress"
                  name="propertyaddress"
                  value={formData.propertyaddress}
                  onChange={handleChange}
                  className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Address"
                />
              </div>

              {/* Country / City Field */}
              <div>
                <label
                  htmlFor="countrycity"
                  className="block text-white mb-1 font-montserrat"
                >
                  Country / City
                </label>
                <input
                  required
                  type="text"
                  id="countrycity"
                  name="countrycity"
                  value={formData.countrycity}
                  onChange={handleChange}
                  className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="E.g. UAE / Dubai"
                />

                <div className="pt-9">
                  <label
                    htmlFor="message"
                    className="block text-white mb-1 font-montserrat"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-10 px-3 rounded-md bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Add more information"
                  ></textarea>
                </div>
              </div>

              {/* Drag and Drop File Upload */}
              <div className="text-white font-montserrat">
                Images Of Your Property{" "}
                <span className="text-gray-400 text-xs"> *Optional</span>
                <div className="flex items-center justify-center w-full h-64 bg-transparent border-2 border-dashed border-gray-400 rounded-lg">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>{" "}
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Drag and Drop</span> or
                      Choose Files
                    </p>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {fileNames.length > 0 && (
                  <div className="mt-2">
                    <ul className="text-sm text-gray-400">
                      {fileNames.map((fileName, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          {fileName}
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center mt-4 ">
                <button
                  type="submit"
                  className="bg-white text-custom-color font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellProperty;
