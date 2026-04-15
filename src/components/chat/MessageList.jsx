import React, { useEffect, useState } from 'react'
import defaultImg from '../../assets/dummy_image.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { addConnection } from '../../utils/connectionsSlice';
import { Link, useParams } from 'react-router-dom';

const MessageList = () => {

    const [loading, setLoading] = useState(true);

    const connections = useSelector(store => store.connections);

    const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

    const dispatch = useDispatch();

    const { targetUserId } = useParams();

    const getConnections = async () => {

        try{
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            dispatch(addConnection(res.data.data));
            
        }catch(err){
            console.log(err.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // if(!connections){
            getConnections();
        // }
    }, []);

  return (
    <div>
        <div className='border-b border-gray-300'>
            <h2 className='p-5 text-xl text-gray-700 font-medium'>Chats</h2>
        </div>
        {/* LIST */}
      <div>
        {connections.length === 0 ? (
          <p className="text-center p-4 text-gray-500">No chats yet</p>
        ) : (
          connections.map((user) => {

            const isActive = targetUserId === user._id;

            return (
              <Link to={`/chat/${user._id}`} key={user._id}>
                <div
                  className={`flex items-center gap-3 p-4 border-b border-gray-200 cursor-pointer transition 
                  ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}`}
                >
                  <img
                    src={user.photoUrl || defaultImg}
                    alt="user"
                    className="h-10 w-10 rounded-full border border-gray-200 "
                  />

                  <div>
                    <p className="font-semibold text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.bio || "Start conversation"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  )
}

export default MessageList