import { useState, useEffect } from "react";
import "./feed.css";
import Share from "../share/Share.jsx";
import Post from "../post/Post.jsx";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p.post_id} post={p} />
        ))}
      </div>
    </div>
  );
}
