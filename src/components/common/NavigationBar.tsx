import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const NavigationBar = ({ reload = false }: Prop) => {
  const [nickname, setNickname] = useState('닉네임');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false); // 모달의 열림/닫힘
  const [searchModalOpen, setSearchModalOpen] = useState(false); // SearchModal의 열림/닫힘
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true); // 모달을 엽니다.
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(
        `/searchresult?keyword=${encodeURIComponent(searchKeyword.trim())}`
      );
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // 모달을 닫습니다.
  };

  const handleOpenSearchModal = () => {
    // SearchModal을 여는 함수를 추가합니다.
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    // SearchModal을 닫는 함수를 추가합니다.
    setSearchModalOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        if (response.data) {
          setNickname(response.data.nickname);
          setImageUrl(response.data.imageUrl);
        }
      } catch (error) {
        console.log('프로필을 가져오는 도중 오류가 발생했습니다: ', error);
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
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ textDecoration: 'none', marginLeft: '16px' }}>
            <Button variant="outlined" onClick={handleSearch}>
              검색
            </Button>
          </div>

          <div style={{ textDecoration: 'none', marginLeft: '16px' }}>
            <Button variant="outlined" onClick={handleOpenSearchModal}>
              검색 옵션
            </Button>
          </div>

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={handleOpenModal}
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
                sx={{ padding: '0px', fontFamily: 'Jua' }}
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
      />
    </Box>
  );
};

export default NavigationBar;
