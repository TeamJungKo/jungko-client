import { Avatar, ButtonBase } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ChangeEvent, useRef, useState } from 'react';

function DefaultProfile({ onImageChange }: { onImageChange: (image: string | null) => void }) {
  
  const [image, setImage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };  
  

  const handleClick = () => {
    fileInput.current?.click();
  };

  return (
    <>
      <input type="file" hidden ref={fileInput} onChange={handleFileChange} />
      <ButtonBase onClick={handleClick}>
        <Avatar sx={{ width: 80, height: 80, marginRight: '30px', color:'black'}}>
          {image ? <img src={image} alt="profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} /> : <AccountCircleIcon sx={{ width: 80, height: 80, backgroundColor: 'darkgrey' }}/>}
        </Avatar>
      </ButtonBase>
    </>
  );
}

export default DefaultProfile;
