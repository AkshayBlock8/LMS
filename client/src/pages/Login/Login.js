import React, { useState } from "react";
import "./login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const staticEmail = "ravi@gmail.com";
  const staticPassword = "password1";

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
    console.log(password);
  }

  function buttonClick(event) {
    event.preventDefault();
    if (password === staticPassword && email === staticEmail) {
     

      //this is where api will get hit
      props.setAuthentication(true);

    } else {
      console.log("not working");
      alert("enter correct details");
    }
  }

  return (
    <div id="loginBoard">
      <div id="header">
        <img
          src={require("../../icons/block8.png")}
          id="logo_img"
          alt="User"
        ></img>
        <br />
        <h4>&nbsp;&nbsp;LMS | LOGIN</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="groupfield">
          <input type="text" placeholder="Email" onChange={emailChange} />
        </div>

        <div className="groupfield">
          <input
            id="passwordmask"
            type="password"
            placeholder="Password"
            onChange={passwordChange}
          />
        </div>

        <div id="buttonA">
          <input id="check" type="checkbox" name="check1" />{" "}
          <span>Remember me</span> <br />
          <a href="/">Forgot Password</a>
          <br />
          <br />
          <button
            onClick={buttonClick}
            block
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
