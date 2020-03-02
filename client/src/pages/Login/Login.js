import React, { useContext } from "react";
import Footer from '../../components/Footer/Footer'
import { useFormState } from "react-use-form-state";
import { EmpIdContext } from "../../contexts/EmpId/EmpIdContext";
import RootURL from '../../handlers/RootUrl'
import axios from 'axios'
import "./login.css";

function Login(props) {
   //getting context
  let [empid, setEmpid] = useContext(EmpIdContext);

  //setting formState
  let [formState, { text, password, email }] = useFormState();

    const handleSubmit = event => {
    event.preventDefault();
    console.log('making request at:',`${RootURL}/auth`)
    let emailV=formState.values.email
    let passw=formState.values.passw
    axios
      .post(`${RootURL}/auth`, {
        email:emailV,
        password: passw
        
      })
      .then(res => {
        console.log(res.data);
        setEmpid(res.data)
      })
      .catch((err)=>{
        console.log(err)
        alert('wrong credentials')
      })
  };

  return (
    <>
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
          <input placeholder="Email" {...email("email")} />
        </div>

        <div className="groupfield">
          <input {...password("passw")} placeholder="****"/>
        </div>

        <div id="buttonA">
          <input id="check" type="checkbox" name="check1" />{" "}
          <span>Remember me</span> <br />
          <a href="/">Forgot Password?</a>
          <br />
          <br />
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
