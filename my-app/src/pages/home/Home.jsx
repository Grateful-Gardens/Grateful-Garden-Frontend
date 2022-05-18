import React from 'react'
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import { useEffect } from 'react'
import './home.css'

export default function Home() {

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => console.log(data.data));
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  )
}
