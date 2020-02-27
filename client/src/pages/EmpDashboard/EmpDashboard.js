import React from "react";
//importing components
import LeaveTable from "../../components/LeaveTable/LeaveTable";
import LeaveList from "../../components/LeaveList/LeaveList";
//importing css files
import "./empdashboard.css";

function EmpDashboard() {
  return (
    <div id="empd">
      <LeaveList></LeaveList>
      <LeaveTable></LeaveTable>
    </div>
  );
}

export default EmpDashboard;
