import React,{useContext,useEffect}from "react";
//importing components
import LeaveTable from "../../components/LeaveTable/LeaveTable";
import LeaveList from "../../components/LeaveList/LeaveList";
//importing contexts
import {EmpIdContext} from '../../contexts/EmpId/EmpIdContext'
import {EmployeeContext} from '../../contexts/Emp/EmployeeContext'
import {HistoryContext} from '../../contexts/History/HistoryContext'
//import axios
import axios from 'axios'
import RootURL from '../../handlers/RootUrl'
//importing css files
import "./empdashboard.css";


function EmpDashboard() {

  let [empid,setEmpid]=useContext(EmpIdContext)
  let [empInfo,setEmpInfo]=useContext(EmployeeContext)
  let [history,setHistory]=useContext(HistoryContext)
  
  const getEmpInfo=()=>{
    axios.get(`${RootURL}/employee/${empid._id}`)
    .then((res)=>{
      setEmpInfo(res.data)
    })
    .catch((err)=>{
      console.log('error while fetching emp info')
    })
  }

  const getHistory=()=>{
    axios.get(`${RootURL}/leave/employee/${empid._id}/111`)
    .then((res)=>{
      setHistory(res.data)
    })
    .catch((err)=>{
      console.log('error while fetching emp history')
    })
  }

  useEffect(()=>{
    console.log('mounting................')
    getEmpInfo()
    getHistory()
  },[])
  
  return (
    <div id="empd">
      <LeaveList></LeaveList>
      <LeaveTable></LeaveTable>
    </div>
  );
}

export default EmpDashboard;
