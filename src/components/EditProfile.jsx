import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';

const EditProfile = ({ userData }) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    photoUrl: '',
    age: '',
    gender: '',
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
    <div className='flex gap-2'>

        <div className='flex items-center justify-center'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title text-center">Edit Profile</h2>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name:</legend>
                            <input type="text" name="firstName" className="input" value={user.firstName} onChange={handleChange} placeholder="Enter First Name" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name:</legend>
                            <input type="text" name="lastName" className="input" value={user.lastName} onChange={handleChange}  placeholder="Enter Last Name" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo URL:</legend>
                            <input type="text" name="photoUrl" className="input" value={user.photoUrl} onChange={handleChange}  placeholder="Enter Photo URL" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age:</legend>
                            <input type="text" name="age" className="input" value={user.age} onChange={handleChange}  placeholder="Enter Age" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender:</legend>
                            <input type="text" name="gender" className="input" value={user.gender} onChange={handleChange}  placeholder="Enter Gender" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About:</legend>
                            <input type="text" name="about" className="input" value={user.about} onChange={handleChange}  placeholder="Enter About" />
                        </fieldset>

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