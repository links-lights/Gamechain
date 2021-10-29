import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom"
import React from "react";
import "../styles/Footer.css";

const Footer = (props) => {
  return (

    <div className="footer">
      <h2 className="item">
        <a href="https://github.com/links-lights/Gamechain/projects/1">
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </h2>
      <h3 className="item">
        <a href="https://codepen.io/jeffleu/pen/JRzyPZ">
          Game Source Code
        </a>
      </h3>
      <h3 classname="item">
        <Link to="/aboutus">About us</Link>
      </h3>
    </div>
  );
};

export default Footer;
