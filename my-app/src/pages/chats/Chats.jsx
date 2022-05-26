import { React, useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
// import Feed from '../../components/feed/Feed.jsx'
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Chatting from "../../components/chatting/Chatting.jsx";
import "./chats.css";
import AppContext from "../../context/appContext";
import { useParams } from "react-router-dom";

export default function Chats({ setAuth }) {
  const { user, setUser } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const { id } = useParams();

  // fetch(`http://localhost:9001/users/${user.user_id}/chat/${id}`)
  //   .then((res) => res.json())
  //   .then((data) => setChats(data));

  // console.log(chats);

  return (
    <>
      <Topbar key={user.user_id} userInfo={user} setAuth={setAuth} />
      <div className="homeContainer">
        <Sidebar />
        <Chatting userInfo={user} />
        <Rightbar />
      </div>
    </>
  );
}
