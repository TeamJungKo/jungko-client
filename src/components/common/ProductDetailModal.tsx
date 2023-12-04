import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Chip, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createKeywords, getProductDetail } from '../../api/axios.custom';
import testImg from '../../assets/images/jungkoIcon.png';
import { ProductDetailData, Area, Keyword } from '../../types/types';

const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const KeywordChip = styled(Chip)(({ theme, color }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: color === 'primary' ? theme.palette.primary.main : '#e0e0e0',
  color: color === 'primary' ? theme.palette.primary.contrastText : 'black',
  '&:hover': {
    backgroundColor:
      color === 'primary' ? theme.palette.primary.dark : '#d5d5d5'
  }
}));

// const dummyData = {
//   imageUrl: testImg,
//   marketLogoUrl: '/path-to-market-logo.png',
//   date: 'YYYY-MM-DD',
//   title: 'Product Title',
//   price: '8000원',
//   location: '서울시 동대문구',
//   keywords: [
//     { id: '1', name: '반려동물존' },
//     { id: '2', name: '애견용품' }
//   ],
//   productDescription:
//     '구매하신 뒤에 안 맞거나 사이즈가 다르면 반품이 안되요. 사이즈는 상세에 있어요.'
// };

interface ProductDetailModalProps {
  productId: number;
  open: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  open,
  onClose
}) => {
  const [productData, setProductData] = useState<ProductDetailData | null>(
    null
  );
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<string[]>([]);
  //const navigate = useNavigate();

  const toggleKeyword = (keywordId: number) => {
    const keywordIdStr = keywordId.toString();
    setSelectedKeywordIds((prevSelectedKeywords) => {
      if (prevSelectedKeywords.includes(keywordIdStr)) {
        return prevSelectedKeywords.filter((id) => id !== keywordIdStr);
      } else {
        return [...prevSelectedKeywords, keywordIdStr];
      }
    });
  };

  const addKeywords = async () => {
    //키워드 추가 API 호출
    if (selectedKeywordIds.length > 0) {
      try {
        const response = await createKeywords(selectedKeywordIds);
        console.log('Keywords added:', response);
        setSelectedKeywordIds([]);
      } catch (error) {
        console.error('Error creating keywords:', error);
      }
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        if (productId) {
          const response = await getProductDetail(productId);
          setProductData(response.data.productDetail);
        }
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const formatLocation = (area: Area) => {
    return `${area.sido[0].name} ${area.sido[0].sigg[0].name} ${area.sido[0].sigg[0].emd[0].name}`;
  };

  const renderKeywords = (keywords: Keyword[]) => {
    return keywords.map((keyword) => (
      <KeywordChip
        key={keyword.keywordId}
        label={keyword.keyword}
        onClick={() => toggleKeyword(keyword.keywordId)}
        color={
          selectedKeywordIds.includes(keyword.keyword) ? 'primary' : 'default'
        }
      />
    ));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: '50%',
          right: 0,
          bottom: 0,
          transform: 'translateX(-50%)',
          width: '100%',
          padding: '20px'
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              ...style,
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          >
            <Box
              component="img"
              src={productData ? productData.productImageUrl : testImg}
              alt="Product Image"
              sx={{ width: 400, height: 400 }}
            />

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginTop: 12,
                marginLeft: 3
              }}
            >
              <Box
                component="img"
                src={
                  productData
                    ? productData.marketLogoUrl
                    : '/path-to-default-market-logo.png' //기본 로고 이미지 추가 시 수정
                }
                alt="Market Logo"
                sx={{ width: 100, height: 30, marginBottom: 2 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                {productData
                  ? productData.uploadedAt.split('T')[0]
                  : 'Loading...'}{' '}
              </Typography>
              <Typography
                id="product-modal-title"
                variant="h6"
                component="h2"
                sx={{ marginBottom: 2 }}
              >
                {productData ? productData.title : 'Loading...'}{' '}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {productData ? `${productData.price}원` : 'Loading...'}{' '}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                {productData ? formatLocation(productData.area) : 'Loading...'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  window.open('http://실제 상품페이지 주소', '_blank')
                }
                sx={{ width: 200 }}
              >
                상품 페이지로 이동
              </Button>
            </Box>
          </Box>
          <Divider
            variant="middle"
            sx={{ margin: 0, width: '100%', my: 2, borderColor: 'grey.500' }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              marginTop: 2,
              marginBottom: 3
            }}
          >
            {productData && productData.KeywordList ? (
              renderKeywords(productData.KeywordList)
            ) : (
              <Typography>Loading Keywords...</Typography>
            )}
            <Button
              variant="contained"
              onClick={addKeywords}
              disabled={selectedKeywordIds.length === 0}
              sx={{ ml: 1 }}
            >
              Add to My Keywords
            </Button>
          </Box>

          <Typography
            id="product-modal-description"
            sx={{ textAlign: 'left', marginLeft: 1 }}
          >
            {productData ? productData.content : 'Loading...'}{' '}
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
