import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Category from '../components/common/Category';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import { getPopularCard, getMyCard, getMyProfile, getInterestedCard } from '../api/axios.custom';
import { Card } from '../types/types';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';;

function HomePage() {
  const [popularCards, setPopularCards] = useState<Card[]>([]);
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [interestedCards, setInterestedCards] = useState<Card[]>([]);
  const [popularCardPage, setPopularCardPage] = useState(0);
  const [myCardPage, setMyCardPage] = useState(0);
  const [interestedCardPage, setInterestedCardPage] = useState(0);

  const fetchPopularCard = async () => {
    try {
      const response = await getPopularCard(popularCardPage, 6);
      setPopularCards(response.data.cards);
      console.log(`호출한 인기카드 개수: ${popularCards.length}`);
    } catch (error) {
      console.error('인기 카드를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const fetchMyCards = async () => {
    try {
      const response = await getMyCard(myCardPage, 6);
      setMyCards(response.data.cards);
      console.log(`호출한 내 카드 개수: ${myCards.length}`);
    } catch (error) {
      console.error('내 카드를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const fetchInterestedCard = async () => {
    try {
      const myProfile = await getMyProfile();
      const myId = myProfile.data.memberId;
      const response = await getInterestedCard(myId, interestedCardPage, 6);
      setInterestedCards(response.data.cards);
      console.log(`호출한 관심 카드 개수: ${interestedCards.length}`);
    } catch (error) {
      console.error('관심카드를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const scrollPopularCard = (direction: string) => {
    // direction이 'right'일 경우
    if (direction === 'right') {
      setPopularCardPage(popularCardPage => popularCardPage + 1);
    }
    // direction이 'left'일 경우
    else if (direction === 'left') {
      // 페이지 번호가 음수가 되지 않도록 조건을 추가할 수 있습니다.
      if (popularCardPage > 0) {
        setPopularCardPage(popularCardPage => popularCardPage - 1);
      }
    }
    console.log("받은 방향: ",direction," 이전 페이지: ",popularCardPage);
    // 다른 경우는 무시
  };

  const scrollMyCard = (direction: string) => {
    // direction이 'right'일 경우
    if (direction === 'right') {
      setMyCardPage(myCardPage => myCardPage + 1);
    }
    // direction이 'left'일 경우
    else if (direction === 'left') {
      // 페이지 번호가 음수가 되지 않도록 조건을 추가할 수 있습니다.
      if (myCardPage > 0) {
        setMyCardPage(myCardPage => myCardPage - 1);
      }
    }
    console.log("받은 방향: ",direction," 이전 페이지: ",myCardPage);
    // 다른 경우는 무시
  };

  const scrollInterestedCard = (direction: string) => {
    // direction이 'right'일 경우
    if (direction === 'right') {
      setInterestedCardPage(interestedCardPage => interestedCardPage + 1);
    }
    // direction이 'left'일 경우
    else if (direction === 'left') {
      // 페이지 번호가 음수가 되지 않도록 조건을 추가할 수 있습니다.
      if (interestedCardPage > 0) {
        setInterestedCardPage(interestedCardPage => interestedCardPage - 1);
      }
    }
    console.log("받은 방향: ",direction," 이전 페이지: ",interestedCardPage);
    // 다른 경우는 무시
  };

  useEffect(() => {
    fetchPopularCard();
    fetchMyCards();
    fetchInterestedCard();
  }, [popularCardPage, myCardPage, interestedCardPage]);

  const fontStyle = {
    fontSize: '44px',
    fontFamily: 'Gugi',
    marginTop: '60px',
    marginBottom: '30px',
    marginLeft: '100px'
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: 'linear-gradient(white, skyblue)'
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          {/* 타이틀 영역 */}
          <NavigationBar />
        </Grid>
        <Grid item xs={3} sx={{ zIndex: 2 }}>
          {/* 카테고리바 */}
          <Box
            sx={{
              position: 'fixed',
              top: 200,
              left: 80,
              width: '20%',
              height: 'calc(100vh - 100px)'
            }}
          >
            <Category />
          </Box>
        </Grid>
        <Grid item xs={9}>
          {/* 카드 목록 */}
          <Box sx={{ marginTop: '200px', marginBottom: '40px', }}>
            <div style={fontStyle}>인기 카드 목록</div>
            <Grid container spacing={2}>
            <IconButton 
              sx={{alignSelf:'center', height:'100px', width:'100px'}}
              onClick={() => scrollPopularCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>
              {/*아래는 테스트*/}
              <Grid item>
                <CardMaker />
              </Grid>

              {popularCards.map((card) => {
                // 모든 카테고리 이름을 가져옵니다.
                let category = card.category.name;
                let subCategory = card.category.subCategory;
                while (subCategory) {
                  category += ' > ' + subCategory.name;
                  subCategory = subCategory.subCategory;
                }

                // 모든 지역 이름을 가져옵니다.
                let area = card.area.sido.name;
                const sigg = card.area.sido.sigg;
                if (sigg) {
                  area += ' > ' + sigg.name;
                  if (sigg.emd) {
                    area += ' > ' + sigg.emd.name;
                  }
                }

                // description을 설정합니다.
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.author.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
              <IconButton 
                onClick={() => scrollPopularCard('right')}
                sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'26px'}}>
                <ArrowCircleRightIcon style={{ fontSize: 60 }} />
              </IconButton>
            </Grid>

            <div style={fontStyle}>내 카드 목록</div>
            <Grid container spacing={2}>
            <IconButton 
              sx={{alignSelf:'center', height:'100px', width:'100px'}}
              onClick={() => scrollMyCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>
              {/*아래는 테스트*/}
              <Grid item>
                <CardMaker />
              </Grid>

              {myCards.map((card) => {
                // 모든 카테고리 이름을 가져옵니다.
                let category = card.category.name;
                let subCategory = card.category.subCategory;
                while (subCategory) {
                  category += ' > ' + subCategory.name;
                  subCategory = subCategory.subCategory;
                }

                // 모든 지역 이름을 가져옵니다.
                let area = card.area.sido.name;
                const sigg = card.area.sido.sigg;
                if (sigg) {
                  area += ' > ' + sigg.name;
                  if (sigg.emd) {
                    area += ' > ' + sigg.emd.name;
                  }
                }

                // description을 설정합니다.
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.author.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
              <IconButton 
                onClick={() => scrollMyCard('right')}
                sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'36px'}}>
                <ArrowCircleRightIcon style={{ fontSize: 60 }} />
              </IconButton>
            </Grid>

            <div style={fontStyle}>관심 카드 목록</div>
            <Grid container spacing={2}>
            <IconButton 
              sx={{alignSelf:'center', height:'100px', width:'100px'}}
              onClick={() => scrollInterestedCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>
              {/*아래는 테스트*/}
              <Grid item>
                <CardMaker />
              </Grid>
              
              {interestedCards.map((card) => {
                // 모든 카테고리 이름을 가져옵니다.
                let category = card.category.name;
                let subCategory = card.category.subCategory;
                while (subCategory) {
                  category += ' > ' + subCategory.name;
                  subCategory = subCategory.subCategory;
                }

                // 모든 지역 이름을 가져옵니다.
                let area = card.area.sido.name;
                const sigg = card.area.sido.sigg;
                if (sigg) {
                  area += ' > ' + sigg.name;
                  if (sigg.emd) {
                    area += ' > ' + sigg.emd.name;
                  }
                }

                // description을 설정합니다.
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.author.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
              <IconButton 
                onClick={() => scrollInterestedCard('right')}
                sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'26px'}}>
                <ArrowCircleRightIcon style={{ fontSize: 60 }} />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
