import React from "react";

function LeaveEntry(props) {
  
  return (
    <tr >
      <td>{props.entry.type}</td>
     
      <td>{props.entry.from}</td>
      <td>{props.entry.to}</td>
      <td>{props.entry.days}</td>
      <td>{props.entry.status}</td>
      <td>
        {props.entry.status==='approved'||props.entry.status==='rejected'?'':<img src={require("../../icons/pen.png")} id="pen_img" alt="User"></img>}
      </td>
    </tr>
  );
}

export default LeaveEntry;
