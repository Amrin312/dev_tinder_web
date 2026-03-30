import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionsSlice';
import Sidebar from './Sidebar';


const Connections = () => {

    const connections = useSelector(store => store.connections);

    const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

    const dispatch = useDispatch();
    
    const getConnections = async () => {

        try{
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            dispatch(addConnection(res.data.data));
            
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        // if(!connections){
            getConnections();
        // }
    }, []);

  return (
    <div className='flex w-full'>

        <div className="hidden sm:block top-16 fixed h-[calc(100vh-4rem)] w-70 bg-white shadow-md">
            <Sidebar />
        </div>

        <div className='flex w-full justify-center md:ml-10 my-5'>
            <div className='flex flex-col justify-center w-full md:w-1/2'>
                <h1 className='font-medium text-2xl text-center mb-4'>Connections</h1>

                {
                    connections?.map(connection => {
                        const {firstName, lastName, age, gender, bio, photoUrl, _id} = connection;
                        return (
                            
                            <div className='flex flex-col md:flex-row items-center bg-white gap-6 shadow-lg rounded-lg m-2 px-6 py-4'  key={_id}>
                                <div>
                                    <img src={photoUrl || defaultAvatar} loading="lazy" className='rounded-full w-20 h-20 ' alt="" />
                                </div>

                                <div>
                                    <h1 className='text-lg'>{ `${firstName} ${lastName}` }</h1>
                                    { age && gender && <p className='text-base'>{`${age} ${gender}`}</p>}
                                    { bio && <p className='text-base'>{bio}</p>}

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

export default Connections