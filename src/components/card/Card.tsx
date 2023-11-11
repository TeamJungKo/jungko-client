import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  width: number;
  height: number;
  image: string;
  title: string;
  description: string;
  imageHeight?: string; //옵션으로 카드의 이미지 비율 조정 가능
  contentHeight?: string; //옵션으로 카드의 텍스트 비율 조정 가능 카드를 꽉채우기 위해 (100-이미지높이)% 로 할것
}

function CardMaker({ width, height, image, title, description, imageHeight = '50%', contentHeight = '50%' }: Props) {
  return (
    <Card sx={{ width: width, height: height, title: title, description : description, borderRadius: '10%' }} draggable="false">
      <CardActionArea sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          sx={{ width: '100%', height: imageHeight }}
          component="img"
          image={image}  // imageSrc (URL) 사용
          alt="기본이미지" //디폴트이미지 넣을경우 여기에 넣음
        />
        <CardContent sx={{ width: '100%', height: contentHeight }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardMaker;
