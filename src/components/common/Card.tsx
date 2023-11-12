import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';

interface Props {
  width?: string;
  height?: string;
  image?: string;
  title?: string;
  description?: string;
  imageHeight?: string;
  contentHeight?: string;
  isOpen?: boolean;
}

function CardMaker({ width = '200px', height = '300px', image='', title='디폴트 제목', description='디폴트 설명', imageHeight = '50%', contentHeight = '50%', isOpen = true }: Props) {
  return (
    <Card sx={{ width: width, height: height, title: title, description : description, borderRadius: '10%', boxShadow: '10px 10px 15px rgba(0,0,0,0.2)' }} draggable="false">
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          sx={{ width: '100%', height: imageHeight }}
          component="img"
          image={image}
          alt="기본이미지"
        />
        <CardContent sx={{ width: '100%', height: contentHeight }}>
          <Typography gutterBottom variant="h5" 
          component="div"
          sx={{ fontFamily: 'Noto Sans KR' }}>
            {title}
          </Typography>
          <Typography variant="body2" 
          color="text.secondary"
          sx={{ fontFamily: 'Noto Sans KR' }} >
            {description}
          </Typography>
        </CardContent>
        {!isOpen && (
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.8) 30%)' }} />
        )}
      </CardActionArea>
    </Card>
  );
}

export default CardMaker;
