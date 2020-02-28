import React,{useContext}from "react";
import {EmpIdContext} from '../../contexts/EmpId/EmpIdContext'
import "./nav.css";

function Nav(props) {
  let [empid,setEmpid]=useContext(EmpIdContext)
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
        <span>LMS | {empid.role.toUpperCase()} </span>
      </div>

      <div id="log">
        <img
          src={require("../../icons/userb.png")}
          id="user_img"
          alt="User"
        ></img>{" "+empid.name}
        
      </div>

    </div>
  );
}

export default Nav;
