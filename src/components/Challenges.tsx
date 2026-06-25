import { useState, memo } from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { getChallenges, updateChallenges, getPoints, setPoints, getCarbonScore, setCarbonScore } from '../lib/state';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  joined: boolean;
  completed: boolean;
  progress: number;
  total: number;
}

/**
 * Carbon Reduction Challenges Component
 * Fulfills the hackathon requirement: "Carbon Reduction Challenges"
 */
const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(() => getChallenges());

  const handleJoin = (id: string) => {
    const updated = challenges.map(ch => {
      if (ch.id === id) {
        return { ...ch, joined: true };
      }
      return ch;
    });
    setChallenges(updated);
    updateChallenges(updated);
  };

  const handleLogProgress = (id: string) => {
    const updated = challenges.map(ch => {
      if (ch.id === id) {
        const nextProgress = ch.progress + 1;
        const isCompleted = nextProgress >= ch.total;
        
        if (isCompleted && !ch.completed) {
          // Award points and boost carbon score
          setPoints(getPoints() + ch.points);
          setCarbonScore(Math.min(1000, getCarbonScore() + 20));
        }

        return {
          ...ch,
          progress: Math.min(ch.total, nextProgress),
          completed: isCompleted
        };
      }
      return ch;
    });
    setChallenges(updated);
    updateChallenges(updated);
  };

  return (
    <section className="container mt-2" aria-labelledby="challenges-heading">
      <header className="glass-panel text-center" style={{ marginBottom: '2rem' }}>
        <h1 id="challenges-heading" style={{ fontSize: '3rem' }}>Carbon Reduction Challenges</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Push your limits, reduce emissions, and earn eco points to redeem rewards.
        </p>
      </header>

      <div className="grid grid-cols-2">
        {challenges.map(ch => (
          <article key={ch.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: ch.completed ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                  {ch.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)', fontWeight: 600 }}>
                  <Award size={16} /> +{ch.points} pts
                </span>
              </header>
              <h3>{ch.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>{ch.description}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              {ch.joined && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Progress</span>
                    <span>{ch.progress} / {ch.total}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(ch.progress / ch.total) * 100}%`, height: '100%', background: ch.completed ? 'var(--primary)' : 'var(--secondary)', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              )}

              {ch.completed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <ShieldCheck size={20} /> Challenge Completed!
                </div>
              ) : ch.joined ? (
                <button 
                  onClick={() => handleLogProgress(ch.id)} 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
                >
                  Log Daily Progress
                </button>
              ) : (
                <button 
                  onClick={() => handleJoin(ch.id)} 
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
                >
                  Join Challenge
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(Challenges);
