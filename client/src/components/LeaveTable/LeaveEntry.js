import React from "react";

function LeaveEntry(props) {
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

  const getStringDate=(fd)=>{
    let date=new Date(fd)
    let stringVal=date.getDate().toString()+"-"+month[date.getMonth()]+"-"+date.getFullYear().toString()
    return stringVal
  }
  
  return (
    <tbody>
      <tr >
        <td>{props.entry.leaveType}</td>
        <td>{getStringDate(props.entry.startDate)}</td>
        <td>{getStringDate(props.entry.endDate)}</td>
        <td>{props.entry.nodays}</td>
        <td>{props.entry.status}</td>
        <td>
          {props.entry.status==='approved'||props.entry.status==='rejected'?'':<img src={require("../../icons/pen.png")} id="pen_img" alt="User"></img>}
        </td>
      </tr>
    </tbody>
    
  );
}

export default LeaveEntry;
