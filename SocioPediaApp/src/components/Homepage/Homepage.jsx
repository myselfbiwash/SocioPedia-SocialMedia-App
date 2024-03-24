import React from 'react'
import UserWidget from '../widgets/UserWidget'
import { useSelector } from 'react-redux'
import MyPostWidget from '../widgets/MyPostWidget';
import './Homepage.css'

const Homepage = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user in homepage is:", user);
  const { _id, picturePath } = user || {};
  // const _id = user?._id;
  // const picturePath = user?.picturePath;

  console.log("User ID is:", _id);
  console.log("User Picture Path is:", picturePath);

  // const state = useSelector(state => state);
  // console.log("Redux State is:", state);
 

  return (
    <div className='homepage'>
      <section className='user-details'>
        <UserWidget userId={_id} picturePath={picturePath} />
      </section>
      <section className='user-posts'>
        <MyPostWidget picturePath={picturePath}/>
      </section>
    
    </div>
  )
}

export default Homepage

