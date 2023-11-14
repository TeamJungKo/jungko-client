import React, { useState } from 'react';
import {
  Checkbox,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Pagination
} from '@mui/material';
import NavigationBar from '../Components/NavigationBar';

//Product data 정의
type Product = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  location: string;
  keywords: string[];
};

const DummyProducts: Product[] = [
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

const ITEMS_PER_PAGE = 2;

const ProductCard: React.FC<
  Product & { onToggle: () => void; isSelected: boolean }
> = ({ id, title, description, price, imageUrl, onToggle, isSelected }) => {
  return (
    <Card>
      {imageUrl && (
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1">Price: {price}</Typography>
      </CardContent>
      <CardActions>
        <Checkbox
          checked={isSelected}
          onChange={onToggle}
          inputProps={{ 'aria-label': 'Select for comparison' }}
        />
      </CardActions>
    </Card>
  );
};

const CardDetail: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = DummyProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const numberOfPages = Math.ceil(DummyProducts.length / ITEMS_PER_PAGE);

  return (
    <>
      <NavigationBar />
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f0f0f0',
          padding: '20px'
        }}
      >
        <div>
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onToggle={() => toggleProductSelection(product.id)}
              isSelected={selectedProducts.includes(product.id)}
            />
          ))}
          <Pagination
            count={numberOfPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default CardDetail;
