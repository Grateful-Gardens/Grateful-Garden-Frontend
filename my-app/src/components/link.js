import React from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
  
  function Link() {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <FeedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <BookmarkIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }


export default Link;