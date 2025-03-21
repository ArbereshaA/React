import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedSection, setSelectedSection] = useState("posts"); // "posts" or "properties"
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    } else {
      if (selectedSection === "posts") {
        fetchPosts();
      } else if (selectedSection === "properties") {
        fetchProperties();
      }
    }
  }, [token, navigate, selectedSection]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts. Please log in again.");
      navigate("/login"); // Redirect to login if there's an error
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/properties`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
        },
      });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to fetch properties. Please log in again.");
      navigate("/login"); // Redirect to login if there's an error
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property deleted successfully!");
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  const handleUpdatePost = (id) => {
    navigate(`/admin/update-post/${id}`);
  };

  const handleUpdateProperty = (id) => {
    navigate(`/admin/update-property/${id}`);
  };

  const handleCreatePost = () => {
    navigate("/admin/create-post");
  };

  const handleCreateProperty = () => {
    navigate("/admin/createpro");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.replace("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-24">Admin Dashboard</h1>

      <div className="flex justify-between mb-4">
        <div className="space-x-4">
          <button
            onClick={() => setSelectedSection("posts")}
            className={`px-4 py-2 rounded ${
              selectedSection === "posts"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setSelectedSection("properties")}
            className={`px-4 py-2 rounded ${
              selectedSection === "properties"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Properties
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {selectedSection === "posts" ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create New Post
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 rounded shadow-md bg-white flex flex-col justify-between  h-48 overflow-hidden"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1 line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.metadescription}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                    Author: {post.author}
                  </p>
                  <p className="text-sm text-gray-500">Date: {post.date}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdatePost(post.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreateProperty}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create New Property
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border p-4 rounded shadow-md bg-white flex flex-col justify-between h-48 overflow-hidden"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1 line-clamp-1">
                    {property.properties_title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {property.properties_description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Price: {property.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {property.location_id}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdateProperty(property.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
