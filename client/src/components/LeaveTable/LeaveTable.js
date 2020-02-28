import React,{useContext}from "react";
import LeaveEntry from "./LeaveEntry";
import { connect } from "react-redux";

import {HistoryContext} from '../../contexts/History/HistoryContext'
import "./LeaveTable.css";


function LeaveTable(props) {

  let [history,setHistory]=useContext(HistoryContext)

  const getLeaveDuration=(start, end)=>{
    let startDate = new Date(start)
    let endDate = new Date(end)
    let count = 0;
    for(var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let day = d.getDay()
        if(day == 0 || day == 6) {
            continue;
        }
        count++;
    }
    return count;
}

  const getRows = () => {
    return history.map(entry => {
      
      entry.nodays=getLeaveDuration(entry.startDate,entry.endDate)
      return <LeaveEntry id={entry.id} entry={entry}></LeaveEntry>;
    });
  };


  return (
    history===undefined?null:
    <div id="table">
      <table>
        <tbody>
          <tr id="thr">
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </tbody>
        
        {getRows()}
      </table>
    </div>
  );
}



export default LeaveTable;
