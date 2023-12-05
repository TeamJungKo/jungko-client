import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/cube.css';
import danggeun from '../../assets/images/danggeun.png';
import junggonara from '../../assets/images/junggonara.png';
import bungae from '../../assets/images/bungae.png';
import jungkoIcon from '../../assets/images/jungkoIcon.png';


const Cube = (): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const cube = document.querySelector('.cube');
    const face6 = document.querySelector('.face6');
    
    const changeImageToOriginal = () => {
      (document.querySelectorAll('.face1, .face2') as NodeListOf<HTMLImageElement>).forEach((element) => {
        element.src = danggeun;
      });
      
      (document.querySelectorAll('.face3, .face4') as NodeListOf<HTMLImageElement>).forEach((element) => {
        element.src = junggonara;
      });
      
      (document.querySelectorAll('.face5, .face6') as NodeListOf<HTMLImageElement>).forEach((element) => {
        element.src = bungae;
      });
    };

    const changeImageToNew = () => {
      document.querySelectorAll('.cube img').forEach((element) => {
        if (element instanceof HTMLImageElement) {
          element.src = jungkoIcon;
        }
      });
    };    
    
    const addEventListeners = () => {
      if (cube) {
        cube.addEventListener('mouseenter', () => {
          setIsHovered(true);
          changeImageToOriginal();
        });
  
        cube.addEventListener('mouseleave', () => {
          setIsHovered(false);
          changeImageToNew();
        });
      }
    };
    
    if (face6) {
      face6.addEventListener('animationend', () => {
        addEventListeners();
        if (!isHovered) {
          changeImageToNew();
        }
        else{
          changeImageToOriginal();
        }
      });
    }
  },[isHovered]);

  return (
    <>
        <div className='cube'>
          <img className='face1' src={danggeun} />
          <img className='face2' src={danggeun} />
          <img className='face3' src={junggonara} />
          <img className='face4' src={junggonara} />
          <img className='face5' src={bungae} />
          <img className='face6' src={bungae} />
        </div>
    </>
  );
};

export default Cube;