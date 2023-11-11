import jungkoLogo from '../../assets/images/jungkoLogo.png';

function Logo() {

  const logoStyle: React.CSSProperties = {
    width: '150px', 
    height: '150px', 
    objectFit: 'contain',
    padding: '30px 20px 0px 40px',
  }

  return (
    <img src={jungkoLogo} alt="중코거래" style={logoStyle}></img>
  );
}

export default Logo;
