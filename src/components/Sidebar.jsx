import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Home, User, Users, UserPlus, MessageSquareMore } from "lucide-react";
import { STATIC_BASE_URL } from "../utils/constants";

const Sidebar = () => {
  const user = useSelector((state) => state.user);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition ${
      isActive
        ? "bg-gradient-to-r from-sky-500 to-violet-600 text-white"
        : "hover:bg-gradient-to-r hover:from-sky-500 hover:to-violet-600 hover:text-white"
    }`;

  return (
    <div className="p-5">

      {/* User Info */}
      {user && (
        <div className="p-2 border flex gap-3 items-center border-gray-300 rounded-lg">
          <img
            alt="User profile"
            className="h-10 w-10 rounded-full"
            src={
              STATIC_BASE_URL + user.photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
          <p className="font-medium">{user.firstName}</p>
        </div>
      )}

      {/* Menu */}
      <ul className="flex flex-col gap-3 mt-5">

        <li>
          <NavLink to="/feed" className={linkClass}>
            <Home size={18} />
            Feed
          </NavLink>
        </li>

        <li>
          <NavLink to="/chat" className={linkClass}>
            <MessageSquareMore size={18} />
            Messages
          </NavLink>
        </li>

        <li>
          <NavLink to="/requests" className={linkClass}>
            <UserPlus size={18} />
            Requests
          </NavLink>
        </li>

        <li>
          <NavLink to="/connections" className={linkClass}>
            <Users size={18} />
            Connections
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" className={linkClass}>
            <User size={18} />
            Profile
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;