import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Category from '../components/common/Category';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import { getPopularCard, getMyCard } from '../api/axios.custom';

interface Card {
  cardId: number;
  title: string;
  keyword: string;
  minPrice: number;
  maxPrice: number;
  scope: string;
  createdAt: string;
  author: {
    memberId: number;
    nickname: string;
    imageUrl: string;
    email: string;
  };
  area: {
    sido: {
      name: string;
      code: string;
      sigg: {
        name: string;
        code: string;
        emd?: {
          name: string;
          code: string;
        };
      };
    };
  };

  category: {
    categoryId: number;
    name: string;
    level: number;
    subCategory?: {
      categoryId: number;
      name: string;
      level: number;
      subCategory?: {
        categoryId: number;
        name: string;
        level: number;
      };
    };
  };
}

function HomePage() {
  const [popularCards, setPopularCards] = useState<Card[]>([]);
  const [myCards, setMyCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchPopularCard = async () => {
      try {
        const response = await getPopularCard(0, 5);
        const { cards } = response.data;

        console.log(cards); //지울것 (테스트용)
        setPopularCards(cards);
      } catch (error) {
        console.error('인기 카드를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    const fetchMyCards = async () => {
      try {
        const response = await getMyCard(0, 4);
        const { cards } = response.data;
        setMyCards(cards);
      } catch (error) {
        console.error('내 카드를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPopularCard();
    fetchMyCards();
  }, []);

  const fontStyle = {
    fontSize: '44px',
    fontFamily: 'Gugi',
    marginTop: '60px',
    marginBottom: '30px'
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
          <Box sx={{ marginTop: '200px', marginBottom: '40px' }}>
            <div style={fontStyle}>인기 카드 목록</div>
            <Grid container spacing={2}>
              {' '}
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
                let sigg = card.area.sido.sigg;
                while (sigg && sigg.emd) {
                  area += ' > ' + sigg.name;
                  sigg = sigg.emd;
                }

                // description을 설정합니다.
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item key={card.cardId}>
                    <CardMaker
                      title={card.title}
                      image={card.author.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <div style={fontStyle}>내 카드 목록</div>
            <Grid container spacing={2}>
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
                let sigg = card.area.sido.sigg;
                while (sigg && sigg.emd) {
                  area += ' > ' + sigg.name;
                  sigg = sigg.emd;
                }

                // description을 설정합니다.
                const description = `가격: ${card.minPrice} ~ ${card.maxPrice}
                카테고리: ${category}
                지역: ${area}`;

                return (
                  <Grid item key={card.cardId}>
                    <CardMaker
                      title={card.title}
                      image={card.author.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <div style={fontStyle}>관심 카드 목록</div>
            <Grid container spacing={2}>
              <Grid item>
                <CardMaker />
              </Grid>
              <Grid item>
                <CardMaker />
              </Grid>
              <Grid item>
                <CardMaker />
              </Grid>
              <Grid item>
                <CardMaker />
              </Grid>
              <Grid item>
                <CardMaker />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
