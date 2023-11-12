import '../../assets/css/hotCards.css';
import jungkoIcon from '../../assets/images/jungkoIcon.png';
import CardMaker from '../common/Card.tsx'

const cardsArray = Array(6).fill(null); // 핫카드 6개 담을 배열

const HotCards = (): React.ReactElement => {

  return (
    <>
      <div className="hot_cards_area">
        <p id="hot_card_title">지금 HOT한 카드들</p>
        <div className="hot_card_container">
        {cardsArray.map((_, index) => (
            <div key={index} className="hot_card_wrapper">
              <CardMaker image={jungkoIcon} title='제목테스트' description='설명테스트' imageHeight='50%' contentHeight='50%'/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotCards;
