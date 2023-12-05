import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Chip from '@mui/material/Chip';
import NavigationBar from '../components/common/NavigationBar';
import { compareProduct } from '../api/axios.custom.ts';
import { Product } from '../types/types.tsx';

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const handleBack = () => {
    navigate(-1);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // URL에서 상품 ID 추출
    const productIdsString = queryParams.get('productIds'); // 'productIds' 파라미터 추출
    const productIds = productIdsString
      ? productIdsString.split(',').map(Number)
      : [];
    if (productIds.length > 0) {
      compareProduct(productIds)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error('동일상품 비교 중 오류가 발생했습니다:', error); // 에러 로그
        });
    }
  }, [location]);

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

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const arrowWidth = 50;
  const marginBetweenCards = 8 * 2;
  const totalMargin = marginBetweenCards * (3 - 1);
  const cardWidth = (windowWidth - arrowWidth * 2 - totalMargin - 10) / 3;

  return (
    <>
      <NavigationBar />
      <IconButton
        onClick={handleBack}
        style={{ position: 'absolute', top: 80, zIndex: 2 }}
      >
        <ArrowBackIcon style={{ fontSize: '40px' }} />
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
            {products.map((product) => (
              <Paper
                key={product.productId}
                onClick={() => handleProductClick(product.productId)}
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
                  src={product.productImageUrl}
                  alt={product.title}
                  sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <Box sx={{ padding: 2, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {product.title}
                  </Typography>
                  {product.KeywordList &&
                    Array.isArray(product.KeywordList) &&
                    product.KeywordList.map((keyword) => (
                      <Chip
                        key={keyword.keywordId}
                        label={`#${keyword.keyword}`}
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  <Typography variant="body1" gutterBottom>
                    Price: {product.price}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Location:{' '}
                    {product.area.sido.name +
                      ' ' +
                      product.area.sido.sigg.name +
                      ' ' +
                      product.area.sido.sigg.emd.name}
                  </Typography>
                  <Typography variant="body2">
                    Description: {product.content}
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
