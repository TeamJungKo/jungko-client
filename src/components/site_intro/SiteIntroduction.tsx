import { useEffect, useRef } from 'react';
import '../../assets/css/siteIntroduction.css';
import illust_thinking from '../../assets/images/illust_thinking.png';
import illust_worried from '../../assets/images/illust_worried.png';
import platforms from '../../assets/images/platforms.png';

const SiteIntroduction = (): React.ReactElement => {

  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const textRef3 = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!textRef1.current || !textRef2.current || !textRef3.current) return;
      const { top: top1 } = textRef1.current.getBoundingClientRect();
      const { top: top2 } = textRef2.current.getBoundingClientRect();
      const { top: top3 } = textRef3.current.getBoundingClientRect();
    
      if (top1 <= window.innerHeight) textRef1.current.classList.add('visible');
      if (top2 <= window.innerHeight) textRef2.current.classList.add('visible');
      if (top3 <= window.innerHeight) textRef3.current.classList.add('visible');
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <>
      <div className="main_site_introduction">
        <div className="illust_wrapper">
          <img className='main_illust illust_thinking' src={illust_thinking} alt="설명" />
          <p ref={textRef1} className="main_illust_text text_thinking">
            어디서 좋은 상품을 
            <br/>
            찾을 수 있을지 고민이신가요?
            <br/><br/>
            중코거래에서 원하는 상품들을
            <br/>
            한 번에 찾아보세요.
          </p>
        </div>
        <div className="illust_wrapper">
          <p ref={textRef2} className="main_illust_text text_worried">
            여러 플랫폼을 돌아다니며
            <br/>
            원하는 물건 찾는 일에
            <br/>
            지치셨나요?
            <br/><br/>
            중코거래에서 더 이상의 
            <br/>
            번거로움은 없습니다.
          </p>
          <img className='main_illust illust_worried' src={illust_worried} alt="설명" />
        </div>
        <div className="illust_wrapper">
          <img className='main_illust illust_platforms' src={platforms} alt="설명" />
          <p ref={textRef3} className="main_illust_text text_platforms">
            중코거래는 
            <br/>
            당근마켓, 번개장터, 중고나라 등
            <br/>
            대표 중고 플랫폼 3사의 상품 정보를
            <br/>
            모두 한눈에 볼 수 있습니다.
            <br/><br/>
            이제 중코거래에서
            <br/>효율적인 중고 거래를 경험해보세요!
          </p>
        </div>
      </div>
    </>
  );
};

export default SiteIntroduction;
