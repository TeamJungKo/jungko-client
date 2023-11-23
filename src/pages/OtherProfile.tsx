import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import DefaultProfile from '../components/common/DefaultProfile';
import Keyword from '../components/common/Keyword';

interface Props {
  nickname: string;
}

function OtherProfile({ nickname }: Props) {
  const [isSelectedCardMaker, setIsSelectedCardMaker] = useState([
    false,
    false,
    false
  ]);
  const [isSelectedKeyword, setIsSelectedKeyword] = useState([
    false,
    false,
    false
  ]);

  const handleCardRightClick = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault(); // 기본 우클릭 메뉴가 나타나지 않도록 합니다.
    const newIsSelectedCardMaker = [...isSelectedCardMaker];
    newIsSelectedCardMaker[index] = !newIsSelectedCardMaker[index];
    setIsSelectedCardMaker(newIsSelectedCardMaker); // 현재 상태를 반전시킵니다.
  };

  const handleKeywordRightClick =
    (index: number) => (event: React.MouseEvent) => {
      event.preventDefault(); // 기본 우클릭 메뉴가 나타나지 않도록 합니다.
      const newIsSelectedKeyword = [...isSelectedKeyword];
      newIsSelectedKeyword[index] = !newIsSelectedKeyword[index];
      setIsSelectedKeyword(newIsSelectedKeyword); // 현재 상태를 반전시킵니다.
    };

  const title_space = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginTop: '40px',
    marginBottom: '100px'
  };

  const default_space = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '35px'
  };

  return (
    <div
      style={{
        background: 'linear-gradient(white, skyblue)',
        width: '100%',
        paddingBottom: '50px'
      }}
    >
      <Box sx={{ marginTop: '160px' }}>
        <NavigationBar />
        <Box>
          <Box sx={title_space}>
            <DefaultProfile />
            <Typography fontSize={'50px'} fontFamily={'Jua'}>
              {nickname}님의 프로필
            </Typography>
          </Box>
          <Divider />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              {' '}
              카드 목록
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: 'darkblue',
                fontFamily: 'Noto Sans KR',
                borderColor: 'blue',
                background: 'white'
              }}
            >
              내 관심 카드에 추가
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              gap: '16px'
            }}
          >
            {/* 타 유저가 만든 카드들 */}
            <CardMaker
              onContextMenu={handleCardRightClick(0)}
              isSelected={isSelectedCardMaker[0]}
            />
            <CardMaker
              onContextMenu={handleCardRightClick(1)}
              isSelected={isSelectedCardMaker[1]}
            />
            <CardMaker
              onContextMenu={handleCardRightClick(2)}
              isSelected={isSelectedCardMaker[2]}
            />
          </Box>
          <Divider />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              키워드 목록
            </Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: 'darkblue',
                  marginRight: '15px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'blue',
                  background: 'white'
                }}
              >
                내 키워드에 추가
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {/* 키워드 박스들 */}
            <Keyword
              onContextMenu={handleKeywordRightClick(0)}
              isSelected={isSelectedKeyword[0]}
              keyword="검정바지"
            />
            <Keyword
              onContextMenu={handleKeywordRightClick(1)}
              isSelected={isSelectedKeyword[1]}
              keyword="흰둥이"
            />
            <Keyword
              onContextMenu={handleKeywordRightClick(2)}
              isSelected={isSelectedKeyword[2]}
              keyword="당근"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default OtherProfile;
