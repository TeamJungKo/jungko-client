import instance from './axios.instance';

export const getMyProfile = async () => {
  const response = await instance.get(`/api/v1/members/me/profile`);
  return response;
};

export const updateMyProfile = async (nickname: string, email: string, imageData: string | null) => {
  const url = '/api/v1/members/me/profile';
  const formData = new FormData();

  formData.append('nickname', nickname);
  formData.append('email', email);
  if (imageData) {
    formData.append('imageData', imageData);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await instance.patch(url, formData, config);
    console.log(response.data);
  } catch (error) {
    console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
  }
};




export const getPopularCard = async (page = 0, size = 10) => {
  const response = await instance.get(`/api/v1/cards/popular?page=${page}&size=${size}`);
  return response;
};

export const getMyCard= async (page = 0, size = 10) => {
  const response = await instance.get(`/api/v1/cards/members/me?page=${page}&size=${size}`);
  return response;
};


/* 이부분은 memberId를 파라미터로 넘겨서 해당 회원의 프로필정보를 가져오는 코드
export const getOtherProfile = async (
  memberId: number
): Promise<any> => {
  try {
    const response = await instance.patch('/api/v1/members/{memberId}/profile', {
      memberId
    });
    return response;
  } catch (error) {
    throw error;
  }
};*/