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
    const options: ProductSearchRequest = {
      keyword: decodeURIComponent(queryParams.get('keyword') || 'asdf')
    };

    if (queryParams.has('minPrice')) {
      options.minPrice = Number(queryParams.get('minPrice'));
    }
    if (queryParams.has('maxPrice')) {
      options.maxPrice = Number(queryParams.get('maxPrice'));
    }
    if (queryParams.has('categoryId')) {
      options.categoryId = Number(queryParams.get('categoryId'));
    }
    if (queryParams.has('areaId')) {
      options.areaId = Number(queryParams.get('areaId'));
    }
    return options;
  };

  const searchOptions = getSearchOptionsFromURL();

  const handleRemoveProduct = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((p) => p.productId !== product.productId)
    );
  };
  return (
    <SearchResultComponent
      SearchOption={searchOptions}
      selectedProducts={selectedProducts}
      onCheck={handleCheck}
      setSelectedProducts={setSelectedProducts}
      onRemoveProduct={handleRemoveProduct}
    />
  );
};

export default SearchResult;
