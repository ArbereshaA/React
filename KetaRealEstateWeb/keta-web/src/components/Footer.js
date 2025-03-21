import React from "react";
import Logo from "../assets/Logo.svg";
import LinkedInIcon from "../assets/LinkedinIcon.svg";
import FacebookIcon from "../assets/FacebookIcon.svg";
import InstagramIcon from "../assets/InstagramIcon.svg";

const CustomFooter = () => {
  return (
    <div className="bg-custom-color">
      <footer className="bg-white py-4 text-custom-color rounded-t-3xl border-t border-gray-400">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-16 xl:px-20 space-y-4 md:space-y-0">
          {/* Left Section - Logo */}
          <div className="flex-shrink-0 flex-1 mx-auto md:mx-0 md:text-left">
            <a
              href="/"
              className="block w-[80px] py-6 h-[60px] md:w-[90px] md:h-[90px] lg:w-[117px] lg:h-[120px] object-cover"
            >
              <img src={Logo} alt="Keta Real Estate Logo" />
            </a>
          </div>

          {/* Center Section - Social Links */}
          <div className="flex justify-center items-center space-x-6 md:space-x-8 flex-1 order-last md:order-none">
            <a href="https://www.linkedin.com/company/keta-real-estate/posts/?feedView=all">
              <img src={LinkedInIcon} alt="LinkedIn" className="h-8 w-8" />
            </a>
            <a href="https://www.facebook.com/ketarealestate1?_rdr">
              <img src={FacebookIcon} alt="Facebook" className="h-8 w-8" />
            </a>
            <a href="https://www.instagram.com/ketarealestate/">
              <img src={InstagramIcon} alt="Instagram" className="h-8 w-8" />
            </a>
          </div>

          {/* Right Section - Contact Information */}
          <div className="text-center md:text-right flex-1">
            <p className="text-sm font-semibold">PHONE :</p>
            <a href="tel:+971581134252" className="text-sm">
              +971 58 113 4252
            </a>
            <br></br>
            <a href="tel:+971581134252" className="text-sm">
              +971 58 113 4252
            </a>
            <p className="text-sm font-semibold mt-2">EMAIL :</p>
            <a href="mailto:info@ketaestate.ae">
              <p className="text-sm">INFO@KETAREALESTATE.AE</p>
            </a>
            <a href="mailto:careers@ketaestate.ae">
              <p className=" text-sm">CAREERS@KETAREALESTATE.AE</p>
            </a>
            <p className="text-sm mt-2">
              The Exchange Tower, Bussines Bay Dubai, United Arab Emirates
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 border-t border-custom-color pt-2 text-center text-[10px] text-gray-400">
          <p>© 2024 KETA GROUP. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomFooter;
