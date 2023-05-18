import React from 'react';
import {logout} from '../features/auth/authSlice';
import { resetMedia } from '../features/media/mediaSlice';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const Navbar = () => {
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetMedia());
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-xl font-bold">DOBBYADS</span>
          </div>

          <div className="flex gap-2">
            <h1 className='mt-1.5 font-bold text-white'>Logged in as: {user.name}</h1>
            <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
