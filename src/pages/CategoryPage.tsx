import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Category from '../components/common/Category';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import { getPopularCard } from '../api/axios.custom';
import { Card } from '../types/types';

function CategoryPage() {
  const [popularCards, setPopularCards] = useState<Card[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const categoryId = Number(id);
  const [sort, setSort] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);

  const pageChange = (page: number) => {
    setPage(page - 1); //인덱스는 0부터이므로
  };

  useEffect(() => {
    const fetchPopularCard = async () => {
      try {
        const response = await getPopularCard(page, 48, categoryId);

        setTotalPages(Math.ceil(response.data.totalResources / 48));
        const { cards } = response.data;

        setPopularCards(cards);
      } catch (error) {
        console.error('인기 카드를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPopularCard();
  }, [categoryId, page, order, sort]);

  const fontStyle = {
    fontSize: '44px',
    fontFamily: 'Gugi'
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
              height: 'calc(100vh - 100px)'
            }}
          >
            <Category />
          </Box>
        </Grid>

        <Grid item xs={9}>
          {/* 카드 목록 */}
          <Box
            sx={{
              marginTop: '200px',
              marginBottom: '10%',
              minHeight: `calc(100vh - 297px)`
            }}
          >
            <Box display="flex" alignItems="center" marginBottom={2}>
              <div style={fontStyle}>인기 카드 목록</div>
              <Select
                displayEmpty
                value={sort ? `${sort}-${order}` : ''}
                onChange={(event) => {
                  const [newSort, newOrder] = event.target.value.split('-');
                  setSort(newSort);
                  setOrder(newOrder);
                }}
                style={{ marginLeft: '40px' }}
              >
                <MenuItem value="" disabled>
                  정렬순
                </MenuItem>
                <MenuItem value={'minprice-ASC'}>낮은가격순</MenuItem>
                <MenuItem value={'maxprice-DESC'}>높은가격순</MenuItem>
                <MenuItem value={'createdAt-DESC'}>최신순</MenuItem>
                <MenuItem value={'createdAt-ASC'}>오래된순</MenuItem>
              </Select>
            </Box>

            <Grid container spacing={2}>
              {/*해당 카테고리의 카드*/}
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
                  <Grid
                    item
                    key={card.cardId}
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    <CardMaker
                      title={card.title}
                      imageUrl={card.category.imageUrl}
                      description={description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(_, page) => pageChange(page)}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
