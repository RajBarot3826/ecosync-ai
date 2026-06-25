import { useState, memo } from 'react';
import { Leaf, Plus, Sparkles } from 'lucide-react';
import { getTreesPlanted, setTreesPlanted, getPoints, setPoints } from '../lib/state';

/**
 * Tree Impact Calculator Component
 * Fulfills the hackathon requirement: "Tree Impact Calculator"
 */
const TreeImpact = () => {
  const [trees, setTrees] = useState<number>(() => getTreesPlanted());
  const [emissions, setEmissions] = useState<number>(110); // Default weekly average
  const [justPlanted, setJustPlanted] = useState<boolean>(false);

  const treesNeeded = Math.ceil(emissions / 22); // A mature tree absorbs 22kg CO2/year

  const handlePlantTree = () => {
    const updatedTrees = trees + 1;
    setTrees(updatedTrees);
    setTreesPlanted(updatedTrees);
    
    // Reward points for offsetting!
    setPoints(getPoints() + 50);

    setJustPlanted(true);
    setTimeout(() => setJustPlanted(false), 2000);
  };

  return (
    <section className="container mt-2" aria-labelledby="tree-heading">
      <div className="grid grid-cols-2">
        {/* Calculator Widget */}
        <article className="glass-panel">
          <header style={{ marginBottom: '2rem' }}>
            <h2 id="tree-heading">Tree Impact Offset</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Understand your environmental impact in terms of natural sequestration. One mature tree absorbs roughly **22 kg of CO2 per year**.
            </p>
          </header>

          <div style={{ marginBottom: '2.5rem' }}>
            <label htmlFor="emission-slider" className="form-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span>Enter Carbon to Offset:</span>
              <strong style={{ color: 'var(--danger)', fontSize: '1.1rem' }}>{emissions} kg CO2</strong>
            </label>
            <input 
              id="emission-slider"
              type="range" 
              min="10" 
              max="500" 
              step="5"
              value={emissions}
              onChange={(e) => setEmissions(parseInt(e.target.value))}
              style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', outline: 'none', cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
          </div>

          <div className="text-center" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '15px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>TREES REQUIRED TO OFFSET FOR 1 YEAR:</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', margin: '0.5rem 0' }}>
              {treesNeeded} {treesNeeded === 1 ? 'Tree' : 'Trees'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Planting these will completely neutralize your selected footprint.
            </p>
          </div>

          <button 
            onClick={handlePlantTree} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Plus size={20} /> Plant Virtual Tree (+50 pts)
          </button>
        </article>

        {/* Forest Widget */}
        <article className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>My Virtual Forest</h3>
              <div style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                <Leaf size={16} /> Total: {trees} Trees
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Each tree planted below represents carbon you have actively offset. Watch your canopy grow!
            </p>

            {/* Tree Grid */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)', 
                gap: '1rem', 
                maxHeight: '260px', 
                overflowY: 'auto', 
                padding: '0.5rem', 
                background: 'rgba(0,0,0,0.1)', 
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}
              role="img" 
              aria-label={`Grid of ${trees} planted trees`}
            >
              {Array.from({ length: trees }).map((_, i) => (
                <div 
                  key={i} 
                  className={i === trees - 1 && justPlanted ? 'animate-float' : ''}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '2rem',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '8px',
                    padding: '0.25rem',
                    transition: 'all 0.5s ease',
                    border: '1px solid rgba(255,255,255,0.02)',
                    animation: i === trees - 1 && justPlanted ? 'pulse-glow 1s infinite' : 'none'
                  }}
                >
                  🌳
                </div>
              ))}
            </div>
          </div>

          {justPlanted && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, marginTop: '1rem' }} aria-live="assertive">
              <Sparkles size={18} /> A new sapling has been planted in your forest!
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default memo(TreeImpact);
