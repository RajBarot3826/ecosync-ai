import { useState, useEffect, memo } from 'react';
import { Award, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';
import { getPoints, setPoints } from '../lib/state';

interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
  partner: string;
  code?: string;
}

const DEFAULT_REWARDS: RewardItem[] = [
  {
    id: 'r1',
    title: '1-Month City Bus Pass',
    description: 'Get unlimited public transport rides for 30 days. Perfect for switching off your car!',
    cost: 1200,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300',
    partner: 'Metrolink Transit'
  },
  {
    id: 'r2',
    title: 'Eco Bamboo Toothbrush (4-Pack)',
    description: '100% biodegradable organic bamboo toothbrushes with charcoal-infused bristles.',
    cost: 400,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300',
    partner: 'EcoBrush Co.'
  },
  {
    id: 'r3',
    title: '15% Off Solar Panel Setup',
    description: 'Redeem a discount voucher for complete home rooftop solar installation and integration.',
    cost: 2000,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300',
    partner: 'Helios Solar'
  },
  {
    id: 'r4',
    title: 'Plant a Physical Tree',
    description: 'We will plant a native tree in your name in deforested regions and send you coordinates.',
    cost: 800,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300',
    partner: 'OneTreePlanted NGO'
  }
];

const generatePromoCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let promoCode = 'ECO-';
  for (let i = 0; i < 8; i++) {
    if (i === 4) promoCode += '-';
    promoCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return promoCode;
};

/**
 * Green Rewards Marketplace Component
 * Fulfills the hackathon requirement: "Green Rewards Marketplace"
 */
const Rewards = () => {
  const [points, setPointsState] = useState<number>(() => getPoints());
  const [rewards, setRewards] = useState<RewardItem[]>(DEFAULT_REWARDS);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const syncPoints = () => setPointsState(getPoints());
    window.addEventListener('storage_update', syncPoints);
    return () => window.removeEventListener('storage_update', syncPoints);
  }, []);

  const handleRedeem = (id: string, cost: number) => {
    if (points < cost) {
      setErrorMsg("You do not have enough points to redeem this reward.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    const newPoints = points - cost;
    setPointsState(newPoints);
    setPoints(newPoints);

    const promoCode = generatePromoCode();

    setRewards(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, code: promoCode };
      }
      return item;
    }));
  };

  return (
    <section className="container mt-2" aria-labelledby="rewards-heading">
      <header className="glass-panel text-center" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 id="rewards-heading" style={{ fontSize: '3rem', margin: 0 }}>Eco Rewards</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Redeem your hard-earned green points for products and services that protect the planet.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '1rem 2rem', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--primary)' }}>
          <Award size={32} color="var(--primary)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YOUR BALANCE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{points.toLocaleString()} pts</div>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="glass-panel" style={{ background: 'rgba(255, 71, 87, 0.1)', borderColor: 'var(--danger)', color: 'var(--danger)', padding: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }} role="alert">
          <AlertCircle />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-2">
        {rewards.map(item => (
          <article key={item.id} className="glass-panel" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{item.partner}</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{item.description}</p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShoppingBag size={18} /> {item.cost} pts
                </span>

                {item.code ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle size={14} /> Redeemed!
                    </div>
                    <code style={{ fontSize: '0.95rem', background: 'rgba(0,255,136,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--primary)', letterSpacing: '1px', display: 'inline-block', marginTop: '0.25rem' }}>
                      {item.code}
                    </code>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleRedeem(item.id, item.cost)} 
                    className="btn-primary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '10px' }}
                    disabled={points < item.cost}
                  >
                    Redeem
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(Rewards);
