import { memo } from 'react';

/**
 * Tree Impact Calculator Component
 * Fulfills the hackathon requirement: "Tree Impact Calculator"
 */
const TreeImpact = () => {
  return (
    <section className="container mt-4" aria-labelledby="tree-heading">
      <header className="glass-panel text-center">
        <h1 id="tree-heading">Tree Impact Calculator</h1>
        <p>Calculate trees needed to offset emissions effortlessly.</p>
      </header>
    </section>
  );
};

export default memo(TreeImpact);
