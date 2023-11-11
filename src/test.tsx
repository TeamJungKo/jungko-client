import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import '../assets/css/style.css';
import danggeun from '../assets/images/danggeun.png';
import junggonara from '../assets/images/junggonara.png';
import bungae from '../assets/images/bungae.png';
import illust_thinking from '../assets/images/illust_thinking.png';
import illust_worried from '../assets/images/illust_worried.png';
import platforms from '../assets/images/platforms.png';
import preview_compared from '../assets/images/preview_compared.png';
import preview_search from '../assets/images/preview_search.png';
import preview_searched from '../assets/images/preview_searched.png';
import jungkoIcon from '../assets/images/jungkoIcon.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  width: number;
  height: number;
}

type ItemType = {
  img: string;
  title: string;
};

const itemData: ItemType[] = [
  { img: bungae, title: '이미지1' },
  { img: bungae, title: '이미지2' },
];

const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const CARD_WIDTH = 500; //카드하나 너비

function ActionAreaCard({ width, height }: Props) {
  return (
    <Card sx={{ width: width, height: height, borderRadius: '10%' }} draggable="false">
      <CardActionArea>
        <CardMedia
          component="img"
          image={jungkoIcon}
          alt="중코아이콘"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const InitialMainPage = (): React.ReactElement => {
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const face6Ref = useRef<HTMLDivElement | null>(null);
  let scrollPosition: number = 0;
  const [isHovered, setIsHovered] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPoint, setStartDragPoint] = useState(0);
  const [scrollLeftOffset, setScrollLeftOffset] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(false);

    if(scrollContainerRef.current){
      const scrollContainer = scrollContainerRef.current;

      // 클릭을 뗐을 때 가장 가까운 카드가 스크롤뷰의 시작점에 맞추어지도록 추가
      const index = Math.round(scrollContainer.scrollLeft / CARD_WIDTH);
      scrollContainer.scrollTo({
        top: 0,
        left: index * CARD_WIDTH,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMouseDown && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollLeft = scrollContainer.scrollLeft - e.movementX;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(false);
  }

  const handleScroll = () => {
    if(scrollContainerRef.current){
      const scrollContainer = scrollContainerRef.current;
      setScrollLeftOffset(scrollContainer.scrollLeft);
    }
  };

  useLayoutEffect(() => {
    const timer1 = setTimeout(() => {
      var element = document.querySelector('.explanation li:nth-child(1)');
      if (element) {
        element.classList.add('visible');
      }
    }, 600);
  
    const timer2 = setTimeout(() => {
      var element = document.querySelector('.explanation li:nth-child(2)');
      if (element) {
        element.classList.add('visible');
      }
    }, 3000);
  
    return function cleanup() {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  

  useEffect(() => {
    const cube = document.querySelector('.cube');
    const face6 = document.querySelector('.face6');
    const explanationListItems = document.querySelectorAll('.explanation li');
    
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
  }, []);

  return (
    <div>
      <div className="main_top">
        <ul className='explanation'>
          <li><span className="main_head_title">구매가 손쉬워지는 순간</span></li>
          <li><span className="main_head_title">중코거래</span></li>
        </ul><br/>

        <div className="cube_background"></div>
        <div className='cube'>
          <img className='face1' src={danggeun} alt="설명" />
          <img className='face2' src={danggeun}  alt="설명" />
          <img className='face3' src={junggonara} alt="설명" />
          <img className='face4' src={junggonara} alt="설명" />
          <img className='face5' src={bungae} alt="설명" />
          <img className='face6' src={bungae} alt="설명" />
        </div>
      </div>

      <div className="login_button_area">
        <button className="login_button">5초 안에 로그인</button>
      </div>
    
      <Box sx={{ display: 'flex', width: '100vw', height: '600px', background: 'linear-gradient(to bottom, skyblue, rgb(60, 91, 141))' }}>
        <Box sx={{ width: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Gugi', fontSize: '40px'}}>
            중코거래 사이트 이용법을 적는 란
          </Typography>
        </Box>
        <Box 
          sx={{ width: '50%', overflowX: 'scroll', display: 'flex', alignItems: 'center'}}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onScroll={handleScroll}
        >
          {cards.map((card) => (
            <Box key={card} sx={{ marginRight: '1rem'}}>
              <ActionAreaCard width={400} height={500} />
            </Box>
          ))}
        </Box>
      </Box>

      <div className="main_site_introduction">
        <div className="illust_wrapper">
          <img className='main_illust illust_thinking' src={illust_thinking} alt="설명" />
          <p className="main_illust_text text_thinking">대략 어디서 사지? 와 관련된 멘트를 추가.</p>
        </div>
        <div className="illust_wrapper">
          <p className="main_illust_text text_worried">여기저기 찾느라 귀찮다는 것을 강조하는 문구</p>
          <img className='main_illust illust_worried' src={illust_worried} alt="설명" />
        </div>
        <div className="illust_wrapper">
          <img className='main_illust illust_platforms' src={platforms} alt="설명" />
          <p className="main_illust_text text_platforms">우리 사이트는 플랫폼 3사를 모두 제공함을 강조</p>
        </div>
      </div>

      <div className="hot_cards">
        <p id="hot_card_title">지금 HOT한 카드들</p>
    
        <div className="hot_card_container">
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
          <div className="hot_card_wrapper">
            <ActionAreaCard width={200} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialMainPage;
