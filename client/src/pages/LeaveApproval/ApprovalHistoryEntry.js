import React from "react";

function ApprovalHistoryEntry(props) {
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
      <td>{props.entry.status}</td>
    </tr>
  );
}

export default ApprovalHistoryEntry;
