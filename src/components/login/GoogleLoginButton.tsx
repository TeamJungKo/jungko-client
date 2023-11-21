import React from 'react';
import '../../assets/css/googleLoginButton.css'; // CSS 파일 import

const login = () => {
  window.location.replace(
    `${import.meta.env.VITE_BE_HOST}/api/v1/auth/login/oauth-types/google`
  );
};

const GoogleLoginButton: React.FC = ({}) => {
  return (
    <button
      className="google_login_button"
      onClick={() => {
        login();
      }}
    >
      <div className="google_login_symbol" />
      <span className="google_login_label">Start with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
