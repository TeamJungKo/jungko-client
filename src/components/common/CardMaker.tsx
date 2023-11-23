import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface Props {
  cardId?: number;
  width?: string;
  height?: string;
  image?: string;
  title?: string;
  description?: string;
  imageHeight?: string;
  contentHeight?: string;
  isOpen?: number;
  onContextMenu?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  isSelected?: boolean;
}

function CardMaker({ cardId=0, width = '200px', height = '300px', image='', title='디폴트 제목', description='디폴트 설명', imageHeight = '50%', contentHeight = '50%', isOpen = 0, onContextMenu, isSelected=false }: Props) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/card/${cardId}`);
  }  

  let border;
  if (isSelected) {
    border = '4px dashed black';
  } else {
    switch (isOpen) {
      case 0:
        border = '5px outset lightgrey';
        break;
      case 1:
        border = '5px outset lightgreen';
        break;
      case 2:
        border = '5px outset rgb(255, 102, 102)';
        break;
      default:
        border = '5px outset lightgrey';
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
            sx={{ fontFamily: 'Noto Sans KR', whiteSpace: 'pre-line' }} 
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardMaker;
