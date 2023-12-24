import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const openNav = () => {
    setShowMenu(true);
  };

  const closeNav = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <div id="mySidenav" className={`sidenav ${showMenu ? "open" : ""}`}>
        {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
  </a> */}
        <Link to="/" onClick={closeNav}>
          Home
        </Link>
        <Link to="/getrecommandation" onClick={closeNav}>
          Get Recommendations
        </Link>
        <Link to="/detection" onClick={closeNav}>
          Detection
        </Link>
        <Link to="/inventory" onClick={closeNav}>
          Inventory
        </Link>
      </div>

      <span style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
        &#9776; Menu
      </span>
    </div>
  );
};

export default Navbar;
