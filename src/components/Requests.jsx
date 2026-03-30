import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { div } from 'framer-motion/client';
import Sidebar from './Sidebar';

const Requests = () => {
    const requests = useSelector(store => store.requests);
    
    const dispatch = useDispatch();
    const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

    const getRequests = async () => {
        const res = await axios.get(BASE_URL + '/user/requests', { withCredentials: true });
        
        dispatch(addRequests(res.data.connectionRequests));
    };

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASE_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

  return (
    <div className='flex w-full'>

        <div className="hidden sm:block fixed top-16 h-[calc(100vh-4rem)] w-70 bg-white shadow-md">
            <Sidebar />
        </div>

        <div className='flex w-full justify-center'>
            <div className='flex flex-col w-full md:w-1/2 mt-10'>
                <h1 className='text-gray-800 font-medium text-2xl text-center mb-4'>Requests</h1>

                {
                    requests.length == 0 && (
                        <p className="text-center opacity-60">No requests found!</p>
                    )
                }

                {
                    requests?.map(request => {
                        const {firstName, lastName, age, gender, bio, photoUrl, _id} = request.fromId;
                        return (
                           <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl rounded-lg m-2 px-4 py-4' key={_id}>
    
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={photoUrl || defaultAvatar}
                                        className='rounded-full w-16 h-16 md:w-20 md:h-20'
                                        alt=""
                                    />
                                </div>

                                {/* Content */}
                                <div className='flex flex-col gap-1 flex-1 min-w-0 text-center md:text-left'>
                                    <h1 className='text-lg font-medium truncate'>
                                        {`${firstName} ${lastName}`}
                                    </h1>

                                    {age && gender && (
                                        <p className='text-sm text-gray-500'>
                                            {`${age} ${gender}`}
                                        </p>
                                    )}

                                    {bio && (
                                        <p className='text-sm text-gray-600 break-words'>
                                            {bio}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className='flex flex-row md:flex-col gap-2 w-full md:w-auto justify-center'>
                                    <button
                                        className='btn text-white bg-gray-600 hover:bg-gray-500 px-4 py-2 md:w-auto'
                                        onClick={() => reviewRequest('rejected', request._id)}
                                    >
                                        Reject
                                    </button>

                                    <button
                                        className='btn text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 md:w-auto'
                                        onClick={() => reviewRequest('accepted', request._id)}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    </div>
  )
}

export default Requests
