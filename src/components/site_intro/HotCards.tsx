import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/hotCards.css';
import jungkoIcon from '../../assets/images/jungkoIcon.png';
import CardMaker from '../common/CardMaker.tsx';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { getPopularCard } from '../../api/axios.custom.ts';
import { Card } from '../../types/types.ts';

const HotCards = (): React.ReactElement => {
  const [cards, setCards] = useState<Card[]>([]);

  const navigate = useNavigate();

  const goToUrl = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getPopularCard(0, 6);
        if (response.data.cards) {
          setCards(response.data.cards);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
      console.log(`호출된 인기카드 개수: ${cards.length}`);
      console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

    };

    fetchCards();
  }, []);

  return (
    <>
      <div className="hot_cards_area">
        <p id="hot_card_title">
          <WhatshotIcon style={{ fontSize: '60px' }} /> 지금 가장 인기 많은 카드
        </p>
        <div className="hot_card_container">
          {cards.map((card, index) => (
            <div key={index} className="hot_card_wrapper" onClick={goToUrl}>
              <CardMaker
                imageUrl={jungkoIcon}
                title={card.title}
                description={`${card.keyword}\n가격범위: ${card.minPrice}~${card.maxPrice}`}
                imageHeight="50%"
                contentHeight="50%"
              />
            </div>
          ))}
          <CardMaker //이부분은 샘플이니 지워도무관
            imageUrl={jungkoIcon}
            title="카드제목"
            description="카드설명"
            imageHeight="50%"
            contentHeight="50%"
          />
        </div>
      </div>
    </>
  );
};

export default HotCards;
