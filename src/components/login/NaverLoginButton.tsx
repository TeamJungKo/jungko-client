import React from 'react';
import '../../assets/css/naverLoginButton.css'; // CSS 파일 import

type NaverLoginButtonProps = {
    onClick?: () => void; // 버튼 클릭 시 실행할 함수, ?는 추후 제거 (디자인 작업시 에러방지)
};

const NaverLoginButton: React.FC<NaverLoginButtonProps> = ({ onClick }) => {
    return (
        <button className="naver_login_button" onClick={onClick}>
            <div className="naver_login_symbol" />
            <span className="naver_login_label">Start with Naver</span>
        </button>
    );
};

export default NaverLoginButton;
