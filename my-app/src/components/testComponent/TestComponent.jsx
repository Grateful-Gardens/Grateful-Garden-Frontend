import { React, useState, useEffect } from "react";
import "./testComponent.css"
import Bookmark from "../bookmark/Bookmark.jsx"

export default function TestComponent() {
    const [bookmarks, setBookmarks] = useState([]);
    const [user, setUser] = useState(4)

    useEffect(() => {
        fetch(`http://localhost:9001/users/${user}/bookmarks`)
          .then((response) => response.json())
          .then((data) => setBookmarks(data.data));
      }, []);
      console.log(bookmarks)
  return (
    <div className="feed">
    <div className="feedWrapper">
        <Bookmark />
        {bookmarks.map((b) => (
            <Bookmark key={b.bookmarks_id} bookmarks={bookmarks} setBookmarks={setBookmarks} bookmark={b}/>
        ))}
    </div>
  </div>
  )
}
