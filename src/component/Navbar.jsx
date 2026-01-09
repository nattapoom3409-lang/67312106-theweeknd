import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navmenu">
        <li>
          <a href="#Home">Home</a>
        </li>
        <li>
          <a href="#Biography">Biography</a>
        </li>
        <li>
          <a href="#Discography">Discography</a>
        </li>
        <li>
          <a href="#Gallery">Gallery</a>
        </li>
        <li>
          <a href="#SocialMedia">Social Media</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
