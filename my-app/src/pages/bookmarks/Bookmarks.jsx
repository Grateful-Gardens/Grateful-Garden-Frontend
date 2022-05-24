import { React, useState, useEffect } from "react";
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
// import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import TestComponent from '../../components/testComponent/TestComponent.jsx'
import "./bookmarks.css"


export default function Bookmarks() {
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user}`)
      .then((response) => response.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  return (
    <>
    <Topbar key={userInfo.user_id} userInfo={userInfo}/>
    <div className="homeContainer">
      <Sidebar />
      <TestComponent />
      <Rightbar/>
    </div>
  </>
  )
}
