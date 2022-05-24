import React from "react";
import { useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import TagIcon from "@mui/icons-material/Tag";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

export default function Share(props) {
  const [input, setInput] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [user, setUser] = useState({ id: 1, username: "jah123" });
  const [profile_pic, setProfile_pic] = useState(props.userInfo.profile_pic);

  const createPost = async (e) => {
    if (input === "") return;

    const postInfo = {
      hashtag: hashtag,
      image: "",
      description: input,
      user_id: user.id,
      username: user.username,
    };

    const result = await fetch("http://localhost:9001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    });
    const parsed = await result.json();
    parsed.data[0].username = user.username;
    parsed.data[0].profile_pic = props.userInfo.profile_pic;
    props.setPosts([parsed.data[0], ...props.post]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleHashtagClick = (e) => {
    setHashtag(e.target.value);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={props.userInfo.profile_pic}
            alt="Profile Pic"
          />
          <input
            value={input}
            placeholder="What's on your mind?"
            className="shareInput"
            onChange={handleInputChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
              <IconButton aria-label="delete">
                <PhotoCameraIcon htmlColor="#2e7865" className="shareIcon" />
              </IconButton>
              {/* <input type="file"/> */}
              <span className="shareOptionText">Photo</span>
            </div>
            <div className="shareOption">
              <div className="dropdown">
                <IconButton aria-label="delete">
                  <TagIcon htmlColor="#2e7865" className="shareIcon" />
                </IconButton>
                <span className="shareOptionText">Tag</span>
                <div className="dropdown-content">
                  <option value="Green" onClick={handleHashtagClick}>
                    Green
                  </option>
                  <option value="Love" onClick={handleHashtagClick}>
                    Love
                  </option>
                  <option value="Hope" onClick={handleHashtagClick}>
                    Hope
                  </option>
                  <option value="Grateful" onClick={handleHashtagClick}>
                    Grateful
                  </option>
                  <option value="Garden" onClick={handleHashtagClick}>
                    Gardens
                  </option>
                </div>
              </div>
            </div>
            {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <IconButton aria-label="delete" className="addPost">
            <SendSharpIcon
              className="shareButton"
              htmlColor="#2e7865"
              onClick={createPost}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
