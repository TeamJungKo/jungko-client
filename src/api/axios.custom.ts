import instance from './axios.instance';

export const getMyProfile = async () => {
  const response = await instance.get(`/api/v1/members/me/profile`);
  return response;
};
