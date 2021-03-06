import { React, useEffect, useState, useContext } from "react";
import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import {
  RssFeed,
  Bookmark,
  HelpOutline,
  Event,
  FunctionsRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";

export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user.user_id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" className="link">
            {/* <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li> */}
          </Link>
          <Link to="/chats" className="link">
            {/* <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li> */}
          </Link>
          {/* <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li> */}
        {/* <hr className="sidebarHr" /> */}
        <div>
          <img className="left-image-1" src="https://media.istockphoto.com/vectors/flower-pot-and-plant-logo-design-vector-id1214870674?k=20&m=1214870674&s=170667a&w=0&h=KCDHlN8aDP4PPZosp20qsfNEC0LitIbpx02q-FXGPPA="/>
        </div>
        <li className="sidebarListItem">
          <PeopleIcon className="sidebarIcon" />
          <div className="friendBar">Friends</div>
        </li>
        </ul>

        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {friends.length > 0 &&
            friends.map((f) => (
              <CloseFriend
                key={f.user_id}
                friend={f}
                userInfo={user}
                setFriends={setFriends}
                allFriends={friends}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
