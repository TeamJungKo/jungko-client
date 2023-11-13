import { useNavigate } from 'react-router-dom';
import jungkoLogo from '../../assets/images/jungkoLogo.png';

interface Props {
  url?: string;
}


function Logo({ url='/home' }: Props) {

  const navigate = useNavigate();

  const goToUrl = () => {
    navigate(url);
  }

  const logoStyle: React.CSSProperties = {
    width: '150px', 
    height: '150px', 
    objectFit: 'contain',
    padding: '30px 0px 0px 30px',
    cursor: 'pointer'
  }

  return (
    <img src={jungkoLogo} alt="중코거래" style={logoStyle} onClick={goToUrl}></img>
  );
}

export default Logo;
