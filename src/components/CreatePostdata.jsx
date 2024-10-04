// PostCreator.js
import React, { useState } from 'react';
import { createPost } from '../services/api';
import { Loading } from './Loading';

const CreatePostdata = ({ selectedUser, setCreatedPost,createdPost }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [loading,setLoading]=useState(false)

  // Handle Post Creation
  const handleCreatePost = async () => {

    if(postTitle=="" && postBody==""){
      alert("Please fill all fields")
      return
    }

    if (selectedUser) {
      const postData = {
        title: postTitle,
        body: postBody,
        userId: selectedUser.id,
      };
      setLoading(true)
      const newPost = await createPost(postData);
      setCreatedPost(newPost);
      setPostTitle('');
      setPostBody('');
      setLoading(false)
    }
  };

  

  return (
    <>
      {selectedUser && (
        <div className="mb-6 text-center">
          <button
            onClick={handleCreatePost}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded transition duration-300"
          >
            Create Post
          </button>
          <input
            type="text"
            placeholder="UserName"
            value={selectedUser.name}
            
            className="bg-gray-700 text-white px-4 py-2 mb-4 mt-4 rounded-md focus:outline-none focus:ring focus:ring-lightBlue block w-full"
          />
          <input
            type="text"
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-lightBlue block w-full"
          />
          <textarea
            placeholder="Post Body"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-lightBlue block w-full"
          />
         
        </div>
      )}
       {loading ? <Loading /> : createdPost && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Post Created</h2>
          <div className="bg-gray-800 p-4 rounded-md">
            <pre className="text-lg text-gray-300 whitespace-pre-wrap">
              {JSON.stringify({ name: selectedUser.name, ...createdPost }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostdata;
