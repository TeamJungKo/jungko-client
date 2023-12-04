import React from 'react';
import { Box, Avatar, Typography, Divider, ButtonBase, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface NotificationBoxProps {
  imageAlt?: string;
  imageUrl: string;
  title: string;
  content: string;
  time: string;
  index: number;
  onDelete: (index: number) => void; // 삭제 함수
  onClick: () => void; //클릭시 실행될 함수
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ imageAlt='', imageUrl, title, content, time, index, onDelete, onClick }) => {
  return (
    <ButtonBase style={{display: 'block', width: '100%'}} onClick={onClick}>
      <Box display="flex" flexDirection="column"  sx={{width: '100%'}}>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="16px" marginBottom="16px">
          <Avatar alt={imageAlt} src={imageUrl} />
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
