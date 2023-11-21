import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import GuestHomePage from './pages/GuestHomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Category from './Components/common/Category.tsx';
import HomePage from './pages/HomePage.tsx';
import MyProfile from './pages/MyProfile.tsx';
import { Card } from '@mui/material';
import CardMaker from './Components/common/Card.tsx';
import OtherProfile from './pages/OtherProfile.tsx';
import AlertDialog from './pages/modals/NotificationModal.tsx';
import NotificationModal from './pages/modals/NotificationModal.tsx';
import ComparePage from './Page/ComparePage.tsx';
import CardDetail from './Page/CardDetail.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ minWidth: '1280px' }}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<GuestHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route
            path="/otherProfile"
            element={<OtherProfile nickname="Price" />}
          />
          <Route path="/notification" element={<NotificationModal />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/card" element={<CardDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
