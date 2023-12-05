import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Pagination,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import {
  ProductComponent,
  Product
} from '../components/common/ProductComponent';
import NavigationBar from '../components/common/NavigationBar';
import ProductDetail from '../components/common/ProductDetail';
import CreateCardPage from './CreateCardModal';
import SearchModal from './SearchModal';
import { deleteCard } from '../api/axios.custom';

interface CardDetailProps {
  cardStatus: 'myCard' | 'interestedCard' | 'otherCard';
  cardId: number | null;
}

const dummyProducts: Product[] = [
  {
    id: 1,
    image: 'path-to-your-image-1.png',
    title: '반려동물존',
    price: '150,000',
    description:
      '구매하신 뒤에 안 맞거나 사이즈가 다르면 반품이 안되요. 사이즈는 상세에 있어요.',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: 2,
    image: 'path-to-your-image-2.png',
    title: '강아지 집',
    price: '50,000',
    description: '사랑합니다, 귀여워요',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: 3,
    image: 'path-to-your-image-3.png',
    title: '강아지 장난감',
    price: '20,000',
    description: '아이들이 좋아해요',
    keywords: ['반려동물존', '애완용품']
  },
  {
    id: 4,
    image: 'path-to-your-image-4.png',
    title: '고양이 캣타워',
    price: '80,000',
    description: '고양이가 놀기 좋은 캣타워입니다.',
    keywords: ['반려동물존', '애완용품']
  }
];

const CardDetail: React.FC<CardDetailProps> = ({ cardStatus, cardId }) => {
  const [isCardDeleted, setIsCardDeleted] = useState(false); //카드삭제됨?
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false); //카드생성모달열림?
  const [isCardOptionOpen, setIsCardOptionOpen] = useState(false); // 카드옵션 열림?
  const [isCardTitleVisible, setIsCardTitleVisible] = useState(true); //카드 타이틀 표시 여부

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 2; // 한 페이지에 표시할 상품 수
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, /*setSelectedProduct*/] = useState<Product | null>(null);
  const navigate = useNavigate();

  const handleOpenCardOption = () => {
    setIsCardOptionOpen(true);
  };

  const handleCloseCardOption = () => {
    setIsCardOptionOpen(false);
  };

  const handleCardClick = (product: Product) => {
    navigate(`/productDetail/${product.id}`);
  };  

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  const handleCheck = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.find((p) => p.id === product.id)
        ? prevSelected.filter((p) => p.id !== product.id)
        : [...prevSelected, product]
    );
  };

  const handleCompareClick = () => {
    if (selectedProducts.length > 0) {
      navigate('/compare');
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

  // 현재 페이지에 표시될 상품 계산
  const currentProducts = dummyProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // 관심 해제 버튼 클릭 이벤트
  const handleUnwatchClick = () => {
    console.log('관심 해제 호출');
  };

  // 옵션 수정 버튼 클릭 이벤트
  // const handleOptionsClick = () => {
  //   console.log('옵션 수정 호출');
  // };

  // 카드 삭제 이벤트
  const handleDelete = async (cardId: number) => {
    try {
      await deleteCard(cardId);
      setIsCardDeleted(true);
      setIsCardTitleVisible(false); // 카드 타이틀 숨기기
    } catch (error) {
      console.log('카드 삭제 error');
    }
  };

  // 카드 생성 이벤트
  const handleCreate = () => {
    console.log('카드 생성 호출');
    setIsCardDeleted(false);
    setIsCreateCardOpen(true);
    setIsCardTitleVisible(true); // 카드 타이틀 보이기
  };

  //카드 생성 모달 닫힘 이벤트
  const handleCloseCreateCard = () => {
    setIsCreateCardOpen(false);
  };

  // 관심 추가 버튼 클릭 이벤트
  const handleInteretClick = () => {
    console.log('관심 추가 호출');
  };

  const RenderButtons: React.FC = () => {
    switch (cardStatus) {
      case 'myCard':
        return (
          <>
            {isCardDeleted ? (
              <Button variant="outlined" onClick={handleCreate} sx={{ mr: 1 }}>
                카드 생성
              </Button>
            ) : (
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
            )}
          </>
        );
      case 'interestedCard':
        return (
          <>
            <Button
              variant="outlined"
              onClick={handleUnwatchClick}
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
              onClick={handleInteretClick}
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
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="h4" gutterBottom component="div">
              {isCardTitleVisible && 'CardTitle'}
            </Typography>
            <Box>
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
            {currentProducts.map((product) => (
              <ProductComponent
                key={product.id}
                product={product}
                onCheck={handleCheck}
                isChecked={selectedProducts.some((p) => p.id === product.id)}
                onCardClick={handleCardClick}
              />
            ))}
          </Box>
          <Pagination
            count={Math.ceil(dummyProducts.length / productsPerPage)}
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
                key={product.id}
                src={product.image}
                alt={product.title}
                style={{ width: '100px', height: '100px', marginRight: '8px' }}
              />
            ))}
          </Box>
        </Box>
      </div>
      {selectedProduct && (
        <ProductDetail
          isOpen={isProductDetailOpen}
          onClose={handleCloseProductDetail}
        />
      )}
      <Dialog
        open={isCreateCardOpen}
        onClose={handleCloseCreateCard}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" style={{ fontFamily: 'jua' }}>
          카드 생성
        </DialogTitle>
        <DialogContent style={{ height: 'auto', minHeight: '400px' }}>
          <CreateCardPage onClose={handleCloseCreateCard} />
        </DialogContent>
      </Dialog>
      <SearchModal
        open={isCardOptionOpen}
        handleClose={handleCloseCardOption}
      />
    </>
  );
};

export default CardDetail;
