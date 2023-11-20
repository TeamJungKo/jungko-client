import instance from './axios.instance';

export const getMyProfile = async () => {
  const response = await instance.get(`/api/v1/members/me/profile`);
  return response;
};

export const getPopularCard = async (page = 0, size = 10) => {
  const response = await instance.get(`/api/v1/cards/popular?page=${page}&size=${size}`);
  return response;
};

export const getMyCard= async (page = 0, size = 10) => {
  const response = await instance.get(`/api/v1/cards/members/me?page=${page}&size=${size}`);
  return response;
};