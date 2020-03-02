import React, { useState, useContext } from "react";
import DatePicker from "react-date-picker";
import { useFormState } from "react-use-form-state";
import { useHistory } from "react-router-dom";
import RootURL from '../../handlers/RootUrl'
import axios from "axios";
import { EmployeeContext } from "../../contexts/Emp/EmployeeContext";
import { EmpIdContext } from "../../contexts/EmpId/EmpIdContext";
import { HistoryContext } from "../../contexts/History/HistoryContext";
import "./AddLeave.css";

function AddLeave() {
  let fileUpload;
  let history = useHistory();
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(startDate);

  //getting context data
  let [empInfo, setEmpInfo] = useContext(EmployeeContext);
  let [empid, setEmpid] = useContext(EmpIdContext);
  let [histories, setHistory] = useContext(HistoryContext);

  const [formState, { select, text }] = useFormState({
    leaveType: "casual",
    hf: "Half"
  });

  const handleSubmit = e => {
    e.preventDefault();
    let hf = formState.values.hf==='Half'?true:false;
    let obj = {
      firstName:empInfo.firstName,
      lastName:empInfo.lastName,
      employeeId: empid._id,
      approverId: empInfo.approver,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      leaveType: formState.values.leaveType.toLowerCase(),
      halfDay:hf,
      description:formState.values.description
    };
    console.log(obj)

    if(hf && (startDate !== endDate)){
      alert('start and end date need to be same')
    }else{
      axios
      .post(`${RootURL}/leave`, obj)
      .then(res => {
        console.log("done");
        alert('Leave applied')
      })
      .catch((err,data) => {
        console.log('not applied');
        console.log(err.response)
      });

    }

    
    //cleaning up
    formState.reset();
    setStartDate(new Date());
    e.target.reset();
  };

  return (
    <div id="addLeave">
      <form onSubmit={handleSubmit}>
        <div className="field-group date-cont">
          <label>Leave Dates<sup className="imp"> *</sup></label>
          <DatePicker
            className="datep"
            onChange={date => {
              setStartDate(date);
              setEndDate(date);
            }}
            value={startDate}
            format="dd.MM.yy"
          />
          <DatePicker
            className="datep"
            onChange={date => setEndDate(date)}
            value={endDate}
            format="dd.MM.yy"
            minDate={startDate}
          />
          <select id="hf" {...select("hf")}>
            <option value="Half">Half Day</option>
            <option value="Full">Full Day</option>
          </select>
        </div>

        <div className="field-group">
          <label>Leave Type<sup className="imp">*</sup></label>
          <select {...select("leaveType")}>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="field-group">
          <label>Leave Description<sup className="imp"> *</sup></label>
          <textarea {...text("description")} required minLength="3"></textarea>
        </div>

        <div className="field-group">
          <label> </label>
          <span id="warning">
            Note: Attaching documents compulsory if
            <br />
            applying for more than 2 days sick leave
          </span>
          <label for="files" id="attachFiles">
            Attach Document
          </label>
          <input
            type="file"
            id="files"
            label="Upload"
            text="Attach document"
            className="fileU"
            ref={ref => (fileUpload = ref)}
          />
        </div>

        <div className="field-group submit" style={{ textAlign: "center" }}>
          <button type="submit">ApplyLeave</button>
          <button type="submit">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddLeave;
