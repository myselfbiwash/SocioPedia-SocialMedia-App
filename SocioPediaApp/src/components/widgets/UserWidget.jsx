import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";
import "./Widget.css";
import twitterImage from "../../assets/twitter.png";
import linkedinImage from "../../assets/linkedin.png";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    console.log("user data is:", data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="user-widget">
      <div className="first-row">
        <section onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage image={picturePath} />
        </section>
        <div className="user-info">
          <h3
            onClick={() => navigate(`/profile/${userId}`)}
          >{`${firstName} ${lastName}`}</h3>
          <span>{friends?.length || 0} friends</span>{" "}
        </div>
      </div>
      <hr />
      <div className="second-row">
        <div className="location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="occupation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
          </svg>
          <span>{occupation}</span>
        </div>
      </div>
      <hr />
      <div className="third-row">
      <div className="viewed-profile">
          <span>Who's viewed your profile: <span className="vw-pf">{viewedProfile}</span></span>
        </div>
        <div className="impressions">
          <span>Impressions of your posts: <span className="imp">{impressions}</span> </span>
        </div>
        </div>
        <hr />
        <div className="fourth-row">
          <span><b>Social Profiles</b></span>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <div className="twitter">
            <img src={twitterImage} alt="twitter" />
            <div className="twitter-text">
              <span><b>Twitter</b></span>
              <span>Social Network</span>
            </div>
          </div>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <div className="linkedin">
            <img src={linkedinImage} alt="linkedin" />
            <div className="linkedin-text">
              <span><b>LinkedIn</b></span>
              <span>Network Platform</span>
            </div>
          </div>
          </a>
        </div>
    </div>
  );
};

export default UserWidget;
