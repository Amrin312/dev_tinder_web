import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Sun, Moon, LayoutList, Bell, User, Home, Users, UserPlus, LogOut } from "lucide-react";

const Navbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            const res = await axios.post(BASE_URL + '/logout', { withCredentials: true });
            dispatch(removeUser());
            return navigate('/login');

        }catch(err) {
            console.error(err.message)
        }
    };
    
    
  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-50">
        <div className="flex-1">
            <Link to={user ? '/feed' : '/'} className="btn btn-ghost text-xl">🧑‍💻 DevTinder</Link>
        </div>
        <div className="flex gap-5 items-center mx-4">
            {
                !user && (
                    <div className='flex gap-4 items-center'>
                        {/* <Link>About</Link>
                        <Link>Testimonials</Link>
                        <Link>Contact Us</Link> */}
                        {/* <Sun /> */}
                        <Link to="/login" className='p-2 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-sky-400 to-violet-500
                       hover:from-sky-500 hover:to-violet-600 transition'>Sign Up / Login</Link>

                    </div>
                )
            }

            { user && 
            (
            <>
                <Bell />

                <p>{ user.firstName }</p>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="User profile"
                        src={user.photoUrl ? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to='/profile'><User size={18} /> Profile</Link></li>
                    <li><Link to='/feed'><Home size={18} /> Feed</Link></li>
                    <li><Link to="/connections"><Users size={18} />  Connections</Link></li>
                    <li><Link to="/requests"><UserPlus size={18} /> Requests</Link></li>
                    <li><a onClick={handleLogout}><LogOut size={18} /> Logout</a></li>
                </ul>
                </div>
            </>
             ) }
        </div>
    </div>
  )
}

export default Navbar