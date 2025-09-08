import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const logoutCaptain = async () => {
      const token = localStorage.getItem('token'); // use same token key as login

      if (!token) {
        navigate('/captain-login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          setCaptain(null);
          navigate('/captain-login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        // Even if logout fails on server, remove token locally
        localStorage.removeItem('token');
        setCaptain(null);
        navigate('/captain-login');
      }
    };

    logoutCaptain();
  }, [navigate, setCaptain]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Logging out...
    </div>
  );
};

export default CaptainLogout;
