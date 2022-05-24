import { React, useEffect, useState } from "react";
import "./myPosts.css"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { DateTime } from "luxon";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "../comments/Comments.jsx";

export default function MyPosts({ post, posts, setPosts, setAllMyPosts }) {
  const [like, setLike] = useState(0);
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

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleBookmark = async (e) => {
    !isBookmarked ? setIsBookmarked(true) : setIsBookmarked(false);
    if (!isBookmarked) {
      try {
        const data = {
          user_id: user,
          post_id: post.post_id,
        };
        await fetch(`http://localhost:9001/users/${user}/bookmarks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("Added to your bookmarks");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = {
          user_id: user,
          post_id: post.post_id,
        }
        await fetch(`http://localhost:9001/users/${user}/bookmarks`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        console.log('Removed Bookmark')
      } catch (error) {
        console.log(error);
      }
    }
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
      setAllMyPosts(filtered)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment_body: reply,
      user_id: 1,
      post_id: post.post_id,
      username: username.username,
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
            <DeleteIcon type="submit" onClick={handleDelete} />
            <BookmarkAddOutlinedIcon onClick={handleBookmark} />
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
            <span className="postLikeCounter">{post.like_count} people like it</span>
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
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></input>
              <button type="submit">Comment</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}