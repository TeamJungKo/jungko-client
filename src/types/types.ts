export interface CardData {
  id: bigint;
  createdAt: Date;
  keyword: string[];
  max_price: number;
  min_price: number;
  scope: string;
  title: string;
  area_id: bigint[];
  member_id: bigint;
  product_category_id: bigint[];
}

export interface ProductSearchRequest {
  keyword: string;
  minPrice: number;
  maxPrice: number;
  categoryId: number;
  areaId: number;
}
