import { React, useState, useEffect, useContext} from "react";
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import './home.css'
import AppContext from "../../context/appContext";


export default function Home({setAuth}) {
  const { user } = useContext(AppContext)
  return (
    <>
      <Topbar key={user.user_id} userInfo={user} setAuth={setAuth}/>
      <div className="homeContainer">
        <Sidebar />
        <Feed key={user.user_id} userInfo={user}/>
        <Rightbar/>
      </div>
    </>
  )
}
