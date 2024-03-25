import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "./state/reducer";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector((state) => state.auth.user.friends);

    // const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
          `http://localhost:3001/users/${_id}/${friendId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
      };

  return (
    <div>
      <div>
      <UserImage image={userPicturePath} size="55px" />
        <div>
            <h3>{name}</h3>
            <span>{subtitle}</span>
      </div>
    </div>
    <div>
        
      {/* {isFriend ? (
        <button onClick={patchFriend}>Unfriend</button>
      ) : (
        <button onClick={patchFriend}>Add Friend</button>
      )} */}
    </div>
    </div>
  )
}

export default Friend
