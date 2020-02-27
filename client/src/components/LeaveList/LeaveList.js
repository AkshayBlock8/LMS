import React from "react";
import LeaveListEntry from "./LeaveListEntry";
import { connect } from "react-redux";
import "./leaveList.css";

function LeaveList(props) {
  const getData = () => {
    return props.leaves.map((leave, index) => {
      return <LeaveListEntry key={index} leave={leave}></LeaveListEntry>;
    });
  };

  return (
    <div id="leavelist">
      <table>

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

        {getData()}
        
      </table>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    leaves: state.leaves
  };
};

export default connect(mapStateToProps)(LeaveList);
