import React from 'react';
import '../../assets/css/naverLoginButton.css'; // CSS 파일 import

const login = () => {
  window.location.replace(
    `${import.meta.env.VITE_BE_HOST}/api/v1/auth/login/oauth-types/naver`
  );
};

const NaverLoginButton: React.FC = () => {
  return (
    <button className="naver_login_button" onClick={login}>
      <div className="naver_login_symbol" />
      <span className="naver_login_label">Start with Naver</span>
    </button>
  );
};

export default NaverLoginButton;
