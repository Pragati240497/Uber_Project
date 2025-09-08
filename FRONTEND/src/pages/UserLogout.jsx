import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext.jsx';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        // Even if logout fails, remove token locally
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Logging out...
    </div>
  );
};

export default UserLogout;
