import React from "react";

function LeaveListEntry(props) {
  return (
    <tbody>
      <tr>
        <th>{props.leave.type}</th>
        <td>{props.leave.total}</td>
        <td>{props.leave.taken}</td>
        <td>{props.leave.available}</td>
      </tr>
      
    </tbody>
    
  );
}

export default LeaveListEntry;
