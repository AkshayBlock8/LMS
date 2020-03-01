import React, { useState, useContext } from "react";
import DatePicker from "react-date-picker";
import { useFormState } from "react-use-form-state";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { EmployeeContext } from "../../contexts/Emp/EmployeeContext";
import { EmpIdContext } from "../../contexts/EmpId/EmpIdContext";
import { HistoryContext } from "../../contexts/History/HistoryContext";
import "./AddLeave.css";

function AddLeave() {
  let fileUpload;
  let history = useHistory();
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());

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

    let startDateS = startDate.toISOString();
    let endDateS = endDate.toISOString();
    let hf = formState.values.hf;
    let leaveType = formState.values.leaveType;
    let desc = formState.values.description;

    let obj = {
      employeeId: empid._id,
      approverId: empInfo.approver,
      startDate: startDateS,
      endDate: endDateS,
      leaveType: leaveType.toLowerCase(),
      halfDay:false,
      description: desc
    };

    axios
      .post("http://10.9.8.150:5000/api/leave", obj)
      .then(res => {
        console.log("done");
        
      })
      .catch((err,data) => {
        console.log('not applied');
        console.log(err.response)
      });
    //cleaning up
    formState.reset();
    setStartDate(new Date());
    e.target.reset();
  };

  return (
    <div id="addLeave">
      <form onSubmit={handleSubmit}>
        <div className="field-group date-cont">
          <label>Leave dates</label>
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
          <select {...select("hf")}>
            <option value="Half">Half</option>
            <option value="Full">Full</option>
          </select>
        </div>

        <div className="field-group">
          <label>Leave Type:</label>
          <select {...select("leaveType")}>
            <option value="casual">casual</option>
            <option value="sick">sick</option>
          </select>
        </div>

        <div className="field-group">
          <label>Leave Description</label>
          <textarea {...text("description")} required minLength="3"></textarea>
        </div>

        <div className="field-group">
          <label> </label>
          <span id="warning">
            Note: Attaching documents compulsory if
            <br />
            applying for more than 2 days sick leave
          </span>
          <input
            type="file"
            label="Upload"
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
