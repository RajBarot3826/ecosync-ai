import { useState, useEffect, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Flame, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPoints, getCarbonScore, getStreak, getLogs } from '../lib/state';
import type { LogEntry } from '../lib/state';

/**
 * Dashboard Component
 * Displays the Real-Time Carbon Score, charts, and AI Twin status.
 * Synced with live localStorage state.
 */
const Dashboard = () => {
  const [score, setScore] = useState<number>(785);
  const [points, setPoints] = useState<number>(2450);
  const [streak, setStreak] = useState<number>(12);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const loadState = () => {
    setScore(getCarbonScore());
    setPoints(getPoints());
    setStreak(getStreak());
    setLogs(getLogs());
  };

  useEffect(() => {
    loadState();
    
    // Add custom event listener for state updates across other components
    window.addEventListener('storage_update', loadState);
    return () => {
      window.removeEventListener('storage_update', loadState);
    };
  }, []);

  return (
    <section className="container mt-2" aria-labelledby="dashboard-heading">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 id="dashboard-heading">My Carbon Hub</h2>
        <div style={{ display: 'flex', gap: '1rem' }} role="group" aria-label="Achievements">
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-label="Total Points">
            <Trophy color="var(--warning)" size={20} aria-hidden="true" />
            <span style={{ fontWeight: 600 }}>{points.toLocaleString()} pts</span>
          </div>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-label="Current Streak">
            <Flame color="var(--danger)" size={20} aria-hidden="true" />
            <span style={{ fontWeight: 600 }}>{streak} Day Streak</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3">
        {/* Main Score Widget */}
        <article className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className="mb-1">Real-Time Score</h3>
          <div className="score-circle" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={1000} aria-label="Real Time Carbon Score">
            <span className="score-value">{score}</span>
            <span className="score-label">{score >= 800 ? 'Elite' : score >= 700 ? 'Excellent' : 'Average'}</span>
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>Top {Math.max(3, Math.round(100 - (score/10)))}% of your city.</p>
        </article>

        {/* Chart Widget */}
        <article className="glass-panel" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-1">Weekly Footprint (kg CO2)</h3>
          <div style={{ height: '300px', width: '100%' }} role="img" aria-label="Line chart showing weekly carbon footprint">
            {logs.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={logs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--primary)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--primary)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="var(--primary)" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: '#0a0e17', stroke: 'var(--primary)', strokeWidth: 2 }} 
                    activeDot={{ r: 8, fill: 'var(--primary)' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-muted)' }}>
                No emission logs found.
              </div>
            )}
          </div>
        </article>
      </div>

      {/* AI Twin Avatar Section */}
      <div className="grid grid-cols-3 mt-2">
        <article className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3>Sustainability Twin Status</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '600px' }}>
              Your digital avatar is currently thriving! The trees in your virtual forest are green, and the air is clear. 
              Keep up the good work to unlock new species for your ecosystem.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <Link to="/smarthome" className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Manage IoT Smart Home
              </Link>
              <Link to="/travel" className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Compare Route Emissions
              </Link>
            </div>
          </div>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,255,136,0.2), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)' }} aria-label="Digital Twin Avatar">
             <Leaf size={50} color="var(--primary)" className="animate-float" aria-hidden="true" />
          </div>
        </article>

        {/* Quick Navigate Cards */}
        <article className="glass-panel flex-col justify-center" style={{ gap: '0.5rem' }}>
          <h4>Active Eco Goals</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try to hit your targets today and unlock badges.</p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/challenges" className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}>
              View Eco Challenges <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default memo(Dashboard);
