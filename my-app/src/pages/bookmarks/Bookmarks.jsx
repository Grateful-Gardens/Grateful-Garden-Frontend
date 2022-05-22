import React from 'react'
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
// import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx'
import TestComponent from '../../components/testComponent/TestComponent.jsx'
import "./bookmarks.css"


export default function Bookmarks() {
  return (
    <>
    <Topbar />
    <div className="homeContainer">
      <Sidebar />
      <TestComponent />
      <Rightbar/>
    </div>
  </>
  )
}
