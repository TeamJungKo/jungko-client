import { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Category from '../components/common/Category';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import { getPopularCard } from '../api/axios.custom';
import {Card} from '../types/types';

function CategoryPage() {
  const [popularCards, setPopularCards] = useState<Card[]>([]);
  //const { categoryId } = useParams();
  //const categoryIdNumber = Number(categoryId);
  //const [_, _setMyCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchPopularCard = async () => {
      try {
        const response = await getPopularCard(0, 5); // categoryIdNumber 파라미터 추가
        const { cards } = response.data;
        console.log(cards); //지울것 (테스트용)
        setPopularCards(cards);
      } catch (error) {
        console.error('인기 카드를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPopularCard();
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
          <Box sx={{ marginTop: '200px', marginBottom: '50%' }}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
