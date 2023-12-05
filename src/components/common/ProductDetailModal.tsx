import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Chip, Button, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { createKeywords, getProductDetail } from '../../api/axios.custom';
import testImg from '../../assets/images/jungkoIcon.png';
import { ProductDetail, Area, Keyword } from '../../types/types';

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
  const [productData, setProductData] = useState<ProductDetail | null>(null);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<string[]>([]);
  const [marketProductUrl, setMarketProductUrl] = useState<string>(''); //"상품 페이지 이동" 버튼 클릭 시 이동할 URL

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

  const theme = useTheme();

  const addKeywords = async () => {
    if (selectedKeywordIds.length > 0) {
      try {
        await createKeywords(selectedKeywordIds);
        setSelectedKeywordIds([]);
      } catch (error) {
        console.log('키워드 추가 중 에러가 발생했습니다 :', error);
      }
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        if (productId) {
          const response = await getProductDetail(productId);
          setProductData(response.data.productDetail);
          setMarketProductUrl(response.data.productDetail.marketProductUrl);
        }
      } catch (error) {
        console.error('상품 정보를 가져오는 도중 오류가 발생했습니다 :', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const formatLocation = (area: Area) => {
    return `${area.sido.name} ${area.sido.sigg.name} ${area.sido.sigg.emd.name}`;
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
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[5],
            p: 4
          }}
        >
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
              sx={{ width: 300, height: 300 }}
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
                onClick={() => window.open(marketProductUrl)}
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
