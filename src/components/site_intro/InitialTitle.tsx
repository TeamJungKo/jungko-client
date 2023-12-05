import React, { useLayoutEffect } from 'react';
import '../../assets/css/initialTitle.css';
import Cube from './Cube.tsx';

const InitialTitle = (): React.ReactElement => {

  useLayoutEffect(() => {
    const timer1 = setTimeout(() => {
      const element = document.querySelector('.explanation li:nth-child(1)');
      if (element) {
        element.classList.add('visible');
      }
    }, 600);
  
    const timer2 = setTimeout(() => {
      const element = document.querySelector('.explanation li:nth-child(2)');
      if (element) {
        element.classList.add('visible');
      }
    }, 3000);
  
    return function cleanup() {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <div className="main_top">
        <ul className='explanation'>
          <li><span className="main_head_title">모든 중고마켓들을 한눈에 보는</span></li>
          <li><span className="main_head_title" style={{fontSize:'60px'}}>중코 거래</span></li>
        </ul><br/>
        <div className="cube_background"></div>
        <Cube/> 
      </div>
    </>
  );
};

export default InitialTitle;
