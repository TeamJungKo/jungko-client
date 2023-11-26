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
import { getMyProfile, getMyCard, updateMyProfile, deleteCard, changeCardOption, unlikeCard, getInterestedCard, getMyKeywords, deleteKeywords, createKeywords, changeNoticeSetting, unregisterUser } from '../api/axios.custom';
import {Card, Keyword} from '../types/types';



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
  const [myKeywords, setMyKeywords] = useState<Keyword[]>([]); // api로 받은 내 관심카드

  const [nickname, setNickname] = useState('닉네임'); // 닉네임 상태값 추가
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 가능 상태값 추가
  const [email, setEmail] = useState('이메일'); // 기존 이메일

  const [cards, setCards] = useState([
    { id: 1, isOpen: 'public', isSelected: false },
    { id: 2, isOpen: 'public', isSelected: false },
    { id: 3, isOpen: 'private', isSelected: false },
    { id: 4, isOpen: 'private', isSelected: false }
  ]); //카드 선택 상태값 추가

  const [interestedCards, setInterestedCards] = useState([
    { id: 1, isOpen: 1, isSelected: false },
    { id: 2, isOpen: 1, isSelected: false },
    { id: 3, isOpen: 2, isSelected: false },
    { id: 4, isOpen: 2, isSelected: false }
  ]); // 관심 카드 상태값 추가

  const [keywords, setKeywords] = useState([
    { id: 1, text: '검정바지', isSelected: false, isOpen: true },
    { id: 2, text: '흰둥이', isSelected: false, isOpen: true },
    { id: 3, text: '아이유', isSelected: false, isOpen: true },
    { id: 4, text: '당근', isSelected: false, isOpen: true }
  ]); // 키워드 선택 상태값 추가

  const [newKeyword, setNewKeyword] = useState(''); // 새로운 키워드 상태값 추가

  const handleNotificationToggle = () => {
    setIsNotificationOn(!isNotificationOn);
    console.log(isNotificationOn);
    changeNoticeSetting();  //전체알림 On/Off 토글 api연결
  }

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
    updateMyProfile(newNickname, email, null);
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        updateMyProfile(nickname, email, base64String);
      };
      reader.readAsDataURL(file);
    }
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
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
  }; //카드 선택 토글러

  const deleteSelectedCards = () => {
    const selectedCardIds = cards.filter((card) => card.isSelected).map((card) => card.id);
    selectedCardIds.forEach((id) => {
      deleteCard(id);
    });
    setCards(cards.filter((card) => !card.isSelected)); //뷰 테스트용 삭제
  };
   // 선택 카드 삭제

  const makeCardsPublic = () => {
    const selectedCardIds = cards.filter((card) => card.isSelected).map((card) => card.id);
    selectedCardIds.forEach((id) => {
      const formData = new FormData();
      formData.append('scope', 'public');
      changeCardOption(id, formData);
    });
    setCards(
      cards.map((card) => (card.isSelected ? { ...card, isOpen: 'public' } : card))
    );  //뷰 테스트용 공개
  }; // 선택 카드 공개전환

  const makeAllCardsPublic = () => {
    cards.forEach((card) => {
      const formData = new FormData();
      formData.append('scope', 'public');
      changeCardOption(card.id, formData);
    });
    setCards(cards.map((card) => ({ ...card, isOpen: 'public' }))); //뷰 테스트용 전체공개
  }; // 전체 카드 공개전환

  const makeCardsPrivate = () => {
    const selectedCardIds = cards.filter((card) => card.isSelected).map((card) => card.id);
    selectedCardIds.forEach((id) => {
      const formData = new FormData();
      formData.append('scope', 'private');
      changeCardOption(id, formData);
    });
    setCards(
      cards.map((card) => (card.isSelected ? { ...card, isOpen: 'private' } : card))
    );  //뷰 테스트용 비공개
  }; // 선택 카드 비공개전환

  const toggleSelectInterestedCard = (id: number) => {
    setInterestedCards(
      interestedCards.map((card) =>
        card.id === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );
  }; // 관심 카드 선택 토글러

  const deleteSelectedInterestedCards = () => {
    const selectedCardIds = 
      interestedCards.filter((card) => card.isSelected).map((card) => card.id);
    selectedCardIds.forEach((id) => {
      unlikeCard(id);
    });
    setInterestedCards(interestedCards.filter((card) => !card.isSelected)); //뷰 테스트용 관심해제
  }; // 선택한 관심 카드 삭제

  const toggleSelectKeyword = (text: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.text === text
          ? { ...keyword, isSelected: !keyword.isSelected }
          : keyword
      )
    );
  }; // 키워드 선택 토글러

  const deleteSelectedKeywords = () => {
    const selectedKeywordIds = 
      keywords.filter((keyword) => keyword.isSelected).map((keyword) => keyword.id);
    selectedKeywordIds.forEach((id) => {
      deleteKeywords(id);
    });
    setKeywords(keywords.filter((keyword) => !keyword.isSelected));// 뷰 테스트용 키워드 삭제
  }; // 선택한 키워드를 삭제하는 함수

  const makeKeywordsPublic = () => {
    /* 아직 키워드 옵션 변경 api가 없음..!
    const selectedKeywordIds = keywords.filter((keyword) => keyword.isSelected).map((keyword) => keyword.id);
    selectedKeywordIds.forEach((id) => {
      let formData = new FormData();
      formData.append('scope', 'public');
      changeKeywordOption(id, formData);
    });*/
    setKeywords(
      keywords.map((keyword) =>
        keyword.isSelected ? { ...keyword, isOpen: true } : keyword
      ) //뷰에서만 키워드 퍼블릭화
    );
  }; // 선택 키워드 공개전환

  const makeAllKeywordsPublic = () => {
    /* 아직 키워드 옵션 변경 api가 없음..!
    keywords.forEach((keyword) => {
      let formData = new FormData();
      formData.append('scope', 'public');
      changeKeywordOption(id, formData);
    });*/
    setKeywords(keywords.map((keyword) => ({ ...keyword, isOpen: true })));
    //뷰에서만 전체키워드 퍼블릭화
  }; // 전체 키워드 공개전환

  const makeKeywordsPrivate = () => {
    /* 아직 키워드 옵션 변경 api가 없음..!
    const selectedKeywordIds = keywords.filter((keyword) => keyword.isSelected).map((keyword) => keyword.id);
    selectedKeywordIds.forEach((id) => {
      let formData = new FormData();
      formData.append('scope', 'private');
      changeKeywordOption(id, formData);
    });*/
    setKeywords(
      keywords.map((keyword) =>
        keyword.isSelected ? { ...keyword, isOpen: false } : keyword
      )
    );  //뷰에서만 키워드 프라이빗화
  }; // 선택 키워드 비공개전환

  const handleNewKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewKeyword(event.target.value);
  };  // 새 키워드 작성 핸들러

  const addKeyword = () => {
    setKeywords((prevKeywords) => [
      ...prevKeywords,
      { 
        id: prevKeywords.length > 0 ? prevKeywords[prevKeywords.length - 1].id + 1 : 1,
        text: newKeyword, 
        isSelected: false, 
        isOpen: false 
      }
    ]);
    createKeywords([newKeyword]);
    setNewKeyword('');
  }; // 키워드에 추가 속성을 부여하는 함수

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
        getInterestedCard(res.data.memberId)
          .then((response) => {
            const completeCards = response.data.cards.map((card: any) => ({
              ...card,
              isSelected: false
            }));
            setMyInterestedCards(completeCards);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    getMyCard()
      .then((res) => {
        const completeCards = res.data.cards.map((card: any) => ({
          ...card,
          isSelected: false
        }));
        setMyCards(completeCards);
      })
      .catch((err) => {
        console.log(err);
      });

    getMyKeywords()
      .then((res) => {
        const completeKeywords = res.data.keywordList.map((keyword: any) => ({
          ...keyword,
          isSelected: false,
          isOpen: false
        }));
        setMyKeywords(completeKeywords);
      })
      .catch((err) => {
        console.log(err);
      });

    // 다른 영역 클릭 시 모든 카드 선택 해제
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.divider')) {
        // 클릭한 요소가 Divider 내부인지 확인
        setCards(cards.map((card) => ({ ...card, isSelected: false })));
      }
    };

    // 클릭 이벤트 리스너 등록
    document.addEventListener('click', handleClick);

    // 컴포넌트 unmount 시 클릭 이벤트 리스너 해제
    return () => {
      document.removeEventListener('click', handleClick);
    };

  }, [cards]);

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

  const setting_space = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50px',
    paddingBottom: '50px'
  };

  // 카드 추가 함수 (ui구현은 안함)
  /*const addCard = () => {
    setCards((prevCards) => [...prevCards, { id: prevCards.length + 1, isOpen: 0 }]);
  };*/

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
            hidden ref={fileInput} 
            onChange={handleProfileImageChange} />
          <ButtonBase onClick={handleProfileImageClick}>
            <Avatar sx={{ width: 80, height: 80, marginRight: '30px', color:'black'}}>
              {imageUrl ? <img src={imageUrl} alt="profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} /> : <AccountCircleIcon sx={{ width: 80, height: 80, backgroundColor: 'darkgrey' }}/>}
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
            <Typography sx={{ fontSize: '30px', fontFamily: 'Gugi' }}>
              내가 생성한 카드
            </Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: 'darkred',
                  marginRight: '15px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={deleteSelectedCards}
              >
                선택삭제
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'darkgreen',
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
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={makeCardsPrivate}
              >
                비공개
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'darkgreen',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'green',
                  background: 'white'
                }}
                onClick={makeAllCardsPublic}
              >
                전체공개
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
            {/* 생성한 카드들 */}
            {cards.map(
              (
                card //샘플임
              ) => (
                <CardMaker
                  cardId={card.id}
                  isOpen={card.isOpen}
                  isSelected={card.isSelected}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectCard(card.id);
                  }}
                />
              )
            )}
            {myCards.map(
              (
                card //이부분이 api에서 가져온 "내 카드"들임
              ) => (
                <CardMaker
                  cardId={card.cardId}
                  isOpen={card.scope}
                  isSelected={false}
                  onContextMenu={(event: React.MouseEvent) => {
                    event.preventDefault();
                    toggleSelectCard(card.cardId);
                  }}
                />
              )
            )}
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
              onClick={deleteSelectedInterestedCards}
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
            {/* 관심 카드들 */}
            <CardMaker
              onContextMenu={(event: React.MouseEvent) => {
                event.preventDefault();
              }}
            />{' '}
            {/*시연용 이후 삭제할것*/}
            {interestedCards.map((card) => (  //샘플
              <CardMaker
                cardId={card.id}
                isOpen={'default'}
                isSelected={card.isSelected}
                onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                  toggleSelectInterestedCard(card.id);
                }}
              />
            ))}
            {myInterestedCards.map((card) => (  //api에서 호출한 진짜 관심카드
              <CardMaker
                cardId={card.cardId}
                isOpen={'default'}
                isSelected={false}
                onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                  toggleSelectInterestedCard(card.cardId);
                }}
              />
            ))}
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
                  marginRight: '15px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={deleteSelectedKeywords}
              >
                선택삭제
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'darkgreen',
                  marginRight: '15px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'green',
                  background: 'white'
                }}
                onClick={makeKeywordsPublic}
              >
                공개
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'darkred',
                  marginRight: '15px',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'red',
                  background: 'white'
                }}
                onClick={makeKeywordsPrivate}
              >
                비공개
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: 'darkgreen',
                  fontFamily: 'Noto Sans KR',
                  borderColor: 'green',
                  background: 'white'
                }}
                onClick={makeAllKeywordsPublic}
              >
                전체공개
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
            {keywords.map((keyword, ) => (  // 샘플임
              <KeywordMaker
                keyword={keyword.text}
                isSelected={keyword.isSelected}
                isOpen={keyword.isOpen} 
                onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                  toggleSelectKeyword(keyword.text);
                }}
              />
            ))}
            {myKeywords.map((keyword, ) => (  // 실제 api로부터 가져오는 키워드
              <KeywordMaker
                keyword={keyword.keyword}
                isSelected={false}
                isOpen={false}
                onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                  toggleSelectKeyword(keyword.keyword);
                }}
              />
            ))}
            <TextField
              value={newKeyword}
              onChange={handleNewKeywordChange}
              placeholder="새 키워드"
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
