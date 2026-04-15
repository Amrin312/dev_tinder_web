import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios';
import UserCard from './UserCard';
import Sidebar from './Sidebar';
import { h1 } from 'framer-motion/client';
import { ArrowRightIcon, Sparkles } from 'lucide-react';
 
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

  {/* Sidebar */}
  <div className="hidden sm:block w-[250px] fixed top-16 h-[calc(100vh-4rem)] bg-white shadow-md">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex justify-center md:flex-1 md:ml-[250px] lg:mr-[300px] md:px-4">
    <div className="w-full max-w-[500px]">
      {feed.length <= 0 ? (
        <h1>No new users found!</h1>
      ) : (
        feed.map((item, index) => (
          <div key={index} className="my-10">
            <UserCard user={item} />
          </div>
        ))
      )}
    </div>
  </div>

  {/* Right Panel (Fixed) */}
  <div className="hidden lg:block fixed right-50 top-16 w-[300px] p-4">
    <div className="px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-400 to-violet-500">

      <span className="inline-flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full mb-2">
        <Sparkles /> Premium Match
      </span>

      <h3 className="text-lg font-bold mb-1">
        Find Your Perfect Match
      </h3>

      <p className="text-sm text-white/80 mb-4">
        Unlock smarter, priority connections tailored just for you.
      </p>

      <button className="w-full py-2 bg-white text-violet-600 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
        Upgrade Now <ArrowRightIcon className="w-4 h-4" />
      </button>

    </div>
  </div>

</div>
  )
}

export default Feed