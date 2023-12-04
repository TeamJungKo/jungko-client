import { useEffect, useState } from 'react';
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
import logo from '../../assets/images/jungkoLogo.png';
import { getMyProfile } from '../../api/axios.custom.ts';
import NotificationModal from '../../pages/NotificationModal.tsx';
import SearchModal from '../../pages/SearchModal.tsx';
import defaultImage from '../../assets/images/profile_pic.png';

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

interface Prop {
  reload?: boolean;
}

const NavigationBar = ({reload=false}:Prop) => {
  const [nickname, setNickname] = useState('닉네임');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false); // 모달의 열림/닫힘
  const [searchModalOpen, setSearchModalOpen] = useState(false); // SearchModal의 열림/닫힘 상태를 관리하는 state

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenSearchModal = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        if (response.data) {
          setNickname(response.data.nickname);
          setImageUrl(response.data.imageUrl);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [reload]);

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
        <Link to="/home">
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
          <div style={{ textDecoration: 'none', marginLeft: '16px' }}>
            <Button variant="outlined" /*onClick={handleOpenSearchModal}*/>
              검색
            </Button>{' '}
            {/* onClick 이벤트를 추가하여 버튼 클릭 시 검색결과로 이어지게 함. */}
          </div>

          <div style={{ textDecoration: 'none', marginLeft: '16px' }}>
            <Button variant="outlined" onClick={handleOpenSearchModal}>
              검색 옵션
            </Button>{' '}
            {/* onClick 이벤트를 추가하여 버튼 클릭 시 SearchModal이 열리도록 합니다. */}
          </div>

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={handleOpenModal} // 아이콘을 클릭하면 모달을 엽니다.
          >
            <Badge>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <NotificationModal
            nickname={nickname}
            open={openModal}
            onClose={handleCloseModal}
          />

          {/*여기에 링크 달았음*/}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to="/myProfile"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={imageUrl ? imageUrl : defaultImage}
                alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginLeft: '16px',
                  backgroundColor: 'darkgrey'
                }}
              />
            </Link>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  ml: 2
                }}
              >
                <Typography
                  sx={{ padding: '0px' }}
                  variant="subtitle1"
                  align="left"
                  noWrap
                >
                  {nickname}
                </Typography>

                  <Button
                    startIcon={<Logout />}
                    sx={{
                      my: 1,
                      py: 0,
                      minWidth: 'none',
                      color: 'red',
                      margin: '0px',
                      padding: '0px'
                    }}
                    size="small"
                    component={Link}
                    to="/"
                  >
                    Logout
                  </Button>
              </Box>
            </Box>
        </Box>
      </Toolbar>
      <SearchModal
        open={searchModalOpen}
        handleClose={handleCloseSearchModal}
      />{' '}
      {/* SearchModal 컴포넌트를 추가하고, open과 handleClose prop을 추가합니다. */}
    </Box>
  );
};

export default NavigationBar;
