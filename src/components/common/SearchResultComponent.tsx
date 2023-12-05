import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Pagination,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProductComponent } from './ProductComponent.tsx';
import NavigationBar from './NavigationBar.tsx';
import ProductDetailModal from './ProductDetailModal.tsx';
import CreateCardPage from '../../pages/CreateCardModal.tsx';
import SearchModal from '../../pages/SearchModal.tsx';
import { searchProduct } from '../../api/axios.custom.ts';
import { ProductSearchRequest, Product } from '../../types/types.ts';

interface SearchResultComponentProps {
  SearchOption: ProductSearchRequest;
  selectedProducts: Product[];
  onCheck: (product: Product) => void;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onRemoveProduct: (product: Product) => void;
}

const SearchResultComponent: React.FC<SearchResultComponentProps> = ({
  SearchOption,
  selectedProducts,
  setSelectedProducts,
  onRemoveProduct
}) => {
  const [SearchOptions, setSearchOptions] = useState({ SearchOption });
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false); //카드생성 모달이 열렸는지 여부
  const [isCardOptionOpen, setIsCardOptionOpen] = useState(false); // 카드옵션 모달이 열렸는지 여부
  const [products, setProducts] = useState<Product[]>([]); //화면에 표시할 상품 목록
  const [totalResources, setTotalResources] = useState(0); //총 상품 목록
  const [page, setPage] = useState(1);
  const productsPerPage = 2; // 한 페이지에 표시할 상품 수
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false); //상품 상세 정보 모달 열렸는지 여부
  const [showProductDetail, setShowProductDetail] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [sortDirection, setSortDirection] = useState('price');
  const handleProductClick = (productId: number) => {
    setShowProductDetail(productId);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    const updatedSearchOptions = { ...SearchOptions, page: newPage };
    setSearchOptions(updatedSearchOptions);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const updatedSearchOptions = {
        ...SearchOption,
        page: page - 1,
        size: productsPerPage,
        order: sortOrder,
        sort: sortDirection
      };

      try {
        const response = await searchProduct(updatedSearchOptions);
        setProducts(response.data.products);
        setTotalResources(response.data.totalResources);
      } catch (error) {
        console.log('상품 정보를 가져오는 도중 오류가 발생했습니다 :', error);
      }
    };

    fetchProducts();
  }, [page, productsPerPage, sortOrder, sortDirection, SearchOption]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    switch (value) {
      case 'priceDesc':
        setSortOrder('DESC');
        setSortDirection('price');
        break;
      case 'priceAsc':
        setSortOrder('ASC');
        setSortDirection('price');
        break;
      case 'recentAsc':
        setSortOrder('ASC');
        setSortDirection('uploadedAt');
        break;
      default:
        setSortOrder('DESC');
        setSortDirection('uploadedAt');
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
      const productIds = selectedProducts
        .map((product) => product.productId)
        .join(',');
      navigate(`/compare?productIds=${productIds}`);
    } else {
      console.log('비교할 상품을 선택해주세요.');
    }
  };

  //카드 생성 모달 닫힘 이벤트
  const handleCloseCreateCard = () => {
    setIsCreateCardOpen(false);
  };

  const RenderButtons: React.FC = () => {
    return (
      <>
        <Button
          variant="outlined"
          onClick={() => setIsCreateCardOpen(true)}
          sx={{ mr: 1 }}
        >
          카드 생성
        </Button>
        <Button variant="contained" onClick={handleOpenCardOption}>
          카드 옵션
        </Button>
      </>
    );
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
              <Typography variant="h4" gutterBottom component="div">
                {SearchOption.keyword}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={
                  sortOrder === 'DESC' && sortDirection === 'uploadedAt'
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
              <Box key={product.productId} sx={{ position: 'relative' }}>
                <img
                  src={product.productImageUrl}
                  alt={product.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '8px'
                  }}
                />
                <IconButton
                  onClick={() => onRemoveProduct(product)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '50%'
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
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
      <CreateCardPage
        open={isCreateCardOpen}
        handleClose={handleCloseCreateCard}
      />
    </>
  );
};

export default SearchResultComponent;
