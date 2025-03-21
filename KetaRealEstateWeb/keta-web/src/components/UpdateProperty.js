import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    floor_description: "",
    floor_photos: [], // Initialize floor_photos as an array to store multiple floor photos
    nearby: "",
    currency: "",
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const [categoryRes, locationRes, propertyRes] = await Promise.all([
          axios.get(`${backendUrl}/api/categories`),
          axios.get(`${backendUrl}/api/locations`),
          axios.get(`${backendUrl}/api/properties/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCategories(categoryRes.data);
        setLocations(locationRes.data);
        const propertyData = propertyRes.data;
        setFormData({
          ...propertyData,
          floor_photos: propertyData.floor_photos || [],
          photos: propertyData.photos || [],
        });
        setUploadedPhotos(propertyData.photos || []);
      } catch (error) {
        setMessage("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const updatedPhotos = [...uploadedPhotos];

    for (const file of files) {
      const data = new FormData();
      data.append("photo", file);

      try {
        const response = await axios.post(`${backendUrl}/api/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updatedPhotos.push(response.data.filename);
      } catch (error) {
        setMessage("Error uploading file");
        console.error("Error uploading file:", error);
        return;
      }
    }

    // Set the newly uploaded photos to the state
    setUploadedPhotos(updatedPhotos);
  };

  const handleFloorPhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    const updatedFloorPhotos = [...formData.floor_photos];

    for (const file of files) {
      const data = new FormData();
      data.append("photo", file);

      try {
        const response = await axios.post(`${backendUrl}/api/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updatedFloorPhotos.push(response.data.filename);
      } catch (error) {
        setMessage("Error uploading floor photo");
        console.error("Error uploading floor photo:", error);
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      floor_photos: updatedFloorPhotos,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyData = {
        ...formData,
        photos: uploadedPhotos,
        floor_photos: formData.floor_photos,
      };

      await axios.put(
        `http://localhost:4000/api/properties/${id}`,
        propertyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Property updated successfully!");
      navigate("/admin");
    } catch (error) {
      setMessage("Failed to update property.");
      console.error("Error updating property:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
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

          {[
            { label: "Type", name: "type" },
            { label: "Price", name: "price", type: "text" },
            { label: "Min Area", name: "minarea", type: "number" },
            { label: "Max Area", name: "maxarea", type: "number" },
            { label: "Bathrooms", name: "bathroom", type: "number" },
            { label: "Bedrooms", name: "bedroom", type: "number" },
            { label: "Title", name: "properties_title" },
            { label: "Nearby", name: "nearby", type: "text" },
            //{ label: "Description", name: "properties_description" },
            { label: "Floor Description", name: "floor_description" },
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
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AED">AED</option>
              {/* Add other currency options as needed */}
            </select>
          </div>
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
            Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2 flex flex-wrap">
            {uploadedPhotos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:4000/uploads/${photo}`}
                alt="Property"
                className="w-20 h-20 object-cover mr-2 mb-2 rounded"
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Floor Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handleFloorPhotoChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2 flex flex-wrap">
            {formData.floor_photos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:4000/uploads/${photo}`}
                alt="Floor"
                className="w-20 h-20 object-cover mr-2 mb-2 rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mt-4"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
