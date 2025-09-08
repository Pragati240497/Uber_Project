import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyCaptain = async () => {
      if (!token) {
        navigate('/captain-login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setCaptain(response.data.captain);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        localStorage.removeItem('token');
        setCaptain(null);
        navigate('/captain-login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyCaptain();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
