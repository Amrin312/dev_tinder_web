import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

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
    <div className="card bg-base-300 shadow-sm">

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
          <p className="text-sm">
            {Array.isArray(skills) ? skills.join(', ') : skills}
          </p>
        )}

        {about && <p className="text-sm opacity-90">{about}</p>}

        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary btn-sm" onClick={() => handleRequests('ignored', _id)}>Ignore</button>
          <button className="btn btn-secondary btn-sm" onClick={() => handleRequests('interested', _id)}>Interested</button>
        </div>

      </div>
    </div>
  )
}

export default UserCard;