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
  imageUrl?: string;
  title?: string;
  description?: string;
  imageHeight?: string;
  contentHeight?: string;
  isOpen?: string;
  onContextMenu?: (event: React.MouseEvent) => void;
  onClick?: () => void; 
  style?: React.CSSProperties;
  isSelected?: boolean;
}

function CardMaker({ cardId=0, width = '200px', height = '300px', imageUrl='', title='', description='', imageHeight = '50%', contentHeight = '50%', isOpen = 'DEFAULT', onContextMenu, onClick, isSelected=false }: Props) {

  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/card/${cardId}`);
    }
  }

  let border;
  if (isSelected) {
    border = '5px dashed black';
  } else {
    switch (isOpen) {
      case 'DEFAULT':
        border = '5px outset lightgrey';
        break;
      case 'PUBLIC':
        border = '5px outset lightgreen';
        break;
      case 'PRIVATE':
        border = '5px outset darkred';
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
          image={imageUrl}
          alt="기본이미지"
        />
        <CardContent sx={{ width: '100%', height: contentHeight, padding: '0px' }}>
          <Typography gutterBottom variant="h5" 
          component="div"
          sx={{ fontFamily: 'Noto Sans KR', padding: '10px 0px 10px 10px' }}>
            {title}
          </Typography>
          <Typography variant="body2" 
            color="text.secondary"
            sx={{ 
              fontFamily: 'Noto Sans KR', 
              whiteSpace: 'pre-line', 
              fontSize: '10px', 
              padding: '0px 0px 0px 10px' 
            }}
            width={"95%"}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardMaker;
