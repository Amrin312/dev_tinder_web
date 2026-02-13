import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';

const EditProfile = ({ userData }) => {

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
      setUser(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value}));
  };

  const handleSubmit = () => {

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
                        
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-first-name">
                                    First Name
                                </label>
                                <input type="text" name="firstName" className="input w-full" value={user.firstName} onChange={handleChange} placeholder="Enter First Name" />
                                
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label>
                                <input type="text" name="lastName" className="input w-full" value={user.lastName} onChange={handleChange}  placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-first-name">
                                    Age
                                </label>
                                <input type="number" name="age" className="input w-full" value={user.age} onChange={handleChange} placeholder="Enter age" />
                                
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label>

                                <select name="gender" className="select w-full" id="gender" onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">Others</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    Headline
                                </label>
                                <input type="text" name="bio" className="input w-full" value={user.age} onChange={handleChange} placeholder="Enter age" />
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    Skills
                                </label>
                                <input type="text" name="bio" className="input w-full" value={user.age} onChange={handleChange} placeholder="Enter Skills" />
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    About
                                </label>
                                <textarea name="bio" rows="5" className="textarea w-full" value={user.age} onChange={handleChange} placeholder="Enter About"> </textarea>
                            </div>
                        </div>


                       

                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-primary btn-block" onClick={handleSubmit}>Save Profile</button>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
        <UserCard user={user} />
    </div>
  )
}

export default EditProfile