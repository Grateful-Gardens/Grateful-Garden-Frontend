import { React, useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import MyFeed from "../../components/myFeed/MyFeed.jsx";
import Rightbar from "../../components/rightbar/Rightbar";
import AppContext from "../../context/appContext";

export default function Profile({setAuth}) {
  // const [userInfo, setUserInfo] = useState([]);
  const { user, setUser } = useContext(AppContext)

  // useEffect(() => {
  //   fetch(`http://localhost:9001/users/${user}`)
  //     .then((response) => response.json())
  //     .then((data) => setUserInfo(data.data));
  // }, []);

  return (
    <>
      <Topbar key={user.user_id} userInfo={user} setAuth={setAuth}/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.cover_pic}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profile_pic}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              
              <span className="profileInfoDesc">{user.bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <MyFeed userInfo={user}/>
            <Rightbar profile key={user.user_id} userInfo={user} setUserInfo={setUser}/>
          </div>
        </div>
      </div>
    </>
  );
}
