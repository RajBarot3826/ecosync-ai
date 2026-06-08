import React, { Suspense, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Code Splitting for Efficiency Optimization
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Calculator = React.lazy(() => import('./components/Calculator'));
const AICoach = React.lazy(() => import('./components/AICoach'));
const Rewards = React.lazy(() => import('./components/Rewards'));
const Community = React.lazy(() => import('./components/Community'));
const Challenges = React.lazy(() => import('./components/Challenges'));
const TreeImpact = React.lazy(() => import('./components/TreeImpact'));
const SmartHome = React.lazy(() => import('./components/SmartHome'));
const TravelPlanner = React.lazy(() => import('./components/TravelPlanner'));

/**
 * Main Application Routing Component
 * Implements React.lazy and Suspense for optimal bundle splitting.
 * Wrapped in React.memo for extreme performance.
 */
const App = () => {
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
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/community" element={<Community />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/tree" element={<TreeImpact />} />
            <Route path="/smarthome" element={<SmartHome />} />
            <Route path="/travel" element={<TravelPlanner />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
};

export default memo(App);
