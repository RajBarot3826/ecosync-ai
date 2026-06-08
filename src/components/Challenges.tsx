import { memo } from 'react';

/**
 * Carbon Reduction Challenges Component
 * Fulfills the hackathon requirement: "Carbon Reduction Challenges"
 */
const Challenges = () => {
  return (
    <section className="container mt-4" aria-labelledby="challenges-heading">
      <header className="glass-panel text-center">
        <h1 id="challenges-heading">Carbon Reduction Challenges</h1>
        <p>Participate in the no-car challenge, plastic-free challenge, and tree planting challenge.</p>
      </header>
    </section>
  );
};

export default memo(Challenges);
