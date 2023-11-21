import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import GuestHomePage from './pages/GuestHomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import MyProfile from './pages/MyProfile.tsx';



import OtherProfile from './pages/OtherProfile.tsx';



import ComparePage from './pages/ComparePage.tsx';
import CardDetail from './pages/CardDetail.tsx';
import CategoryPage from './pages/CategoryPage.tsx';



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div style={{ minWidth: '1280px' }}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<GuestHomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/category" element={<CategoryPage/>} />
          <Route path="/myProfile" element={<MyProfile/>} />
          <Route path="/otherProfile" element={<OtherProfile nickname='Price'/>} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/myCard" element={<CardDetail cardStatus='myCard'/>} />
          <Route path="/interestedCard" element={<CardDetail cardStatus='interestedCard'/>} />
          <Route path="/otherCard" element={<CardDetail cardStatus='otherCard'/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;