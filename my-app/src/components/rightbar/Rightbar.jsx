import { React, useState, useEffect, useContext } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AppContext from "../../context/appContext";
import { useParams } from "react-router-dom";
import ReactEmbedGist from "react-embed-gist";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Rightbar({ profile, userInfo, setUserInfo }) {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:9001/users/${user.user_id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <LocalFloristIcon htmlColor="#2e7865" className="birthdayImg" />
          <span className="birthdayText">
            <b>Check out</b> some <b>community gardens</b> near you!
          </span>
        </div>
        {/* <img
          className="rightbarAd"
          src="https://foodtank.com/wp-content/uploads/2021/09/Food-Tank-Aberdeen-Street-Community-Garden.jpg"
          alt=""
        /> */}
        <ReactEmbedGist
          className="rightbarAd"
          gist="jah821/21e85cfad2ebfacdacccfd2b45b55b06"
        />
        {/* <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.length > 0 && friends.map((u) => (
            <Online key={u.user_id} user={u} />
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [longer_bio, setLonger_bio] = useState("");

    const handleNewInfo = async (e) => {
      if (bio === "" && city === "" && country === "" && longer_bio === "")
        return;

      const newUserInfo = {
        username: userInfo.username,
        profile_pic: userInfo.profile_pic,
        cover_pic: userInfo.cover_pic,
        bio,
        city,
        country,
        longer_bio,
      };

      if (newUserInfo.bio === "") newUserInfo.bio = userInfo.bio;
      if (newUserInfo.city === "") newUserInfo.city = userInfo.city;
      if (newUserInfo.country === "") newUserInfo.country = userInfo.country;
      if (newUserInfo.longer_bio === "")
        newUserInfo.longer_bio = userInfo.longer_bio;

      await fetch(`http://localhost:9001/profile/${userInfo.user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      });

      setUserInfo({
        ...userInfo,
        ...newUserInfo,
      });
      setBio("");
      setCity("");
      setCountry("");
      setLonger_bio("");
    };

    const handleFriend = async (e) => {
      e.preventDefault();
      const data = {
        user_id: user.user_id, 
        friend_two: userInfo.user_id
      }
      await fetch(`http://localhost:9001/users/${user.user_id}/friends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    return (
      <>
        <h4 className="rightbarTitle">
          User information {/* {userInfo.user_id === profile.user_id && ( */}
          {user.user_id !== userInfo.user_id && (!friends.includes(userInfo.user_id)) && (
            <PersonAddIcon className="add_friend" onClick={handleFriend} />
          )}


          {/* )} */}
          {user.user_id == userInfo.user_id && (
            <EditIcon
              className="edit"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />
          )}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Info
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="row g-3 align-items-center mt-3">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        Bio
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-3">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        City
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-3">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        Country
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mt-3 mb-3">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        Extended Bio
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        onChange={(e) => setLonger_bio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <CloseIcon data-bs-dismiss="modal" type="button" />
                  <CheckIcon
                    type="submit"
                    onClick={handleNewInfo}
                    data-bs-dismiss="modal"
                  />
                </div>
              </div>
            </div>
          </div>
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{userInfo.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{userInfo.country}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Bio:</span>
            <span className="rightbarInfoValue">{userInfo.longer_bio}</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
