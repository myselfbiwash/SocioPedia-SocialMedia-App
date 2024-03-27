import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/reducer";
import Friend from "../../components/Friend";
import "./Widget.css";

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
    const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
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

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    const response = await fetch(`http://localhost:4000/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    console.log("Updated Post:",updatedPost);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="post-widget">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <div className="post-widget-middle">
        <p>{description}</p>
        {picturePath && (
          <img
            style={{ width: "600px", height: "700px" }}
            src={`http://localhost:4000/assets/${picturePath}`}
            alt="post"
          />
        )}
        <div>
          <div className="post-widget-bottom">
            <div className="like">
            {!isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                onClick={patchLike}
                // className={isLiked ? "post-unliked" : "post-liked"}
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                onClick={patchLike}
              >
                <path d="M718-313 604-426l57-56 57 56 141-141 57 56-198 198ZM440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Z" />
              </svg>
            )}
            <span>{likeCount}</span>
            </div>

          <div className="comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              onClick={() => setIsComments(!isComments)}
            >
              <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
            </svg>
            <span>{comments.length}</span>
          </div>
          </div>
          <hr />
          {isComments && <form className="comment-form" onSubmit={handleComment}>
            <input type="text" placeholder="Add a comment" />
            <button type="submit">Post Comment</button>
            </form>}
          {isComments && comments.map((comment,i) => (
                  <div key={`${name}-${i}`} className="cmt">
                    <hr />
                    {comment.comment}
                  </div>
                  )
          )}

        </div>
      </div>
    </div>
  );
};

export default PostWidget;
