import { React, useEffect, useState } from "react";
import "./sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { RssFeed, Bookmark, HelpOutline, Event, FunctionsRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" className="link">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to="/bookmarks" className="link">
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.map((f) => (
            <CloseFriend key={f.user_id} friend={f} />
          ))}
        </ul>
      </div>
    </div>
  );
}
