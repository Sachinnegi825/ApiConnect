import React, { useState } from 'react';
import { getUsers } from '../services/api';
import { Loading } from './Loading';

const UserData = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data.splice(0,5));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mb-6 text-center">
      <button
        onClick={fetchUsers}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded transition duration-300"
        >
        {loading ? <Loading/>: 'Fetch Users'}
      </button>

      {/* Display Users in a Single Box with Full Data */}
      {users.length > 0 && (
        <div className="mt-4 p-4 border border-gray-600 rounded-md bg-gray-800">
          <h2 className="text-2xl font-bold mb-4">Select a User</h2>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-2 cursor-pointer hover:bg-blue-500 transition duration-300`}
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-300">Name: {user.name}</span>
                <span className="text-gray-400">Email: {user.email}</span>
                <span className="text-gray-400">Username: {user.username}</span>
                <span className="text-gray-400">Phone: {user.phone}</span>
                <span className="text-gray-400">Website: {user.website}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserData;
