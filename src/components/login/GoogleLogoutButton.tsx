import React from 'react';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function LogoutButton({ onClick }:Props) {
    return (
        <button onClick={onClick}>로그아웃</button>
    );
}

export default LogoutButton;
