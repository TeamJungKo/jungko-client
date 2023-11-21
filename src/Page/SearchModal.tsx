import React, { useState } from 'react';
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
  Chip,
  Typography,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SearchModalProps {
  open: boolean;
  handleClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

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
    const newCategory = event.target.value;
    if (!selectedCategories.includes(newCategory)) {
      setSelectedCategories((prev) => [...prev, newCategory]);
      setCategory('');
    }
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    const newRegion = event.target.value;
    if (!selectedRegions.includes(newRegion)) {
      setSelectedRegions((prev) => [...prev, newRegion]);
      setRegion('');
    }
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category !== categoryToDelete)
    );
  };

  const handleDeleteRegion = (regionToDelete: string) => {
    setSelectedRegions((prev) =>
      prev.filter((region) => region !== regionToDelete)
    );
  };

  const handleSearch = () => {
    console.log('검색 정보:', {
      searchTerm,
      minPrice,
      maxPrice,
      selectedCategories,
      selectedRegions
    });
    // API호출 등 기능 구현 필요
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
                  value={category}
                  label="카테고리"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="tech">기술</MenuItem>
                  <MenuItem value="books">도서</MenuItem>
                  {/* 추가 카테고리 */}
                </Select>
              </FormControl>
              <Box sx={{ mt: 1 }}>
                {selectedCategories.map((category) => (
                  <Chip
                    label={category}
                    onDelete={() => handleDeleteCategory(category)}
                    key={category}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="region-select-label">지역</InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-select"
                  value={region}
                  label="지역"
                  onChange={handleRegionChange}
                >
                  <MenuItem value="seoul">서울</MenuItem>
                  <MenuItem value="busan">부산</MenuItem>
                  {/* 추가 지역 */}
                </Select>
              </FormControl>
              <Box sx={{ mt: 1 }}>
                {selectedRegions.map((region) => (
                  <Chip
                    label={region}
                    onDelete={() => handleDeleteRegion(region)}
                    key={region}
                  />
                ))}
              </Box>
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
