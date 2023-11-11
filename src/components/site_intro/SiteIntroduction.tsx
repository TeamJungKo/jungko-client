import '../../assets/css/siteIntroduction.css';
import illust_thinking from '../../assets/images/illust_thinking.png';
import illust_worried from '../../assets/images/illust_worried.png';
import platforms from '../../assets/images/platforms.png';


const SiteIntroduction = (): React.ReactElement => {

  return (
    <>
      <div className="main_site_introduction">
        <div className="illust_wrapper">
          <img className='main_illust illust_thinking' src={illust_thinking} alt="설명" />
          <p className="main_illust_text text_thinking">대략 어디서 사지? 와 관련된 멘트를 추가.</p>
        </div>
        <div className="illust_wrapper">
          <p className="main_illust_text text_worried">여기저기 찾느라 귀찮다는 것을 강조하는 문구</p>
          <img className='main_illust illust_worried' src={illust_worried} alt="설명" />
        </div>
        <div className="illust_wrapper">
          <img className='main_illust illust_platforms' src={platforms} alt="설명" />
          <p className="main_illust_text text_platforms">우리 사이트는 플랫폼 3사를 모두 제공함을 강조</p>
        </div>
      </div>
    </>
  );
};

export default SiteIntroduction;
