import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Category from '../components/common/Category';
import CardMaker from '../components/common/Card';
import Logo from '../components/common/Logo';
import danggeun from '../assets/images/danggeun.png'

function HomePage() {

  const fontStyle = {
    fontSize: '44px',
    fontFamily: 'Gugi',
    marginTop: '60px',
    marginBottom: '30px'
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      background: 'linear-gradient(white, skyblue)'
      }}>
      <Grid container>
        <Grid item xs={12}>
          {/* 타이틀 영역 */}
          <Logo/>
        </Grid>
        <Grid item xs={3} sx={{zIndex:2}}>
          {/* 카테고리바 */}
          <Box sx={{ position: 'fixed', top: 240, left:80, width: '20%', height: 'calc(100vh - 100px)'}}>
            <Category />
          </Box>
        </Grid>
        <Grid item xs={9}>
          {/* 카드 목록 */}
          <Box>
            <div style={fontStyle}>인기 카드 목록</div>
            <Grid container spacing={2}> {/*아래는 테스트*/}
              <Grid item><CardMaker image={danggeun} title="검정바지 알리미" description='가격이랑 카테고리등 요기에'/></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
            </Grid>
            <div style={fontStyle}>내 카드 목록</div>
            <Grid container spacing={2}>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
            </Grid>
            <div style={fontStyle}>관심 카드 목록</div>
            <Grid container spacing={2}>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
              <Grid item><CardMaker /></Grid>
            </Grid>
            <br></br><br></br>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
