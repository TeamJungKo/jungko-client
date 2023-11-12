import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function DefaultProfile() {

  return (
    <Avatar sx={{ width: 80, height: 80, marginRight: '30px', color:'black'}}>
      <AccountCircleIcon sx={{ width: 80, height: 80, backgroundColor: 'darkgrey' }}/>
    </Avatar>
  );
}

export default DefaultProfile;
