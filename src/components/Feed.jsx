import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios';
import UserCard from './UserCard';
 
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

  console.log(feed);

  return (
    <div className='w-full md:w-1/3'>
      {feed && ( <UserCard user = {feed[0]}  /> ) }
    </div>
  )
}

export default Feed