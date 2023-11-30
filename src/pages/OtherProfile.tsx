import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Avatar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import KeywordMaker from '../components/common/KeywordMaker';
import { 
  getMemberCard, 
  getMembersProfile, 
  likeCard, 
  getMemberKeywords, 
  createKeywords } from '../api/axios.custom';
import { CardResponse, KeywordListResponse } from '../types/types';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function OtherProfile() {
  const { id: memberIdString } = useParams<{ id: string }>();
  const memberId = Number(memberIdString);

  const [cards, setCards] = useState<CardResponse['cards']>([]);
  const [keywords, setKeywords] = useState<KeywordListResponse['keywordList']>([]);
  const [isSelectedCard, setIsSelectedCard] = useState<boolean[]>([]);
  const [isSelectedKeyword, setIsSelectedKeyword] = useState<boolean[]>([]);
  const [nickname, setNickname] = useState('닉네임'); // 닉네임 상태값 추가
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cardPage, setCardPage] = useState(0);


  const scrollMemberCard = (direction: string) => {
    // direction이 'right'일 경우
    if (direction === 'right') {
      setCardPage(cardPage => cardPage + 1);
    }
    // direction이 'left'일 경우
    else if (direction === 'left') {
      // 페이지 번호가 음수가 되지 않도록 조건을 추가할 수 있습니다.
      if (cardPage > 0) {
        setCardPage(cardPage => cardPage - 1);
      }
    }
    console.log("받은 방향: ",direction," 이전 페이지: ",cardPage);
    // 다른 경우는 무시
  };

  const selectCard = 
    (index: number) => (event: React.MouseEvent) => {
      event.preventDefault(); // 기본 우클릭 메뉴가 나타나지 않도록 합니다.
      const selectedCards = [...isSelectedCard];
      selectedCards[index] = !selectedCards[index];
      setIsSelectedCard(selectedCards);
  };

  const selectKeyword =
    (index: number) => (event: React.MouseEvent) => {
      event.preventDefault(); // 기본 우클릭 메뉴가 나타나지 않도록 합니다.
      const selectedKeywords = [...isSelectedKeyword];
      selectedKeywords[index] = !selectedKeywords[index];
      setIsSelectedKeyword(selectedKeywords);
  };

  const addToInterestedCard = () => {
    const selectedCardExists = isSelectedCard.some(isSelected => isSelected);
    if (!selectedCardExists) {
      alert("선택된 카드가 없습니다.");
      return;
    }
    isSelectedCard.forEach((isSelected, index) => {
      if (isSelected) {
        likeCard(cards[index].cardId)
          .then(() => alert(`관심카드에 추가성공! 보내진 카드id: ${cards[index].cardId}`))
          .catch((error) => console.error(error));
      }
    });
  } 
  
  const addToMyKeyword = () => {
    const selectedKeywordExists = isSelectedKeyword.some(isSelected => isSelected);
    if (!selectedKeywordExists) {
      alert("선택된 키워드가 없습니다.");
      return;
    }
    isSelectedKeyword.forEach((isSelected, index) => {
      if (isSelected) {
        createKeywords([keywords[index].keyword])
          .then(() => 
            alert(`관심키워드에 추가성공! 보내진 키워드: ${keywords[index].keyword}`))
          .catch((error) => console.error(error));
      }
    });
  } 
  
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

  useEffect(() => {
    getMembersProfile(memberId)
      .then((res) => {
        console.log(res);
        setNickname(res.data.nickname);
        setImageUrl(res.data.imageUrl);
        console.log("이 멤버의 프로필: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getMemberCard(memberId,cardPage,6)
      .then((res) => {
        setCards(res.data.cards);
        // 카드의 개수와 동일한 크기의 isSelected 상태를 생성
        setIsSelectedCard(new Array(res.data.cards.length).fill(false));
        console.log("이 멤버의 카드개수: ", res.data.cards.length);
      })
      .catch((err) => {
        console.log(err);
      });

    getMemberKeywords(memberId)
      .then((res) => {
        setKeywords(res.data.keywordList);
        // 키워드의 개수와 동일한 크기의 isSelected 상태를 생성
        setIsSelectedKeyword(new Array(res.data.keywordList.length).fill(false));
        console.log("이 멤버의 키워드 개수: ", res.data.keywordList.length);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [memberId, cardPage]);

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
            <Avatar sx={{ width: 80, height: 80, marginRight: '30px', color:'black'}}>
              {imageUrl ? <img src={imageUrl} alt="profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} /> : <AccountCircleIcon sx={{ width: 80, height: 80, backgroundColor: 'darkgrey' }}/>}
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
            <IconButton 
              sx={{alignSelf:'center', height:'100px', width:'100px'}}
              onClick={() => scrollMemberCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>

            {/* 타 유저가 만든 카드들 */}

            <CardMaker
                cardId={1}
                onContextMenu={selectCard(1)}
                isSelected={isSelectedCard[1]}
            />
            <CardMaker
              cardId={2}
              onContextMenu={selectCard(2)}
              isSelected={isSelectedCard[2]}
            />

            {cards.length > 0 && cards.map((card, index) => (
              <CardMaker
                cardId={card.cardId}
                imageUrl={card.category.imageUrl}
                onContextMenu={selectCard(index)}
                isSelected={isSelectedCard[index]}
              />
            ))}

            <IconButton 
              onClick={() => scrollMemberCard('right')}
              sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'26px'}}>
              <ArrowCircleRightIcon style={{ fontSize: 60 }} />
            </IconButton>

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
              paddingBottom: '200px'
            }}
          >
            {/* 키워드 박스들 */}

            <KeywordMaker
              onContextMenu={selectKeyword(0)}
              isSelected={isSelectedKeyword[0]}
              keyword="검정바지"
            />
            <KeywordMaker
              onContextMenu={selectKeyword(1)}
              isSelected={isSelectedKeyword[1]}
              keyword="흰둥이"
            />
            <KeywordMaker
              onContextMenu={selectKeyword(2)}
              isSelected={isSelectedKeyword[2]}
              keyword="당근"
            />

            {keywords && keywords.length > 0 && keywords.map((keyword, index) => (
              <KeywordMaker 
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
