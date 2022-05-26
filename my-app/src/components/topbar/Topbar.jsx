import React from "react";
import "./topbar.css";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import Notifications from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar({ userInfo, setAuth }) {
  const navigate = useNavigate()
  console.log(userInfo)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Grateful Gardens</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
            <span className="topbarLink">Homepage</span>
          </Link>
          {/* <Link to="/login"> */}
            <span className="topbarLink" onClick={(e) => {
              e.preventDefault()
              setAuth(false)
              window.localStorage.setItem("token", "")
              navigate("/login")
            }}>Sign Out</span>
          {/* </Link> */}
        </div>
        {/* <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> */}
          {/* <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div> */}
        <Link to={`/profile/${userInfo.user_id}`} className="profile">
          <img
            src={userInfo.profile_pic}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
