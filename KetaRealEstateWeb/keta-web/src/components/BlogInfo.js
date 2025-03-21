import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftSide from "../assets/LeftSide.svg";
import RightSide from "../assets/RightSide.svg";
import { Link } from "react-router-dom";

function BlogInfo() {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const POSTS_PER_PAGE = 2; // Show 2 posts per page
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [nextPosts, setNextPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(`${backendUrl}/api/posts/${id}`);
        setPost(postResponse.data);

        const allPostsResponse = await axios.get(`${backendUrl}/api/posts`);
        const filteredPosts = allPostsResponse.data.filter(
          (p) => p.id !== parseInt(id)
        );

        setRelatedPosts(filteredPosts);

        const postIndex = allPostsResponse.data.findIndex(
          (p) => p.id === parseInt(id)
        );
        if (postIndex !== -1) {
          const nextBlogs = allPostsResponse.data.slice(
            postIndex + 1,
            postIndex + 4
          );
          setNextPosts(nextBlogs);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Function to handle text formatting (paragraphs and headings)
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

  const formatText2 = (text) => {
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

  // Calculate the total number of pages
  const totalPages = Math.ceil(relatedPosts.length / POSTS_PER_PAGE);

  // Get the posts for the current page
  const currentRelatedPosts = relatedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Handle pagination change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="bg-custom-color p-0">
      {/* Display current post details */}
      <div className="relative pt-12">
        <img
          className="w-full h-[400px] object-cover"
          src={`${backendUrl}${post.photo_url}`}
          alt={post.title}
        />

        {/* Blog Content & Next Blogs Section */}
        <div className="text-content px-5 flex flex-col lg:flex-row">
          {/* Main Blog Text (Left Side) */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white mt-4">
              {post.title}
            </h1>
            <div className="text-sm md:text-base lg:text-lg text-gray-300">
              {formatText(post.metadescription)}
            </div>
          </div>

          {/* Next Blogs Section (Right Side) - Hidden on Mobile */}
          <div className="lg:w-1/3 pl-5 pt-10 hidden md:block">
            <div className="space-y-10">
              {nextPosts.length > 0 ? (
                nextPosts.map((nextPost) => (
                  <Link
                    to={`/BlogInfo/${nextPost.id}`}
                    key={nextPost.id}
                    className="block bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                  >
                    <img
                      src={`${backendUrl}${nextPost.photo_url}`}
                      alt={nextPost.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-sm md:text-md lg:text-lg font-semibold text-custom-color font-montserrat">
                        {formatText2(nextPost.title)}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 font-montserrat">
                        {formatText2(nextPost.metadescription.slice(0, 30))}...
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No next blogs available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* "Read More" Section */}
      <div className="mt-16 flex items-center justify-center pb-4">
        <div className="border-t border-white flex-grow mr-4 ml-20"></div>
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-white font-montserrat">
          READ MORE
        </p>
        <div className="ml-10 border-t border-white flex-grow mr-20"></div>
      </div>

      {/* Related Posts Section */}
      <div className="relative flex justify-center items-center mt-16">
        {/* Left Arrow */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`absolute left-0 p-2 ${
            currentPage === 1 ? " invisible" : "text-white"
          }`}
        >
          <img src={LeftSide} className="pl-5"></img>
        </button>

        {/* Related Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-4 w-full max-w-5xl mb-8">
          {currentRelatedPosts.map((relatedPost) => (
            <Link
              to={`/BlogInfo/${relatedPost.id}`}
              key={relatedPost.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[350px] flex flex-col mb-8"
            >
              <img
                src={`${backendUrl}${relatedPost.photo_url}`} // Show the actual image or a placeholder if missing
                alt={relatedPost.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold mb-2 text-custom-color font-montserrat">
                  {formatText2(relatedPost.title)}
                </h3>
                <p className="text-custom-color font-montserrat">
                  {formatText2(relatedPost.metadescription.slice(0, 100))}...
                </p>
              </div>
              <div className="mt-auto p-4 pt-2"></div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`absolute right-0 p-2 ${
            currentPage === totalPages ? " invisible" : "text-white"
          }`}
        >
          <img className="ml-6 pr-6 " src={RightSide}></img>
        </button>
      </div>
    </div>
  );
}

export default BlogInfo;
