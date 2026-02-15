import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';

const Requests = () => {
    const [requests, setRequests] = useState([]);

    const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

    const getRequests = async () => {
        const res = await axios.get(BASE_URL + '/user/requests', { withCredentials: true });
        console.log(res.data.connectionRequests);
        setRequests(res.data.connectionRequests);
    };

    useEffect(() => {
        getRequests();
    }, []);

  return (
    <div className='flex flex-col  w-1/2'>
        <h1 className='text-white text-2xl text-center mb-4'>Requests</h1>

        {
            requests.length == 0 && (
                <p className="text-center opacity-60">No requests</p>
            )
        }

        {
            requests?.map(request => {
                const {firstName, lastName, age, gender, bio, photoUrl, _id} = request.fromId;
                return (
                    <div className='flex justify-between gap-8 bg-base-300 rounded-lg m-2 px-6 py-4'  key={_id}>
                        <div>
                            <img src={photoUrl || defaultAvatar} className='rounded-full w-20 h-20 ' alt="" />
                        </div>

                        <div className='flex flex-col gap-1 flex-2'>
                            <h1 className='text-lg'>{ `${firstName} ${lastName}` }</h1>
                            { age && gender && <p className='text-sm'>{`${age} ${gender}`}</p>}
                            { bio && <p className='text-sm'>{bio}</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <button className='btn bg-red-700 hover:bg-red-600 px-4 py-2'>Reject</button>
                            <button className='btn bg-green-700 hover:bg-green-600 px-4 py-2'>Accept</button>
                        </div>
                    </div>
                )
            })
        }

    </div>
  )
}

export default Requests