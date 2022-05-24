import { React, useState, useEffect } from "react";
import "./feed.css";
import Share from "../share/Share.jsx";
import Post from "../post/Post.jsx";

export default function Feed({ userInfo }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts} setPosts={setPosts} userInfo={userInfo}/>
        {posts.map((p) => (
          <Post key={p.post_id} post={p} posts={posts} setPosts={setPosts} userInfo={userInfo} />
        ))}
      </div>
    </div>
  );
}