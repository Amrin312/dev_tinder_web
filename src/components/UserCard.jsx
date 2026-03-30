import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { Heart, X } from 'lucide-react';
import { div, p } from 'framer-motion/client';

const UserCard = ({ user }) => {

  const dispatch = useDispatch();

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
    bio,
    skills
  } = user;

  const handleRequests = async (status, user_id) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + '/' + user_id, {}, { withCredentials: true });
  
      dispatch(removeUserFromFeed(user_id));

    }catch(err){
      console.log(err.message);
      
    }
  }

  const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  return (
    <div className="card bg-base-200 shadow-lg border border-gray-200">

      <figure>
        <img
          src={photoUrl || defaultAvatar}
          alt={`${firstName} avatar`}
          className="w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {gender && age && (
          <p className="text-sm opacity-80">
            {age} • {gender}
          </p>
        )}

        {bio && <p className="font-medium">{bio}</p>}

        {skills && (
          <div>
            <p className='text-base font-medium text-gray-700'>Skills</p>
            <p className="text-sm">
              {Array.isArray(skills) ? skills.join(', ') : skills}
            </p>
          </div>
        )}

        {about && 
          <div>
            <p className='text-base font-medium text-gray-700'>About</p>
            <p className="text-sm break-words">{about}</p>
          </div>
        }

        <div className="card-actions justify-center mt-3">
          <button className="p-4 rounded-full bg-white text-red-500
               shadow-md hover:shadow-lg
               hover:scale-105 active:scale-95
               transition-all duration-200" onClick={() => handleRequests('ignored', _id)}><X /></button>
                       
          <button className="p-4 rounded-full text-white
               bg-gradient-to-r from-sky-400 to-violet-500
               hover:from-sky-500 hover:to-violet-600
               shadow-md hover:shadow-lg
               hover:scale-105 active:scale-95
               transition-all duration-200" onClick={() => handleRequests('interested', _id)}><Heart /></button>
        </div>

      </div>
    </div>
  )
}

export default UserCard;