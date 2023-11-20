import { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Switch, IconButton, TextField } from '@mui/material';
import CardMaker from '../components/common/Card';
import Logo from '../components/common/Logo';
import EditIcon from '@mui/icons-material/Edit';
import DefaultProfile from '../components/common/DefaultProfile';
import Keyword from '../components/common/Keyword';
import Add from '@mui/icons-material/Add';

import Fab from '@mui/material/Fab';  //지울것
import TagIcon from '@mui/icons-material/Tag';  //지울것
import { getMyProfile } from '../api/axios.custom';

function MyProfile() {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [nickname, setNickname] = useState("닉네임"); // 닉네임 상태값 추가
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 가능 상태값 추가

  const [cards, setCards] = useState([
    { id: 1, isOpen: 1, isSelected: false },
    { id: 2, isOpen: 1, isSelected: false },
    { id: 3, isOpen: 2, isSelected: false },
    { id: 4, isOpen: 2, isSelected: false },
  ]); //카드 선택 상태값 추가

  const [favouriteCards, setFavouriteCards] = useState([
    { id: 1, isOpen: 1, isSelected: false },
    { id: 2, isOpen: 1, isSelected: false },
    { id: 3, isOpen: 2, isSelected: false },
    { id: 4, isOpen: 2, isSelected: false },
  ]); // 관심 카드 상태값 추가

  const [keywords, setKeywords] = useState([
    { text: "검정바지", isSelected: false, isOpen: true },
    { text: "흰둥이", isSelected: false, isOpen: true },
    { text: "아이유", isSelected: false, isOpen: true },
    { text: "당근", isSelected: false, isOpen: true },
  ]); // 키워드 선택 상태값 추가

  const [email, setEmail] = useState("wonjun@naver.com"); // 이메일 상태값 추가
  const [isEmailEditing, setIsEmailEditing] = useState(false); // 이메일 수정 가능 상태값 추가

  const [newKeyword, setNewKeyword] = useState(''); // 새로운 키워드 상태값 추가

  /*const [cards, setCards] = useState<{id: number, isOpen: number}[]>([]);*/ //이부분은 카드추가함수를 활성화시킬때 같이 활성화시켜주세요.

  const handleNotificationToggle = () => setIsNotificationOn(!isNotificationOn);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const toggleEdit = () => { // 닉네임 수정 토글 핸들러
    setIsEditing(!isEditing);
  };

  const toggleSelectCard = (id: number) => {
    setCards(cards.map(card => card.id === id ? {...card, isSelected: !card.isSelected} : card));
  }; //카드 선택 토글러

  const deleteSelectedCards = () => {
    setCards(cards.filter(card => !card.isSelected));
  };  // 선택 카드 삭제

  const makeCardsPublic = () => {
    setCards(cards.map(card => card.isSelected ? {...card, isOpen: 1} : card));
  };  // 선택 카드 공개전환

  const makeAllCardsPublic = () => {
    setCards(cards.map(card => ({...card, isOpen: 1})));
  };  // 전체 카드 공개전환

  const makeCardsPrivate = () => {
    setCards(cards.map(card => card.isSelected ? {...card, isOpen: 2} : card));
  };  // 선택 카드 비공개전환

  const toggleSelectFavouriteCard = (id: number) => {
    setFavouriteCards(favouriteCards.map(card => card.id === id ? {...card, isSelected: !card.isSelected} : card));
  }; // 관심 카드 선택 토글러

  const deleteSelectedFavouriteCards = () => {
    setFavouriteCards(favouriteCards.filter(card => !card.isSelected));
  }; // 선택한 관심 카드 삭제

  const toggleSelectKeyword = (text: string) => {
    setKeywords(keywords.map((keyword) => keyword.text === text ? {...keyword, isSelected: !keyword.isSelected} : keyword));
  }; // 키워드 선택 토글러

  const deleteSelectedKeywords = () => {
    setKeywords(keywords.filter(keyword => !keyword.isSelected));
  };  // 선택한 키워드를 삭제하는 함수

  const makeKeywordsPublic = () => {
    setKeywords(keywords.map(keyword => keyword.isSelected ? {...keyword, isOpen: true} : keyword));
  };  // 선택 키워드 공개전환

  const makeAllKeywordsPublic = () => {
    setKeywords(keywords.map(keyword => ({...keyword, isOpen: true})));
  };  // 전체 키워드 공개전환

  const makeKeywordsPrivate = () => {
    setKeywords(keywords.map(keyword => keyword.isSelected ? {...keyword, isOpen: false} : keyword));
  };  // 선택 키워드 비공개전환

  const handleNewKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => { // 새 키워드 변경 핸들러
    setNewKeyword(event.target.value);
  };

  const addKeyword = () => {
    setKeywords(prevKeywords => [...prevKeywords, { text: newKeyword, isSelected: false, isOpen: true }]);
    setNewKeyword(''); // 새 키워드 초기화
  };


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => { // 이메일 변경 핸들러
    setEmail(event.target.value);
  };

  const toggleEmailEdit = () => { // 이메일 수정 토글 핸들러
    setIsEmailEditing(!isEmailEditing);
  };

  useEffect(() => {
    getMyProfile().then((res) => {
      console.log(res);
      setNickname(res.data.nickname);
      setEmail(res.data.email);
    })
    .catch((err) => {
      console.log(err);
    });

    // 다른 영역 클릭 시 모든 카드 선택 해제
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.divider')) { // 클릭한 요소가 Divider 내부인지 확인
        setCards(cards.map(card => ({...card, isSelected: false})));
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
  }

  const default_space = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '35px'
  }

  const setting_space = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50px',
    paddingBottom: '50px'
  }

  // 카드 추가 함수 (ui구현은 안함)
  /*const addCard = () => {
    setCards((prevCards) => [...prevCards, { id: prevCards.length + 1, isOpen: 0 }]);
  };*/

  return (
    <div style={{
      background: 'linear-gradient(white, skyblue)',
      width: '100%'
    }}>
    <Box>
      <Logo/>
      <Box>
        <Box sx={title_space}>
          <DefaultProfile/>
          {isEditing ? (
            <TextField
              value={nickname}
              onChange={handleNicknameChange}
              onBlur={toggleEdit} // 수정을 완료하면 토글
            />
          ) : (
            <Typography fontSize={'50px'} fontFamily={'Jua'}>{nickname}</Typography>
          )}
          <IconButton onClick={toggleEdit}>
            <EditIcon sx={{width: 50, height: 50, color: 'Black'}}/>
          </IconButton>
        </Box>
        <Divider className="divider"/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>내가 생성한 카드</Typography>
          <Box>
            <Button variant="outlined"
            sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}
            onClick={deleteSelectedCards}>선택삭제</Button>

            <Button variant="outlined"
            sx={{color: 'darkgreen', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}}
            onClick={makeCardsPublic} >공개</Button>

            <Button variant="outlined"
            sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}
            onClick={makeCardsPrivate}>비공개</Button>

            <Button variant="outlined"
            sx={{color: 'darkgreen', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}}
            onClick={makeAllCardsPublic}>전체공개</Button>
          </Box>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '50px', gap: '16px'}}>
          {/* 생성한 카드들 */}
          {cards.map((card) => (
            <CardMaker
              key={card.id}
              isOpen={card.isOpen}
              isSelected={card.isSelected} // 선택 상태 바인딩
              onContextMenu={(event: React.MouseEvent) => {
                event.preventDefault();
                toggleSelectCard(card.id);
              }}
            />
          ))}
        </Box>
        <Divider className="divider"/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>관심 카드</Typography>
          <Button variant="outlined"
            sx={{color: 'darkred', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}
            onClick={deleteSelectedFavouriteCards}>선택삭제
          </Button>
        </Box>
        <Box sx={{display:'flex', alignItems: 'center', marginBottom: '50px', gap: '16px'}}>
            {/* 관심 카드들 */}
            <CardMaker
                  onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                }}/> {/*시연용 이후 삭제할것*/}
            {favouriteCards.map((card) => (
              <CardMaker
                key={card.id}
                isOpen={0} //isOpen={card.isOpen} 시연후 이걸로 교체
                isSelected={card.isSelected} // 선택 상태 바인딩
                isOpen2={false} //시연용
                onContextMenu={(event: React.MouseEvent) => {
                  event.preventDefault();
                  toggleSelectFavouriteCard(card.id);
                }}
              />
            ))}
        </Box>
        <Divider className="divider"/>

        <Box sx={default_space}>
          <Typography sx={{fontSize: '30px', fontFamily: 'Gugi'}}>내가 추가한 키워드</Typography>
          <Box>
            <Button variant="outlined"
            sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}
            onClick={deleteSelectedKeywords}>선택삭제</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}} onClick={makeKeywordsPublic}>공개</Button>

            <Button variant="outlined"
            sx={{color: 'darkred', marginRight: '15px', fontFamily: 'Noto Sans KR', borderColor: 'red', background: 'white'}}
            onClick={makeKeywordsPrivate}>비공개</Button>

            <Button variant="outlined" sx={{color: 'darkgreen', fontFamily: 'Noto Sans KR', borderColor: 'green', background: 'white'}} onClick={makeAllKeywordsPublic}>전체공개</Button>
          </Box>
        </Box>
        <Box sx={{marginBottom: '50px', display: 'flex', alignItems:'center', gap: '16px'}}>
          {/* 키워드 박스들 */}
          {keywords.map((keyword, index) => (
            <Keyword
              key={index}
              keyword={keyword.text}
              isSelected={keyword.isSelected} // 선택 상태를 바인딩합니다.
              isOpen={keyword.isOpen} // 공개 상태를 바인딩합니다.
              onContextMenu={(event: React.MouseEvent) => {
                event.preventDefault();
                toggleSelectKeyword(keyword.text);
              }}
            />
          ))}
          {/* 아래도 시연용. 확인후 지울것 */}
          <Box
            sx={{
              borderRadius: '28px'
            }}
          >
            <Fab
              variant="extended"
              sx={{
                fontFamily: 'Noto Sans KR',
                fontSize: '15px',
                background: 'linear-gradient(180deg, rgba(255, 80, 80, 0.8) 0%, rgba(255, 50, 50, 0.6) 100%)'
              }}
            >
              <TagIcon sx={{ mr: 1 }} />
              {'테스트'}
            </Fab>
          </Box>



          <TextField
            value={newKeyword}
            onChange={handleNewKeywordChange}
            placeholder="새 키워드"
          />
          <IconButton sx={{marginLeft: '10px'}} onClick={addKeyword}>
            <Add sx={{ color: 'Black'}}/>
          </IconButton>
        </Box>
        <Divider className="divider"/>

        <Box sx={setting_space}>
          <Typography  sx={{fontSize: '30px', fontFamily: 'Gugi'}}>설정</Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '35px'}}>
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>전체 알림</Typography>
            <Switch sx={{marginLeft: '20px'}} checked={isNotificationOn} onChange={handleNotificationToggle} />
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua', marginLeft: '10px'}}>{isNotificationOn ? 'ON' : 'OFF'}</Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'flex-start', marginTop: '30px', alignItems: 'center'}}>
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>이메일</Typography>
            <Box>
              {isEmailEditing ? (
                <>
                  <TextField
                    variant="outlined"
                    sx={{marginLeft: '45px'}}
                    value={email}
                    onChange={handleEmailChange}
                    inputProps={{ style: { fontSize: '20px', padding: '6px', marginLeft: '16px' } }}
                  />
                  <Button variant="outlined" sx={{fontSize: '16px', marginLeft: '16px', fontFamily: 'Noto Sans KR', background: 'white'}} onClick={toggleEmailEdit}>저장</Button>
                </>
              ) : (
                <>
                  <TextField disabled variant="outlined" sx={{marginLeft: '45px'}} value={email} inputProps={{ style: { fontSize: '20px', padding: '6px', marginLeft: '16px' } }} />
                  <Button variant="outlined" sx={{fontSize: '16px', marginLeft: '16px', fontFamily: 'Noto Sans KR', background: 'white'}} onClick={toggleEmailEdit}>수정</Button>
                </>
              )}
            </Box>
          </Box>


          <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '30px'}}>
            <Typography sx={{fontSize: '20px', fontFamily: 'Jua'}}>회원탈퇴</Typography>
            <Button variant="outlined" sx={{color: 'red', fontSize: '16px', fontFamily: 'Noto Sans KR', marginLeft: '25px', borderColor: 'red', background: 'white' }}>회원탈퇴</Button>
          </Box>
        </Box>
      </Box>
    </Box>
    </div>
  );
}

export default MyProfile;
