import React from "react";
import "./nav.css";

function Nav(props) {
  return (
    <div id="nav">
      
      <div id="ham">
        <img
          src={require("../../icons/block8.png")}
          id="logo_img"
          alt="User"
        ></img>
      </div>

      <div id="notep">
        <span>LMS | EMPLOYEE</span>
      </div>

      <div id="log" onClick={() => props.setAuthentication(false)} >
        <img
          src={require("../../icons/userb.png")}
          id="user_img"
          alt="User"
        ></img>{" "}
        <span id="sep">|</span>{" "}
        <a href="/">
          <img
            src={require("../../icons/logout.png")}
            id="logout_img"
            alt="User"
          ></img>
        </a>
      </div>

    </div>
  );
}

export default Nav;
