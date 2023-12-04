import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getAllProductCategory, getAllArea } from '../api/axios.custom.ts';
import { Category, SubCategory, Sido, Sigg } from '../types/types.ts';

interface SearchModalProps {
  open: boolean;
  handleClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [area, setArea] = useState<Sido[]>([]);
  const [selectedSido, setSelectedSido] = useState<Sido>();
  const [selectedSigg, setSelectedSigg] = useState<Sigg>();
  const [selectedEmd, setSelectedEmd] = useState<number>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategoriesAndAreas = async () => {
      try {
        const response = await getAllProductCategory();
        setCategory(response.data.productCategories);
        const response2 = await getAllArea();
        setArea(response2.data.areas[0].sido);
      } catch (error) {
        console.error('카테고리 데이터를 불러오는데 실패했습니다.', error);
      }
    };
    fetchCategoriesAndAreas();
  }, []);
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryId = event.target.value as string;
    setSelectedCategory(categoryId);
    const foundCategory = category.find(
      (c) => c.categoryId === Number(categoryId)
    );
    setSubCategory(foundCategory?.subCategory || []);
    setSelectedSubCategory('default');
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<string>) => {
    const subCategoryId = event.target.value as string;
    setSelectedSubCategory(subCategoryId);
    if (subCategoryId !== 'default') {
      setSelectedCategory(subCategoryId);
    } else {
      const currentCategoryId = category
        .find(
          (c) =>
            c.subCategory?.some(
              (subCat) => subCat.categoryId === Number(subCategoryId)
            )
        )
        ?.categoryId.toString();
      setSelectedCategory(currentCategoryId || '');
    }
  };

  const handleSidoSelect = (event: SelectChangeEvent) => {
    const sidoId = event.target.value; // ID 추출
    const selected = area.find((sido) => sido.id === Number(sidoId));
    setSelectedSido(selected);
    setSelectedEmd(undefined);
  };

  const handleSiggSelect = (event: SelectChangeEvent) => {
    const siggId = event.target.value; // ID 추출
    const selected = selectedSido?.sigg.find(
      (sigg) => sigg.id === Number(siggId)
    );
    setSelectedSigg(selected);
  };

  const handleEmdClick = (event: SelectChangeEvent) => {
    const emdId = event.target.value; // ID 추출
    setSelectedEmd(Number(emdId));
  };

  const handleSearch = () => {
    // 검색 조건을 URL 쿼리 파라미터로 변환
    const searchParams = new URLSearchParams();
    searchParams.append('keyword', encodeURIComponent(searchTerm));
    if (minPrice) searchParams.append('minPrice', minPrice);
    if (maxPrice) searchParams.append('maxPrice', maxPrice);
    if (selectedCategory) searchParams.append('categoryId', selectedCategory);
    if (selectedEmd) searchParams.append('areaId', selectedEmd.toString());
    navigate(`/searchresult?${searchParams.toString()}`);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[5],
          p: 4
        }}
      >
        <Box sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={searchTerm}
                onChange={handleSearchTermChange}
                autoComplete="given-name"
                name="searchTerm"
                required
                fullWidth
                id="searchTerm"
                label="검색어"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                value={minPrice}
                onChange={handleMinPriceChange}
                required
                fullWidth
                id="minPrice"
                label="최소 가격"
                name="minPrice"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={maxPrice}
                onChange={handleMaxPriceChange}
                required
                fullWidth
                id="maxPrice"
                label="최대 가격"
                name="maxPrice"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">카테고리</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  label="카테고리"
                  onChange={handleCategoryChange}
                >
                  {category.map((category) => (
                    <MenuItem
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="sub-category-select-label">
                  서브 카테고리
                </InputLabel>
                <Select
                  labelId="sub-category-select-label"
                  id="sub-category-select"
                  value={selectedSubCategory}
                  label="서브 카테고리"
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="default">---------------</MenuItem>
                  {subCategory.map((subCat) => (
                    <MenuItem key={subCat.categoryId} value={subCat.categoryId}>
                      {subCat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">지역</InputLabel>
                <Select
                  labelId="area-select-label"
                  id="area-select"
                  value={selectedSido ? selectedSido.id.toString() : ''}
                  label="지역"
                  onChange={handleSidoSelect}
                >
                  {area.map((sido) => (
                    <MenuItem key={sido.id} value={sido.id}>
                      {sido.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="sigg-select-label">시군구</InputLabel>
                <Select
                  labelId="sigg-select-label"
                  id="sigg-select"
                  value={selectedSigg ? selectedSigg.id.toString() : ''}
                  label="시군구"
                  onChange={handleSiggSelect}
                >
                  {selectedSido?.sigg.map((sigg) => (
                    <MenuItem key={sigg.id} value={sigg.id}>
                      {sigg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="emd-select-label">읍면동</InputLabel>
                <Select
                  labelId="emd-select-label"
                  id="emd-select"
                  value={selectedEmd ? selectedEmd.toString() : ''}
                  label="읍면동"
                  onChange={handleEmdClick}
                >
                  {selectedSigg?.emd.map((emd) => (
                    <MenuItem key={emd.id} value={emd.id}>
                      {emd.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSearch}
            >
              검색
            </Button>
            <Button
              type="button"
              variant="outlined"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={handleCancel}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;
