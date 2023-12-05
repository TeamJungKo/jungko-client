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
        const response = await getPopularCard(0, 8);
        if (response.data.cards) {
          setCards(response.data.cards);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log('인기카드를 가져오는 중 오류가 발생했습니다 :', error);
      }
    };

    fetchCards();
  }, [cards.length]);

  return (
    <>
      <div className="hot_cards_area">
        <p id="hot_card_title">
          <WhatshotIcon style={{ fontSize: '60px' }} /> 지금 가장 인기 많은 카드
        </p>
        <div className="hot_card_container">
          {cards.map((card) => (
            <CardMaker
              key={card.cardId}
              imageUrl={jungkoIcon}
              title={card.title}
              description={`${card.keyword}\n가격범위: ${card.minPrice}~${card.maxPrice}`}
              imageHeight="50%"
              contentHeight="50%"
              onClick={goToUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HotCards;
