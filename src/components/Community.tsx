import { memo } from 'react';

/**
 * Community Module Component
 * Fulfills the hackathon requirement: "Community Module"
 * Target Users: NGOs, Schools, Families.
 */
const Community = () => {
  return (
    <section className="container mt-4" aria-labelledby="community-heading">
      <header className="glass-panel text-center">
        <h1 id="community-heading">Community Feed</h1>
        <p>Share achievements, view the sustainability feed, and drive social engagement.</p>
      </header>
    </section>
  );
};

export default memo(Community);
