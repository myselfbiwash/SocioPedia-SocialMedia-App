import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "./state/reducer";
import UserImage from "./UserImage";
import './Friend.css';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    // const friends = useSelector((state) => state.auth.user.friends);
    const user = useSelector((state) => state.auth.user);
    // console.log("User id from store is:", _id);
    // console.log("User from store is:", user);
const friends = user ? user.friends : [];
// console.log("Friends are:", friends);

    // const isFriend = friends.find((friend) => friend._id === friendId);
    let isFriend = false;
// if (friends && Array.isArray(friends)) {
//     isFriend = friends.find((friend) => friend._id === friendId);
// }

    const patchFriend = async () => {
        if (!friendId) {
            console.error('friendId is undefined');
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
      <div className='post-friend'>
      <UserImage image={userPicturePath} size="55px" />
        <div className='post-desc'>
            <h3>{name}</h3>
            <span>{subtitle}</span>
      </div>
    </div>
    <div>
        
      {isFriend ? (
        <button onClick={patchFriend}>Unfriend</button>
      ) : (
        <button onClick={patchFriend}>Add Friend</button>
      )}
    </div>
    </div>
  )
}

export default Friend
