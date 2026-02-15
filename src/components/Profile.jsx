import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {

  const user = useSelector((store) => store.user);
  // console.log(user);
  
  return (
    <div className='w-full'>
      {user && <EditProfile userData={user} />}
    </div>
  )
}

export default Profile