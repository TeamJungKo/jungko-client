import InitialTitle from '../components/site_intro/InitialTitle.tsx';
import SiteGuide from '../components/site_intro/SiteGuide.tsx';
import SiteIntroduction from '../components/site_intro/SiteIntroduction.tsx';
import HotCards from '../components/site_intro/HotCards.tsx';
import LoginDirection from '../components/site_intro/LoginDirection.tsx';

function InitialMainPage() {

  return (
    <>
      <InitialTitle/>
      <LoginDirection/>
      <SiteGuide/>
      <SiteIntroduction/>
      <HotCards/>
    </>
  );
}

export default InitialMainPage;