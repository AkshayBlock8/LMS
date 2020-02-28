import React,{useContext}from "react";
import LeaveListEntry from "./LeaveListEntry";


import {EmployeeContext} from '../../contexts/Emp/EmployeeContext'
import "./leaveList.css";

function LeaveList(props) {

  let [empInfo,setEmpInfo]=useContext(EmployeeContext)
  
  const getData = () => {
    
    return props.leaves.map((leave, index) => {
      return <LeaveListEntry key={index} leave={leave}></LeaveListEntry>;
    });
  };

  return (
    empInfo===undefined ? null :
    <div id="leavelist">
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>Total</th>
            <th>
              Availed/
              <br />
              Applied
            </th>
            <th>Available</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Sick</th>
            <td>{empInfo.total.sick}</td>
            <td>{empInfo.availed.sick}</td>
            <td>{empInfo.available.sick}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Casual</th>
            <td>{empInfo.total.casual}</td>
            <td>{empInfo.availed.casual}</td>
            <td>{empInfo.available.casual}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Paid</th>
            <td>{empInfo.total.paid}</td>
            <td>{empInfo.availed.paid}</td>
            <td>{empInfo.available.paid}</td>
          </tr>
        </tbody>

        

  
        
      </table>
    </div>
  );
}



export default LeaveList;
