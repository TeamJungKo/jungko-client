import TitleMaker from '../components/common/Title.tsx';
import GoogleLoginButton from '../components/login/GoogleLoginButton.tsx';
import KakaoLoginButton from '../components/login/KakaoLoginButton.tsx';
import NaverLoginButton from '../components/login/NaverLoginButton.tsx';

function LoginPage() {

  const buttonPosition = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
    marginBottom: '50px'
  };

  const messageStyle = {
    paddingTop: '50px',
    paddingBottom: '220px',
    fontFamily: 'Noto Sans KR',
    fontSize: '30px',
    textAlign: 'center' as const
  };

  return (
    <>
      <TitleMaker title='로그인'>
        <div style={messageStyle}>로그인하시고 서비스를 이용해보세요</div>
        <div style={buttonPosition}>
          <GoogleLoginButton/>
        </div>
        <div style={buttonPosition}>
          <KakaoLoginButton/>
        </div>
        <div style={buttonPosition}>
          <NaverLoginButton/>
        </div>
      </TitleMaker>
    </>
  );
}

export default LoginPage;