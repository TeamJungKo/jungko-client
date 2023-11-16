import React from 'react';
import '../../assets/css/kakaoLoginButton.css'; // CSS 파일 import

const login = () => {
  window.location.replace(
    `${import.meta.env.VITE_BE_HOST}/api/v1/auth/login/oauth-types/kakao`
  );
};

const KakaoLoginButton: React.FC = ({}) => {
  return (
    <button className="kakao_login_button" onClick={login}>
      <div className="kakao_login_symbol" />
      <span className="kakao_login_label">Start with Kakao</span>
    </button>
  );
};

export default KakaoLoginButton;
