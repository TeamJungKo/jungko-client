import { useNavigate } from 'react-router-dom';
import { CardActionArea, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface Props {
  width?: string;
  height?: string;
  image?: string;
  title?: string;
  description?: string;
  imageHeight?: string;
  contentHeight?: string;
  url?:string
  isOpen?: number;
  isOpen2?: boolean; //둘중하나 삭제 <- 이게 명암대비
  onContextMenu?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  isSelected?: boolean;
}

function CardMaker({ width = '200px', height = '300px', image='', title='디폴트 제목', description='디폴트 설명', imageHeight = '50%', contentHeight = '50%', url = '', isOpen = 0, isOpen2 = true, onContextMenu, isSelected=false }: Props) {

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    navigate(url);
  }

  let border;
  if (isSelected) {
    border = 'dotted';
  } else {
    switch (isOpen) {
      case 0:
        border = 'none';
        break;
      case 1:
        border = '3px outset lightgreen';
        break;
      case 2:
        border = '3px outset rgb(255, 102, 102)';
        break;
      default:
        border = 'none';
    }
  }

  return (
    <Card sx={{ width: width, height: height, title: title, description : description, borderRadius: '10%', boxShadow: '10px 10px 15px rgba(0,0,0,0.2)', border: border }} draggable="false" onClick={handleClick} onContextMenu={onContextMenu}>
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
        {!isOpen2 && (
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.8) 30%)' }} />
        )}
      </CardActionArea>
    </Card>
  );
}

export default CardMaker;
