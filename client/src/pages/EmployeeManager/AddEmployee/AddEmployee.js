import React from "react";
// import "./AddEmployee.css";
import './addemp.css'
import DatePicker from "react-date-picker";
import { useFormState } from "react-use-form-state";




export default function AddEmployee({ onSubmit }) {
  const [formState, { text, email, password, select }] = useFormState({
    role: "N/A",
    status: "N/A",
    gender: "N/A"
  });

  function handleSubmit(e) {
    // ..
  }
  return (
    <div>
      <form onSubmit={handleSubmit} id="addempform">
        <div id="name-group">
          <div className="field-group">
            <label>
              First name<span id="mandatory">*</span>
            </label>
            <input
              {...text({
                name: "firstName",
                onChange: e => console.log("first name changes")
              })}
              required
              minLength="4"
            />
          </div>

          <div className="field-group">
            <label>Middle name</label>
            <input {...text("middleName")} />
          </div>

          <div className="field-group">
            <label>
              Last name <span id="mandatory">*</span>
            </label>
            <input {...text("lastName")} required />
          </div>
        </div>
        <div className="group">
          <div className="field-group" >
            <label>
              Email<span id="mandatory">*</span>
            </label>
            <input {...email("email")} required />
          </div>
          <div className="field-group">
            <label>
              Employee Id<span id="mandatory">*</span>
            </label>
            <input {...text("empId")} required />
          </div>
        </div>
        <div className="group">
          <div className="field-group">
            <label>
              Status<span id="mandatory">*</span>
            </label>
            <select {...select("status")} required>
              <option value="N/A">Choose type</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="field-group date-group">
            <label>
              Date of joining<span id="mandatory">*</span>
            </label>
            <DatePicker />
          </div>
        </div>
        <div id="role-group">
          <div className="field-group">
            <label>
              Role<span id="mandatory">*</span>
            </label>
            <select {...select("role")} required>
              <option value="N/A">Choose type</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="field-group">
            <label>
              Approver<span id="mandatory">*</span>
            </label>
            <input {...text("approver")} required />
          </div>

          <div className="field-group">
            <label>
              Gender<span id="mandatory">*</span>
            </label>
            <select {...select("gender")} required>
              <option value="N/A">Choose type</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="group">
          <div className="field-group">
            <label>
              Password<span id="mandatory">*</span>
            </label>
            <input {...password("passowrd")} required />
          </div>
          <div className="field-group">
            <label>
              Confirm password<span id="mandatory">*</span>
            </label>
            <input {...password("confirmPassowrd")} required />
          </div>
        </div>
        <div id="button-group">
        
          <button id="saveBtn" type="submit">
            Save
          </button>

          <button id="cancelBtn" type="submit">
            Cancel
          </button>
         
        </div>
      </form>
    </div>
  );
}
