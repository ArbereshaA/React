import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import Background from "../assets/prop-about-background.png";
import RightArrow from "../assets/RightArrow.svg";

const PAGE_SIZE = 6; // Show 6 news items per page
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Blog() {
  const [posts, setPosts] = useState([]); // State to store the fetched posts
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // To handle loading state

  const formatText = (text) => {
    if (!text) return null;

    // Split text into paragraphs by line breaks (\n)
    const paragraphs = text.split("\n");

    return paragraphs.map((paragraph, index) => {
      // Detect headings (e.g., if it starts with '##' or '**')
      if (paragraph.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl font-bold my-4 text-custom-color">
            {paragraph.substring(2).trim()} {/* Remove '##' from the text */}
          </h2>
        );
      } else if (paragraph.startsWith("**")) {
        return (
          <strong
            key={index}
            className="block font-bold my-2 text-custom-color"
          >
            {paragraph.substring(2).trim()} {/* Remove '**' from the text */}
          </strong>
        );
      }

      // Otherwise, render it as a regular paragraph
      return (
        <p key={index} className="mb-4 text-gray-600">
          {paragraph.trim()}
        </p>
      );
    });
  };

  // Fetch posts from the backend API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/posts`); // Replace with your API endpoint
        setPosts(response.data); // Assuming response.data contains the array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
   
    fetchPosts();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Calculate the total number of pages
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  // Get the news items for the current page
  const currentNews = posts.slice(0, currentPage * PAGE_SIZE);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to truncate the metadescription
  const truncateText = (text, maxLength) => {
    if (text.startsWith("##")) {
      text = text.substring(2).trim();
    }
    if (text.startsWith("**")) {
      text = text.substring(2).trim();
    }

    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="bg-custom-color">
      {/* Main Section */}
      <div className="relative h-[400px] ">
        {/* Main background photo */}
        <img
          src={Background}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />
        <div className="absolute bottom-8 mb-4 left-0 right-0 mx-auto w-[90%] font-montserrat space-y-4 flex flex-col">
          <p className="text-white text-4xl md:text-5xl font-medium mb-8">
            Featured
          </p>
          {posts[0] && (
            <>
              <p className="font-bold text-white text-3xl font-montserrat">
                {posts[0].title}
              </p>
              <div className="flex justify-between items-center w-full">
                <p className="text-white font-thin flex-grow font-montserrat">
                  {truncateText(posts[0].metadescription, 150)}
                </p>
                <button className="ml-auto">
                  <Link to={`/BlogInfo/${posts[0].id}`}>
                    <img src={RightArrow} alt="Right Arrow" />
                  </Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* News Grid Section */}
      <div className="mt-12 px-8">
        {loading ? (
          <p>Loading...</p> // Loading indicator
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNews.map((news, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* News Image */}
                <img
                  src={`${backendUrl}${news.photo_url}`} // Show the actual image or a placeholder if missing
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                {/* News Text */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-custom-color font-montserrat">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    {formatText(truncateText(news.metadescription, 100))}
                  </p>
                  <Link
                    to={`/BlogInfo/${news.id}`}
                    className="text-custom-color underline font-montserrat"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* "Load More" Button */}
        {currentPage < totalPages && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-white px-6 py-2 rounded-full font-montserrat text-custom-color font-semibold"
            >
              Load More
            </button>
          </div>
        )}

        {/* Pagination Circles */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full mb-4 ${
                i < currentPage ? "bg-custom-color" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
