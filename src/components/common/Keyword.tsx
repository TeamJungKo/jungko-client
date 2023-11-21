import { FC } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TagIcon from '@mui/icons-material/Tag';

interface KeywordProps {
  keyword: string;
  isOpen?: boolean;
  onContextMenu?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
}

const Keyword: FC<KeywordProps> = ({ keyword, isSelected, isOpen = true, onContextMenu }) => {
  return (
    <Box 
      onContextMenu={onContextMenu}
      sx={{ 
        border: isSelected ? '3px dashed black' : 'none',
        borderRadius: '28px'
      }}>
      <Fab
        variant="extended"
        sx={{
          fontFamily: 'Noto Sans KR',
          fontSize: '15px',
          background: isOpen
            ? 'linear-gradient(180deg, rgba(152,251,152,0.8) 0%, rgba(144,238,144,0.8) 100%)'
            : 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.8) 5%)'
        }}
      >
        <TagIcon sx={{ mr: 1 }} />
        {keyword}
      </Fab>
    </Box>
  );
}

export default Keyword;
