import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Properties from "./components/Properties";
import Propertiespage2 from "./components/Propetiespage2";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar"; // Correct path for Navbar
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Contactus from "./components/ContactUs";
import SellPropery from "./components/SellProperty";
import BlogInfo from "./components/BlogInfo";
import Login from "./components/Login"; // Import Login component
import AdminPanel from "./components/AdminPanel"; // Import AdminPanel component
import CreatePosts from "./components/CreatePosts";
import UpdatePosts from "./components/UpdatePosts";
import CreateProperty from "./components/createnewproperty";

import UpdateProperty from "./components/UpdateProperty";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is placed here so it appears on every page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties2/:id" element={<Propertiespage2 />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/sell-property" element={<SellPropery />} />
        <Route path="/BlogInfo/:id" element={<BlogInfo />} />
        <Route path="/login" element={<Login />} /> {/* Add login route */}
        <Route path="/admin" element={<AdminPanel />} />{" "}
        <Route path="/admin/create-post" element={<CreatePosts />} />
        <Route path="/admin/update-post/:id" element={<UpdatePosts />} />
        {/* Add admin panel route */}
        <Route path="/admin/createpro" element={<CreateProperty />} />
        <Route path="/admin/update-property/:id" element={<UpdateProperty />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
