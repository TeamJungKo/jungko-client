import { useState, useEffect, ChangeEvent, useRef } from 'react';
import {
  Avatar,
  ButtonBase,
  Box,
  Typography,
  Button,
  Divider,
  Switch,
  IconButton,
  TextField
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardMaker from '../components/common/CardMaker';
import NavigationBar from '../components/common/NavigationBar';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import KeywordMaker from '../components/common/KeywordMaker';
import Add from '@mui/icons-material/Add';
import {
  getMyProfile,
  getMyCard,
  updateMyProfile,
  deleteCard,
  changeCardOption,
  unlikeCard,
  getInterestedCard,
  getMyKeywords,
  deleteKeywords,
  createKeywords,
  changeNoticeSetting,
  unregisterUser
} from '../api/axios.custom';
import { Card, Keyword } from '../types/types';
import {
  requestFCMAndGetDeviceToken,
  deleteFCMToken
} from '../firebase-messaging-sw';

function MyProfile() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [myCards, setMyCards] = useState<Card[]>([]); // api로 받은 내카드
  const [myInterestedCards, setMyInterestedCards] = useState<Card[]>([]); // api로 받은 내 관심카드
  const [myKeywords, setMyKeywords] = useState<Keyword[]>([]); // api로 받은 내 키워드

  const [interestedCardPage, setInterestedCardPage] = useState(0);
  const [myCardPage, setMyCardPage] = useState(0);

  const [nickname, setNickname] = useState('닉네임'); // 닉네임
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 가능 상태

  const [newKeyword, setNewKeyword] = useState(''); // 새로운 키워드

  const [myCardTotalPages, setMyCardTotalPages] = useState(0);
  const [interestedCardTotalPages, setInterestedCardTotalPages] = useState(0);

  const [allMyCardsSelected, setAllMyCardsSelected] = useState(false);
  const [allInterestedCardsSelected, setAllInterestedCardsSelected] =
    useState(false);
  const [allKeywordsSelected, setAllKeywordsSelected] = useState(false);

  const [myProfileReload, setMyProfileReload] = useState(false);
  const [myCardReload, setMyCardReload] = useState(false);
  const [interestedCardReload, setInterestedCardReload] = useState(false);
  const [keywordReload, setKeywordReload] = useState(false);

  const myCardPageChange = (page: number) => {
    setMyCardPage(page - 1); //인덱스는 0부터이므로
  };

  const interestedCardPageChange = (page: number) => {
    setInterestedCardPage(page - 1); //인덱스는 0부터이므로
  };

  const handleNotificationToggle = async () => {
    // 알림이 비동의 상태일 때 동의로 바꾸는 함수
    // FCM firebase-messaging-sw.ts에 있는 코드를 실행하여 토큰을 발급받음.
    if (!isNotificationOn) {
      const token = await requestFCMAndGetDeviceToken();
      await changeNoticeSetting(token);
      alert('알림 수신 동의가 완료되었습니다.');
    } else {
      await deleteFCMToken();
      await changeNoticeSetting(null);
      alert('알림 수신 동의가 취소되었습니다.');
    }
    setIsNotificationOn(!isNotificationOn);
  };

  const handleNicknameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
  };

  const handleProfileImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    await updateMyProfile(null, file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setMyProfileReload((prevState) => !prevState);
  };

  const handleProfileImageClick = () => {
    fileInput.current?.click();
  };

  const toggleEdit = async () => {
    if (isEditing) {
      await updateMyProfile(nickname, null);
      setMyProfileReload((prevState) => !prevState);
    }
    setIsEditing(!isEditing); // 닉네임 수정 토글 핸들러
  };

  const toggleSelectCard = (id: number) => {
    setMyCards(
      myCards.map((card) =>
        card.cardId === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
    setAllMyCardsSelected(false);
  }; //내 카드 선택 토글러

  const selectAllObjects = (type: string) => {
    if (type === 'myCards') {
      setMyCards(myCards.map((card) => ({ ...card, isSelected: true })));
      setAllMyCardsSelected(true);
    } else if (type === 'interestedCards') {
      setMyInterestedCards(
        myInterestedCards.map((card) => ({ ...card, isSelected: true }))
      );
      setAllInterestedCardsSelected(true);
    } else if (type === 'keywords') {
      setMyKeywords(
        myKeywords.map((keyword) => ({ ...keyword, isSelected: true }))
      );
      setAllKeywordsSelected(true);
    }
  }; //전체 카드/키워드 선택

  const deselectAllObjects = (type: string) => {
    if (type === 'myCards') {
      setMyCards(myCards.map((card) => ({ ...card, isSelected: false })));
      setAllMyCardsSelected(false);
    } else if (type === 'interestedCards') {
      setMyInterestedCards(
        myInterestedCards.map((card) => ({ ...card, isSelected: false }))
      );
      setAllInterestedCardsSelected(false);
    } else if (type === 'keywords') {
      setMyKeywords(
        myKeywords.map((keyword) => ({ ...keyword, isSelected: false }))
      );
      setAllKeywordsSelected(false);
    }
  }; //전체 카드/키워드 선택 해제

  const deleteSelectedCards = async () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);

    const promises = selectedCardIds.map((id) => deleteCard(id));

    try {
      await Promise.all(promises); // 선택한 모든 카드가 삭제될 때까지 기다림
      setAllMyCardsSelected(false);
      setMyCardReload((prevState) => !prevState);
    } catch (error) {
      console.log('선택한 카드를 삭제하는 도중 오류가 발생했습니다:', error);
    }
  }; // 선택 카드 삭제

  const makeCardsPublic = async () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    const promises = selectedCardIds.map(async (id) => {
      const formData = new FormData();
      formData.append('scope', 'PUBLIC');
      return await changeCardOption(id, formData);
    });
    try {
      await Promise.all(promises);
      setMyCardReload((prevState) => !prevState);
    } catch (error) {
      console.log('선택한 카드의 공개 전환중 오류가 발생했습니다:', error);
    }
    setAllMyCardsSelected(false);
  }; // 선택 카드 공개 전환

  const makeCardsPrivate = async () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    const promises = selectedCardIds.map(async (id) => {
      const formData = new FormData();
      formData.append('scope', 'PRIVATE');
      return await changeCardOption(id, formData);
    });

    try {
      await Promise.all(promises);
      setMyCardReload((prevState) => !prevState);
    } catch (error) {
      console.log('선택한 카드의 비공개 전환중 오류가 발생했습니다:', error);
    }
    setAllMyCardsSelected(false);
  }; // 선택 카드 비공개 전환

  useEffect(() => {
    getMyCard(myCardPage, 8)
      .then((res) => {
        setMyCardTotalPages(Math.ceil(res.data.totalResources / 8));
        const completeCards = res.data.cards.map((card: any) => ({
          ...card,
          isSelected: false
        }));
        setMyCards(completeCards);
      })
      .catch((error) => {
        console.log(
          '내가 생성한 카드를 가져오는 도중 오류가 발생했습니다: ',
          error
        );
      });
  }, [myProfileReload, myCardReload, myCardPage]);

  const toggleSelectInterestedCard = (id: number) => {
    setMyInterestedCards(
      myInterestedCards.map((card) =>
        card.cardId === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
    setAllInterestedCardsSelected(false);
  }; //관심 카드 선택 토글러

  const unlikeInterestedCards = async () => {
    const selectedCardIds = myInterestedCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);

    const promises = selectedCardIds.map((id) => unlikeCard(id));

    try {
      await Promise.all(promises);
      setInterestedCardReload((prevState) => !prevState);
    } catch (error) {
      console.log('관심 카드를 해제하는 도중 오류가 발생했습니다: ', error);
    }
    setAllInterestedCardsSelected(false);
  }; // 선택한 관심 카드 해제

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setNickname(res.data.nickname);
        setImageUrl(res.data.imageUrl);
        setIsNotificationOn(res.data.notificationAgreement);
        getInterestedCard(res.data.memberId, interestedCardPage, 8)
          .then((response) => {
            setInterestedCardTotalPages(
              Math.ceil(response.data.totalResources / 8)
            );
            const completeCards = response.data.cards.map((card: any) => ({
              ...card,
              isSelected: false
            }));
            setMyInterestedCards(completeCards);
          })
          .catch((error) => {
            console.log(
              '관심 카드를 가져오는 도중 오류가 발생했습니다: ',
              error
            );
          });
      })
      .catch((error) => {
        console.log('내 프로필을 가져오는 도중 오류가 발생했습니다: ', error);
      });
  }, [interestedCardReload, interestedCardPage]);

  const toggleSelectKeyword = (text: string) => {
    setMyKeywords(
      myKeywords.map((keyword) =>
        keyword.keyword === text
          ? { ...keyword, isSelected: !keyword.isSelected }
          : keyword
      )
    );
    setAllKeywordsSelected(false);
  }; // 키워드 선택 토글러

  const deleteSelectedKeywords = async () => {
    const selectedKeywordIds = myKeywords
      .filter((keyword) => keyword.isSelected)
      .map((keyword) => keyword.keywordId);

    const promises = selectedKeywordIds.map((id) => deleteKeywords(id));

    try {
      await Promise.all(promises);
      setKeywordReload((prevState) => !prevState);
    } catch (error) {
      console.log('키워드를 삭제하는 도중 오류가 발생했습니다: ', error);
    }
    setAllKeywordsSelected(false);
  }; // 선택한 키워드를 삭제하는 함수

  const writeNewKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewKeyword(event.target.value);
  }; // 작성한 키워드를 newKeyword에저장

  const addKeyword = async () => {
    try {
      await createKeywords([newKeyword]);
      setKeywordReload((prevState) => !prevState);
    } catch (error) {
      console.log('키워드를 생성하는 도중 오류가 발생했습니다: ', error);
    }
    setAllKeywordsSelected(false);
  }; // newKeyword를 바탕으로 키워드 생성

  const handleUnregister = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      unregisterUser();
      window.location.href = 'http://localhost';
      alert('그동안 중코거래를 이용해주셔서 감사합니다.');
    }
  };

  useEffect(() => {
    getMyKeywords()
      .then((res) => {
        const completeKeywords = res.data.keywordList.map((keyword: any) => ({
          ...keyword,
          isSelected: false
        }));
        setMyKeywords(completeKeywords);
      })
      .catch((error) => {
        console.log('키워드를 가져오는 도중 오류가 발생했습니다: ', error);
      });
  }, [keywordReload]);

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
    alignItems: 'flex-start',
    marginTop: '50px',
    marginBottom: '35px',
    marginLeft: '16px'
  };

  const setting_space = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50px',
    paddingBottom: '50px',
    marginLeft: '16px'
  };

  return (
    <div
      style={{
        background: 'linear-gradient(white, skyblue)',
        width: '100%'
      }}
    >
      <Box>
        <NavigationBar reload={myProfileReload} />
        <Box sx={{ marginTop: '160px' }}>
          <Box sx={title_space}>
            <input
              type="file"
              hidden
              ref={fileInput}
              onChange={handleProfileImageChange}
            />
            <ButtonBase onClick={handleProfileImageClick}>
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
            </ButtonBase>
            {isEditing ? (
              <TextField value={nickname} onChange={handleNicknameChange} />
            ) : (
              <Typography fontSize={'50px'} fontFamily={'Jua'}>
                {nickname}
              </Typography>
            )}
            <IconButton onClick={toggleEdit}>
              <EditIcon sx={{ width: 50, height: 50, color: 'Black' }} />
            </IconButton>
          </Box>
          <Divider className="divider" />

          <Box sx={default_space}>
            <Typography
              sx={{ fontSize: '30px', fontFamily: 'Gugi', alignSelf: 'top' }}
            >
              내가 생성한 카드 (우클릭으로 선택)
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '16px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '15px'
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: allMyCardsSelected ? 'darkred' : 'green',
                    fontFamily: 'Noto Sans KR',
                    borderColor: allMyCardsSelected ? 'darkred' : 'green',
                    background: 'white'
                  }}
                  onClick={() => {
                    if (allMyCardsSelected) {
                      deselectAllObjects('myCards');
                    } else {
                      selectAllObjects('myCards');
                    }
                  }}
                >
                  {allMyCardsSelected
                    ? '페이지내 전체 해제'
                    : '페이지내 전체 선택'}
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '15px'
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: 'green',
                    marginRight: '15px',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'green',
                    background: 'white'
                  }}
                  onClick={makeCardsPublic}
                >
                  공개
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'darkred',
                    marginRight: '15px',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'darkred',
                    background: 'white'
                  }}
                  onClick={makeCardsPrivate}
                >
                  비공개
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: 'red',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'red',
                    background: 'white'
                  }}
                  onClick={deleteSelectedCards}
                >
                  삭제
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              gap: '16px'
            }}
          >
            {/* 생성한 카드들 */}

            {myCards.map((card, index) => {
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
                <div
                  key={card.cardId}
                  style={index === 0 ? { marginLeft: '16px' } : {}}
                >
                  <CardMaker
                    cardId={card.cardId}
                    imageUrl={card.category.imageUrl}
                    title={card.title}
                    description={description}
                    isOpen={card.scope}
                    isSelected={card.isSelected}
                    onContextMenu={(event: React.MouseEvent) => {
                      event.preventDefault();
                      toggleSelectCard(card.cardId);
                    }}
                  />
                </div>
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
              count={myCardTotalPages}
              page={myCardPage + 1}
              onChange={(_, page) => myCardPageChange(page)}
            />
          </Box>
          <Divider className="divider" />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              관심 카드 (우클릭으로 선택)
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '15px'
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: allInterestedCardsSelected ? 'darkred' : 'green',
                  fontFamily: 'Noto Sans KR',
                  borderColor: allInterestedCardsSelected ? 'darkred' : 'green',
                  background: 'white'
                }}
                onClick={() => {
                  if (allInterestedCardsSelected) {
                    deselectAllObjects('interestedCards');
                  } else {
                    selectAllObjects('interestedCards');
                  }
                }}
              >
                {allInterestedCardsSelected
                  ? '페이지내 전체 해제'
                  : '페이지내 전체 선택'}
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'red',
                  marginLeft: '16px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={unlikeInterestedCards}
              >
                관심 해제
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              gap: '16px'
            }}
          >
            {/* 관심 카드들 */}

            {myInterestedCards.map((card, index) => {
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
                <div
                  key={card.cardId}
                  style={index === 0 ? { marginLeft: '16px' } : {}}
                >
                  <CardMaker
                    cardId={card.cardId}
                    imageUrl={card.category.imageUrl}
                    title={card.title}
                    description={description}
                    isOpen={card.scope}
                    isSelected={card.isSelected}
                    onContextMenu={(event: React.MouseEvent) => {
                      event.preventDefault();
                      toggleSelectInterestedCard(card.cardId);
                    }}
                  />
                </div>
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
              count={interestedCardTotalPages}
              page={interestedCardPage + 1}
              onChange={(_, page) => interestedCardPageChange(page)}
            />
          </Box>
          <Divider className="divider" />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              내가 추가한 키워드 (우클릭으로 선택)
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '15px'
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: allKeywordsSelected ? 'darkred' : 'green',
                  fontFamily: 'Noto Sans KR',
                  borderColor: allKeywordsSelected ? 'darkred' : 'green',
                  background: 'white'
                }}
                onClick={() => {
                  if (allKeywordsSelected) {
                    deselectAllObjects('keywords');
                  } else {
                    selectAllObjects('keywords');
                  }
                }}
              >
                {allKeywordsSelected ? '전체 해제' : '전체 선택'}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: 'red',
                  marginLeft: '16px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={deleteSelectedKeywords}
              >
                삭제
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            {/* 키워드들 */}

            {myKeywords.map((keyword, index) => (
              <div
                key={keyword.keywordId}
                style={index === 0 ? { marginLeft: '16px' } : {}}
              >
                <KeywordMaker
                  keyword={keyword.keyword}
                  isSelected={keyword.isSelected}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectKeyword(keyword.keyword);
                  }}
                />
              </div>
            ))}
            <TextField
              value={newKeyword}
              onChange={writeNewKeyword}
              placeholder="새 키워드"
              sx={{ marginLeft: '16px' }}
            />
            <IconButton sx={{ marginLeft: '10px' }} onClick={addKeyword}>
              <Add sx={{ color: 'Black' }} />
            </IconButton>
          </Box>
          <Divider className="divider" />

          <Box sx={setting_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              설정
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '35px'
              }}
            >
              <Typography sx={{ fontSize: '20px', fontFamily: 'Jua' }}>
                전체 알림
              </Typography>
              <Switch
                sx={{ marginLeft: '20px' }}
                checked={isNotificationOn}
                onChange={handleNotificationToggle}
              />
              <Typography
                sx={{ fontSize: '20px', fontFamily: 'Jua', marginLeft: '10px' }}
              >
                {isNotificationOn ? 'ON' : 'OFF'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '30px'
              }}
            >
              <Typography sx={{ fontSize: '20px', fontFamily: 'Jua' }}>
                회원탈퇴
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: 'red',
                  fontSize: '16px',
                  fontFamily: 'Noto Sans KR',
                  marginLeft: '25px',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={handleUnregister}
              >
                회원탈퇴
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MyProfile;
