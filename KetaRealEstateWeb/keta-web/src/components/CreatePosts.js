import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [SEOtitle, setSEOtitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized to perform this action.");
      return navigate("/login");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("SEOtitle", SEOtitle);
    formData.append("metadescription", metadescription);
    if (photo) formData.append("photo_url", photo); // Append photo file if selected

    try {
      // Make the post request with the token in the Authorization header
      await axios.post(`${backendUrl}/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure multipart format
        },
      });

      setTitle("");
      setAuthor("");
      setSEOtitle("");
      setMetadescription("");
      setPhoto(null);
      alert("Post created successfully!");
      navigate("/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center mt-24">
        Create New Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-600">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 transition duration-200"
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-600">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 transition duration-200"
            placeholder="Enter the author's name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-600">
            SEO Title
          </label>
          <input
            type="text"
            value={SEOtitle}
            onChange={(e) => setSEOtitle(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 transition duration-200"
            placeholder="Enter the SEO title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-600">
            Metadescription{" "}
            <span className="text-xs text-gray-600">
              Headings starts in new line with ##, bold with **
            </span>
          </label>
          <textarea
            value={metadescription}
            onChange={(e) => setMetadescription(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 transition duration-200"
            placeholder="Enter the meta description"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-600">
            Photo
          </label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-full transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
