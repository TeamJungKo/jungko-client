import React from 'react';

type User = {
  profileImg: string;
  nickname: string;
  email: string;
};

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps) {
    return (
        <div>
            <h2>카카오 로그인 성공!</h2>
            <h3>카카오 프로필 사진</h3>
            <img src={user.profileImg} alt="" />
            <h3>카카오 닉네임</h3>
            <h4>{user.nickname}</h4>
            <h3>카카오 이메일</h3>
            <h4>{user.email}</h4>
        </div>
    );
}

export default UserInfo;
