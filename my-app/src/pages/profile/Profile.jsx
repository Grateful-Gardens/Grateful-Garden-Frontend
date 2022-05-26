import { React, useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import MyFeed from "../../components/myFeed/MyFeed.jsx";
import Rightbar from "../../components/rightbar/Rightbar";
import AppContext from "../../context/appContext";
import { useParams } from "react-router-dom";


export default function Profile({setAuth}) {
  const [userInfo, setUserInfo] = useState([]);
  const { id } = useParams();
  const { user, setUser } = useContext(AppContext)


  useEffect(() => {
    if (!id ) return 
    fetch(`http://localhost:9001/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.data[0])});
  }, [id]);

  return (
    <>
      <Topbar key={id} userInfo={user} setAuth={setAuth}/>
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
            <MyFeed userInfo={userInfo}/>
            <Rightbar profile key={id} userInfo={userInfo} setUserInfo={setUserInfo}/>
          </div>
        </div>
      </div>
    </>
  );
}
