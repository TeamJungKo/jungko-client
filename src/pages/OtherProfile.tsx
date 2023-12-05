import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Pagination from '@mui/material/Pagination';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import KeywordMaker from '../components/common/KeywordMaker';
import {
  getMemberCard,
  getMembersProfile,
  likeCard,
  getMemberKeywords,
  createKeywords
} from '../api/axios.custom';
import { CardResponse, KeywordListResponse } from '../types/types';

function OtherProfile() {
  const { id: memberIdString } = useParams<{ id: string }>();
  const memberId = Number(memberIdString);

  const [cards, setCards] = useState<CardResponse['cards']>([]);
  const [keywords, setKeywords] = useState<KeywordListResponse['keywordList']>(
    []
  );
  const [isSelectedCard, setIsSelectedCard] = useState<boolean[]>([]);
  const [isSelectedKeyword, setIsSelectedKeyword] = useState<boolean[]>([]);
  const [nickname, setNickname] = useState('닉네임');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cardPage, setCardPage] = useState(0);
  const [totalCardPage, setTotalCardPage] = useState(0);
  const [keywordsForAddition, setKeywordsForAddition] = useState<string[]>([]);

  const cardPageChange = (page: number) => {
    setCardPage(page - 1); //인덱스는 0부터이므로
  };

  const selectCard = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    const selectedCards = [...isSelectedCard];
    selectedCards[index] = !selectedCards[index];
    setIsSelectedCard(selectedCards);
  };

  const selectKeyword = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    const selectedKeywords = [...isSelectedKeyword];
    selectedKeywords[index] = !selectedKeywords[index];
    setIsSelectedKeyword(selectedKeywords);
  };

  const addToInterestedCard = () => {
    const selectedCardExists = isSelectedCard.some((isSelected) => isSelected);
    if (!selectedCardExists) {
      alert('선택된 카드가 없습니다.');
      return;
    }

    const promises = isSelectedCard
      .filter((isSelected) => isSelected)
      .map((_, index) => likeCard(cards[index].cardId));

    Promise.all(promises)
      .then(() => alert(`관심 카드에 추가되었습니다.`))
      .catch((error) =>
        console.log('관심 카드에 추가하는 도중 오류가 발생했습니다: ', error)
      );
  };

  const addToMyKeyword = () => {
    const selectedKeywordExists = isSelectedKeyword.some(
      (isSelected) => isSelected
    );
    if (!selectedKeywordExists) {
      alert('선택된 키워드가 없습니다.');
      return;
    }

    isSelectedKeyword.forEach((isSelected, index) => {
      if (isSelected) {
        setKeywordsForAddition((prevKeywords) => [
          ...prevKeywords,
          keywords[index].keyword
        ]);
      }
    });
  };

  useEffect(() => {
    if (keywordsForAddition.length > 0) {
      createKeywords(keywordsForAddition)
        .then(() => alert(`내 키워드에 추가되었습니다.`))
        .catch((error) =>
          console.log('내 키워드로 추가하는 도중 오류가 발생했습니다: ', error)
        );
    }
  }, [keywordsForAddition]);

  useEffect(() => {
    getMembersProfile(memberId)
      .then((res) => {
        setNickname(res.data.nickname);
        setImageUrl(res.data.imageUrl);
      })
      .catch((error) => {
        console.log(
          '유저의 프로필을 가져오는 도중 오류가 발생했습니다: ',
          error
        );
      });
  }, [memberId]);

  useEffect(() => {
    getMemberCard(memberId, cardPage, 8)
      .then((res) => {
        setTotalCardPage(Math.ceil(res.data.totalResources / 8));
        setCards(res.data.cards);
        setIsSelectedCard(new Array(res.data.cards.length).fill(false));
      })
      .catch((error) => {
        console.log('유저의 카드를 가져오는 도중 오류가 발생했습니다: ', error);
      });
  }, [memberId, cardPage]);

  useEffect(() => {
    getMemberKeywords(memberId)
      .then((res) => {
        setKeywords(res.data.keywordList);
        setIsSelectedKeyword(
          new Array(res.data.keywordList.length).fill(false)
        );
      })
      .catch((error) => {
        console.log(
          '유저의 키워드를 가져오는 도중 오류가 발생했습니다: ',
          error
        );
      });
  }, [memberId]);

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
        minHeight: 'calc(100vh - 160px)'
      }}
    >
      <Box sx={{ marginTop: '160px' }}>
        <NavigationBar />
        <Box>
          <Box sx={title_space}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginRight: '30px',
                color: 'black'
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ width: 80, height: 80, backgroundColor: 'darkgrey' }}
                />
              )}
            </Avatar>
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
              onClick={addToInterestedCard}
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

            {cards.map((card, index) => {
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
                <CardMaker
                  key={card.cardId}
                  cardId={card.cardId}
                  title={card.title}
                  imageUrl={card.category.imageUrl}
                  description={description}
                  onContextMenu={selectCard(index)}
                  isSelected={isSelectedCard[index]}
                />
              );
            })}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            marginTop={4}
            marginBottom={2}
          >
            <Pagination
              count={totalCardPage}
              page={cardPage + 1}
              onChange={(_, page) => cardPageChange(page)}
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
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'blue',
                  background: 'white'
                }}
                onClick={addToMyKeyword}
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
              gap: '16px',
              paddingBottom: '200px',
              flexWrap: 'wrap'
            }}
          >
            {/*타 유저의 키워드 박스들 */}

            {keywords.map((keyword, index) => (
              <KeywordMaker
                key={keyword.keywordId}
                keyword={keyword.keyword}
                onContextMenu={selectKeyword(index)}
                isSelected={isSelectedKeyword[index]}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default OtherProfile;
