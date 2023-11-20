interface Props {
  title: string;
  fontSize?: string;
  backgroundHeight?: string;
  children?: React.ReactNode;
}

function TitleMaker({ title, fontSize = '50px', backgroundHeight = '90%', children }: Props) {

  const topStyle = {
    height: fontSize,
    width: '100%',
    marginTop: '50px', 
    textAlign: 'center' as const 
  }

  const backgroundStyle = {
    background: 'linear-gradient(white, skyblue)',
    width: '100%',
    height: backgroundHeight,
  };

  const fontStyle = {
    fontSize: fontSize,
    fontFamily: 'Gugi',
    whiteSpace: 'nowrap' as const
  }

  return (
    <>
      <div className="top" style={topStyle}>
        <span className="head_title" style={fontStyle}>{title}</span>
      </div>
      <div className="background" style={backgroundStyle}>
        {children}
      </div>
    </>
  );
}

export default TitleMaker;
