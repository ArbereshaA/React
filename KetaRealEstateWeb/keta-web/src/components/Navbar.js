import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="bg-white fixed w-full z-50 rounded-bl-lg rounded-br-lg border-b border-gray-200"
      style={{
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px",
      }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={closeMenu} // Close menu when logo is clicked
        >
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>

        {/* Right Side Buttons and Hamburger Menu */}
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <Link
            to="/sell-property"
            className="text-custom-color font-montserrat px-4 py-2 text-xs md:text-sm lg:text-base"
            onClick={closeMenu} // Close menu when this link is clicked
          >
            SELL YOUR PROPERTY
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M1 1h15M1 7h15M1 13h15"}
              />
            </svg>
          </button>
        </div>

        {/* Links Section */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-montserrat border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-custom-color font-montserrat text-sm md:text-base lg:text-lg"
                aria-current="page"
                onClick={closeMenu} // Close menu on click
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="block py-2 px-3 text-custom-color font-montserrat text-sm md:text-base lg:text-lg"
                onClick={closeMenu} // Close menu on click
              >
                PROPERTIES
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block py-2 px-3 text-custom-color font-montserrat text-sm md:text-base lg:text-lg"
                onClick={closeMenu} // Close menu on click
              >
                BLOG
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-custom-color font-montserrat text-sm md:text-base lg:text-lg"
                onClick={closeMenu} // Close menu on click
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="block py-2 px-3 text-custom-color font-montserrat text-sm md:text-base lg:text-lg"
                onClick={closeMenu} // Close menu on click
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
