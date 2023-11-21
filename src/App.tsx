import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar.tsx';
import SearchModal from './Page/SearchModal.tsx';
import CreateCardModal from './Page/CreateCardModal.tsx';
import TestModal from './Page/TestModal.tsx';
import ComparePage from './Page/ComparePage.tsx';
import CardDetail from './Page/CardDetail.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/card" element={<CardDetail />} />
        <Route path="/modal" element={<TestModal />} />

        {/* 다른 라우트들... */}
      </Routes>
    </Router>
  );
}
export default App;
