import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Typography, Box, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationBox from '../../components/common/NotificationBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface NotificationModalProps {
  open: boolean;  // 모달의 열림/닫힘 상태를 나타내는 프롭입니다.
  onClose: () => void;  // 모달을 닫는 함수를 나타내는 프롭입니다.
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`alert-dialog-description-${index}`}
      aria-labelledby={`alert-dialog-description-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
  const [value, setValue] = useState(0);

  const [cardNotifications, setCardNotifications] = useState(Array(5).fill(null).map((_, index) => ({
    imageAlt: "Card Image",
    imageUrl: "",
    title: `제목${index + 1}`,
    content: `소식${index + 1}`,
    time: "n분전",
  })));

  const [keywordNotifications, setKeywordNotifications] = useState(Array(5).fill(null).map((_, index) => ({
    imageAlt: "Keyword Image",
    imageUrl: "",
    title: `제목${index + 1}`,
    content: `소식${index + 1}`,
    time: "n분전",
  })));

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteAllCards = () => {
    setCardNotifications([]);
  };
  
  const handleDeleteAllKeywords = () => {
    setKeywordNotifications([]);
  };

  const handleDeleteBox = (index: number) => {
    if (value === 0) {
      setCardNotifications(cardNotifications.filter((_, i) => i !== index));
    } else {
      setKeywordNotifications(keywordNotifications.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <Dialog 
        open={open}  // open 프롭을 사용하여 모달의 열림/닫힘을 제어합니다.
        onClose={onClose}  // onClose 프롭을 사용하여 모달을 닫습니다.
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
      >
        <DialogTitle sx={{fontSize: '28px', fontFamily: 'Jua'}}>{"검은바지님의 알림"}</DialogTitle>

        <DialogContent>
          <Box sx={{maxHeight: '500px', overflow: 'auto'}}>
            <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)} aria-label="Notification tabs">
              <Tab label="카드 알림" sx={{ fontFamily: 'Jua', fontSize: '20px' }} />
              <Tab label="키워드 알림" sx={{ fontFamily: 'Jua', fontSize: '20px' }} />
            </Tabs>

            <TabPanel value={value} index={0}>
              {cardNotifications.map((notification, index) => (
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
              <Button onClick={handleDeleteAllCards} sx={{marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>전체삭제</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
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
              <Button onClick={handleDeleteAllKeywords} sx={{marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>전체삭제</Button>
            </TabPanel>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NotificationModal;
