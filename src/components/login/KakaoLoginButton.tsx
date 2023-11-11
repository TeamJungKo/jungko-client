import React from 'react';
import '../../assets/css/kakaoLoginButton.css'; // CSS 파일 import

type KakaoLoginButtonProps = {
    onClick?: () => void; // 버튼 클릭 시 실행할 함수, ?는 추후 제거 (디자인 작업시 에러방지)
};

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ onClick }) => {
    return (
        <button className="kakao_login_button" onClick={onClick}>
            <div className="kakao_login_symbol" />
            <span className="kakao_login_label">Start with Kakao</span>
        </button>
    );
};

export default KakaoLoginButton;
