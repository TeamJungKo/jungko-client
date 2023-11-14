import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar.tsx';
import SearchPage from './Page/SearchPage.tsx';
import CreateCardPage from './Page/CreateCardPage.tsx';
import TestModal from './Page/TestModal.tsx';
import ComparePage from './Page/ComparePage.tsx';
import CardDetail from './Page/CardDetail.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/create" element={<CreateCardPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/card" element={<CardDetail />} />
        {/* 다른 라우트들... */}
      </Routes>
    </Router>
  );
}
export default App;
