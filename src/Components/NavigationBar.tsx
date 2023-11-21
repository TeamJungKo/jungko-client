import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Button,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Logout
} from '@mui/icons-material';
import logo from '../assets/jungko-logo.png';
import profilePic from '../assets/profile-pic.png';
import SearchModal from '../Page/SearchModal.tsx';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%'
  }
}));

const NavigationBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const notificationsCount = 4; //확인 안 한 알림 숫자(recoil 써서 받아올 듯)

  return (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: 1100,
        position: 'fixed',
        width: '100%',
        top: 0,
        backgroundColor: 'white'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Link to="/">
          <img
            src={logo}
            alt="LOGO"
            style={{ height: '50px', cursor: 'pointer' }}
          />
        </Link>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Button
            variant="outlined"
            style={{ marginLeft: '16px' }}
            onClick={handleOpenModal}
          >
            옵션 설정
          </Button>

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={notificationsCount > 0 ? notificationsCount : null}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginLeft: '16px'
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              ml: 2
            }}
          >
            <Typography variant="subtitle1" noWrap>
              UserName {/* 추후 username으로 변경 */}
            </Typography>
            <Button
              startIcon={<Logout />}
              sx={{ my: 1, py: 0, minWidth: 'none', color: 'red' }}
              size="small"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
      <SearchModal open={isModalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default NavigationBar;
