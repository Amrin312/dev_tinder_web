import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionsSlice';

const Connections = () => {

    const connections = useSelector(store => store.connections);
    console.log(connections);

    const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

    const dispatch = useDispatch();
    
    const getConnections = async () => {

        try{
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            console.log(res.data.data);
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
    <div className='flex flex-col justify-center w-1/2'>
        <h1 className='text-white text-2xl text-center mb-4'>Connections</h1>

        {
            connections?.map(connection => {
                const {firstName, lastName, age, gender, bio, photoUrl, _id} = connection;
                return (
                    <div className='flex gap-6 bg-base-300 rounded-lg m-2 px-6 py-4'  key={_id}>
                        <div>
                            <img src={photoUrl || defaultAvatar} className='rounded-full w-20 h-20 ' alt="" />
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
  )
}

export default Connections