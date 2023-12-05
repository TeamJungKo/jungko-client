import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResultComponent from '../components/common/SearchResultComponent.tsx';
import { Product } from '../types/types.ts';
import { ProductSearchRequest } from '../types/types.ts';

const SearchResult: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const handleCheck = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.find((p) => p.productId === product.productId)
        ? prevSelected.filter((p) => p.productId !== product.productId)
        : [...prevSelected, product]
    );
  };
  const location = useLocation();

  const getSearchOptionsFromURL = (): ProductSearchRequest => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: decodeURIComponent(queryParams.get('keyword') || 'asdf'),
      minPrice: Number(queryParams.get('minPrice') || ''),
      maxPrice: Number(queryParams.get('maxPrice') || ''),
      categoryId: Number(queryParams.get('categoryId') || ''),
      areaId: Number(queryParams.get('areaId') || ''),
      sort: queryParams.get('sort') || '',
      order: queryParams.get('order') || ''
    };
  };

  const searchOptions = getSearchOptionsFromURL();

  return (
    <SearchResultComponent
      SearchOption={searchOptions}
      selectedProducts={selectedProducts}
      onCheck={handleCheck}
      setSelectedProducts={setSelectedProducts}
    />
  );
};

export default SearchResult;
