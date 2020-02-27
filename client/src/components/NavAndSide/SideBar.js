import React from "react";
import "./side.css";
import { useHistory , useLocation } from "react-router-dom";

function SideBar() {

  //fake data
  const role='admin'
  let location=useLocation()
  console.log(location)

  //Using routing to link logout button and apply leave button
  const history = useHistory();
  


  const loadAnotherPage=(page)=>{
    switch(page){
      case 'dashboard':
        history.push("/");
        break;
      case 'applyLeave':
        history.push("/addLeave");
        break;
      default:
        history.push("/");
        break;
    }
  }

  return (
    <div id="sidebar" >

      <button type="button" onClick={()=>{loadAnotherPage('dashboard')}} className={location.pathname==='/'?'selected':''} key="2">
        Dashboard{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
      </button>

      <button type="button" onClick={()=>{loadAnotherPage('applyLeave')}} key="3"  className={location.pathname==='/addLeave'?'selected':''}>
        Apply For Leave{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
      </button>

      <button type="button"  onClick={()=>{loadAnotherPage('applyLeave')}} key="4" id="approval">
        Leave Approval{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
      </button>

      {
        role==='admin'?
        <button type="button" onClick={()=>{loadAnotherPage('applyLeave')}} key="5" >
        Leave management{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
        </button>
        :''

      }

      {
        role==='admin'?
        <button type="button" onClick={()=>{loadAnotherPage('applyLeave')}} key="5" >
        Employee{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
        </button>
        :''

      }

    </div>
  );
}

export default SideBar;
