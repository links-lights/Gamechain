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
      <h2 className="item">
        <a href="https://github.com/links-lights/Gamechain/projects/1">
          Game Source Code
        </a>
      </h2>
    </div>
  );
};

export default Footer;
