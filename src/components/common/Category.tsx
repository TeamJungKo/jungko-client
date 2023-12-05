import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getAllProductCategory } from '../../api/axios.custom';
import { Category, SubCategory } from '../../types/types';

export default function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllProductCategory();
        if (response.data.productCategories) {
          const productCategories: Category[] =
            response.data.productCategories.map(
              (category: Category): Category => ({
                categoryId: category.categoryId,
                name: category.name,
                level: category.level,
                subCategory: category.subCategory,
                imageUrl: category.imageUrl
              })
            );
          setCategories(productCategories);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.log('카테고리를 가져오는 도중 오류가 발생했습니다: ', error);
      }
    };

    fetchCategories();
  }, []);

  const linkCategoryPage = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  const getMoreCategory = (categoryId: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId]
    }));
  };

  return (
    <Draggable>
      <Box
        sx={{
          cursor: 'grab',
          width: '100%',
          bgcolor: '#E0E7E9',
          border: '3px solid black',
          borderRadius: 3,
          boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 100px)'
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            padding: '12px',
            top: 0,
            zIndex: 2,
            fontSize: '20px',
            fontFamily: 'gugi'
          }}
        >
          카테고리
        </Box>
        <List
          sx={{
            width: '100%',
            background: '#DCDCDC',
            maxHeight: 'calc(70vh - 36px)',
            overflowY: 'scroll'
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {categories.map((category) => (
            <React.Fragment key={category.categoryId}>
              <ListItemButton sx={{ padding: 0 }}>
                <ListItemText
                  sx={{ padding: '8px 0px 8px 16px', margin: '0' }}
                  primary={category.name}
                  onClick={() => linkCategoryPage(category.categoryId)}
                />
                {open[category.categoryId] ? (
                  <ExpandLess
                    onClick={() => getMoreCategory(category.categoryId)}
                    sx={{ paddingRight: '16px' }}
                  />
                ) : (
                  <ExpandMore
                    onClick={() => getMoreCategory(category.categoryId)}
                    sx={{ paddingRight: '16px' }}
                  />
                )}
              </ListItemButton>
              <Collapse
                in={!!open[category.categoryId]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.subCategory && Array.isArray(category.subCategory)
                    ? category.subCategory.map((subCategory: SubCategory) => (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={subCategory.categoryId}
                          onClick={() =>
                            linkCategoryPage(subCategory.categoryId)
                          }
                        >
                          <ListItemText primary={subCategory.name} />
                        </ListItemButton>
                      ))
                    : null}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Draggable>
  );
}
