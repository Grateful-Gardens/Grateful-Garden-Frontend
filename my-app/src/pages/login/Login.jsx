import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import AppContext from "../../context/appContext";

export default function Login({ setAuth }) {
  const { setUser } = useContext(AppContext)


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    const res = await fetch(`http://localhost:9001/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    console.log(data)
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      setAuth(true);
      setUser(data.user)
    } else {
      setAuth(false);
    }
    if (data.rows && data.rows.length > 1) {
      navigate("/", { replace: true });
    }
    setEmail("");
    setPassword("");
  };

  return (
      <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
      <div className="formCenter">
        <form className="formFields">
        < div className="formField">
            <input
              type="email"
              id="form3Example1w"
              className="formFieldInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
             className="formFieldLabel"
             htmlFor="form3Example1w "
            >
              Email
            </label>
        </div>
  
  
        <div className="formField">
          <input
            type="password"
            id="form3Example1w"
            className="form-control formFieldInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="formFieldLabel"
            htmlFor="form3Example1w"
          >
            Password
          </label>
        </div>
  
          <div className="formField">
            <button
              type="submit"
              className="formFieldButton"
              onClick={handleLogin}
            >
              Submit
            </button>
            {/* <Link to="/" className="formFieldLink">
                Create an account
            </Link> */}
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>  
  );
}
