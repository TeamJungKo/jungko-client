import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import NotificationBox from '../components/common/NotificationBox';

interface NotificationModalProps {
  nickname: String;
  open: boolean;  // 모달의 열림/닫힘 상태를 나타내는 프롭입니다.
  onClose: () => void;  // 모달을 닫는 함수를 나타내는 프롭입니다.
}

const NotificationModal: React.FC<NotificationModalProps> = ({ nickname, open, onClose }) => {
  const [keywordNotifications, setKeywordNotifications] = useState(Array(5).fill(null).map((_, index) => ({
    imageAlt: "Keyword Image",
    imageUrl: "",
    title: `제목${index + 1}`,
    content: `소식${index + 1}`,
    time: "n분전",
  })));
  
  const handleDeleteAllKeywords = () => {
    setKeywordNotifications([]);
  };

  const handleDeleteBox = (index: number) => {
    setKeywordNotifications(keywordNotifications.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Dialog 
        open={open}  // open 프롭을 사용하여 모달의 열림/닫힘을 제어합니다.
        onClose={onClose}  // onClose 프롭을 사용하여 모달을 닫습니다.
        sx={{ '& .MuiDialog-paper': { width: '500px', borderRadius: '5px' } }}
      >
        <DialogTitle sx={{fontSize: '28px', fontFamily: 'Jua'}}>{`${nickname}님의 알림`}</DialogTitle>

        <DialogContent>
          <div style={{
            position: 'relative',
            overflow: 'hidden', // 이 부분을 추가하여 외부로 넘치는 부분을 잘라냅니다.
            maxHeight: '500px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
              zIndex: 10 // 이 부분을 추가하여 그림자가 스크롤 영역 위에 나타나게 합니다.
            }}/>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0))',
              zIndex: 10 // 이 부분을 추가하여 그림자가 스크롤 영역 위에 나타나게 합니다.
            }}/>
            <div style={{overflow: 'auto', maxHeight: '500px'}}> {/* 스크롤이 이루어지는 영역을 별도의 div로 감싸줍니다. */}
              {keywordNotifications.map((notification, index) => (
                <NotificationBox
                  key={index}
                  imageAlt={notification.imageAlt}
                  imageUrl={notification.imageUrl}
                  title={notification.title}
                  content={notification.content}
                  time={notification.time}
                  index={index}
                  onDelete={handleDeleteBox}
                />
              ))}
            </div>
          </div>
          <Button onClick={handleDeleteAllKeywords} sx={{marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>전체삭제</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NotificationModal;
