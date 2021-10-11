import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [state, setState] = useState("");
  return (
    <div className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/game">Game</Link>
    </div>
  );
};

export default Navbar;
