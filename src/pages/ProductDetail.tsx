import { useState, /*useEffect*/ } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createKeywords } from '../api/axios.custom';
//import { useNavigate, useParams } from 'react-router-dom';
import testImg from '../assets/images/jungkoIcon.png';

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

const dummyData = {
  imageUrl: testImg,
  marketLogoUrl: '/path-to-market-logo.png',
  date: 'YYYY-MM-DD',
  title: 'Product Title',
  price: '8000원',
  location: '서울시 동대문구',
  keywords: [
    { id: 1, name: '반려동물존' },
    { id: 2, name: '애견용품' }
  ],
  productDescription:
    '구매하신 뒤에 안 맞거나 사이즈가 다르면 반품이 안되요. 사이즈는 상세에 있어요.'
};

const ProductDetail = () => {
  //const { id, url } = useParams();
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);
  //const navigate = useNavigate();

  const toggleKeyword = (keywordId: number) => {
    setSelectedKeywordIds((prevSelectedKeywords) => {
      if (prevSelectedKeywords.includes(keywordId)) {
        return prevSelectedKeywords.filter((id) => id !== keywordId);
      } else {
        return [...prevSelectedKeywords, keywordId];
      }
    });
  };

  const addKeywords = async () => {
    if (selectedKeywordIds.length > 0) {
      try {
        const response = await createKeywords(['keyword1', 'keyword2']);
        console.log('Keywords added:', response);
        setSelectedKeywordIds([]);
        //createKeywords(id) 해당키워드id를 갖고 api로 추가요청을 보냄
      } catch (error) {
        console.error('Error creating keywords:', error);
      }
    }
  };

  /* id를 사용하여 상품 데이터를 fetch
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://api-url/${id}`);
          // setProductData(response.data); // API 응답으로 받아온 데이터를 상태로 저장
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
    
      fetchData();
    }, [id]);
  */

  return (
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
          src={dummyData.imageUrl}
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
            marginLeft: 3 // 이미지와 정보 사이에 간격을 주기 위해 추가
          }}
        >
          <Box
            component="img"
            src={dummyData.marketLogoUrl}
            alt="Market Logo"
            sx={{ width: 100, height: 30, marginBottom: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {dummyData.date}
          </Typography>
          <Typography id="product-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            {dummyData.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>{dummyData.price}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {dummyData.location}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.open("http://실제 상품페이지 주소", "_blank")}
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
        {dummyData.keywords.map((keyword) => (
          <KeywordChip
            key={keyword.id}
            label={keyword.name}
            onClick={() => toggleKeyword(keyword.id)}
            color={
              selectedKeywordIds.includes(keyword.id) ? 'primary' : 'default'
            }
          />
        ))}
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
        sx={{ textAlign: 'left', marginLeft: 1}}>
        {dummyData.productDescription}
      </Typography>
    </Box>
  );
};

export default ProductDetail;
