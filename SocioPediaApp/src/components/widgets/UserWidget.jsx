import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";

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
      <UserImage image={picturePath} />
        <div className="user-info">
          <h2>{`${firstName} ${lastName}`}</h2>
          <span>{friends?.length || 0} friends</span>        </div>
 {/* <p>{occupation}</p>
          <p>{location}</p> */}
      </div>
    </div>
  );
};

export default UserWidget;
