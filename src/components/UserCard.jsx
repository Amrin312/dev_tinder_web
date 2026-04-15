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
      toast.success('Profile updated successfully!');

    }catch(err){
      console.log(err.message);
      
    }
  }

  const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  return (
  <div className="rounded-2xl overflow-hidden shadow-md group">

  {/* Image */}
  <div className="h-[320px] w-full overflow-hidden">
    <img
      src={photoUrl || defaultAvatar}
      alt="user"
      className="w-full h-full object-cover 
      transition duration-300 group-hover:scale-105"
    />
  </div>

  {/* Bottom Content */}
  <div className="bg-white p-4">

    <div className="bottom-4 left-4 mb-2">
      <h2 className="text-xl font-bold">
        {firstName} {lastName}
      </h2>
      <p className="text-sm text-gray-500">
        {bio || "Fullstack Developer"}
      </p>
    </div>



    {/* Skills */}
    {skills && (
      <div className="flex flex-wrap gap-2 my-3">
        {skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 bg-gradient-to-r from-sky-100 to-violet-100 text-gray-700 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    )}

        {/* About */}
    {about && (
      <p className="text-sm text-gray-600 line-clamp-2">
        {about}
      </p>
    )}

    {/* Actions */}
    <div className="flex justify-center gap-5 items-center mt-4">

      <button
        onClick={() => handleRequests('ignored', _id)}
        className="p-4 rounded-full bg-white text-red-500
               shadow-md hover:shadow-lg
               hover:scale-105 active:scale-95
               transition-all duration-200"
      >
        <X size={18} />
      </button>

      <button
        onClick={() => handleRequests('interested', _id)}
        className="p-4 rounded-full text-white text-sm font-medium
        bg-gradient-to-r from-sky-400 to-violet-500
        shadow-md hover:shadow-lg hover:scale-105 transition"
      >
        <Heart />
      </button>

    </div>

  </div>

</div>
  )
}

export default UserCard;