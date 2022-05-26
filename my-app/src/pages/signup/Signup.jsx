// import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./signup.css";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("")

//   const handleSignup = async (e) => {
//     e.preventDefault()
//     const userInfo = {
//       username: username,
//       password: password,
//       email: email,
//       first_name: "",
//       last_name: ""
//     }

//     const result = await fetch("http://localhost:9001/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInfo),
//     });
//     const parsed = await result.json();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="signup">
//       <input
//         type="email"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label className="form-label mb-3" htmlFor="form3Example1w ">
//         Email
//       </label>
//       <input
//         type="password"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <label className="form-label" htmlFor="form3Example1w">
//         Password
//       </label>
//       <input
//         type="text"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <label className="form-label" htmlFor="form3Example1w">
//         Username
//       </label>
//       <button
//         type="submit"
//         className="btn btn-success btn-lg mb-1"
//         onClick={handleSignup}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }


import { React, useState, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("")

//   const handleSignup = async (e) => {
//     e.preventDefault()
//     const userInfo = {
//       username: username,
//       password: password,
//       email: email,
//       first_name: "",
//       last_name: ""
//     }

//     const result = await fetch("http://localhost:9001/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInfo),
//     });
//     const parsed = await result.json();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="signup">
//       <input
//         type="email"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label className="form-label mb-3" htmlFor="form3Example1w ">
//         Email
//       </label>
//       <input
//         type="password"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <label className="form-label" htmlFor="form3Example1w">
//         Password
//       </label>
//       <input
//         type="text"
//         id="form3Example1w"
//         className="form-control"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <label className="form-label" htmlFor="form3Example1w">
//         Username
//       </label>
//       <button
//         type="submit"
//         className="btn btn-success btn-lg mb-1"
//         onClick={handleSignup}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }






export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()
    const userInfo = {
      username: username,
      password: password,
      email: email,
      first_name: "",
      last_name: ""
    }

    const result = await fetch("http://localhost:9001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const parsed = await result.json();
    navigate("/login", { replace: true });
  };

  return (
      <div className="App">
          <div className="appAside" />
          <div className="appForm"> 
          <div className="pageSwitcher">

    <div className="formCenter">
       <form className="formFields">
          <div className="formField">
            <input
             type="email"
             id="form3Example1w"
             className="formFieldInput"
             onChange={(e) => setEmail(e.target.value)}
            />
            <label className="formFieldLabel" htmlFor="form3Example1w ">
              Email
            </label>
          </div>

          <div className="formField">
            <input
             type="password"
             id="form3Example1w"
             className="formFieldInput"
             onChange={(e) => setPassword(e.target.value)}
            />
            <label className="formFieldLabel" htmlFor="form3Example1w">
             Password
            </label>
          </div>

          <div className="formField">
           <input
             type="text"
             id="form3Example1w"
             className="formFieldInput"
             onChange={(e) => setUsername(e.target.value)}
           />
           <label className="formFieldLabel" htmlFor="form3Example1w">
             Username
           </label>
          </div>

          <div className="formField">
            <button
             type="submit"
             className="formFieldButton"
             onClick={handleSignup}
            >
             Submit
           </button>
           {/* <Link to="/sign-in" className="formFieldLink">
             I'm already member
           </Link> */}
          </div>
       </form>
    </div>
    </div>
      </div>
      </div> 
  );
}



