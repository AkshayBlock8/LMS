import React,{useContext,useEffect}from "react";
// import ApprovalHistory from "../LeaveApproval/ApprovalHistory";
import PendingRequestsTable from "./PendingRequestsTable";
import ApprovalHistoryTable from "./ApprovalHistoryTable";
//getting contexts
import {ApprovalHistoryContext} from '../../contexts/AprrovalHistory/ApprovalHistoryContext'
import { EmpIdContext } from '../../contexts/EmpId/EmpIdContext'

import axios from 'axios'

function LeaveApproval() {
  let [ahistory,setAhistory]=useContext(ApprovalHistoryContext)
  let [empid,setEmpid]=useContext(EmpIdContext)
  const getAhistory=()=>{
    axios.get(`http://10.9.8.150:5000/api/leave/approver/${empid._id}/111`)
    .then((res)=>{
      setAhistory(res.data)
      console.log('approval history:',ahistory)
      
    })
    .catch((err)=>{
      console.log('error while fetching emp history')
    })
  }
  useEffect(()=>{
   
    getAhistory()
    
  },[])


  return (
    
    <div>
      <PendingRequestsTable></PendingRequestsTable>
      <ApprovalHistoryTable></ApprovalHistoryTable>
    </div>
  );
}

export default LeaveApproval;
