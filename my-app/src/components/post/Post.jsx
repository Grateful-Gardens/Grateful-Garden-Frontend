import { React, useEffect, useState } from "react";
import Comments from "../comments/Comments.jsx";
import "./post.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { DateTime } from "luxon";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

export default function Post({ post, posts, setPosts, userInfo }) {
  const [like, setLike] = useState(post.like_count);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0);
  const [username, setUsername] = useState({ username: "jah123" });
  const [user, setUser] = useState(1);

  const handleComments = async (e) => {
    setShowComment(!showComment);
    await fetch(`http://localhost:9001/posts/${post.post_id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.data);
      });
  };

  const addLike = async (e) => {
    const likeInfo = {};

    await fetch(`http://localhost:9001/posts/${post.post_id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  };

  const likeHandler = () => {
    setLike(isLiked ? Number(like) - 1 : Number(like) + 1);
    setIsLiked(!isLiked);
  };

  // const handleBookmark = async (e) => {
  //   !isBookmarked ? setIsBookmarked(true) : setIsBookmarked(false);
  //   if (!isBookmarked) {
  //     try {
  //       const data = {
  //         user_id: user,
  //         post_id: post.post_id,
  //       };
  //       await fetch(`http://localhost:9001/users/${user}/bookmarks`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       console.log("Added to your bookmarks");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       const data = {
  //         user_id: user,
  //         post_id: post.post_id,
  //       };
  //       await fetch(`http://localhost:9001/users/${user}/bookmarks`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       console.log("Removed Bookmark");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment_body: reply,
      user_id: user,
      post_id: post.post_id,
    };

    const result = await fetch(
      `http://localhost:9001/posts/${post.post_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const parsed = await result.json();
    parsed.data[0].username = userInfo.username;
    parsed.data[0].profile_pic = userInfo.profile_pic;
    setComments([...comments, parsed.data[0]]);
    setReply("");
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              //   src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              src={post.profile_pic}
              alt=""
            />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">
              {DateTime.fromISO(post.time_posted).toRelative()}
            </span>
          </div>
          <div className="postTopRight">
            {post.user_id === user && (
              <IconButton aria-label="delete">
              <DeleteIcon type="submit" onClick={handleDelete} />
            </IconButton>
            )}
            {/* <IconButton aria-label="delete">
              <BookmarkAddOutlinedIcon onClick={handleBookmark} />
            </IconButton> */}
          </div>
          {/* <div className="postTopRight">
            <BookmarkAddedIcon onClick={handleBookmark} />
          </div> */}
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img className="postImg" src={post.image} alt="" />
          {/* <img className="postImg" src="https://www.northernbeachesreview.com.au/images/transform/v1/crop/frm/jess.wallace/8b0a371c-1e18-4bd5-bf78-0a4aed88cc6f.jpg/r0_0_7359_4906_w1200_h678_fmax.jpg" alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          <IconButton aria-label="delete">
          <FavoriteBorderTwoToneIcon
              htmlColor="#2e7865"
              className="likeIcon"
              onClick={likeHandler}
            />
            </IconButton>
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleComments}>
              {post.comment_count} comments
            </span>
          </div>
        </div>
        {showComment && (
          <>
            <form onSubmit={handleSubmit}>
              {comments.map((c) => (
                <Comments
                  key={c.comment_id}
                  allComments={c}
                  aComment={comments}
                  setComments={setComments}
                />
              ))}
              <div className="commenting">
                <input
                  className="comment-on-post"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></input>
                <Button
                  className="send"
                  type="submit"
                  variant="contained"
                  color="info"
                  size="small"
                >
                  Comment
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
