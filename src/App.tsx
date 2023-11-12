import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import GuestHomePage from './pages/GuestHomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import TopTitle from './components/common/Title.tsx';
import Category from './components/common/Category.tsx';
import HomePage from './pages/HomePage.tsx';
import MyProfile from './pages/MyProfile.tsx';
import DefaultProfile from './components/common/DefaultProfile.tsx';
import Keyword from './components/common/Keyword.tsx';
import { Card } from '@mui/material';
import CardMaker from './components/common/Card.tsx';
import OtherProfile from './pages/OtherProfile.tsx';
import AlertDialog from './pages/modals/NotificationModal.tsx';
import NotificationModal from './pages/modals/NotificationModal.tsx';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    /*<div style={{ overflow: 'hidden' }}>
      <KakaoLoginutton onClick={handleClick}/>
      <GoogleLoginutton onClick={handleClick}/>
      <NaverLoginutton onClick={handleClick}/>
    </div>*/
    <>
      <NotificationModal/>
    </>
  );
}

export default App;