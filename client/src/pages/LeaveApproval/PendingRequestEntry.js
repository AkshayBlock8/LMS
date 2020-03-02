import React from "react";

function PendingRequestEntry(props) {
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

  const getStringDate=(fd)=>{
    let date=new Date(fd)
    let stringVal=date.getDate().toString()+"-"+month[date.getMonth()]+"-"+date.getFullYear().toString()
    return stringVal
  }


  return (
    <tr>
      <td>{props.entry.leaveType}</td>
      <td>{props.entry.firstName}</td>
      <td>{getStringDate(props.entry.startDate)}</td>
      <td>{getStringDate(props.entry.endDate)}</td>
      <td>{props.entry.days}</td>
      <td><button type="button" onClick={()=>props.onStatusChange(props.entry,props.entry._id,"approved")}>Accept</button> <button type="button" onClick={()=>props.onStatusChange(props.entry._id,"rejected")}>Reject</button></td>
    </tr>
  );
}

export default PendingRequestEntry;
