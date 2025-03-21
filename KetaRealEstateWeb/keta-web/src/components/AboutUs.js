import React from "react";

function AboutUs() {
  return (
    <div className="bg-custom-color">
      {/* Main Section */}
      <div className="relative h-[400px] ">
        {/* Main background photo */}
        <img
          src={require("../assets/abphoto.png")}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />
        {/* Text or second image overlay, centered and responsive */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 text-center">
          {/* Large text */}
          <p className="text-white text-4xl md:text-5xl font-semibold font-montserrat">
            ABOUT US
          </p>

          {/* Secondary navigation */}
          <p className="text-white text-sm md:text-lg font-montserrat">
            <a href="/"> HOME</a>{" "}
            <span className="mx-2 pr-3 pl-3 font-montserrat">|</span> ABOUT US
          </p>
        </div>
      </div>
      {/* Section Title */}
      <div className="mt-10 flex items-center justify-center pb-4 px-14">
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat text-white">
          OUR VISION
        </p>
        <div className="ml-10 border-t border-white flex-grow"></div>
      </div>
      {/* Vision Text and Images Section */}
      {/* First Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Left Side - Text and Large Image */}
          <div className="md:w-2/3">
            <p className="text-white text-lg leading-relaxed mb-6 px-10">
              To be the leading real estate company in Dubai, known for
              innovation, excellence, and a relentless commitment to customer
              satisfaction. We envision a future where KETA is synonymous with
              exceptional properties, where every client experiences the highest
              level of professionalism and personalization. Our vision extends
              beyond transactions; we aim to contribute to the growth and
              prosperity of Dubai by connecting people with their ideal homes
              and investment opportunities. By consistently exceeding
              expectations, KETA strives to be the catalyst for a new era in
              Dubai's real estate landscape.
            </p>
            {/* Large Horizontal Image */}
            <div className="relative">
              <img
                src={require("../assets/abphoto2.png")}
                className="w-full h-96 object-cover rounded-lg shadow-lg transation scale-90"
                alt="KETA Real Estate Vision"
              />
            </div>
          </div>

          {/* Right Side - Two Smaller Images */}
          <div className="md:w-1/3 flex flex-col space-y-6 px-14">
            {/* First Image */}
            <div className="relative">
              <img
                src={require("../assets/abphoto1.png")}
                className="w-full h-60 object-cover rounded-lg shadow-lg"
                alt="Image 1"
              />
            </div>
            {/* Second Image */}
            <div className="relative">
              <img
                src={require("../assets/abphoto3.png")}
                className="w-full h-60 object-cover rounded-lg shadow-lg"
                alt="Image 2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 relative">
        {/* Enlarged Additional Image in the Background on the Complete Left Side */}
        <div
          className="absolute rounded-lg -z-5 fixed"
          style={{
            left: "0%", // Keep the same position across all screen sizes
            bottom: "0%", // Adjust as needed to stay consistent
            transform: "translate(-30%, 13%)", // Fine-tune to maintain position
            width: "400px", // Can keep the max size for better responsiveness
            height: "400px",
          }}
        >
          <img
            src={require("../assets/maskbg.png")}
            className="w-full h-full object-cover"
            alt="Background Image"
          />
        </div>

        {/* Left Image with Shadow - Taller Image */}
        <div className="relative flex-shrink-0 w-full md:w-[350px] lg:w-[450px] h-[300px] md:h-[350px] lg:h-[400px] shadow-[16px_19px_23px_6px_#1a202c]">
          <img
            src={require("../assets/missionphoto.png")}
            className="w-full h-full object-cover rounded-lg"
            alt="Our Mission"
          />
        </div>

        {/* Our Mission Title and Text */}
        <div className="flex flex-col justify-start text-white text-base sm:text-lg md:text-xl leading-relaxed max-w-full md:max-w-3xl">
          {/* Title and Border */}
          <div className="flex items-center">
            <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat">
              OUR MISSION
            </p>
            <div className="border-t border-white flex-grow ml-4 h-[2px]"></div>
          </div>

          {/* Mission Text */}
          <div className="mt-6">
            <p className="mb-4">
              At KETA, our mission is to redefine the real estate experience in
              Dubai by providing unparalleled service, fostering trust, and
              delivering exceptional value to our clients.
            </p>
            <p>
              We are committed to understanding the unique needs and aspirations
              of each individual, guiding them through the complexities of the
              real estate journey, and helping them make informed decisions that
              lead to the realization of their dreams. Our dedication to
              integrity, transparency, and personalized service sets us apart as
              the trusted partner for all real estate endeavors in the vibrant
              city of Dubai.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center pb-4">
        <div className="border-t border-white flex-grow mr-4 ml-20"></div>
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider text-white font-montserrat">
          OUR TEAM
        </p>
        <div className="ml-10 border-t border-white flex-grow mr-20"></div>
      </div>
      <div className="flex flex-wrap justify-center p-3">
        {/* First Box */}
        <div className="p-6 text-center w-full md:w-1/3">
          <div className="text-6xl scale-75">
            <img
              src={require("../assets/katarina.png")}
              className="mx-auto"
              alt="chiefexecutive"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white font-montserrat">
            Katarina Kajkus
          </h3>
          <p className="mb-2 text-gray-400  text-sm font-montserrat">
            CHIEF EXECUTIVE OFFICIER
          </p>
          <div className="border-t border-white flex-grow px-9 mb-2 mx-auto w-1/2"></div>
          <div className="flex items-center justify-center mb-2">
            <img
              src={require("../assets/emailicon.png")}
              className="w-4 h-4 mr-2"
              alt="Email Icon"
            />
            <a href="mailto:myemail@site.com?Subject=Some%20subject">
              <p className="text-gray-200 text-s">Katarina.k@ketaestate.ae</p>
            </a>
          </div>
          <div className="flex items-center justify-center mb-2">
            {" "}
            <img
              src={require("../assets/mobileicon.png")}
              className="w-4 h-4 mr-2"
              alt="Mobile Icon"
            />
            <a href="tel:+971585527076" className="text-gray-200 text-xs">
              +971 58 552 7076
            </a>
          </div>
        </div>

        {/* Second Box */}
        <div className="p-6 text-center w-full md:w-1/3">
          <div className="scale-75">
            <img
              src={require("../assets/ardian.png")}
              className="mx-auto"
              alt="owner"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white font-montserrat">
            Ardian Hamiti
          </h3>
          <p className="mb-2 text-gray-400  text-sm font-montserrat">OWNER</p>
          <div className="border-t border-white flex-grow px-9 mb-2 mx-auto w-1/2"></div>
          <div className="flex items-center justify-center mb-2">
            <img
              src={require("../assets/emailicon.png")}
              className="w-4 h-4 mr-2"
              alt="Email Icon"
            />
            <a href="mailto:myemail@site.com?Subject=Some%20subject">
              <p className="text-gray-200 text-s ">Ardian.h@ketaestate.ae</p>
            </a>
          </div>
          <div className="flex items-center justify-center mb-2">
            {" "}
            <img
              src={require("../assets/mobileicon.png")}
              className="w-4 h-4 mr-2"
              alt="Mobile Icon"
            />
            <a href="tel:+971501847718" className="text-gray-200 text-xs">
              +971 50 184 7718
            </a>
            "
          </div>
          <div className="flex items-center justify-center mb-2">
            {" "}
            <img
              src={require("../assets/mobileicon.png")}
              className="w-4 h-4 mr-2"
              alt="Mobile Icon"
            />
            <a href="tel:+97145723707" className="text-gray-200 text-xs">
              +971 4 572 3707
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
