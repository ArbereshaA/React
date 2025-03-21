import { useState } from "react";
import React from "react";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          "Email sent successfully! We will reach out as soon as possible."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an issue sending your email. Please try again later");
    }
  };

  return (
    <div className="bg-custom-color">
      {/* Main Section */}
      <div className="relative h-[400px] ">
        {/* Main background photo */}
        <img
          src={require("../assets/contactusphoto.png")}
          className="w-full h-full object-cover"
          alt="Main Photo"
        />

        {/* Text or second image overlay, centered and responsive */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 text-center">
          {/* Large text */}
          <p className="text-white text-4xl md:text-5xl font-semibold font-montserrat">
            CONTACT US
          </p>
          {/* Secondary navigation */}
          <p className="text-white text-sm md:text-lg font-montserrat">
            <a href="/"> HOME</a>
            <span className="mx-2 pr-3 pl-3 font-montserrat">|</span> CONTACT US
          </p>
        </div>
      </div>
      <div className="  mt-16 flex items-center justify-center pb-4 px-14">
        <p className="text-lg md:text-xl lg:text-4xl font-light tracking-wider font-montserrat text-white">
          WRITE A MESSAGE
        </p>
        <div className="ml-10 border-t border-white flex-grow "></div>
      </div>
      <div className="newclass container mx-auto py-12 px-4 sm:px-6 flex flex-col items-center sm:flex-row sm:justify-center sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md sm:max-w-lg"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-white mb-1 font-montserrat"
            >
              Name & Surname
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              required
              className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Your Name & Surname"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white mb-1 font-montserrat"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Your Email Address"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-white mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              placeholder="+971 ...."
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-white mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full py-4 px-3 rounded-full bg-transparent border-l border-r border-t  border-gray-400 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Subject"
            />
          </div>
          <div className="md:col-span-2 mb-5 w-full max-w-lg">
            <label htmlFor="message" className="block text-white mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full py-4 px-3 rounded-md bg-transparent border border-gray-400 border-b-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Add more information"
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center w-full max-w-lg">
            <button
              type="submit"
              className="bg-white font-montserrat rounded-full text-custom-color text-sm md:text-sm lg:text-base px-6 sm:px-9 py-2"
            >
              SUBMIT
            </button>
          </div>
        </form>

        <div className="hidden sm:block border-t border-l mx-12 border-gray-400 h-96"></div>

        {/* Contact Information */}
        <div className="font-montserrat text-gray-300 mt-4 sm:mt-0 text-center sm:text-left">
          <div className="mb-2">
            <p className="mb-2">Phone:</p>
            <a href="tel:+971581134252" className="text-sm">
              +971 58 113 4252
            </a>
            <br></br>
            <a href="tel:+971581134252" className="text-sm">
              +971 58 113 4252
            </a>
          </div>

          <div>
            <p className="mb-2 mt-7">Email:</p>
            <a href="mailto:info@ketaestate.ae">
              <p>info@ketaestate.ae</p>
            </a>
            <a href="mailto:careers@ketaestate.ae">
              <p>careers@ketaestate.ae</p>
            </a>
          </div>

          <div className="mt-4">
            <p className="mb-2 mt-7">Follow Us :</p>
            <div className="flex items-center mb-2 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/ketarealestate1?_rdr"
                className="flex items-center"
              >
                <img
                  src={require("../assets/fbIC.png")}
                  className="w-4 h-4 mr-2"
                  alt="fbicon"
                />
                <p className="text-gray-200 text-xs">KETA Real Estate</p>
              </a>
            </div>
            <div className="flex items-center mb-2 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/ketarealestate/"
                className="flex items-center"
              >
                <img
                  src={require("../assets/instIC.png")}
                  className="w-4 h-4 mr-2"
                  alt="insticon"
                />
                <p className="text-gray-200 text-xs leading-4">
                  ketarealestate
                </p>
              </a>
            </div>
            <div className="flex items-center mb-2 justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/company/keta-real-estate/posts/?feedView=all"
                className="flex items-center"
              >
                <img
                  src={require("../assets/linkIC.png")}
                  className="w-4 h-4 mr-2"
                  alt="linkedin"
                />
                <p className="text-gray-200 text-xs">KETA Real Estate</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center pb-4">
        <div className="border-t border-white flex-grow mr-4 ml-7"></div>
        <p className="py-12 text-lg md:text-xl lg:text-2xl font-light tracking-wider text-white text-center font-montserrat">
          FIND US ON GOOGLE MAPS
        </p>
        <div className="border-t border-white flex-grow ml-4 mr-7"></div>
      </div>
      <div className="h-[500px] px-7">
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d225.65738101223036!2d55.274531!3d25.1857448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6900709328bb%3A0x9d74982eda4cd380!2sKeta%20Real%20Estate!5e0!3m2!1sen!2smk!4v1726588053070!5m2!1sen!2smk"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="font-montserrat text-white pt-9 text-center  flex items-center justify-center ">
          <img
            src={require("../assets/standortIC.png")}
            className="w-4 h-4 mr-2"
            alt="linkeldin"
          />{" "}
          The Exchange Tower, Bussines Bay Dubai, United Arab Emirates
        </p>
      </div>{" "}
    </div>
  );
}
export default ContactUs;
