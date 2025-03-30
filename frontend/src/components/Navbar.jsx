import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onNewPostClick }) => {
    const location = useLocation();

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="text-orange-500 font-bold text-xl">CookSkill</div>
            <div className="space-x-6">
                <Link to="/" className={`text-gray-600 ${location.pathname === '/' ? 'text-orange-500 font-semibold' : ''}`}>Home</Link>
                <Link to="/explore" className={`text-gray-600 ${location.pathname === '/explore' ? 'text-orange-500 font-semibold' : ''}`}>Explore</Link>
                <Link to="/learning-plans" className={`text-gray-600 ${location.pathname === '/learning-plans' ? 'text-orange-500 font-semibold' : ''}`}>Learning Plans</Link>
                <Link to="/profile" className={`text-gray-600 ${location.pathname === '/profile' ? 'text-orange-500 font-semibold' : ''}`}>My Profile</Link>
            </div>
            <div className="flex items-center space-x-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={onNewPostClick}>+ New Post</button>
                <span className="bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center">EE</span>
            </div>
        </div>
    );
};

export default Navbar;