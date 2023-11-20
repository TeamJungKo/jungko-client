import { useNavigate } from 'react-router-dom';
import '../../assets/css/hotCards.css';
import jungkoIcon from '../../assets/images/jungkoIcon.png';
import CardMaker from '../common/Card.tsx'
import WhatshotIcon from '@mui/icons-material/Whatshot';

interface Props {
  url: string;
}

const cardsArray = Array(6).fill(null); // 핫카드 6개 담을 배열

const HotCards = ({ url }: Props): React.ReactElement => {

  const navigate = useNavigate();

  const goToUrl = () => {
    navigate(url);
  }

  return (
    <>
      <div className="hot_cards_area">
        <p id="hot_card_title"><WhatshotIcon style={{ fontSize: '60px' }} /> 지금 가장 인기 많은 카드</p>
        <div className="hot_card_container">
        {cardsArray.map((_, index) => (
            <div key={index} className="hot_card_wrapper" onClick={goToUrl}>
              <CardMaker image={jungkoIcon} title='제목테스트' description='설명테스트' imageHeight='50%' contentHeight='50%'/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HotCards;
