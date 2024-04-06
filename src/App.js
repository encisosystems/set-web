import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EstimationTool from './pages/home.jsx';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<EstimationTool />} />
      </Routes>
    </Router>
  );
};

export default App;