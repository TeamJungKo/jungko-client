import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import jungkoIcon from '../../assets/images/jungkoIcon.png';
//나중에 설명할 이미지들로 바꿀것. 지금은 데모로 중코이미지 넣어놓음
import CardMaker from '../common/CardMaker.tsx';

interface GuideProps {
  imageUrl: string;
  title: string;
  description: string;
}

const guide: Array<GuideProps> = [
  {
    imageUrl: jungkoIcon, //메인페이지
    title: '검색을 통해 상품을 찾아보세요',
    description: '검색창과 카테고리를 통해 언제든 손쉬운 검색을 즐겨보세요',
  },
  {
    imageUrl: jungkoIcon, // 검색후 상품목록
    title: '원하는 매물들은 리스트에 담아보세요',
    description: '중코거래는 당근마켓, 번개장터, 중고나라를 모두 지원합니다! 원하는 상품들을 골라 하단에 있는 리스트에 추가해보세요',
  },
  {
    imageUrl: jungkoIcon, //상품비교페이지
    title: '상품들을 한 페이지에서 비교해보세요',
    description: '비교기능을 통해 상품별 세부설명들을 한눈에 파악해보실 수 있습니다.',
  },
  {
    imageUrl: jungkoIcon, //프로덕트 디테일
    title: '자세한 상품 정보도 한눈에',
    description: '자세한 상품 정보와 함께 해당 상품에 연관된 키워드를 알려드려요',
  },
  {
    imageUrl: jungkoIcon, //카드생성 버튼 누르는 화면
    title: '나만의 검색 조건을 저장',
    description: '매번 같은 검색어, 옵션으로 검색하시기 지치지 않으신가요? 원하는 검색 조건은 모두 하나의 "카드"로 저장시킬 수 있습니다.',
  },
  {
    imageUrl: jungkoIcon, //관심카드 추가버튼
    title: '다른 사람의 카드도 손쉽게 저장',
    description: '카드를 공유하고, 마음에 드는 카드를 찾으셨다면 "관심 카드"로 등록해보세요!',
  },
  {
    imageUrl: jungkoIcon, //마이프로필
    title: '보이기 싫은 카드가 있다면 "숨기기"',
    description: '마이프로필에서 보여지길 원하시지 않는 카드는 비공개 처리할 수 있습니다.',
  },
  {
    imageUrl: jungkoIcon, //마이프로필
    title: '키워드를 추가하고 알림을 받아보세요',
    description: '원하시는 키워드를 추가하시면 관련된 상품이 등록될 때 알려드려요',
  }
];

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
            sx={{ textAlign: 'center', fontFamily: 'Gugi', fontSize: '40px' }}
          >
            중코거래와 함께 <br/> 손쉬운 중고검색을 누려보세요.
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
                description={guide.description}
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
