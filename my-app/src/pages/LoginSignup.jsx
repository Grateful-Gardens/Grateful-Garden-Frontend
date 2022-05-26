import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login/Login.jsx"
import Signup from "./signup/Signup.jsx"
import "./login/login.css"; 

export default function LoginSignup({ setAuth }) {
  const [currentView, setCurrentView] = useState("login");

  function getCurrentView(){
    if (currentView === 'login') {
        return (<Login setAuth={setAuth}/>)
     } else if (currentView === 'signup') {
          return (<Signup />)
     }
  }

  return (
    <div>
        {/* <div className="App">
          <div className="appAside" />
          <div className="appForm"> */}
        <div className="pageSwitcher">
            <button 
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem" 
                onClick={() => setCurrentView('login')}>
                    Login
            </button>

            <button 
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
                onClick={() => setCurrentView('signup') }
                >
                    Sign-Up
            </button>

        </div>
        {/* </div>
        </div> */}
        {getCurrentView()}


    </div>

  );
}
