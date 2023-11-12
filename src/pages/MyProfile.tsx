import { useState } from 'react';
import { Box, Typography, Button, Divider, Switch, IconButton, TextField } from '@mui/material';
import CardMaker from '../components/common/Card';
import Logo from '../components/common/logo';
import EditIcon from '@mui/icons-material/Edit';
import DefaultProfile from '../components/common/DefaultProfile';
import Keyword from '../components/common/Keyword';
import Add from '@mui/icons-material/Add';

function MyProfile() {
  const [, setIsCardPublic] = useState(false);
  const [, setIsKeywordPublic] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const handleCardPublic = () => setIsCardPublic(true);
  const handleCardPrivate = () => setIsCardPublic(false);
  const handleKeywordPublic = () => setIsKeywordPublic(true);
  const handleKeywordPrivate = () => setIsKeywordPublic(false);
  const handleNotificationToggle = () => setIsNotificationOn(!isNotificationOn);

  const title_space = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 2, 
    marginTop: '40px',
    marginBottom: '100px'
  }

  const default_space = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginTop: '50px',
    marginBottom: '35px'
  }

  const setting_space = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50px',
    paddingBottom: '50px'
  }

  return (
    <div style={{
      background: 'linear-gradient(white, skyblue)',
      width: '100%'
    }}>
    <Box>
      <Logo/>
      <Box>
        <Box sx={title_space}>
          <DefaultProfile/>
          <Typography fontSize={'50px'} fontFamily={'Jua'}>닉네임</Typography>
          <IconButton>
            <EditIcon sx={{width: 50, height: 50, color: 'Black'}}/>
          </IconButton>
        </Box>
        <Divider/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>내가 생성한 카드</Typography>
          <Box>
            <Button variant="outlined" sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}>선택삭제</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}} onClick={handleCardPublic} >공개</Button>

            <Button variant="outlined" sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}} onClick={handleCardPrivate}>비공개</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}} >전체공개</Button>
          </Box>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '50px', gap: '16px'}}>
          {/* 생성한 카드들 */}
          <CardMaker/>
          <CardMaker/>
        </Box>
        <Divider/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>관심 카드</Typography>
          <Button variant="outlined" sx={{color: 'darkred', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}>선택삭제</Button>
        </Box>
        <Box sx={{display:'flex', alignItems: 'center', marginBottom: '50px', gap: '16px'}}>
            {/* 관심 카드들 */}
            <CardMaker/>
            <CardMaker/>
            <CardMaker/>
        </Box>
        <Divider/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>내가 추가한 키워드</Typography>
          <Box>
            <Button variant="outlined" sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}>선택삭제</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}} onClick={handleKeywordPublic}>공개</Button>

            <Button variant="outlined" sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}} onClick={handleKeywordPrivate}>비공개</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}}>전체공개</Button>
          </Box>
        </Box>
        <Box sx={{marginBottom: '50px', display: 'flex', alignItems:'center', gap: '16px'}}>
            {/* 키워드 박스들 */}
            <Keyword/><Keyword/><Keyword/><Keyword/>
            <IconButton sx={{marginLeft: '10px'}}>
              <Add sx={{ color: 'Black'}}/>
            </IconButton>
        </Box>
        <Divider/>

        <Box sx={setting_space}>
          <Typography  sx={{fontSize: '30px', fontFamily: 'Gugi'}}>설정</Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '35px'}}>
          <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>전체 알림</Typography>
          <Switch sx={{marginLeft: '20px'}} checked={isNotificationOn} onChange={handleNotificationToggle} />
          <Typography sx={{fontSize: '20px', fontFamily: 'Jua', marginLeft: '10px'}}>{isNotificationOn ? 'ON' : 'OFF'}</Typography>
        </Box>

          <Box sx={{display: 'flex', justifyContent: 'flex-start', marginTop: '30px', alignItems: 'center'}}>
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>이메일</Typography>
            <Box>
              <TextField disabled variant="outlined" sx={{marginLeft: '45px'}} value="wonjun@naver.com" inputProps={{ style: { fontSize: '20px', padding: '6px', marginLeft: '16px' } }} />
              <Button variant="outlined" sx={{fontSize: '16px', marginLeft: '16px', fontFamily: 'Noto Sans KR', background: 'white'}}>수정</Button>
            </Box>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '30px'}}>
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>회원탈퇴</Typography>
            <Button variant="outlined" sx={{color: 'red', fontSize: '16px', fontFamily: 'Noto Sans KR', marginLeft: '25px', borderColor: 'red', background: 'white' }}>회원탈퇴</Button>
          </Box>
        </Box>
      </Box>
    </Box>
    </div>
  );
}

export default MyProfile;
