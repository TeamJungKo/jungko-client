import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
  Box,
  Chip
} from '@mui/material';
import { Product } from '../../types/types.tsx';

interface ProductProps {
  product: Product;
  onCheck: (product: Product) => void;
  isChecked: boolean;
  onCardClick: (product: number) => void;
}

export const ProductComponent: React.FC<ProductProps> = ({
  product,
  onCheck,
  isChecked,
  onCardClick
}) => {
  return (
    <Box>
      <Card
        onClick={() => onCardClick(product.productId)}
        sx={{
          display: 'flex',
          width: 900,
          height: 140,
          mb: 2,
          boxShadow: 3,
          position: 'relative'
        }}
      >
        <Checkbox
          checked={isChecked}
          onChange={() => onCheck(product)}
          inputProps={{ 'aria-label': 'Select Product' }}
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={(e) => e.stopPropagation()}
        />
        <CardMedia
          component="img"
          sx={{ width: 151, objectFit: 'cover', height: '100%' }}
          image={product.productImageUrl}
          alt={product.title}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            pl: 2
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.content}
            </Typography>
            <Typography variant="body2">{`${product.price}원`}</Typography>
            <Box sx={{ display: 'flex', mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
              {product.KeywordList &&
                product.KeywordList.map((keyword, index) => (
                  <Chip key={index} label={keyword.keyword} size="small" />
                ))}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
