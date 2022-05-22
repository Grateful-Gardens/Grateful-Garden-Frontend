import { React, useState, useEffect } from "react";
import "./testComponent.css"
import Bookmark from "../bookmark/Bookmark.jsx"

export default function TestComponent() {
    const [bookmarks, setBookmarks] = useState([]);
    const [user, setUser] = useState(3)

    // useEffect(() => {
    //     fetch(`http://localhost:9001/users/${user}/bookmarks`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         data.data.forEach(bookmark => console.log(bookmark))
    //       });
    //   }, []);

      console.log(bookmarks)
  return (
    <div className="feed">
    <div className="feedWrapper">
        <Bookmark />
        {/* {bookmarks.map((b) => (
            <Bookmark key={b.bookmarks_id} bookmarks={bookmarks} setBookmarks={setBookmarks} bookmark={b}/>
        ))} */}
      {/* {posts.map((p) => (
        <Post key={p.post_id} post={p} posts={posts} setPosts={setPosts} />
      ))} */}
    </div>
  </div>
  )
}
