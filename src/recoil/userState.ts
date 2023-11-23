import { atom } from 'recoil';


export const userState = atom({
    key: 'userState',
    default: {
        nickname: 'Loading...',
        imageUrl: '../../assets/images/profile_pic.png'
    },
});
