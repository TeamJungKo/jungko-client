// 여기서부터 Response 입니다

// 카드 api
export interface CardResponse {
  cards: Card[];
  totalResources: number;
}

// 카드 일반 정보
export interface Card {
  cardId: number;
  title: string;
  keyword: string;
  minPrice: number;
  maxPrice: number;
  scope: string;
  createdAt: string;
  author: Author;
  area: Area;
  category: Category;
  isSelected?: boolean;
}

// 상품 api
export interface ProductResponse {
  products: Product[];
  totalResources: number;
}

// 상품 상세 정보 api
export interface ProductDetailResponse {
  productDetail: ProductDetail;
}

// 앞으로 쓸 상품 정보들에서 겹치는 것만 추출해놓음
interface BaseProduct {
  productId: number;
  title: string;
  content: string;
  price: number;
  availability: string;
  uploadedAt: string;
  productImageUrl: string;
  marketName: string;
  marketProductId: string;
  area: Area;
}

// 상품 일반 정보
export interface Product extends BaseProduct {
  category: Category;
}

// 상품 상세 정보
export interface ProductDetail extends BaseProduct {
  productCategory: Category;
  createdAt: string;
}

// 카드 생성자 혹은 상품 판매자
interface Author {
  memberId: number;
  nickname: string;
  imageUrl: string;
  email: string;
}

// 지역 api
export interface AreasResponse {
  areas: Area;
}

// 시도
interface Area {
  sido: Sido;
}

// 시도
interface Sido {
  name: string;
  code: string;
  sigg: Sigg;
}

// 시군구
interface Sigg {
  name: string;
  code: string;
  emd: Emd;
}

// 읍면동
interface Emd {
  name: string;
  code: string;
}

// 카테고리 api
export interface ProductCategoriesResponse {
  productCategories: Category[];
}

// 카테고리 정보
export interface Category {
  categoryId: number;
  name: string;
  level: number;
  subCategory?: SubCategory;
  imageUrl: string;
}

// 카테고리의 하위 카테고리
export interface SubCategory {
  categoryId: number;
  name: string;
  level: number;
  subCategory?: SubCategory;
}

// 연관검색어 api
export interface RelatedQueriesResponse {
  relatedQueries: string[];
}

// 키워드 api
export interface KeywordListResponse {
  keywordList: Keyword[];
}

// 키워드 정보
export interface Keyword {
  keywordId: number;
  keyword: string;
  isSelected?: boolean;
}

// 회원 정보
export interface MemberResponse {
  memberId: number;
  nickname: string;
  imageUrl: string;
  email: string;
  notificationAgreement: boolean;
}

// 알림 정보
export interface Notice {
  noticeId: number;
  title: string;
  content: string;
  productId: number;
  createdAt: string;
  isRead: boolean;
}

//알림 api
export interface NoticeResponse {
  keywordNotices: Notice[];
  totalResources: number;
}


// 여기서부턴 Request 입니다.

// 카드 생성
export interface CardCreationRequest {
  categoryId: number;
  areaId: number;
  title: string;
  keyword: string;
  minPrice: number;
  maxPrice: number;
  scope: string;
}

// 카드 삭제
export interface CardDeletionRequest {
  cardId: number;
}

// 카드 옵션 변경
export interface CardOptionChangeRequest {
  cardId: number;
}

// 카드내 매물 검색
export interface ProductInCardSearchRequest {
  cardId: number;
  page: number;
  size: number;
  sort?: string;
  order?: string;
}

// 인기 카드 목록 조회
export interface PopularCardListRequest {
  page: number;
  size: number;
  categoryId: number;
}

// 특정 유저의 카드 목록 조회
export interface MembersCardListRequest {
  memberId: number;
  page: number;
  size: number;
  categoryId?: number;
}

//내 카드 목록 조회
export interface MyCardListRequest {
  page: number;
  size: number;
  categoryId: number;
}

// 선택한 상품들 비교 요청
export interface ProductComparisonRequest {
  productIds: Array<number>;
}

// 특정 상품의 상세 정보 조회
export interface ProductDetailRequest {
  productId: number;
}

// 검색어로 상품 검색
export interface ProductSearchRequest {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId: number;
  areaId: number;
  page: number;
  size: number;
  sort?: number;
  order?: number;
}

// 검색 결과에 대한 연관 검색어 조회
export interface RelatedQueriesRequest {
  query: string;
}

// 키워드 생성
export interface KeywordCreationRequest {
  keywords: Array<number>;
}

// 특정 회원의 키워드 목록 조회
export interface MembersKeywordListRequest {
  memberId: number;
}

// 내 키워드 목록 조회
export interface MyKeywordListRequest {
  page: number;
  size: number;
}

// 키워드 삭제
export interface KeywordDeletionRequest {
  memberId: number;
}

// 키워드알림쪽 명세 변경예정, 이후 적어야합니다

// 관심카드 등록
export interface InterestedCardRegistrationRequest {
  cardId: number;
}

// 관심카드 삭제
export interface InterestedCardDeletionRequest {
  cardId: number;
}

//특정회원의 관심카드 목록 조회 (내카드조회없음)
export interface InterestedCardListRequest {
  memberId: number;
  page: number;
  size: number;
  categoryId?: number;
}

// 특정 회원의 프로필 조회 (내 프로필은 파라미터없이 가능)
export interface MembersProfileRequest {
  memberId: number;
}