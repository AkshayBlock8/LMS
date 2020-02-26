import React, { useState } from "react";
//Fixed components
import Nav from "./components/NavAndSide/Nav";
import Sidebar from "./components/NavAndSide/SideBar";
//Pages
import EmpDashboard from "./pages/EmpDashboard/EmpDashboard";
import ApplyLeave from "./pages/ApplyLeave/ApplyLeave";
import Login from "./pages/Login/Login";
//css file import
import "./App.css";

//Reducer import
import { connect } from "react-redux";
//Router import
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  const [isAuthenticated, setAuthentication] = useState(false);

  return isAuthenticated ? (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div className="App" id="app">
        <div id="top">
          <Nav setAuthentication={setAuthentication}></Nav>
        </div>

        <div id="main">
          <Sidebar></Sidebar>

          <div>
            <Switch>
              <Route path="/addLeave">
                <ApplyLeave />
              </Route>
              <Route path="/">
                <EmpDashboard />
              </Route>
            </Switch>
          </div>

          <button onClick={props.addLeave}>Add Leave</button>
        </div>
      </div>
    </Router>
  ) : (
    <Login setAuthentication={setAuthentication} />
  );
}

//dispatcher code
const mapDispatchToProps = dispatch => {
  return {
    addLeave: () =>
      dispatch({
        type: "ADD_LEAVE_REQUEST",
        data: {
          id: 5,
          type: "Casual",
          date: "14 Feb 2020",
          days: 3,
          status: "pending"
        }
      })
  };
};

export default connect(null, mapDispatchToProps)(App);
