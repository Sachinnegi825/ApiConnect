// CommentFetcher.js
import React, { useState } from 'react';
import { getCommentsByPost } from '../services/api';
import { Loading } from './Loading';

const GetComment = ({ createdPost }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Comments
  const fetchComments = async () => {
    if (createdPost) {
      setLoading(true);
      try {
        const data = await getCommentsByPost(createdPost.userId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if(loading) return <Loading/>

  return (
    <>
      {createdPost && (
        <div className="text-center">
          <button
            onClick={fetchComments}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded transition duration-300"
          >
            {loading ? 'Loading Comments...' : 'Fetch Comments for Post'}
          </button>
        </div>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="mb-6 mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Comments</h2>
          <div className="bg-gray-800 p-4 rounded-md">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-600 p-4 mb-4">
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GetComment;
