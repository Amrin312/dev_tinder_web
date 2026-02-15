import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const EditProfile = ({ userData }) => {
    // console.log(userData);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    photoUrl: '',
    age: '',
    gender: '',
    bio: '',
    skills: [],
    about: '',
  });

  useEffect(() => {
    if (userData) {
        setUserId(userData._id);
        setUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            photoUrl: userData.photoUrl || '',
            age: userData.age || '',
            gender: userData.gender || '',
            bio: userData.bio || '',
            skills: userData.skills || '',
            about: userData.about || ''
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value}));
  };

  const handleSubmit = async () => {

    try{
        console.log(user);
        
        const res =  await axios.patch(`${BASE_URL}/profile/edit/${userId}`, user, { withCredentials: true } );
        dispatch(res.data);
        toast.success('Profile updated successfully!');
    }catch(err){
        console.log(err.message);
    }

  };


  return (
    <div className='flex flex-col md:flex-row gap-10 w-full'>
        <div className='flex w-full md:w-3/4'>
            <div className="card card-border bg-base-300 w-full">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">Edit Profile</h2>

                    <div>
                        {/* <div className="flex flex-wrap mb-6">
                            <input type="file" name="" className="input" id="" />
                        </div> */}
                        
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input type="text" name="firstName" className="input w-full" value={user.firstName} onChange={handleChange} placeholder="Enter First Name" />
                                
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input type="text" name="lastName" className="input w-full" value={user.lastName} onChange={handleChange}  placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Age
                                </label>
                                <input type="number" name="age" className="input w-full" value={user.age} onChange={handleChange} placeholder="Enter age" />
                                
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>

                                <select name="gender" className="select w-full" id="gender" value={user.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Headline
                                </label>
                                <input type="text" name="bio" className="input w-full" value={user.bio} onChange={handleChange} placeholder="Enter Bio" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Skills
                                </label>
                                <input type="text" name="skills" className="input w-full" value={user.skills} onChange={handleChange} placeholder="React Js, Javascript, Node Js" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    About
                                </label>
                                <textarea name="about" rows="5" className="textarea w-full" value={user.about} onChange={handleChange} placeholder="Enter About"> </textarea>
                            </div>
                        </div>


                       

                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-primary btn-block" onClick={handleSubmit}>Save Profile</button>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>

        <div className='w-full md:w-1/4'>
            <UserCard user={user} />
        </div>
       
    </div>
  )
}

export default EditProfile