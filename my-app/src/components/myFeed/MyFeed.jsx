import { React, useState, useEffect } from "react";
import Share from "../share/Share";
import MyPosts from "../myPosts/MyPosts.jsx"
import "./myFeed.css";

export default function MyFeed() {
  const [allMyPosts, setAllMyPosts] = useState([]);
  const [user, setUser] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9001/posts/${user}`)
      .then((response) => response.json())
      .then((data) => setAllMyPosts(data.data));
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {allMyPosts.map((mP) => (
          <MyPosts key={mP.post_id} post={mP} posts={posts} setPosts={setPosts} setAllMyPosts={setAllMyPosts}/>
        ))}
      </div>
    </div>
  );
}
