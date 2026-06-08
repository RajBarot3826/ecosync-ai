import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Flame, Leaf, Wind } from 'lucide-react';

const mockData = [
  { name: 'Mon', emissions: 12 },
  { name: 'Tue', emissions: 19 },
  { name: 'Wed', emissions: 15 },
  { name: 'Thu', emissions: 8 },
  { name: 'Fri', emissions: 22 },
  { name: 'Sat', emissions: 30 },
  { name: 'Sun', emissions: 14 },
];

export default function Dashboard() {
  const [score, setScore] = useState(785);

  useEffect(() => {
    // Simulate real-time score updates
    const interval = setInterval(() => {
      setScore(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-2">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>My Carbon Hub</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy color="var(--warning)" size={20} />
            <span style={{ fontWeight: 600 }}>2,450 pts</span>
          </div>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame color="var(--danger)" size={20} />
            <span style={{ fontWeight: 600 }}>12 Day Streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {/* Main Score Widget */}
        <div className="glass-panel text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className="mb-1">Real-Time Score</h3>
          <div className="score-circle">
            <span className="score-value">{score}</span>
            <span className="score-label">Excellent</span>
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>Top 15% of your city.</p>
        </div>

        {/* Chart Widget */}
        <div className="glass-panel" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-1">Weekly Footprint (kg CO2)</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--primary)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: 'var(--bg-dark)', stroke: 'var(--primary)', strokeWidth: 2 }} 
                  activeDot={{ r: 8, fill: 'var(--primary)' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Twin Avatar Section */}
      <div className="glass-panel mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3>Sustainability Twin Status</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '600px' }}>
            Your digital avatar is currently thriving! The trees in your virtual forest are green, and the air is clear. 
            Keep up the good work to unlock new species for your ecosystem.
          </p>
        </div>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,255,136,0.2), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)' }}>
           <Leaf size={60} color="var(--primary)" className="animate-float" />
        </div>
      </div>
    </div>
  );
}
