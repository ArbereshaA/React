import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    category_id: "",
    location_id: "",
    type: "",
    price: "",
    minarea: "",
    maxarea: "",
    bathroom: "",
    bedroom: "",
    properties_title: "",
    properties_description: "",
    nearby: "",
    currency: "",
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [floorDescriptions, setFloorDescriptions] = useState([""]);
  const [floorPhotos, setFloorPhotos] = useState([[]]);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(null);
  const [displayedPhotos, setDisplayedPhotos] = useState([]); // For displaying selected floor photos
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch categories and locations
  useEffect(() => {
    const fetchCategoriesAndLocations = async () => {
      try {
        const [categoryRes, locationRes] = await Promise.all([
          axios.get(`${backendUrl}/api/categories`),
          axios.get(`${backendUrl}/api/locations`),
        ]);
        setCategories(categoryRes.data);
        setLocations(locationRes.data);
      } catch (error) {
        console.error("Error fetching categories and locations:", error);
      }
    };

    fetchCategoriesAndLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedFileNames = [];

    for (const file of files) {
      const data = new FormData();
      data.append("photo", file);

      try {
        const response = await axios.post(`${backendUrl}/api/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedFileNames.push(response.data.filename);
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file");
        return;
      }
    }

    setUploadedPhotos(uploadedFileNames);
  };
  const handleFloorPhotoChange = async (e, index) => {
    const files = Array.from(e.target.files);
    const uploadedFileNames = [];

    for (const file of files) {
      const data = new FormData();
      data.append("photo", file);

      try {
        const response = await axios.post(`${backendUrl}/api/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedFileNames.push(response.data.filename);
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file");
        return;
      }
    }

    const updatedFloorPhotos = [...floorPhotos];
    updatedFloorPhotos[index] = uploadedFileNames;
    setFloorPhotos(updatedFloorPhotos);
  };
  const handleFloorDescriptionClick = (index) => {
    setSelectedFloorIndex(index);
    setDisplayedPhotos(floorPhotos[index] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyData = {
        ...formData,
        photos: uploadedPhotos,
        floor_description: floorDescriptions,
        // Ensure that floorPhotos is structured correctly
        floor_photos: floorPhotos,
      };

      const response = await axios.post(
        `${backendUrl}/api/properties`,
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Property created successfully!");
      navigate("/properties");
    } catch (error) {
      setMessage("Failed to create property.");
      console.error("Error creating property:", error);
    }
  };

  const addFloor = () => {
    setFloorDescriptions([...floorDescriptions, ""]);
    setFloorPhotos([...floorPhotos, []]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Property</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              name="location_id"
              value={formData.location_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="AED">AED</option>
            </select>
          </div>

          {[
            { label: "Type", name: "type" },
            { label: "Price", name: "price", type: "text" },
            { label: "Min Area", name: "minarea", type: "number" },
            { label: "Max Area", name: "maxarea", type: "number" },
            { label: "Bathrooms", name: "bathroom", type: "number" },
            { label: "Bedrooms", name: "bedroom", type: "number" },
            { label: "Title", name: "properties_title" },

            { label: "Nearby", name: "nearby", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description{" "}
          <span className="text-xs text-gray-600">
            Headings starts in new line with ##, bold with **
          </span>
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          onChange={handleInputChange}
          name="properties_description"
          value={formData.properties_description}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Floor Descriptions and Photos
          </h3>
          {floorDescriptions.map((description, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor Description
              </label>
              <input
                type="text"
                name="floor_description"
                value={description}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                onClick={() => handleFloorDescriptionClick(index)} // Set index when clicked
                onChange={(e) => {
                  const newDescriptions = [...floorDescriptions];
                  newDescriptions[index] = e.target.value;
                  setFloorDescriptions(newDescriptions);
                }}
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor Photos
              </label>
              <input
                type="file"
                name="floor_photos"
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={(e) => handleFloorPhotoChange(e, index)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addFloor}
            className="mt-2 bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Add Floor
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Floor Photos</h3>
          {displayedPhotos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {displayedPhotos.map((photo, idx) => (
                <img
                  key={idx}
                  src={`${backendUrl}/uploads/${photo}`}
                  alt={`Floor ${selectedFloorIndex + 1} Photo`}
                  className="w-full h-auto rounded"
                />
              ))}
            </div>
          ) : (
            <p>No photos available for this floor.</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        >
          Create Property
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;
