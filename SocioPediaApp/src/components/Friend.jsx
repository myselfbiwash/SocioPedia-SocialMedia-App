import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "./state/reducer";
import UserImage from "./UserImage";
import "./Friend.css";
import { setFriendStatus } from "./state/reducer";

const Friend = ({ friendId, name, subtitle, userPicturePath, isFriendList=false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);
  // console.log("User id from store is:", _id);
  // console.log("User from store is:", user);
  const friends = user && Array.isArray(user.friends) ? user.friends : [];  // console.log("Friends are:", friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (!friendId) {
      console.error("friendId is undefined");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Friends are:", data);
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div>
      <div className="post-friend">
        <UserImage image={userPicturePath} size="55px" />
        <div className="post-desc" onClick={() => navigate(`/profile/${friendId}`)}>
          <h3>{name}</h3>
          <span>{subtitle}</span>
        </div>
      <div className="add-remove">
        {isFriend ? (
          <button onClick={patchFriend} className={isFriendList ? 'friend-list' : 'post-list '}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
            </svg>
          </button>
        ) : (
          <button onClick={patchFriend} className={isFriendList ? 'friend-list' : 'post-list '}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
            </svg>
          </button>
        )}
              </div>

      </div>
    </div>
  );
};

export default Friend;
