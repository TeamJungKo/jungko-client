import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import jungkoIcon from '../../assets/images/jungkoIcon.png';
//나중에 설명할 이미지들로 바꿀것. 지금은 데모로 중코이미지 넣어놓음
import CardMaker from '../common/CardMaker.tsx';

const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const CARD_WIDTH = 400; //카드하나 너비

const SiteGuide = (): React.ReactElement => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [, setScrollLeftOffset] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(false);

    if (scrollContainerRef.current) {
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
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      setScrollLeftOffset(scrollContainer.scrollLeft);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '600px',
          background: 'linear-gradient(to bottom, skyblue, rgb(60, 91, 141))'
        }}
      >
        <Box
          sx={{
            width: '50%',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: 'Gugi', fontSize: '40px' }}
          >
            중코거래 사이트 이렇게 이용하세요
          </Typography>
        </Box>
        <Box
          sx={{
            width: '50%',
            overflowX: 'scroll',
            display: 'flex',
            alignItems: 'center'
          }}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onScroll={handleScroll}
        >
          {cards.map((card) => (
            <Box key={card} sx={{ marginRight: '1rem' }}>
              <CardMaker
                width={CARD_WIDTH + 'px'}
                height="500px"
                imageUrl={jungkoIcon}
                title="제목테스트"
                description="설명테스트"
                imageHeight="70%"
                contentHeight="30%"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SiteGuide;
