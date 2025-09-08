import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './Start';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';
import CaptainLogin from './CaptainLogin';
import CaptainSignup from './CaptainSignup';
import Home from './Home';
import UserProtectWrapper from './UserProtectWrapper';
import UserLogout from './UserLogout';
import CaptainHome from './CaptainHome';
import CaptainProtectWrapper from './CaptainProtectWrapper';
import CaptainLogout from './CaptainLogout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />

      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />

      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />

      <Route
        path="/captain-home"
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />

      <Route
        path="/captain/logout"
        element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        }
      />
    </Routes>
  );
};

export default App;
