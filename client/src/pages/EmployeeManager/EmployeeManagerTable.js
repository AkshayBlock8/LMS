import React from "react";
// import "./EmployeeManager.css";

function EmployeeManagerTable() {
  return (
    <div>
      <button id="addEmp">ADD EMPLOYEE</button>
      <div id="tableEmp">
        <table>
          <tr id="thrEmp">
            <th>Employee ID</th>
            <th>Employee name</th>
            <th>Date of joining</th>
            <th>Role</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default EmployeeManagerTable;
