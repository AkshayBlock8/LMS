import React,{useContext}from "react";
import "./side.css";
import { useHistory , useLocation } from "react-router-dom";
import {EmpIdContext} from '../../contexts/EmpId/EmpIdContext'

function SideBar() {

  
  //getting location
  let location=useLocation()

  //Using routing to link logout button and apply leave button
  const history = useHistory();
  //getting employee information
  let [empid,]=useContext(EmpIdContext)
  let role=empid.role


  const loadAnotherPage=(page)=>{
    switch(page){
      case 'dashboard':
        history.push("/");
        break;
      case 'applyLeave':
        history.push("/addLeave");
        break;
      case 'leaveApproval':
        history.push('/leaveApproval')
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

      <button type="button"  onClick={()=>{loadAnotherPage('leaveApproval')}} key="4" id="approval">
        Leave Approval{" "}
        <img
          src={require("../../icons/arrowb.png")}
          id="user_img"
          alt="User"
        ></img>
      </button>

      {
        role=='admin'?
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
        role=='admin'?
        <button type="button" onClick={()=>{loadAnotherPage('applyLeave')}} key="6" >
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
