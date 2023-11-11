import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import InitialMainPage from './pages/InitialMainPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import TopTitle from './components/common/Title.tsx';

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
      <InitialMainPage/>
      <LoginPage/> //test without redirect
    </>
  );
}

export default App;