import React from "react";
import { useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import SendSharpIcon from '@mui/icons-material/SendSharp';

export default function Share(props) {
  const [input, setInput] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [user, setUser] = useState({id: 1, username: 'jah123'});

  const createPost = async (e) => {
    if (input === "") return

    const trial = {
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
      body: JSON.stringify(trial),
    });
    const parsed = await result.json();
    parsed.data[0].username = user.username
    props.setPosts([parsed.data[0], ...props.post])
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
            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            alt=""
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
              <PermMedia htmlColor="tomato" className="shareIcon" />
              {/* <input type="file"/> */}
              <span className="shareOptionText">Photo</span>
            </div>
            <div className="shareOption">
              <div className="dropdown">
                <Label htmlColor="blue" className="shareIcon" />
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
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
            <SendSharpIcon className='shareButton' htmlColor="#2e7865" onClick={createPost}/>
        </div>
      </div>
    </div>
  );
}
