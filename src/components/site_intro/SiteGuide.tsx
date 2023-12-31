import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMaker from '../common/CardMaker.tsx';
import site_guide1 from '../../assets/images/site_guide1.png';
import site_guide2 from '../../assets/images/site_guide2.png';
import site_guide3 from '../../assets/images/site_guide3.png';
import site_guide4 from '../../assets/images/site_guide4.png';
import site_guide5 from '../../assets/images/site_guide5.png';
import site_guide6 from '../../assets/images/site_guide6.png';
import site_guide7 from '../../assets/images/site_guide7.png';
import site_guide8 from '../../assets/images/site_guide8.png';

interface GuideProps {
  imageUrl: string;
  title: string;
}

const guide: Array<GuideProps> = [
  {
    imageUrl: site_guide1, //메인페이지
    title: '검색창 및 카테고리를 통해 언제든 손쉬운 검색을 즐겨보세요'
  },
  {
    imageUrl: site_guide2, // 검색후 상품목록
    title: '원하는 상품을 골라 하단 리스트에 추가해보세요'
  },
  {
    imageUrl: site_guide3, //상품비교페이지
    title: '비교기능을 통해 상품 정보들을 한눈에 파악해보세요'
  },
  {
    imageUrl: site_guide4, //프로덕트 디테일
    title: '자세한 상품 정보와 함께 해당 상품에 연관된 키워드를 확인해보세요'
  },
  {
    imageUrl: site_guide5, //카드생성 버튼 누르는 화면
    title: '원하는 검색 조건은 모두 "카드"에 저장할 수 있습니다.'
  },
  {
    imageUrl: site_guide6, //관심카드 추가버튼
    title: '카드를 공유하고, 마음에 드는 카드를 찾으셨다면 "관심 카드"로 등록해보세요!'
  },
  {
    imageUrl: site_guide7, //마이프로필
    title: '숨기고 싶은 카드는 비공개 처리할 수 있습니다.'
  },
  {
    imageUrl: site_guide8, //마이프로필
    title: '원하시는 키워드를 추가하시면 관련 상품이 등록될 때 알려드려요'
  }
];

const CARD_WIDTH = 400;

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

      // 클릭을 뗐을 때 가장 가까운 카드가 스크롤뷰의 시작점에 맞추어지도록 하는 부분
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
            sx={{ textAlign: 'center', fontFamily: 'Gugi', fontSize: '40px' }}
          >
            중코거래와 함께 <br /> 손쉬운 중고검색을 누려보세요.
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
          {guide.map((guide, index) => (
            <Box key={index} sx={{ marginRight: '1rem' }}>
              <CardMaker
                width={CARD_WIDTH + 'px'}
                height="500px"
                imageUrl={guide.imageUrl}
                title={guide.title}
                imageHeight="70%"
                contentHeight="30%"
                onClick={() => {}}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SiteGuide;
