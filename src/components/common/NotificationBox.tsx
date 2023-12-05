import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Divider, ButtonBase, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getProductDetail } from '../../api/axios.custom';

interface NotificationBoxProps {
  productId: number;
  title: string;
  content: string;
  time: string;
  index: number;
  onDelete: (index: number) => void; // 삭제 함수
  onClick: () => void; //클릭시 실행될 함수
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ productId, title, content, time, index, onDelete, onClick }) => {

  const [imageUrl, setImageUrl] = useState<string>('');

  const fetchProductDetail = useCallback(async () => {
    const response = await getProductDetail(productId);
    setImageUrl(response.data.productDetail.productImageUrl);
  }, [productId]);
  
  useEffect(() => {
    fetchProductDetail();
    console.log("이미지url: ", imageUrl);
  }, [fetchProductDetail, imageUrl]); //이부분 imageUrl추후제거해야함
  

  return (
    <ButtonBase style={{display: 'block', width: '100%'}} onClick={onClick}>
      <Box display="flex" flexDirection="column"  sx={{width: '100%'}}>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="16px" marginBottom="16px">
          <Box
            sx={{
              width: '100px',
              height: '100px',
              background: `url(${imageUrl})`,
              backgroundSize: 'cover',
              borderRadius: '8px'
            }}
          />
          <div style={{width: '50%'}}>
            <Typography sx={{ fontFamily: 'Noto Sans KR', fontSize: '18px', marginBottom: '3px' }}>{title}</Typography>
            <Typography sx={{ fontFamily: 'Noto Sans KR', fontSize: '14px', marginBottom: '3px' }}>{content}</Typography>
            <Typography sx={{ fontFamily: 'Noto Sans KR', fontSize: '14px' }}>{time}</Typography>
          </div>
          <IconButton onClick={(event) => {
            event.stopPropagation();
            onDelete(index);
            }}><CloseIcon /></IconButton>
        </Box>
        <Divider/>
      </Box>
    </ButtonBase>
  );
};

export default NotificationBox;
