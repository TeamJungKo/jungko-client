import * as types from '../types/types';
import instance from './axios.instance';

// Member

export const getMyProfile = async () => {
  const response = await instance.get<types.MemberResponse>(
    `/api/v1/members/me/profile`
  );
  return response;
};

export const updateMyProfile = async (
  nickname: string | null,
  imageData: File | null
) => {
  const url = '/api/v1/members/me/profile';
  const formData = new FormData();

  if (nickname) {
    formData.append('nickname', nickname);
  }
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

export const getMembersProfile = async (memberId: number) => {
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
  const response = await instance.patch(
    `/api/v1/cards/${cardId}`,
    cardChangeRequest
  );
  return response;
};

export const getCardInfo = async (
  //getCardInfo 추가
  cardId: number,
  page = 0,
  size = 10,
  sort: string,
  order: 'ASC' | 'DESC'
) => {
  const response = await instance.get(
    `/api/v1/cards/${cardId}/products?page=${page}&size=${size}&sort=${sort}&order=${order}`
  );
  return response.data;
};

export const getPopularCard = async (
  page = 0,
  size = 10,
  categoryId?: number,
  sort?: string,
  order?: string
) => {
  let url = `/api/v1/cards/popular?page=${page}&size=${size}`;

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  if (sort && order) {
    url += `&sort=${sort}&order=${order}`;
  }

  const response = await instance.get(url);
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
  productSearchRequest: types.ProductSearchRequest
) => {
  const response = await instance.get(`/api/v1/products/search`, {
    params: {
      keyword: productSearchRequest.keyword,
      minPrice: productSearchRequest.minPrice,
      maxPrice: productSearchRequest.maxPrice,
      categoryId: productSearchRequest.categoryId,
      areaId: productSearchRequest.areaId,
      page: productSearchRequest.page,
      size: productSearchRequest.size,
      sort: productSearchRequest.sort,
      order: productSearchRequest.order
    }
  });
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
export const createKeywords = async (keywords: string[]) => {
  const response = await instance.put('/api/v1/keywords/', { keywords });
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

export const changeNoticeSetting = async (deviceToken: string | null) => {
  const response = await instance.put('/api/v1/notices/setting', {
    deviceToken
  });
  return response;
};

export const changeKeywordNoticeSetting = async (keywordId: number) => {
  const response = await instance.put(`/api/v1/notices/keywords/${keywordId}`);
  return response;
};

export const getNotices = async (page = 0, size = 10): Promise<any> => {
  const response = await instance.get(
    `/api/v1/notices/keywords?page=${page}&size=${size}`
  );
  return response;
};

export const deleteNotices = async (noticeIds: number[]) => {
  const response = await instance.delete(`/api/v1/notices/`, {
    data: { noticeIds }
  });
  return response;
};
