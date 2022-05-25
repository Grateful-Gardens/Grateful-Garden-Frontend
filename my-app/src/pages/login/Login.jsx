import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ setAuth }) {
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
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      setAuth(true);
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
    <div>
      <section className="h-100 h-custom entire-section">
        <div className="container pt-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="https://arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/GUE6GE2XMFGE3GVQWE7QAISGVA.jpg"
                  className=" background-image"
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 d-flex flex-column justify-content-center align-items-center login-text">
                    Log In
                  </h3>

                  <form className="px-md-2 d-flex flex-column justify-content-center align-items-center">
                    <div className="row mb-4 pb-2 pb-md-0 mb-md-5 d-flex flex-column justify-content-center align-items-center">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="form3Example1w"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label mb-3"
                            htmlFor="form3Example1w "
                          >
                            Email
                          </label>
                        </div>
                        <div className="form-outline">
                          <input
                            type="password"
                            id="form3Example1w"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1w"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                      onClick={handleLogin}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
