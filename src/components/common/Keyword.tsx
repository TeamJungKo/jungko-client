import { FC } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TagIcon from '@mui/icons-material/Tag';

interface KeywordProps {
  isOpen?: boolean;
}

const Keyword: FC<KeywordProps> = ({ isOpen = true }) => {
  return (
    <Box>
      <Fab
        variant="extended"
        sx={{
          fontFamily: 'Noto Sans KR',
          fontSize: '15px',
          background: isOpen
            ? 'linear-gradient(180deg, rgba(152,251,152,0.8) 0%, rgba(144,238,144,0.8) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(50,50,50,0.8) 100%)'
        }}
      >
        <TagIcon sx={{ mr: 1 }} />
        키워드1
      </Fab>
    </Box>
  );
}

export default Keyword;
