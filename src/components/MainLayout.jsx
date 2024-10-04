import React, { useState } from 'react';
import UserData from './UserData';
import CreatePostdata from './CreatePostdata';
import GetComment from './GetComment';

const MainLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);

  return (
    <div className="min-h-screen bg-darkBlue text-gray-200 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">API CONNECT</h1>

        <div className="flex flex-col mt-10 sm:flex-row sm:space-x-6">

          {/* Fetch Users */}
          <div className="flex-1 mb-6">
            <UserData setSelectedUser={setSelectedUser} />
          </div>

          {/* Create Post Section */}
          <div className="flex-1 mb-6">
            <CreatePostdata selectedUser={selectedUser} setCreatedPost={setCreatedPost} createdPost={createdPost}/>
          </div>

          {/* Fetch Comments Section */}
          <div className="flex-1 mb-6">
            <GetComment createdPost={createdPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
