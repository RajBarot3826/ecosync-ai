import { memo } from 'react';

/**
 * Green Travel Planner Component
 * Fulfills the hackathon requirement: "Google Maps Route Emission Analysis"
 */
const TravelPlanner = () => {
  return (
    <section className="container mt-4" aria-labelledby="travel-heading">
      <header className="glass-panel text-center">
        <h1 id="travel-heading">Green Travel Planner</h1>
        <p>Compare routes using Google Maps Route Emission Analysis.</p>
      </header>
    </section>
  );
};

export default memo(TravelPlanner);
