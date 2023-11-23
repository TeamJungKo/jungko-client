import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { createKeywords } from '../../api/axios.custom.ts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
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

type ProductDetailProps = {
  isOpen: boolean;
  onClose: () => void;
};

const dummyData = {
  //dummy data for testing
  imageUrl: '/path-to-image.png',
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

const ProductDetail = ({ isOpen, onClose }: ProductDetailProps) => {
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);

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
        // FIXME: 실제 선택된 키워드를 사용해야 함
        const response = await createKeywords(['keyword1', 'keyword2']);
        console.log('Keywords added:', response); // Handle response
        setSelectedKeywordIds([]); // Clear selected keywords
      } catch (error) {
        console.error('Error creating keywords:', error);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Product Image and Info */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Box
            component="img"
            src={dummyData.imageUrl}
            alt="Product Image"
            sx={{ width: 200, height: 200 }}
          />
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box
              component="img"
              src={dummyData.marketLogoUrl}
              alt="Market Logo"
              sx={{ width: 100, height: 30 }}
            />
            <Typography variant="body2" color="text.secondary">
              {dummyData.date}
            </Typography>
            <Typography id="product-modal-title" variant="h6" component="h2">
              {dummyData.title}
            </Typography>
            <Typography variant="body1">{dummyData.price}</Typography>
            <Typography variant="body2" color="text.secondary">
              {dummyData.location}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 2
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

        <Typography id="product-modal-description">
          {dummyData.productDescription}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductDetail;
