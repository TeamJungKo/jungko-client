import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Typography,
  Pagination,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { ProductComponent } from './ProductComponent.tsx';
import NavigationBar from './NavigationBar.tsx';
import ProductDetailModal from './ProductDetailModal.tsx';
import SearchModal from '../../pages/SearchModal.tsx';
import {
  deleteCard,
  getCardInfo,
  likeCard,
  unlikeCard
} from '../../api/axios.custom.ts';
import { Product, ProductResponse } from '../../types/types.ts';

interface CardDetailComponentProps {
  cardStatus: 'myCard' | 'interestedCard' | 'otherCard';
  cardId: number;
  selectedProducts: Product[];
  onCheck: (product: Product) => void;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CardDetailComponent: React.FC<CardDetailComponentProps> = ({
  cardStatus,
  cardId,
  selectedProducts,
  setSelectedProducts
}) => {
  const [isCardOptionOpen, setIsCardOptionOpen] = useState(false); // 카드옵션 열림?
  const [products, setProducts] = useState<Product[]>([]); //화면에 표시할 상품 목록
  const [totalResources, setTotalResources] = useState(0); //총 상품 목록 설정
  const [page, setPage] = useState(1); //페이지 설정
  const productsPerPage = 2; // 한 페이지에 표시할 상품 수
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false); //상품 상세 정보 모달
  const [showProductDetail, setShowProductDetail] = useState<number>(0); //상품 상세 정보 모달 선택
  const [sortOrder, setSortOrder] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const handleProductClick = (productId: number) => {
    setShowProductDetail(productId);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: ProductResponse = await getCardInfo(
          cardId,
          page - 1,
          productsPerPage,
          sortOrder,
          sortDirection
        );
        console.log(
          'request',
          cardId,
          page - 1,
          productsPerPage,
          sortOrder,
          sortDirection
        );
        setProducts(response.products);
        setTotalResources(response.totalResources);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [cardId, page, productsPerPage, sortOrder, sortDirection]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    switch (value) {
      case 'priceDesc':
        setSortOrder('price');
        setSortDirection('DESC');
        break;
      case 'priceAsc':
        setSortOrder('price');
        setSortDirection('ASC');
        break;
      case 'recentAsc':
        setSortOrder('createdAt');
        setSortDirection('ASC');
        break;
      default:
        setSortOrder('createdAt');
        setSortDirection('DESC');
        break;
    }
  };
  const navigate = useNavigate();

  const handleOpenCardOption = () => {
    setIsCardOptionOpen(true);
  };

  const handleCloseCardOption = () => {
    setIsCardOptionOpen(false);
  };

  const handleCheck = (product: Product) => {
    setSelectedProducts((prevSelected: Product[]) =>
      prevSelected.find((p) => p.productId === product.productId)
        ? prevSelected.filter((p) => p.productId !== product.productId)
        : [...prevSelected, product]
    );
  };

  const handleCompareClick = () => {
    if (selectedProducts.length > 0) {
      navigate('/compare?products=${productIds}');
    } else {
      console.log('비교할 상품을 선택해주세요.');
    }
  };

  // 페이지 변경 처리
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleUnlikeCard = async (cardId: number) => {
    try {
      await unlikeCard(cardId);
    } catch (error) {
      console.error('Error unliking card', error);
    }
  };

  // 카드 삭제 이벤트
  const handleDelete = async (cardId: number) => {
    try {
      await deleteCard(cardId);
    } catch (error) {
      console.log('카드 삭제 error');
    }
  };

  // 관심 추가 버튼 클릭 이벤트
  const handleLikeCard = async (cardId: number) => {
    try {
      await likeCard(cardId);
    } catch (error) {
      console.error('Error liking card', error);
    }
  };

  const RenderButtons: React.FC = () => {
    switch (cardStatus) {
      case 'myCard':
        return (
          <>
            {
              <>
                {cardId && (
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(cardId)}
                    sx={{ mr: 1 }}
                  >
                    카드 삭제
                  </Button>
                )}
                <Button variant="contained" onClick={handleOpenCardOption}>
                  카드 옵션
                </Button>
              </>
            }
          </>
        );
      case 'interestedCard':
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => handleLikeCard(cardId)}
              sx={{ mr: 1 }}
            >
              관심 해제
            </Button>
            <Button variant="contained" onClick={handleOpenCardOption}>
              카드 옵션
            </Button>
          </>
        );
      case 'otherCard':
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => handleUnlikeCard(cardId)}
              sx={{ mr: 1 }}
            >
              관심 추가
            </Button>
            <Button variant="contained" onClick={handleOpenCardOption}>
              카드 옵션
            </Button>
          </>
        );
      default:
        return null;
    }
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
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: 2 }} />
              <Typography variant="h4" gutterBottom component="div">
                {'CardTitle'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* 드롭다운 박스 */}
              <Select
                value={
                  sortOrder === 'created_at' && sortDirection === 'DESC'
                    ? 'recentDesc'
                    : sortOrder
                }
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ mr: 2 }}
              >
                <MenuItem value="priceDesc">높은 가격 순</MenuItem>
                <MenuItem value="priceAsc">낮은 가격 순</MenuItem>
                <MenuItem value="recentDesc">최신 순</MenuItem>
                <MenuItem value="recentAsc">오래된 순</MenuItem>
              </Select>

              <RenderButtons />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridGap: '16px',
              marginBottom: '16px',
              justifyContent: 'center'
            }}
          >
            {products.map((product) => (
              <ProductComponent
                key={product.productId}
                product={product}
                onCheck={handleCheck}
                isChecked={selectedProducts.some(
                  (p) => p.productId === product.productId
                )}
                onCardClick={handleProductClick}
              />
            ))}
          </Box>
          <Pagination
            count={Math.ceil(totalResources / productsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ my: 2, justifyContent: 'center', display: 'flex' }}
          />
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleCompareClick}>
              비교하기
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mb: 2
            }}
          >
            {selectedProducts.map((product) => (
              <img
                key={product.productId}
                src={product.productImageUrl}
                alt={product.title}
                style={{ width: '100px', height: '100px', marginRight: '8px' }}
              />
            ))}
          </Box>
        </Box>
      </div>

      <SearchModal
        open={isCardOptionOpen}
        handleClose={handleCloseCardOption}
      />
      <ProductDetailModal
        productId={showProductDetail}
        open={isProductDetailOpen}
        onClose={handleCloseProductDetail}
      />
    </>
  );
};

export default CardDetailComponent;
