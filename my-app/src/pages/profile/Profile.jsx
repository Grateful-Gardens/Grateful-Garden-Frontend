import { React, useState, useEffect } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import MyFeed from "../../components/myFeed/MyFeed.jsx";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState(1 )

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  return (
    <>
      <Topbar key={userInfo.user_id} userInfo={userInfo}/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={userInfo.cover_pic}
                alt=""
              />
              <img
                className="profileUserImg"
                src={userInfo.profile_pic}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userInfo.username}</h4>
              <span className="profileInfoDesc">{userInfo.bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <MyFeed />
            <Rightbar profile key={userInfo.user_id} userInfo={userInfo} setUserInfo={setUserInfo}/>
          </div>
        </div>
      </div>
    </>
  );
}
