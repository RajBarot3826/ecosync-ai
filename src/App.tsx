import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Code Splitting for Efficiency Optimization
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Calculator = React.lazy(() => import('./components/Calculator'));
const AICoach = React.lazy(() => import('./components/AICoach'));

/**
 * Main Application Routing Component
 * Implements React.lazy and Suspense for optimal bundle splitting.
 */
function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="container mt-4 text-center" aria-live="polite">Loading EcoSync AI...</div>}>
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/coach" element={<AICoach />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
