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
          <p ref={textRef1} className="main_illust_text text_thinking">대략 어디서 사지? 와 관련된 멘트를 추가.</p>
        </div>
        <div className="illust_wrapper">
          <p ref={textRef2} className="main_illust_text text_worried">여기저기 찾느라 귀찮다는 것을 강조하는 문구</p>
          <img className='main_illust illust_worried' src={illust_worried} alt="설명" />
        </div>
        <div className="illust_wrapper">
          <img className='main_illust illust_platforms' src={platforms} alt="설명" />
          <p ref={textRef3} className="main_illust_text text_platforms">우리 사이트는 플랫폼 3사를 모두 제공함을 강조</p>
        </div>
      </div>
    </>
  );
};

export default SiteIntroduction;
