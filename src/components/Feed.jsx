import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios';
 
const Feed = () => {

  const dispatch = useDispatch();

  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      dispatch(addFeed());
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>Feed</div>
  )
}

export default Feed