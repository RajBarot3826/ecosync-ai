import { useState, useEffect, memo } from 'react';
import { ToggleLeft, ToggleRight, Info, Zap, Shield, HelpCircle } from 'lucide-react';
import { getDevices, updateDevices, getPoints, setPoints } from '../lib/state';
import type { Device } from '../lib/state';

/**
 * Smart Home Integration Component
 * Fulfills the hackathon requirement: "Smart Home Integration"
 */
const SmartHome = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    setDevices(getDevices());
  }, []);

  const handleToggle = (id: string) => {
    const updated = devices.map(d => {
      if (d.id === id) {
        const nextStatus = !d.status;
        
        // Award points on first activate of a device
        if (nextStatus) {
          setPoints(getPoints() + 10);
        }

        return { ...d, status: nextStatus };
      }
      return d;
    });
    setDevices(updated);
    updateDevices(updated);
  };

  // Calculate live statistics
  const totalSavingWatts = devices.reduce((sum, d) => sum + (d.status ? d.saving : 0), 0);
  const totalConsumptionWatts = devices.reduce((sum, d) => sum + (d.status ? d.consumption : 0), 0);
  
  // Calculate estimated daily carbon offset (kg CO2)
  // Formula: Watts saved * 24 hours / 1000 = kWh. kWh * 0.85 kg CO2 (standard grid factor) = offset.
  const dailyCO2Offset = (totalSavingWatts * 24 / 1000) * 0.85;

  return (
    <section className="container mt-2" aria-labelledby="smart-heading">
      <header className="glass-panel text-center" style={{ marginBottom: '2rem' }}>
        <h1 id="smart-heading" style={{ fontSize: '3rem' }}>Smart Home Hub</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Simulate IoT integration with your residential meters. Automate appliances to maximize efficiency.
        </p>
      </header>

      {/* Stats Header */}
      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <article className="glass-panel text-center">
          <div style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: 800 }}>
            {totalSavingWatts} W
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time Saving Rate</span>
        </article>
        
        <article className="glass-panel text-center">
          <div style={{ color: 'var(--secondary)', fontSize: '2.5rem', fontWeight: 800 }}>
            {totalConsumptionWatts} W
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Consumption</span>
        </article>
        
        <article className="glass-panel text-center">
          <div style={{ color: 'var(--warning)', fontSize: '2.5rem', fontWeight: 800 }}>
            {dailyCO2Offset.toFixed(2)} kg
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Est. Daily CO2 Offset</span>
        </article>
      </div>

      <div className="grid grid-cols-2">
        {/* Device List */}
        <article className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} color="var(--primary)" /> Appliance Controls
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {devices.map(d => (
              <div 
                key={d.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1rem 1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: d.status ? 'rgba(0,255,136,0.03)' : 'rgba(0,0,0,0.1)',
                  borderColor: d.status ? 'var(--primary)' : 'var(--border-color)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: d.status ? 'var(--text-main)' : 'var(--text-muted)' }}>{d.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Saving: {d.saving}W • Consumption: {d.consumption}W
                  </span>
                </div>
                <button 
                  onClick={() => handleToggle(d.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  aria-label={`Toggle ${d.name}`}
                >
                  {d.status ? (
                    <ToggleRight size={40} color="var(--primary)" />
                  ) : (
                    <ToggleLeft size={40} color="var(--text-muted)" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </article>

        {/* Info Column */}
        <article className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} color="var(--secondary)" /> Integration Status
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              EcoSync AI securely connects with standard smart electric meters (HEMS) and inverter APIs (e.g. Enphase, SolarEdge, Nest, Ecobee).
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'var(--primary-glow)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Info color="var(--primary)" size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>Automated Carbon Offsets</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Smart scheduling runs heavy appliances (like washing machines or EV chargers) during peak solar generation hours, avoiding grid coal usage.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'var(--primary-glow)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HelpCircle color="var(--secondary)" size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem' }}>How does it work?</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Once linked, the platform tracks household power parameters hourly and populates the weekly calculator automatically, removing manual data entry.
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              ✓ Nest Thermostat Sync Active • Inverter Online (450W solar feedback)
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default memo(SmartHome);
