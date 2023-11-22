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
          <img className='face1' src={danggeun} alt="설명" />
          <img className='face2' src={danggeun}  alt="설명" />
          <img className='face3' src={junggonara} alt="설명" />
          <img className='face4' src={junggonara} alt="설명" />
          <img className='face5' src={bungae} alt="설명" />
          <img className='face6' src={bungae} alt="설명" />
        </div>
    </>
  );
};

export default Cube;


/* 만약 큐브 컴포넌트를 다른 곳에서 쓰고싶다면 다음과 같이 사용해주세요.
<div className="cube_space">
  <Cube>
</div>

그리고 이 큐브스페이스에는 3d를 위해 퍼스펙티브를 입혀줘야합니다.
.cube_space {
  perspective: 800px;
  height: 100%;
  width: 100%;
}
를 css에 추가하시면 됩니다.
*/