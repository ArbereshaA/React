import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [SEOtitle, setSEOtitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    } else {
      fetchPost(); // Fetch the post data for editing
    }
  }, [navigate, id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/posts/${id}`);
      const post = response.data;
      setTitle(post.title);
      setAuthor(post.author);
      setSEOtitle(post.seo_title);
      setMetadescription(post.metadescription);
      setPhoto(post.photo);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // Set the file to state
  };

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
    if (photo) {
      formData.append("photo", photo); // Append the file
    }

    try {
      await axios.put(
        `${backendUrl}/api/posts/${id}`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Post updated successfully!");
      // Clear the input fields after updating the post
      setTitle("");
      setAuthor("");
      setSEOtitle("");
      setMetadescription("");
      setPhoto(null);

      // Navigate back to the admin dashboard or posts list after updating
      navigate("/admin");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Update Post
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
            Metadescription
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
            type="file" // Change input type to file
            onChange={handleFileChange} // Use the new handler
            className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-full transition duration-200"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
