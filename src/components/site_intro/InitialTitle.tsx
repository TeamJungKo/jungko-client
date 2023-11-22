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
          <li><span className="main_head_title">구매가 손쉬워지는 순간</span></li>
          <li><span className="main_head_title">중코거래</span></li>
        </ul><br/>
        <div className="cube_background"></div>
        <Cube/> {/* 큐브를 main_top영역에 삽입 */}
      </div>
    </>
  );
};

export default InitialTitle;
