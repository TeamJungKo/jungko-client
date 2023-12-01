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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';



// 추후 interested -> myInterested
//      cards -> myCard
//      keywords -> myKeywords
//로 변환하는 작업이 필요합니다. 지금 더미데이터를 위해 이 작업은 미뤄두었습니다.

function MyProfile() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [myCards, setMyCards] = useState<Card[]>([]); // api로 받은 내카드
  const [myInterestedCards, setMyInterestedCards] = useState<Card[]>([]); // api로 받은 내 관심카드
  const [myKeywords, setMyKeywords] = useState<Keyword[]>([]); // api로 받은 내 키워드

  const [interestedCardPage, setInterestedCardPage] = useState(0);
  const [myCardPage, setMyCardPage] = useState(0);

  const [nickname, setNickname] = useState('닉네임'); // 닉네임 상태값 추가
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 가능 상태값 추가
  const [email, setEmail] = useState('이메일'); // 기존 이메일

  const [newKeyword, setNewKeyword] = useState(''); // 새로운 키워드 상태값 추가

  const scrollMyCard = (direction: string) => {
    // direction이 'right'일 경우
    if (direction === 'right') {
      setMyCardPage(myCardPage => myCardPage + 1);
    }
    // direction이 'left'일 경우
    else if (direction === 'left') {

      if (myCardPage > 0) {
        setMyCardPage(myCardPage => myCardPage - 1);
        console.log("살려주세요",myCardPage);
      }
      console.log("살려ㅇㅈ어",myCardPage);
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
    console.log(isNotificationOn);
  };

  const handleNicknameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
    await updateMyProfile(newNickname, null);
  };

  const handleProfileImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    await updateMyProfile(null, file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const handleProfileImageClick = () => {
    fileInput.current?.click();
  };

  const toggleEdit = () => {
    // 닉네임 수정 토글 핸들러
    setIsEditing(!isEditing);
    if (isEditing) {
      window.location.reload();
    }
    setIsEditing(!isEditing);
  };

  const toggleSelectCard = (id: number) => {
    setMyCards(
      myCards.map((card) =>
        card.cardId === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
  }; //내 카드 선택 토글러

  const selectAllCards = (type: string) => {
    if (type === 'myCards') {
      setMyCards(
        myCards.map((card) =>
          ({ ...card, isSelected: true })
        )
      );
    } else if (type === 'interestedCards') {
      setMyInterestedCards(
        myInterestedCards.map((card) =>
          ({ ...card, isSelected: true })
        )
      );
    }
  };//전체 카드 선택
  
  const deselectAllCards = (type: string) => {
    if (type === 'myCards') {
      setMyCards(
        myCards.map((card) =>
          ({ ...card, isSelected: false })
        )
      );
    } else if (type === 'interestedCards') {
      setMyInterestedCards(
        myInterestedCards.map((card) =>
          ({ ...card, isSelected: false })
        )
      );
    }
  };//전체 카드 선택 해제
  

  const toggleSelectInterestedCard = (id: number) => {
    setMyInterestedCards(
      myInterestedCards.map((card) =>
        card.cardId === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
  }; //관심 카드 선택 토글러

  const deleteSelectedCards = () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    selectedCardIds.forEach((id) => {
      deleteCard(id);
    });
    setMyCards(myCards.filter((card) => !card.isSelected)); //뷰 테스트용 삭제
  };
  // 선택 카드 삭제

  const makeCardsPublic = () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    selectedCardIds.forEach((id) => {
      const formData = new FormData();
      formData.append('scope', 'public');
      changeCardOption(id, formData);
    });
    setMyCards(
      myCards.map((card) =>
        card.isSelected ? { ...card, isOpen: 'public' } : card
      )
    ); //뷰 테스트용 공개
  }; // 선택 카드 공개전환

  const makeAllCardsPublic = () => {
    myCards.forEach((card) => {
      const formData = new FormData();
      formData.append('scope', 'public');
      changeCardOption(card.cardId, formData);
    });
    setMyCards(myCards.map((card) => ({ ...card, isOpen: 'public' }))); //뷰 테스트용 전체공개
  }; // 전체 카드 공개전환

  const makeCardsPrivate = () => {
    const selectedCardIds = myCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    selectedCardIds.forEach((id) => {
      const formData = new FormData();
      formData.append('scope', 'private');
      changeCardOption(id, formData);
    });
    setMyCards(
      myCards.map((card) =>
        card.isSelected ? { ...card, isOpen: 'private' } : card
      )
    ); //뷰 테스트용 비공개
  }; // 선택 카드 비공개전환

  const SelectInterestedCard = (id: number) => {
    setMyInterestedCards(
      myInterestedCards.map((card) =>
        card.cardId === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
  }; // 관심 카드 선택 토글러

  const unlikeInterestedCards = () => {
    const selectedCardIds = myInterestedCards
      .filter((card) => card.isSelected)
      .map((card) => card.cardId);
    selectedCardIds.forEach((id) => {
      unlikeCard(id);
    });
    setMyInterestedCards(myInterestedCards.filter((card) => !card.isSelected)); //뷰 테스트용 관심해제
  }; // 선택한 관심 카드 삭제

  const toggleSelectKeyword = (text: string) => {
    setMyKeywords(
      myKeywords.map((keyword) =>
        keyword.keyword === text
          ? { ...keyword, isSelected: !keyword.isSelected }
          : keyword
      )
    );
  }; // 키워드 선택 토글러

  const deleteSelectedKeywords = () => {
    const selectedKeywordIds = myKeywords
      .filter((keyword) => keyword.isSelected)
      .map((keyword) => keyword.keywordId);
    selectedKeywordIds.forEach((id) => {
      deleteKeywords(id);
    });
    setMyKeywords(myKeywords.filter((keyword) => !keyword.isSelected)); // 뷰 테스트용 키워드 삭제
  }; // 선택한 키워드를 삭제하는 함수

  const handleNewKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewKeyword(event.target.value);
  }; // 새 키워드 작성 핸들러

  const handleUnregister = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      unregisterUser();
      window.location.href = 'http://localhost';
      alert('그동안 이용해주셔서 감사합니다.');
    }
  };

  useEffect(() => {
    getMyProfile()
    .then((res) => {
      setNickname(res.data.nickname);
      setEmail(res.data.email);
      setImageUrl(res.data.imageUrl);
      setIsNotificationOn(res.data.notificationAgreement);
      getInterestedCard(res.data.memberId,interestedCardPage,6)
        .then((response) => {
          const completeCards = response.data.cards.map((card: any) => ({
            ...card,
            isSelected: false
          }));
          setMyInterestedCards(completeCards);
          console.log("가져온 관심카드 개수: ",response.data.totalResources);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

    getMyCard(myCardPage,6)
    .then((res) => {
      const completeCards = res.data.cards.map((card: any) => ({
        ...card,
        isSelected: false
      }));
      setMyCards(completeCards);
      console.log("페이지넘버: ",myCardPage);
      console.log("가져온 내카드 개수: ",res.data.totalResources);
    })
    .catch((err) => {
      console.log(err);
    });

    getMyKeywords()
    .then((res) => {
      const completeKeywords = res.data.keywordList.map((keyword: any) => ({
        ...keyword,
        isSelected: false,
      }));
      setMyKeywords(completeKeywords);
      console.log("가져온 키워드 개수: ",res.data.keywordList.length);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [myCardPage, interestedCardPage]);

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
    marginBottom: '35px'
  };

  const setting_space = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50px',
    paddingBottom: '50px'
  };

  return (
    <div
      style={{
        background: 'linear-gradient(white, skyblue)',
        width: '100%'
      }}
    >
      <Box>
        <NavigationBar />
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
              <TextField
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={toggleEdit} // 수정을 완료하면 토글
              />
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
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi', alignSelf: 'top'}}>
              내가 생성한 카드
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
              <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'darkgreen',
                    marginRight: '15px',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'green',
                    background: 'white',
                  }}
                  onClick={() => selectAllCards("myCards")}
                >
                  전체선택
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'darkred',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'red',
                    background: 'white',
                  }}
                  onClick={() => myCards.forEach(card => toggleSelectCard(card.cardId))}
                >
                  전체해제
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'darkgreen',
                    marginRight: '15px',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'green',
                    background: 'white',
                  }}
                  onClick={() => deselectAllCards("myCards")}
                >
                  공개
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'darkred',
                    fontFamily: 'Noto Sans KR',
                    borderColor: 'red',
                    background: 'white',
                  }}
                  onClick={makeCardsPrivate}
                >
                  비공개
                </Button>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  color: 'darkred',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white',
                }}
                onClick={deleteSelectedCards}
              >
                삭제
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
            <IconButton 
              sx={{alignSelf:'center', height:'100px', width:'100px'}}
              onClick={() => scrollMyCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>
            {/* 생성한 카드들 */}

            <CardMaker
                  cardId={1}
                  isOpen={"public"}
                  isSelected={false}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectCard(1);
                  }}
            />

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
              );
            })} 

            <IconButton 
              onClick={() => scrollMyCard('right')}
              sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'36px'}}>
              <ArrowCircleRightIcon style={{ fontSize: 60 }} />
            </IconButton>
          </Box>
          <Divider className="divider" />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              관심 카드
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: 'darkred',
                fontFamily: 'Noto Sans KR',
                borderColor: 'red',
                background: 'white'
              }}
              onClick={unlikeInterestedCards}
            >
              선택삭제
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
              onClick={() => scrollInterestedCard('left')}>
              <ArrowCircleLeftIcon style={{ fontSize: 60 }} />
            </IconButton>

            {/* 관심 카드들 */}
            <CardMaker
              onContextMenu={(event: React.MouseEvent) => {
                event.preventDefault();
              }}
            />
            
            {myInterestedCards.map((card) => {
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
              );
            })} 

            <IconButton 
              onClick={() => scrollInterestedCard('right')}
              sx={{alignSelf:'center', height:'100px', width:'100px', marginLeft:'36px'}}>
              <ArrowCircleRightIcon style={{ fontSize: 60 }} />
            </IconButton>
          </Box>
          <Divider className="divider" />

          <Box sx={default_space}>
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              내가 추가한 키워드
            </Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: 'darkred',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={deleteSelectedKeywords}
              >
                선택삭제
              </Button>

            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {/* 키워드 박스들 */}
            <KeywordMaker
                  keyword={"가나다"}
                  isSelected={false}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectKeyword("가나다");
                  }}
            />
            <KeywordMaker
                  keyword={"aaa"}
                  isSelected={false}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectKeyword("aaa");
                  }}
            />

            {myKeywords.map(
              (
                keyword // 실제 api로부터 가져오는 키워드
              ) => (
                <KeywordMaker
                  keyword={keyword.keyword}
                  isSelected={keyword.isSelected}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectKeyword(keyword.keyword);
                  }}
                />
              )
            )}
            <TextField
              value={newKeyword}
              onChange={handleNewKeywordChange}
              placeholder="새 키워드"
            />
            <IconButton sx={{ marginLeft: '10px' }} onClick={() => createKeywords([newKeyword])}>
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
