import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login'); // Redirect if not logged in
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('hacktoon');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); // ✅ Force full refresh after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600">👤 User Profile</h1>
          <p className="text-gray-500 text-sm mt-2">Manage your account details</p>
        </div>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Name</label>
            <div className="w-full px-4 py-2 bg-gray-100 rounded-md font-medium text-gray-800">
              {user.name}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="w-full px-4 py-2 bg-gray-100 rounded-md font-medium text-gray-800">
              {user.email}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
