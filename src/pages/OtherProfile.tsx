import { Box, Typography, Button, Divider } from '@mui/material';
import CardMaker from '../components/common/Card';
import Logo from '../components/common/Logo';
import DefaultProfile from '../components/common/DefaultProfile';
import Keyword from '../components/common/Keyword';

interface Props {
  nickname: string;
}

function OtherProfile({nickname}:Props) {

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

  return (
    <div style={{
      background: 'linear-gradient(white, skyblue)',
      width: '100%',
      paddingBottom: '50px'
    }}>
    <Box>
      <Logo/>
      <Box>
        <Box sx={title_space}>
          <DefaultProfile/>
          <Typography fontSize={'50px'} fontFamily={'Jua'}>{nickname}님의 프로필</Typography>
        </Box>
        <Divider/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}> 카드 목록</Typography>
          <Button variant="outlined" sx={{color: 'darkblue', fontFamily: 'Noto Sans KR', borderColor: 'blue', background: 'white'}}>내 키워드에 추가</Button>
        </Box>
        <Box sx={{display:'flex', alignItems: 'center', marginBottom: '50px', gap: '16px'}}>
            {/* 타 유저가 만든 카드들 */}
            <CardMaker/>
            <CardMaker/>
            <CardMaker/>
        </Box>
        <Divider/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>키워드 목록</Typography>
          <Box>
            <Button variant="outlined" sx={{color: 'darkblue', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'blue', background: 'white'}}>내 키워드에 추가</Button>
          </Box>
        </Box>
        <Box sx={{marginBottom: '100px', display: 'flex', alignItems:'center', gap: '16px'}}>
            {/* 키워드 박스들 */}
            <Keyword keyword='검정바지'/>
            <Keyword keyword='흰둥이'/>
            <Keyword keyword='아이유'/>
            <Keyword keyword='당근'/>
        </Box>
        </Box>
      </Box>
    </div>
  );
}

export default OtherProfile;
