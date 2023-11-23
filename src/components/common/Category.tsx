import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getAllProductCategory } from '../../api/axios.custom';

// interface Props {
//   url?: string;
// }

interface ProductCategory {
  categoryId: number;
  name: string;
  level: number;
  subCategory: ProductCategory[];
}

const Category = (): React.ReactElement => {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<ProductCategory[]>([]);

  // const goToUrl = () => {
  //   navigate(url);
  // };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllProductCategory();
        if (response.data.productCategories) {
          const productCategories: ProductCategory[] =
            response.data.productCategories.map(
              (category: ProductCategory): ProductCategory => ({
                categoryId: category.categoryId,
                name: category.name,
                level: category.level,
                subCategory: category.subCategory
              })
            );
          setCategories(productCategories);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryUrl = (categoryId: number) => `/categories/${categoryId}`;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 280,
        bgcolor: '#E0E7E9',
        borderRadius: 3,
        boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)', // 그림자 추가
        background: 'linear-gradient(45deg, #BBDEFB 30%, #CFD8DC 90%)'
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          {categories.map((category) => (
            <React.Fragment key={category.categoryId}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate(getCategoryUrl(category.categoryId))}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default Category;
