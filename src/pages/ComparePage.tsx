import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Chip from '@mui/material/Chip';
import NavigationBar from '../components/common/NavigationBar';

const productData = [
  //dummy for testing
  {
    id: '1',
    imageUrl: 'path-to-your-image-1.png',
    title: '반려동물존',
    price: '150,000',
    location: '서울',
    description:
      '구매하신 뒤에 안 맞거나 사이즈가 다르면 반품이 안되요. 사이즈는 상세에 있어요.',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: '2',
    imageUrl: 'path-to-your-image-2.png',
    title: '강아지 집',
    price: '50,000',
    location: '서울',
    description: '사랑합니다, 귀여워요',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: '3',
    imageUrl: 'path-to-your-image-3.png',
    title: '강아지 장난감',
    price: '20,000',
    location: '서울',
    description: '아이들이 좋아해요',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: '4',
    imageUrl: 'path-to-your-image-4.png',
    title: '고양이 캣타워',
    price: '80,000',
    location: '서울',
    description: '고양이가 놀기 좋은 캣타워입니다.',
    keywords: ['반려동물존', '애완용품']
  }
];

const ComparePage = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollLeft += scrollAmount;
    }
  };

  const arrowWidth = 50;
  const marginBetweenCards = 8 * 2;
  const totalMargin = marginBetweenCards * (3 - 1);
  const cardWidth = (windowWidth - arrowWidth * 2 - totalMargin - 10) / 3;

  return (
    <>
      <NavigationBar />
      <IconButton onClick={handleBack} style={{ position: 'absolute', top: 80, zIndex: 2 }}>
        <ArrowBackIcon style={{fontSize: '40px'}} />
      </IconButton>
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <IconButton onClick={() => handleScroll('left')}>
            <ArrowBackIosIcon />
          </IconButton>

          {/* Product cards container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              maxWidth: `${windowWidth - arrowWidth * 2}px`
            }}
          >
            {productData.map((product) => (
              <Paper
                key={product.id}
                elevation={3}
                sx={{
                  width: `${cardWidth}px`,
                  minHeight: 200,
                  margin: '0 8px',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  component="img"
                  src={product.imageUrl}
                  alt={product.title}
                  sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <Box sx={{ padding: 2, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {product.title}
                  </Typography>
                  {product.keywords.map((keyword) => (
                    <Chip
                      key={keyword}
                      label={`#${keyword}`}
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                  <Typography variant="body1" gutterBottom>
                    Price: {product.price}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Location: {product.location}
                  </Typography>
                  <Typography variant="body2">
                    Description: {product.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          <IconButton onClick={() => handleScroll('right')}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </div>
    </>
  );
};

export default ComparePage;
