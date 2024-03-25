import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/reducer";
import Friend from "../../components/Friend";


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      };

  return (
    <div>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
        <div>
            <p>{description}</p>
            {picturePath && <img src={picturePath} alt="post" />}
            </div>
    </div>
  )
}

export default PostWidget
