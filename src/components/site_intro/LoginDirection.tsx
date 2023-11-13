import { useNavigate } from 'react-router-dom';
import '../../assets/css/loginDirection.css';

interface Props {
  url: string;
}

const LoginDirection = ({ url }: Props): React.ReactElement => {

  const navigate = useNavigate();

  const goToUrl = () => {
    navigate(url);
  }

  return (
    <>
      <div className="login_button_area">
        <button className="login_button" onClick={goToUrl}>5초 안에 로그인</button>
      </div>
    </>
  );
};

export default LoginDirection;