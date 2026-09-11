import React from "react";
import CV from "../assets/CV.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user || {});

  // Derive username from Redux or localStorage
  const getUsername = () => {
    if (user?.username) {
      return user.username;
    }
    const storedUser = localStorage.getItem("cv_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        return parsed.username || "User";
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
    return "User";
  };

  // const username = getUsername();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cv_token");
    localStorage.removeItem("cv_user");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo + App Name */}
        <div className="flex items-center gap-2">
          <img src={CV} alt="CV Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-xl font-bold text-blue-700">
            Career<span className="text-blue-500">Maker</span>
          </h1>
        </div>
        {/* Middle: Greeting */}
        <div className="text-gray-700 font-medium text-sm md:text-base">
          Welcome,&nbsp;
          <span className="text-blue-600 font-semibold">{getUsername()}</span>
        </div>

        {/* Right: Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}