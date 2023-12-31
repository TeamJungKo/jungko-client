import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createKeywords, getProductDetail } from '../api/axios.custom';
import NavigationBar from '../components/common/NavigationBar';
import { useParams } from 'react-router-dom';
import testImg from '../assets/images/jungkoIcon.png';
import { ProductDetail, keywordDTO } from '../types/types';
import { Area } from '../types/types';

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

const ProductDetail = () => {
  const [productData, setProductData] = useState<ProductDetail | null>(null);
  const { productId } = useParams();
  const [marketProductUrl, setMarketProductUrl] = useState<string>(''); //상품 페이지로 이동 버튼 클릭 시 이동할 URL
  // selectedKeywordIds 상태를 키워드 문자열로 관리하기 위해 타입 변경
  const [selectedKeywordStrings, setSelectedKeywordStrings] = useState<
    string[]
  >([]);

  const toggleKeyword = (keywordId: number) => {
    setProductData((prevProductData) => {
      if (!prevProductData) return prevProductData;

      const updatedKeywords = prevProductData.keywords.map((keyword) => {
        if (keyword.id === keywordId) {
          const isSelected = !keyword.isSelected;
          // 키워드 문자열 상태 업데이트
          if (isSelected) {
            setSelectedKeywordStrings((prev) => [...prev, keyword.keyword]);
          } else {
            setSelectedKeywordStrings((prev) =>
              prev.filter((k) => k !== keyword.keyword)
            );
          }
          return { ...keyword, isSelected };
        }
        return keyword;
      });

      return {
        ...prevProductData,
        keywords: updatedKeywords
      };
    });
  };

  const addKeywords = async () => {
    if (selectedKeywordStrings.length > 0) {
      try {
        const response = await createKeywords(selectedKeywordStrings);
        console.log('키워드 추가 완료', response);

        setProductData((prevProductData) => {
          if (!prevProductData) return null;

          const updatedKeywords = prevProductData.keywords.map((keyword) => ({
            ...keyword,
            isSelected: selectedKeywordStrings.includes(keyword.keyword)
              ? false
              : keyword.isSelected
          }));

          return {
            ...prevProductData,
            keywords: updatedKeywords
          };
        });

        setSelectedKeywordStrings([]);
      } catch (error) {
        console.error('키워드 추가 중 에러가 발생했습니다.', error);
      }
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const id = Number(productId);
        if (!isNaN(id)) {
          const response = await getProductDetail(id);
          setProductData(response.data.productDetail);
          setMarketProductUrl(response.data.productDetail.marketProductUrl);
          console.log('상품 상세정보', response.data.productDetail);
        }
      } catch (error) {
        console.log(
          '상품 상세정보를 가져오는 도중 오류가 발생했습니다 :',
          error
        );
      }
    };

    fetchProductDetail();
  }, [productId]);

  const formatLocation = (area: Area) => {
    return `${area.sido.name} ${area.sido.sigg.name} ${area.sido.sigg.emd.name}`;
  };

  const renderKeywords = (keywords: keywordDTO[]) => {
    return keywords.map((keyword) => (
      <KeywordChip
        key={keyword.id}
        label={keyword.keyword}
        onClick={() => toggleKeyword(keyword.id)}
        color={keyword.isSelected ? 'primary' : 'default'}
      />
    ));
  };

  return (
    <>
      <NavigationBar />
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
            {productData && productData.keywords ? (
              renderKeywords(productData.keywords)
            ) : (
              <Typography>Loading Keywords...</Typography>
            )}
            <Button
              variant="contained"
              onClick={addKeywords}
              disabled={selectedKeywordStrings.length === 0}
              sx={{ ml: 1 }}
            >
              내 키워드에 추가
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
    </>
  );
};

export default ProductDetail;
