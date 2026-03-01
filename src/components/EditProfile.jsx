import React, { useEffect, useRef, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addUser } from '../utils/userSlice';
import Webcam from "react-webcam";
import ProfileUpload from './ProfileUpload';
import { Camera } from 'lucide-react';
import { Upload } from 'lucide-react';

const EditProfile = ({ userData }) => {
    // console.log(userData);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const fileRef = useRef(null);

  const webcamRef = useRef(null);

  const [file, setFile] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

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
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value}));
  };

  const handleSubmit = async () => {

    try{
        console.log(user);
        
        const res =  await axios.patch(`${BASE_URL}/profile/edit/${userId}`, user, { withCredentials: true } );
        dispatch(addUser(res.data));
        toast.success('Profile updated successfully!');
    }catch(err){
        console.log(err.message);
    }

  };

  const triggerFileUpload = () => {
    fileRef.current.click();
  }


  const handleFileUpload = async (e) => {

    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    const formData = new FormData();

    formData.append("profile", selectedFile);

    try{
        const res = await axios.post(`${BASE_URL}/upload-profile`, formData,
             { 
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data" 
                }
            });
        // console.log(res);

        dispatch(addUser(res.data));
        
    }catch(err){
        console.log(err.message);
        
    }
  }

  const capturePhoto = async () => {
  const imageSrc = webcamRef.current.getScreenshot();

  // base64 → blob
  const blob = await fetch(imageSrc).then(res => res.blob());

  const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("profile", file);

  try {
    const res = await axios.post(
      `${BASE_URL}/upload-profile`,
      formData,
      { withCredentials: true }
    );

    dispatch(addUser(res.data)); 
    setShowCamera(false);
    toast.success("Photo uploaded!");

  } catch (err) {
    console.error(err);
    toast.error("Camera upload failed");
  }
};

  return (
    <div className='flex flex-col md:flex-row gap-10 w-full'>
        <div className='flex w-full md:w-3/4'>
            <div className="card card-border bg-base-300 w-full">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">Edit Profile</h2>

                    {showCamera && (
                        <dialog open className="modal">
                                            <div className="modal-box max-w-2xl">
                        
                                            <h3 className="font-bold text-lg mb-4 text-center">
                                                Capture Profile Photo
                                            </h3>
                        
                                            <div className="flex justify-center">
                                                <Webcam
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={{
                                                    width: 500,
                                                    height: 500,
                                                    facingMode: "user"
                                                }}
                                                className="rounded-xl shadow-lg"
                                                />
                                            </div>
                        
                                            <div className="modal-action justify-center mt-6 gap-4">
                                                <button
                                                className="btn btn-outline"
                                                onClick={() => setShowCamera(false)}
                                                >
                                                Cancel
                                                </button>
                        
                                                <button
                                                className="btn btn-primary"
                                                onClick={capturePhoto}
                                                >
                                                Capture
                                                </button>
                                            </div>
                        
                                            </div>
                        
                                        
                                        </dialog>
                    )}

                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <img src={user.photoUrl ? user.photoUrl : defaultAvatar} className="rounded-full h-30 w-30" alt="profile pic" />

                            <button className='px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-500 hover:to-violet-600 transition flex items-center gap-2' onClick={triggerFileUpload}><Upload />Upload Profile</button>

                            <input type="file" ref={fileRef} onChange={handleFileUpload} name="file" id="file" className='hidden' />

                            <button className='px-6 py-3 rounded-xl font-semibold
                       border border-slate-300 dark:border-slate-700
                       text-slate-900 dark:text-slate-50
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2' onClick={() => setShowCamera(true)}><Camera /> Take a photo</button>

                        </div>
                        
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
                            <button className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-500 hover:to-violet-600 transition btn-block" onClick={handleSubmit}>Save Profile</button>
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