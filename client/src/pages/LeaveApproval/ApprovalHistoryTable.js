import React,{useContext}from "react";
import "./ApprovalHistoryTable.css";
import ApprovalHistoryEntry from './ApprovalHistoryEntry'

//getting context
import {ApprovalHistoryContext} from '../../contexts/AprrovalHistory/ApprovalHistoryContext'

function ApprovalHistory() {
  let [ahistory,setAhistory]=useContext(ApprovalHistoryContext)
  const getRows = () => {
    return ahistory.map(entry => {
        console.log('checking enrty',entry)
        if(entry.status!=='pending'){
          return (<ApprovalHistoryEntry id={entry._id} entry={entry}></ApprovalHistoryEntry>)
        }else{
          return
        }
        
      
    });
  };
  return (
    ahistory===undefined?null:
    <div>
      <h3 id="approvalHeading">APPROVAL HISTORY</h3>
      <div id="tableApproval">
        <table>
          <tr id="thr">
            <th>Leave Type</th>
            <th>Employee Name</th>
            <th>From</th>
            <th>To</th>
            <th>No. of Days</th>
            <th>Status</th>
          </tr>
          {getRows()}
        </table>
      </div>
    </div>
  );
}

export default ApprovalHistory;
// import React from "react";
// import { connect } from "react-redux";
// // import "./LeaveTable.css";
// import ApprovalHistoryEntry from "./ApprovalHistoryEntry";

// function ApprovalHistoryTable(props) {
//   const getRows = () => {
//     return props.data.map(entry => {
//       return (
//         <ApprovalHistoryEntry
//           id={entry.id}
//           entry={entry}
//         ></ApprovalHistoryEntry>
//       );
//     });
//   };

//   return (
//     <div id="table">
//       <h3>ApprovalHistory</h3>
//       <table>
//         <tr id="thr">
//           <th>Leave Type</th>
//           <th>From</th>
//           <th>To</th>
//           <th>Days</th>
//           <th>Status</th>
//           <th>Edit</th>
//         </tr>
//         {getRows()}
//       </table>
//     </div>
//   );
// }

// const mapStateToProps = state => {
//   return {
//     data: state.data
//   };
// };

// export default connect(mapStateToProps)(ApprovalHistoryTable);
