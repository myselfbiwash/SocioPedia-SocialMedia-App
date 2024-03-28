import React,{ useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import FriendListWidget from "../../components/widgets/FriendListWidget";
import MyPostWidget from "../../components/widgets/MyPostWidget";
import PostsWidget from "../../components/widgets/PostsWidget";
import UserWidget from "../../components/widgets/UserWidget";
import '../widgets/Widget.css'
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const token = useSelector((state) => state.auth.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) return null;

  return (
    <div>
        <div className="profile-page">
            <UserWidget  userId={userId} picturePath={user.picturePath}/>
            {/* <MyPostWidget picturePath={user.picturePath}/> */}
            <div className='posts-widget'><PostsWidget userId={userId} isProfile/></div>
            <div className='friend-widget'><FriendListWidget userId={userId} /></div>

        </div>
      
    </div>
  )
}

export default ProfilePage
