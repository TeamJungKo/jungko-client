import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChairIcon from '@mui/icons-material/Chair';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PetsIcon from '@mui/icons-material/Pets';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';

const items = [
  { icon: <MenuIcon />, text: "카테고리" },
  { icon: <LocalLaundryServiceIcon />, text: "가전,TV" },
  { icon: <LaptopMacIcon />, text: "컴퓨터, 노트북" },
  { icon: <PhoneAndroidIcon />, text: "태블릿, 모바일, 디카" },
  { icon: <GolfCourseIcon />, text: "아웃도어, 스포츠" },
  { icon: <DirectionsCarIcon />, text: "자동차, 공구" },
  { icon: <ChairIcon />, text: "가구, 조명" },
  { icon: <RamenDiningIcon />, text: "식품, 유아, 완구" },
  { icon: <HealthAndSafetyIcon />, text: "생활, 주방, 건강" },
  { icon: <CheckroomIcon />, text: "패션, 잡화, 뷰티" },
  { icon: <PetsIcon />, text: "반려동물, 취미, 사무" },
  { icon: <FlightTakeoffIcon />, text: "여행, 항공, 호텔" }
  // ... 여기에 더 추가 가능
];

const Category = (): React.ReactElement => {
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
      <nav aria-label="Category">
        <List disablePadding>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={item.text === "카테고리" ? { backgroundColor: '#000000', borderRadius: '12px 12px 0 0' } : {}}>
                {item.text === "카테고리" ? (
                  <>
                    <ListItemIcon sx={{ paddingLeft: 2, paddingBottom: 2, paddingTop: 2, color: '#ffffff' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{color: '#ffffff', fontFamily: 'Noto Sans KR'}}/>
                  </>
                ) : (
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text}
                    primaryTypographyProps={{fontFamily: 'Noto Sans KR'}} />
                  </ListItemButton>
                )}
              </ListItem>
              {index !== items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default Category;
