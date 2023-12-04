import { FC } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TagIcon from '@mui/icons-material/Tag';

interface KeywordProps {
  keyword: string;
  onContextMenu?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
}

const KeywordMaker: FC<KeywordProps> = ({ keyword, isSelected, onContextMenu }) => {
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
          background: '#e0e0e0'
        }}
      >
        <TagIcon sx={{ mr: 1 }} />
        {keyword}
      </Fab>
    </Box>
  );
}

export default KeywordMaker;
