import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import NotificationBox from '../components/common/NotificationBox';
import { Notice } from '../types/types';
import { getNotices, deleteNotices  } from '../api/axios.custom';
import { useNavigate } from 'react-router-dom';

interface Props {
  nickname: string;
  open: boolean; 
  onClose: () => void; 
}

const NotificationModal: React.FC<Props> = ({ nickname, open, onClose }) => {

  const navigate = useNavigate();

  const [keywordNotices, setKeywordNotices] = useState<Notice[]>([]);
  const [noticeReload, setNoticeReload] = useState(false);
  
  const linkNotice = (productId: number) => {
    navigate(`/product/${productId}`);  // productId에 해당하는 페이지로 이동
  };

  const deleteAllNotices = async () => {
    try {
      const noticeIds = keywordNotices.map(notice => notice.noticeId);
      await deleteNotices(noticeIds); 
      setNoticeReload(prevState => !prevState);
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteNotice = async (id: number) => {
    try {
      await deleteNotices([id]); 
      setNoticeReload(prevState => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotices()
      .then((res) => {
        const noticesWithFormattedTime = res.data.keywordNotices.map((notice: Notice) => {
          const date = new Date(notice.createdAt);
          return {
            ...notice,
            createdAt: date.toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
          };
        });
        setKeywordNotices(noticesWithFormattedTime || []);
      })
      .catch((error) => console.error(error));
  }, [noticeReload, open]);
  

  return (
    <div>
      <Dialog 
        open={open} 
        onClose={onClose}
        sx={{ '& .MuiDialog-paper': { width: '500px', borderRadius: '5px' } }}
      >
        <DialogTitle sx={{fontSize: '28px', fontFamily: 'Jua'}}>{`${nickname}님의 알림`}</DialogTitle>

        <DialogContent>
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '500px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
              zIndex: 10 
            }}/>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0))',
              zIndex: 10
            }}/>
            <div style={{overflow: 'auto', maxHeight: '500px'}}>
              {keywordNotices.map((notice, index) => (
                <NotificationBox
                  key={notice.noticeId}
                  productId={notice.productId}
                  title={notice.title}
                  content={notice.content}
                  time={notice.createdAt}
                  index={index}
                  onDelete={() => deleteNotice(notice.noticeId)}
                  onClick={() => linkNotice(notice.productId)}
                />
              ))}
            </div>
          </div>
          <Button onClick={deleteAllNotices} sx={{marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>전체삭제</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NotificationModal;
