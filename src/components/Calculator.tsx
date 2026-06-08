import { useState } from 'react';
import { Car, Zap, ShoppingBag, Utensils, Info } from 'lucide-react';

export default function Calculator() {
  const [miles, setMiles] = useState('');
  const [electricity, setElectricity] = useState('');
  const [meatMeals, setMeatMeals] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.formEvent && e.preventDefault();
    
    // Simple mock calculation logic for demo
    // Transport: 0.4 kg per mile
    // Electricity: 0.85 kg per kWh
    // Meat meal: 2.5 kg per meal
    const m = parseFloat(miles) || 0;
    const el = parseFloat(electricity) || 0;
    const meat = parseFloat(meatMeals) || 0;

    const total = (m * 0.4) + (el * 0.85) + (meat * 2.5);
    setResult(total);
  };

  return (
    <div className="container mt-2">
      <div className="grid grid-cols-2">
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <h2>Carbon Calculator</h2>
            <Info color="var(--primary)" size={24} />
          </div>
          
          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={16} /> Miles Driven Today
              </label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 15"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={16} /> Electricity Used (kWh)
              </label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 10"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Utensils size={16} /> Meat Meals Eaten
              </label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 2"
                value={meatMeals}
                onChange={(e) => setMeatMeals(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Calculate Footprint
            </button>
          </form>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {result === null ? (
            <div>
              <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3 style={{ color: 'var(--text-muted)' }}>Enter your activities to see your impact.</h3>
            </div>
          ) : (
            <div className="animate-float">
              <h3 style={{ marginBottom: '1rem' }}>Today's Est. Footprint</h3>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--danger)', lineHeight: 1, textShadow: '0 0 20px rgba(255, 71, 87, 0.4)' }}>
                {result.toFixed(1)} <span style={{ fontSize: '1.5rem' }}>kg CO2</span>
              </div>
              <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
                That's equivalent to charging {Math.round(result * 121)} smartphones. <br/>
                Talk to the <strong>AI Coach</strong> for reduction strategies!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
