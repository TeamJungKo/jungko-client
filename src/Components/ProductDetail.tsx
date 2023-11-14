import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// Style for the modal
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

// Style for the keyword Chip
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
  imageUrl: '/path-to-image.png',
  marketLogoUrl: '/path-to-market-logo.png',
  date: 'YYYY-MM-DD',
  title: 'Product Title',
  price: '8000원',
  location: '서울시 동대문구',
  keywords: ['반려동물존', '애견용품'],
  productDescription:
    '구매하신 뒤에 안 맞거나 사이즈가 다르면 반품이 안되요. 사이즈는 상세에 있어요.'
};

const ProductDetail = ({ isOpen, onClose }: ProductDetailProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prevSelectedKeywords) => {
      const nextSelectedKeywords = prevSelectedKeywords.includes(keyword)
        ? prevSelectedKeywords.filter((k) => k !== keyword)
        : [...prevSelectedKeywords, keyword];
      return nextSelectedKeywords;
    });
  };

  const addKeywords = () => {
    console.log('Selected Keywords:', selectedKeywords);
    // Here you would call the API to add the keywords
    setSelectedKeywords([]); // Clear the selection
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={style}>
        {/* Close button */}
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

        {/* Keywords and Add to My Keywords Button */}
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
              key={keyword}
              label={keyword}
              onClick={() => toggleKeyword(keyword)}
              color={selectedKeywords.includes(keyword) ? 'primary' : 'default'}
            />
          ))}
          <Button
            variant="contained"
            onClick={addKeywords}
            disabled={selectedKeywords.length === 0}
            sx={{ ml: 1 }}
          >
            Add to My Keywords
          </Button>
        </Box>

        {/* Product Details */}
        <Typography id="product-modal-description">
          {dummyData.productDescription}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductDetail;
