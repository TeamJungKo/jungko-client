import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import GuestHomePage from './pages/GuestHomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import TopTitle from './components/common/Title.tsx';
import Category from './components/common/Category.tsx';
import HomePage from './pages/HomePage.tsx';

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
      <HomePage/>
    </>
  );
}

export default App;