import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ManualEntry from './pages/ManualEntry';
import GlobalInsights from './pages/GlobalInsights';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Gradients - For that Futuristic Look */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full z-[-1]"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full z-[-1]"></div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manual-input" element={<ManualEntry />} />
          <Route path="/insights" element={<GlobalInsights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;