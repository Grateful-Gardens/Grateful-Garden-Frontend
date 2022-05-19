import { React, useEffect } from "react";
import "./post.css";
import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { DateTime } from "luxon";
import DeleteIcon from "@mui/icons-material/Delete";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function Post({ post, posts, setPosts }) {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");

  const handleComments = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:9001/posts/${post.post_id}/comments`)
      .then((response) => response.json())
      .then((data) => console.log(data.data));
  };

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    !isBookmarked ? setIsBookmarked(true) : setIsBookmarked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      comment_body: reply,
      user_id: 1,
      post_id: post.post_id,
    }

    const result = await fetch(`http://localhost:9001/posts/${post.post_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const parsed = await result.json();
    setReply("");
  };

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:9001/posts/${post.post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = posts.filter((p) => p.post_id != post.post_id);
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              //   src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt=""
            />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">
              {DateTime.fromISO(post.time_posted).toRelative()}
            </span>
          </div>
          <div className="postTopRight">
            <DeleteIcon type="submit" onClick={handleDelete} />
            <BookmarkAddOutlinedIcon onClick={handleBookmark} />
          </div>
          {/* <div className="postTopRight">
            <BookmarkAddedIcon onClick={handleBookmark} />
          </div> */}
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img className="postImg" src={post.photo} alt="" />
          {/* <img className="postImg" src="https://www.northernbeachesreview.com.au/images/transform/v1/crop/frm/jess.wallace/8b0a371c-1e18-4bd5-bf78-0a4aed88cc6f.jpg/r0_0_7359_4906_w1200_h678_fmax.jpg" alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FavoriteBorderTwoToneIcon
              htmlColor="#2e7865"
              className="likeIcon"
              onClick={likeHandler}
            />
            <ThumbUpAltIcon
              htmlColor="#2e7865"
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleComments}>
              {comments} comments
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea onChange={(e) => setReply(e.target.value)}></textarea>
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}
