import { React, useState } from "react";

import "./signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
      console.log(email, password)
  }

  return (
    <div className="signup">
      <input
        type="email"
        id="form3Example1w"
        className="form-control"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="form-label mb-3" htmlFor="form3Example1w ">
        Email
      </label>
      <input
        type="password"
        id="form3Example1w"
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="form-label" htmlFor="form3Example1w">
        Password
      </label>
      <button type="submit" className="btn btn-success btn-lg mb-1" onClick={handleSignup}>
        Submit
      </button>
    </div>
  );
}
