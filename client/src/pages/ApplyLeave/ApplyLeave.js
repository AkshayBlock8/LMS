import React, { Component } from "react";
import "./ApplyLeave.css";
import DatePicker from "react-date-picker";
import { connect } from "react-redux";

import emailNotify from "../../handlers/emailNotify";

class ApplyLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startdate: new Date().parse,
      enddate: new Date().parse,
      endleavetype: "",
      noofdays: 1,
      reason: "",
      file: null,
      type: ""
    };
  }
  handleEndLeaveChange = event => {
    this.setState({
      endleavetype: event.target.value
    });
  };
  handleChange = event => {
    this.setState({
      type: event.target.value
    });
  };

  onStartDateChange = startdate => this.setState({ startdate });
  onEndDateChange = enddate => this.setState({ enddate });

  handleFile(e) {
    let file = e.target.files[0];

    this.setState({
      file: file
    });
  }

  handleUpload(e) {
    console.log(this.state, "Tehhe");
  }

  handleReasonChange = event => {
    this.setState({
      reason: event.target.value
    });
  };

  onSubmitButton = event => {
    event.preventDefault();
    if (this.state.type !== "N/A") {
      let startDate = this.state.startdate.toUTCString();

      let day = this.state.startdate.getDate();

      console.log(startDate);
      startDate = startDate
        .split(" ")
        .slice(2, 4)
        .join(" ");
      startDate = day + " " + startDate;

      console.log(startDate);
      this.props.addLeave(this.state.type, startDate, 1);

      alert("You Have Successfully Applied for a leave");

      emailNotify(startDate, 1, this.state.type, this.state.reason);
      event.target.reset();
    }
  };

  render() {
    return (
      <div className="applyLeave">
        <form onSubmit={this.onSubmitButton}>
          <div id="dateP">
            <label>Choose a date</label>

            <DatePicker
              onChange={this.onStartDateChange}
              value={this.state.startdate}
              format="dd.MM.yyyy"
            />

            <DatePicker
              onChange={this.onEndDateChange}
              value={this.state.enddate}
              format="dd.MM.yyyy"
            />
            <select
              value={this.state.endleavetype}
              onChange={this.handleEndLeaveChange}
              className="typeOfLeaveDropdown"
            >
              <option value="full">Full Day</option>
              <option value="half">Half Day</option>
            </select>
          </div>

          <div className="TypeOfLeave">
            <label>Choose type of leave</label>
            <select
              required
              value={this.state.type}
              onChange={this.handleChange}
              className="typeOfLeaveDropdown"
            >
              <option value="N/A">Choose type</option>
              <option value="Sick">Sick leave</option>
              <option value="Casual">Casual leave</option>
              <option value="Paid">Paid leave</option>
            </select>
          </div>

          <div className="reason">
            <label>Reason </label>
            <input
              required
              type="text"
              value={this.state.reason}
              onChange={this.handleReasonChange}
            ></input>
          </div>

          <div className="apply">
            <button type="submit" className="applyButton">
              Apply
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLeave: (type, date, days) =>
      dispatch({
        type: "ADD_LEAVE_REQUEST",
        data: {
          id: 5,
          type: type,
          date: date.toString(),
          days: Number(days),
          status: "pending"
        }
      })
  };
};

export default connect(null, mapDispatchToProps)(ApplyLeave);
