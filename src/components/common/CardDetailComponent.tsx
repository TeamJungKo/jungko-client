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
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProductComponent } from './ProductComponent.tsx';
import NavigationBar from './NavigationBar.tsx';
import ProductDetailModal from './ProductDetailModal.tsx';
import SearchModal from '../../pages/SearchModal.tsx';
import EditCardOptionModal from './EditCardOptionModal.tsx';
import {
  deleteCard,
  getCardInfo,
  likeCard,
  unlikeCard,
  getMemberCard
} from '../../api/axios.custom.ts';
import { Author, Product } from '../../types/types.ts';

interface CardDetailComponentProps {
  cardStatus: 'myCard' | 'interestedCard' | 'otherCard';
  cardId: number;
  selectedProducts: Product[];
  onCheck: (product: Product) => void;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onRemoveProduct: (product: Product) => void;
}

const CardDetailComponent: React.FC<CardDetailComponentProps> = ({
  cardStatus,
  cardId,
  selectedProducts,
  setSelectedProducts,
  onRemoveProduct
}) => {
  const [cardStatusState, setCardStatusState] = useState(cardStatus); // 카드 상태
  const [isCardOptionOpen, setIsCardOptionOpen] = useState(false); // 카드옵션 열림여부
  const [author, setAuthor] = useState<Author>({
    nickname: '',
    imageUrl: '',
    memberId: 0,
    email: ''
  });
  const [cardTitle, setCardTitle] = useState<string>('Loading...');
  const [products, setProducts] = useState<Product[]>([]); //화면에 표시할 상품 목록
  const [totalResources, setTotalResources] = useState(0); //총 상품 목록 설정
  const [page, setPage] = useState(1); //페이지 설정
  const productsPerPage = 2; // 한 페이지에 표시할 상품 수
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false); //상품 상세 정보 모달
  const [showProductDetail, setShowProductDetail] = useState<number>(0); //상품 상세 정보 모달 선택
  const [sortOrder, setSortOrder] = useState('uploadedAt');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [selectedSort, setSelectedSort] = useState('recentDesc');
  const handleProductClick = (productId: number) => {
    setShowProductDetail(productId);
    setIsProductDetailOpen(true);
  };
  const [isEditCardOptionOpen, setIsEditCardOptionOpen] = useState(false);

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  const navigateToOtherProfile = () => {
    navigate(`/otherProfile/${author.memberId}`);
  };

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const cardInfoResponse = await getCardInfo(
          cardId,
          page - 1,
          productsPerPage,
          sortOrder,
          sortDirection
        );
        setProducts(cardInfoResponse.products);
        setTotalResources(cardInfoResponse.totalResources);
        setAuthor(cardInfoResponse.author);

        const memberCardsResponse = await getMemberCard(
          cardInfoResponse.author.memberId,
          0,
          50
        );
        const matchingCard = memberCardsResponse.data.cards.find(
          (card: { cardId: number }) => card.cardId === cardId
        );
        if (matchingCard) {
          setCardTitle(matchingCard.title);
        }
      } catch (error) {
        console.log('카드 정보를 가져오는 도중 오류가 발생했습니다', error);
      }
    };

    fetchCardInfo();
  }, [cardId, page, productsPerPage, sortOrder, sortDirection]);

  useEffect(() => {
    setCardStatusState(cardStatus);
  }, [cardStatus]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedSort(value);
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
        setSortOrder('uploadedAt');
        setSortDirection('ASC');
        break;
      default:
        setSortOrder('uploadedAt');
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
      const productIds = selectedProducts
        .map((product) => product.productId)
        .join(',');
      navigate(`/compare?productIds=${productIds}`);
    } else {
      alert('비교할 상품을 선택해주세요.');
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
      setCardStatusState('otherCard');
    } catch (error) {
      console.log('관심 카드를 해제하는 도중 오류가 발생했습니다: ', error);
    }
  };

  // 카드 삭제 이벤트
  const handleDelete = async (cardId: number) => {
    try {
      await deleteCard(cardId);
      navigate(-1);
    } catch (error) {
      console.log('카드를 삭제하는 도중 오류가 발생했습니다: ', error);
    }
  };

  // 관심 추가 버튼 클릭 이벤트
  const handleLikeCard = async (cardId: number) => {
    try {
      await likeCard(cardId);
      setCardStatusState('interestedCard');
    } catch (error) {
      console.log('관심 카드를 등록하는 도중 오류가 발생했습니다: ', error);
    }
  };

  const handleOpenEditCardOption = () => {
    setIsEditCardOptionOpen(true);
  };

  const handleCloseEditCardOption = () => {
    setIsEditCardOptionOpen(false);
  };

  const RenderButtons: React.FC = () => {
    switch (cardStatusState) {
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
                <Button variant="contained" onClick={handleOpenEditCardOption}>
                  카드 옵션 수정
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
              onClick={() => handleUnlikeCard(cardId)}
              sx={{ mr: 1 }}
            >
              관심 해제
            </Button>
            <Button variant="contained" onClick={handleOpenCardOption}>
              검색 옵션
            </Button>
          </>
        );
      case 'otherCard':
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => handleLikeCard(cardId)}
              sx={{ mr: 1 }}
            >
              관심 추가
            </Button>
            <Button variant="contained" onClick={handleOpenCardOption}>
              검색 옵션
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
              <Avatar
                src={author.imageUrl}
                onClick={navigateToOtherProfile}
                sx={{ marginRight: 2, cursor: 'pointer' }}
              />
              <Typography variant="h4" gutterBottom component="div">
                {cardTitle}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={selectedSort}
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  mr: 2,
                  height: '40px', // 버튼과 동일한 높이로 조절
                  '.MuiSelect-select': {
                    paddingTop: '10px',
                    paddingBottom: '10px'
                  }
                }}
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
      {isEditCardOptionOpen && (
        <EditCardOptionModal
          open={isEditCardOptionOpen}
          handleClose={handleCloseEditCardOption}
          cardId={cardId}
        />
      )}
    </>
  );
};

export default CardDetailComponent;
