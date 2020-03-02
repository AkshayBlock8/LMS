import React from "react";
import "./AddEmployee.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
function AddEmployee() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            First name<span id="mandatory">*</span>
          </label>
          <input
            name="firstName"
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
          {errors.firstName && "First name is required"}
          <label>Middle name</label>
          <input name="middleName" ref={register({ maxLength: 50 })} />
          <label>
            Last name <span id="mandatory">*</span>
          </label>
          <input
            name="lastName"
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
          {errors.lastName && "Last name is required"}
        </div>
        <div>
          <label>
            Email<span id="mandatory">*</span>
          </label>
          <input
            name="email"
            ref={register({ required: true, minLength: 5, maxLength: 50 })}
          />
          {errors.email && "email is required"}
          <label>
            Employee Id<span id="mandatory">*</span>
          </label>
          <input name="employeeId" ref={register({ required: true })} />
          {errors.employeeId && "Employee Id is required"}
        </div>
        <div>
          <label>
            Status<span id="mandatory">*</span>
          </label>
          <select name="status" ref={register({ required: true })}>
            <option value="N/A">Choose type</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && "Status is required"}
          <label>
            Date of joining<span id="mandatory">*</span>
          </label>
          <DatePicker name="doj" ref={register({ required: true })} />
        </div>
        <div>
          <label>
            Role<span id="mandatory">*</span>
          </label>
          <select name="role" ref={register({ required: true })}>
            <option value="N/A">Choose type</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          {errors.role && "Role is required"}
          <label>
            Approver<span id="mandatory">*</span>
          </label>
          <input
            name="approver"
            ref={register({ required: true, maxLength: 50 })}
          />
          {errors.approver && "Last name is required"}
          <label>
            Gender<span id="mandatory">*</span>
          </label>
          <select name="gender" ref={register({ required: true })}>
            <option value="N/A">Choose type</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && "Gender is required"}
        </div>
        <div>
          <label>
            Password<span id="mandatory">*</span>
          </label>
          <input
            type="password"
            name="password1"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password1 && "This field is required"}
          <label>
            Confirm password<span id="mandatory">*</span>
          </label>
          <input
            name="password2"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password2 && "This field is required"}
        </div>
        <div>
          {/* <input type="submit" /> */}
          <button id="saveBtn" type="submit">
            Save
          </button>
          {/* <button id="cancelBtn">Cancel</button> */}
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
