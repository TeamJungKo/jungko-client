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
  SelectChangeEvent
} from '@mui/material';
import { ProductComponent } from './ProductComponent.tsx';
import NavigationBar from './NavigationBar.tsx';
import ProductDetailModal from './ProductDetailModal.tsx';
import CreateCardPage from '../../pages/CreateCardModal.tsx';
import SearchModal from '../../pages/SearchModal.tsx';
import { searchProduct } from '../../api/axios.custom.ts';
import {
  ProductSearchRequest,
  Product,
  ProductResponse
} from '../../types/types.ts';

interface SearchResultComponentProps {
  SearchOption: ProductSearchRequest;
  selectedProducts: Product[];
  onCheck: (product: Product) => void;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchResultComponent: React.FC<SearchResultComponentProps> = ({
  SearchOption,
  selectedProducts,
  setSelectedProducts
}) => {
  const [SearchOptions, setSearchOptions] = useState({ SearchOption });
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false); //카드생성모달열림?
  const [isCardOptionOpen, setIsCardOptionOpen] = useState(false); // 카드옵션 열림?
  const [products, setProducts] = useState<Product[]>([]); //화면에 표시할 상품 목록
  const [totalResources, setTotalResources] = useState(0); //총 상품 목록 설정
  const [page, setPage] = useState(1); //페이지 설정
  const productsPerPage = 2; // 한 페이지에 표시할 상품 수
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false); //상품 상세 정보 모달
  const [showProductDetail, setShowProductDetail] = useState<number>(0); //상품 상세 정보 모달 선택
  const [sortOrder, setSortOrder] = useState('created_at');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
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

  const fetchProducts = async (options: ProductSearchRequest) => {
    try {
      const response = await searchProduct(options);
      const responseData: ProductResponse = response.data;
      setProducts(responseData.products);
      setTotalResources(responseData.totalResources);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts(SearchOptions.SearchOption); // SearchOptions를 인자로 전달
  }, [SearchOptions]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === 'priceDesc') {
      setSortOrder('price');
      setSortDirection('DESC');
    } else if (value === 'priceAsc') {
      setSortOrder('price');
      setSortDirection('ASC');
    } else if (value === 'recentDesc') {
      setSortOrder('created_at');
      setSortDirection('DESC');
    } else {
      setSortOrder('created_at');
      setSortDirection('ASC');
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
      <CreateCardPage
        open={isCreateCardOpen}
        handleClose={handleCloseCreateCard}
      />
    </>
  );
};

export default SearchResultComponent;
