import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios';
import UserCard from './UserCard';
import Sidebar from './Sidebar';
import { h1 } from 'framer-motion/client';
 
const Feed = () => {

  const dispatch = useDispatch();

  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;

  return (
    <div className="flex w-full">
      
      {/* Sidebar (Fixed) */}
      <div className="hidden sm:block fixed top-16 h-[calc(100vh-4rem)] w-70 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex justify-center w-full mt-10">
        <div className="w-1/3 pb-6">
          {feed.length <= 0 ? <h1>No new users found!</h1> : <UserCard user={feed[0]} />}
        </div>
      </div>

    </div>
  )
}

export default Feed