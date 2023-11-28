import * as types from '../types/types';
import instance from './axios.instance';

// Member

export const getMyProfile = async () => {
  const response = await instance.get<types.MemberResponse>(`/api/v1/members/me/profile`);
  return response;
};

export const updateMyProfile = async (
  nickname: string,
  email: string,
  imageData: string | null
) => {
  const url = '/api/v1/members/me/profile';
  const formData = new FormData();

  formData.append('nickname', nickname);
  formData.append('email', email);
  if (imageData) {
    formData.append('imageData', imageData);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const response = await instance.patch(url, formData, config);
  return response;
};

export const getMembersProfile = async (
  memberId: number
)=> {
  const response = await instance.get<types.MemberResponse>(
    `/api/v1/members/${memberId}/profile`
  );
  return response;
};


export const unregisterUser = async () => {
  const response = await instance.delete(`/api/v1/auth/unregister`);
  return response;
};

// Card

export const createCard = async (cardCreateRequest: FormData): Promise<any> => {
  const response = await instance.postForm('/api/v1/cards', cardCreateRequest, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

export const deleteCard = async (cardId: number): Promise<any> => {
  const response = await instance.delete(`/api/v1/cards/${cardId}`);
  return response;
};

export const changeCardOption = async (
  cardId: number,
  cardChangeRequest: FormData
): Promise<any> => {
  const response = await instance.patch(`/api/v1/cards/${cardId}`, {
    cardChangeRequest
  });
  return response;
};

export const getPopularCard = async (
  page: number,
  size: number,
  categoryId=0
) => {
  const response = await instance.get(
    `/api/v1/cards/popular?page=${page}&size=${size}&categoryId=${categoryId}`
  );
  return response;
};

export const getMyCard = async (page = 0, size = 10) => {
  const response = await instance.get(
    `/api/v1/cards/members/me?page=${page}&size=${size}`
  );
  return response;
};

export const getMemberCard = async (
  memberId: number,
  page = 0,
  size = 10
): Promise<any> => {
  const response = await instance.get(
    `/api/v1/cards/members/${memberId}?page=${page}&size=${size}`
  );
  return response;
};

export const getInterestedCard = async (
  memberId: number,
  page = 0,
  size = 10
): Promise<any> => {
  const response = await instance.get(
    `/api/v1/cards/like/members/${memberId}?page=${page}&size=${size}`
  );
  return response;
};

export const likeCard = async (cardId: number) => {
  const response = await instance.put(`/api/v1/cards/${cardId}/like`);
  return response;
};

export const unlikeCard = async (cardId: number) => {
  const response = await instance.delete(`/api/v1/cards/${cardId}/like`);
  return response;
};

// Product

export const compareProduct = async (productIds: number[]) => {
  const response = await instance.post('/api/v1/products/compare', {
    productIds
  });
  return response;
};

export const getProductDetail = async (productId: number) => {
  const response = await instance.get(`/api/v1/products/${productId}`);
  return response;
};

export const searchProduct = async (
  productSearchRequest: types.ProductSearchRequest,
  page = 0,
  size = 10,
  sort: string,
  order: 'ASC' | 'DESC'
) => {
  const response = await instance.post(
    `/api/v1/products/search?keyword=${productSearchRequest.keyword}&minPrice=${productSearchRequest.minPrice}&maxPrice=${productSearchRequest.maxPrice}&categoryId=${productSearchRequest.categoryId}&areaId=${productSearchRequest.areaId}&page=${page}&size=${size}&sort=${sort}&order=${order}`,
    productSearchRequest
  );
  return response;
};

export const relatedSearch = async (query: string) => {
  const response = await instance.get(
    `/api/v1/products/search/related?query=${query}`
  );
  return response;
};

export const getAllProductCategory = async () => {
  const response = await instance.get(`/api/v1/products/categories`);
  return response;
};

export const getAllArea = async () => {
  const response = await instance.get(`/api/v1/products/areas`);
  return response;
};

// Keyword
export const createKeywords = async (keyword: string[]) => {
  const response = await instance.put('/api/v1/keywords', {
    keyword
  });
  return response;
};

export const getMemberKeywords = async (
  memberId: number,
  page = 0,
  size = 10
) => {
  const response = await instance.get(
    `/api/v1/keywords/members/${memberId}?page=${page}&size=${size}`
  );
  return response;
};

export const getMyKeywords = async (page = 0, size = 10) => {
  const response = await instance.get(
    `/api/v1/keywords/members/me?page=${page}&size=${size}`
  );
  return response;
};

export const deleteKeywords = async (keywordId: number) => {
  const response = await instance.delete(`/api/v1/keywords/${keywordId}`);
  return response;
};

// Notification

export const changeKeywordNoticeSetting = async (keywordId: number) => {
  const response = await instance.put(`/api/v1/notices/keywords/${keywordId}`);
  return response;
};

export const getNoticeKeywords = async (page = 0, size = 10): Promise<any> => {
  const response = await instance.get(
    `/api/v1/notices/keywords?page=${page}&size=${size}`
  );
  return response;
};

export const deleteAllNoticeKeywords = async () => {
  const response = await instance.delete(`/api/v1/notices/keywords`);
  return response;
};

export const deleteNotice = async (noticeId: number) => {
  const response = await instance.delete(`/api/v1/notices/${noticeId}`);
  return response;
};
