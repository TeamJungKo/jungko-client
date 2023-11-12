import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Typography, Box, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationBox from '../../components/common/NotificationBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

export default function NotificationModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteAll = () => {
    // TODO: 전체 삭제 로직
  };

  const handleDeleteBox = (index: number) => () => {
    // TODO: 박스 삭제 로직
  };

  return (
    <div>
      <button onClick={handleClickOpen}>
        <NotificationsActiveIcon />
      </button>
      <Dialog open={open} onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
      >
        <DialogTitle sx={{fontSize: '28px', fontFamily: 'Jua'}}>{"검은바지님의 알림"}</DialogTitle>

        <DialogContent>
          <Box sx={{maxHeight: '500px', overflow: 'auto'}}>
            <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)} aria-label="Notification tabs">
              <Tab label="카드 알림" sx={{ fontFamily: 'Jua', fontSize: '20px' }} />
              <Tab label="키워드 알림" sx={{ fontFamily: 'Jua', fontSize: '20px' }} />
            </Tabs>

            {/*카드알림*/}
            <TabPanel value={value} index={0}>
              <NotificationBox imageAlt="Card Image" imageUrl="" title="제목" content="소식" time="n분전" index={0}  onDelete={handleDeleteBox} />
              <NotificationBox imageAlt="Card Image" imageUrl="" title="제목2" content="소식2" time="n분전" index={0}  onDelete={handleDeleteBox} />
              <NotificationBox imageAlt="Card Image" imageUrl="" title="제목3" content="소식3" time="n분전" index={0}  onDelete={handleDeleteBox} />
              <NotificationBox imageAlt="Card Image" imageUrl="" title="제목4" content="소식4" time="n분전" index={0}  onDelete={handleDeleteBox} />
              <NotificationBox imageAlt="Card Image" imageUrl="" title="제목5" content="소식5" time="n분전" index={0}  onDelete={handleDeleteBox} />
              {/* 원하는 만큼 박스를 더 추가 */}
            </TabPanel>

            {/*키워드알림*/}
            <TabPanel value={value} index={1}>
              <NotificationBox imageAlt="Keyword Image" imageUrl="" title="제목" content="소식" time="n분전" index={1}  onDelete={handleDeleteBox} />
              <NotificationBox imageAlt="Keyword Image" imageUrl="" title="제목2" content="소식2" time="n분전" index={1}  onDelete={handleDeleteBox} />
              {/* 원하는 만큼 박스를 더 추가 */}
            </TabPanel>

            <Button onClick={handleDeleteAll} sx={{marginTop: '16px', fontFamily: 'Noto Sans KR', fontSize: '16px'}}>전체삭제</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
