import React from "react";
import "./closeFriend.css";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CloseFriend({ friend, userInfo, setFriends, allFriends}) {
  const removeFriend = async (e) => {
    try {
      const data = {
        user_id: userInfo.user_id,
        friend_two: friend.user_id
      }
      await fetch(`http://localhost:9001/users/${userInfo.user_id}/friends`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="sidebarFriend">
      <RemoveIcon className="removeUser" onClick={removeFriend}/>
      <img className="sidebarFriendImg" src={friend.profile_pic} alt="" />
      {/* <img
        className="sidebarFriendImg"
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        alt=""
      /> */}
      
      <span className="sidebarFriendName">{friend.username}</span>{" "}
    </li>
  );
}
