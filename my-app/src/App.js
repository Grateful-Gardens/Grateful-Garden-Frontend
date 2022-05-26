import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import { React, useState, useEffect } from "react";
// import Register from "./pages/register/Register";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Chats from "./pages/chats/Chats";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    let localToken = window.localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:9001/is-verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localToken}`,
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      response === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate replace to="/login" />
            ) : (
              <Home setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/chats"
          element={
            !isAuthenticated ? (
              <Navigate replace to="/login" />
            ) : (
              <Chats setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            !isAuthenticated ? (
              <Navigate replace to="/login" />
            ) : (
              <Profile setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats/:id" element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
