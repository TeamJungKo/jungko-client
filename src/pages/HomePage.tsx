import { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Category from '../components/common/Category';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import {
  getPopularCard,
  getMyCard,
  getMyProfile,
  getInterestedCard
} from '../api/axios.custom';
import { Card } from '../types/types';

function HomePage() {
  const [popularCards, setPopularCards] = useState<Card[]>([]);
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [interestedCards, setInterestedCards] = useState<Card[]>([]);

  const [popularCardPage, setPopularCardPage] = useState(0);
  const [myCardPage, setMyCardPage] = useState(0);
  const [interestedCardPage, setInterestedCardPage] = useState(0);

  const [popularCardTotalPages, setPopularCardTotalPages] = useState(0);
  const [myCardTotalPages, setMyCardTotalPages] = useState(0);
  const [interestedCardTotalPages, setInterestedCardTotalPages] = useState(0);

  const [sort, setSort] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<string | undefined>(undefined);  

  const popularCardPageChange = (page: number) => {
    setPopularCardPage(page - 1); //인덱스는 0부터이므로
  };

  const myCardPageChange = (page: number) => {
    setMyCardPage(page - 1); //인덱스는 0부터이므로
  };

  const interestedCardPageChange = (page: number) => {
    setInterestedCardPage(page - 1); //인덱스는 0부터이므로
  };

  const fetchPopularCard = useCallback(async () => {
    try {
      const response = await getPopularCard(popularCardPage, 12, undefined, sort, order);
      setPopularCards(response.data.cards);
      setPopularCardTotalPages(Math.ceil(response.data.totalResources / 12));
    } catch (error) {
      console.log('인기카드를 가져오는 도중 오류가 발생했습니다: ', error);
    }
  }, [popularCardPage, sort, order]);


  const fetchMyCards = useCallback(async () => {
    try {
      const response = await getMyCard(myCardPage, 12);
      setMyCards(response.data.cards);
      setMyCardTotalPages(Math.ceil(response.data.totalResources / 12));
    } catch (error) {
      console.error('내 카드를 가져오는 중 오류가 발생했습니다:', error);
    }
  }, [myCardPage]);

  const fetchInterestedCard = useCallback(async () => {
    try {
      const myProfile = await getMyProfile();
      const myId = myProfile.data.memberId;
      const response = await getInterestedCard(myId, interestedCardPage, 12);
      setInterestedCards(response.data.cards);
      setInterestedCardTotalPages(Math.ceil(response.data.totalResources / 12));
    } catch (error) {
      console.error('관심카드를 가져오는 중 오류가 발생했습니다:', error);
    }
  }, [interestedCardPage]);

  useEffect(() => {
    fetchPopularCard();
  }, [fetchPopularCard, popularCardPage, order]);

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards, myCardPage]);

  useEffect(() => {
    fetchInterestedCard();
  }, [fetchInterestedCard, interestedCardPage]);

  const fontStyle = {
    fontSize: '44px',
    fontFamily: 'Gugi',
    marginBottom: '40px'
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
              width: '280px',
              maxHeight: 'calc(100vh - 100px)'
            }}
          >
            <Category />
          </Box>
        </Grid>
        <Grid item xs={9}>
          {/* 카드 목록 */}
          <Box sx={{ marginTop: '200px' }}>
            <Box display="flex" alignItems="center">
              <div style={fontStyle}>인기 카드 목록</div>
              <Select
                displayEmpty
                value={sort ? `${sort}-${order}` : ''}
                onChange={(event) => {
                  const [newSort, newOrder] = event.target.value.split('-');
                  setSort(newSort);
                  setOrder(newOrder);
                }}
                style={{
                  marginLeft: '40px',
                  marginBottom: '40px'
                }}
              >
                <MenuItem value="" disabled>
                  정렬순
                </MenuItem>
                <MenuItem value={'minPrice-ASC'}>최소 가격 낮은순</MenuItem>
                <MenuItem value={'minPrice-DESC'}>최소 가격 높은순</MenuItem>
                <MenuItem value={'maxPrice-ASC'}>최대 가격 낮은순</MenuItem>
                <MenuItem value={'maxPrice-DESC'}>최대 가격 높은순</MenuItem>
                <MenuItem value={'createdAt-DESC'}>최신순</MenuItem>
                <MenuItem value={'createdAt-ASC'}>오래된순</MenuItem>
              </Select>
            </Box>
            <Grid container spacing={2}>
              {/*아래는 인기 카드*/}

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
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}원
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item key={card.cardId}>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.category.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              marginTop="40px"
              marginBottom="60px"
            >
              <Pagination
                count={popularCardTotalPages}
                page={popularCardPage + 1}
                onChange={(_, page) => popularCardPageChange(page)}
              />
            </Box>

            <div style={fontStyle}>내 카드 목록</div>
            <Grid container spacing={2}>
              {/*아래는 내가 생성한 카드 가져오기*/}

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
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}원
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item key={card.cardId}>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.category.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              marginTop="40px"
              marginBottom="60px"
            >
              <Pagination
                count={myCardTotalPages}
                page={myCardPage + 1}
                onChange={(_, page) => myCardPageChange(page)}
              />
            </Box>

            <div style={fontStyle}>관심 카드 목록</div>
            <Grid container spacing={2}>
              {/*아래는 관심카드 가져오기*/}

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
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}원
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item key={card.cardId}>
                    <CardMaker
                      cardId={card.cardId}
                      title={card.title}
                      imageUrl={card.category.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              marginTop="40px"
              marginBottom="60px"
            >
              <Pagination
                count={interestedCardTotalPages}
                page={interestedCardPage + 1}
                onChange={(_, page) => interestedCardPageChange(page)}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
