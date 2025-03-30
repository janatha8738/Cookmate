import React from 'react';

const ProfileSidebar = () => {
    return (
        <div className="w-64 p-4 bg-white shadow-md rounded-lg">
            <div className="bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl">EE</div>
            <div className="text-center mt-2 text-gray-600">ee</div>
            <div className="flex justify-around mt-4 text-center">
                <div>
                    <strong>0</strong><br />Posts
                </div>
                <div>
                    <strong>0</strong><br />Followers
                </div>
                <div>
                    <strong>0</strong><br />Following
                </div>
            </div>
            <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded">Edit Profile</button>
        </div>
    );
};

export default ProfileSidebar;