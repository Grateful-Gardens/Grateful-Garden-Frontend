import { React, useState, useEffect, useContext } from "react";
import "./feed.css";
import Share from "../share/Share.jsx";
import Post from "../post/Post.jsx";
import AppContext from "../../context/appContext";

export default function Feed({ userInfo }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AppContext)

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  console.log(posts)
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts} setPosts={setPosts} userInfo={user}/>
        {posts.map((p) => (
          <Post key={p.post_id} post={p} posts={posts} setPosts={setPosts} userInfo={user} />
        ))}
      </div>
    </div>
  );
}