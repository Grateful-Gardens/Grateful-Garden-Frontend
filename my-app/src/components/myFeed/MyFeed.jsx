import { React, useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import MyPosts from "../myPosts/MyPosts.jsx"
import "./myFeed.css";
import AppContext from "../../context/appContext";

export default function MyFeed({ userInfo }) {
  const [allMyPosts, setAllMyPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const { user, setUser } = useContext(AppContext)
  useEffect(() => {
    fetch("http://localhost:9001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9001/posts/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => setAllMyPosts(data.data));
  }, []);

  

  return (
    <div className="feed">
      <div className="feedWrapper">
        {allMyPosts.length > 0 && allMyPosts.map((mP) => (
          <MyPosts key={mP.post_id} post={mP} posts={posts} setPosts={setPosts} setAllMyPosts={setAllMyPosts} userInfo={user} allMyPosts={allMyPosts}/>
        ))}
      </div>
    </div>
  );
}
