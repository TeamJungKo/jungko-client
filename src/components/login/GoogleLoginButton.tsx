import React from 'react';
import '../../assets/css/googleLoginButton.css'; // CSS 파일 import

type GoogleLoginButtonProps = {
    onClick?: () => void; // 버튼 클릭 시 실행할 함수, ?는 추후 제거 (디자인 작업시 에러방지)
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
    return (
        <button className="google_login_button" onClick={onClick}>
            <div className="google_login_symbol" />
            <span className="google_login_label">Start with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
