import { React, useState, useEffect, useContext } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AppContext from "../../context/appContext";


export default function Rightbar({ profile, userInfo, setUserInfo }) {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AppContext)

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
            <b>New Garden</b> just <b>dropped</b> come check it out!
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://foodtank.com/wp-content/uploads/2021/09/Food-Tank-Aberdeen-Street-Community-Garden.jpg"
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.length > 0 && friends.map((u) => (
            <Online key={u.user_id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
  const { user } = useContext(AppContext)
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [longer_bio, setLonger_bio] = useState("");

    const handleNewInfo = async (e) => {
      if (bio === "" && city === "" && country === "" && longer_bio === "")
        return;

      const newUserInfo = {
        username: user.username,
        profile_pic: user.profile_pic,
        cover_pic: user.cover_pic,
        bio,
        city,
        country,
        longer_bio,
      };

      if (newUserInfo.bio === "") newUserInfo.bio = user.bio;
      if (newUserInfo.city === "") newUserInfo.city = user.city;
      if (newUserInfo.country === "") newUserInfo.country = user.country;
      if (newUserInfo.longer_bio === "")
        newUserInfo.longer_bio = user.longer_bio;

      await fetch(`http://localhost:9001/profile/${user.user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      });

      setUserInfo(newUserInfo);
      setBio("");
      setCity("");
      setCountry("");
      setLonger_bio("");
    };

    return (
      <>
        <h4 className="rightbarTitle">
          User information {/* {userInfo.user_id === profile.user_id && ( */}
          <PersonAddIcon className="add_friend" />
          {/* )} */}
          <EditIcon
            className="edit"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />{" "}
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
        <h4 className="rightbarTitle">Garden Owners You Follow</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
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
