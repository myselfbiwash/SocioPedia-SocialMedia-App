import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <div style={{width:size, height:size}}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:4000/${image.substring(7)}`}      />
    </div>
  );
};

export default UserImage;
// In this code snippet, we have a functional component called UserImage that takes an image prop and an optional size prop. The component renders an
