import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Activity, Globe } from 'lucide-react';

/**
 * Landing Page Component
 * Introduces the platform to users. Highly accessible semantic HTML.
 */
const LandingPage = () => {
  return (
    <section className="container mt-4" aria-labelledby="landing-heading">
      <header className="text-center animate-float">
        <h1 id="landing-heading" style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>
          Your Personal <br/>AI Sustainability Twin
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Track, reduce, and offset your carbon footprint with intelligent insights and gamified challenges powered by Google Gemini.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn-primary" aria-label="Start Tracking your footprint">
            Start Tracking <ArrowRight size={20} aria-hidden="true" />
          </Link>
          <a href="#features" className="btn-outline" aria-label="Learn more about features">
            Learn More
          </a>
        </div>
      </header>

      <section id="features" className="grid grid-cols-3 mt-4" style={{ marginTop: '6rem', marginBottom: '6rem' }} aria-label="Key Features">
        <article className="glass-panel text-center">
          <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }} aria-hidden="true">
            <Activity color="var(--primary)" size={30} />
          </div>
          <h3>Real-Time Score</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Get a dynamic credit-score-style metric that updates instantly as you log daily activities.</p>
        </article>
        
        <article className="glass-panel text-center">
          <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }} aria-hidden="true">
            <Globe color="var(--secondary)" size={30} />
          </div>
          <h3>Digital Avatar</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Watch your digital twin thrive in a lush environment or degrade based on your carbon habits.</p>
        </article>
        
        <article className="glass-panel text-center">
          <div style={{ background: 'var(--primary-glow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }} aria-hidden="true">
            <Leaf color="var(--primary)" size={30} />
          </div>
          <h3>Gemini AI Coach</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Receive personalized, context-aware suggestions to reduce emissions without compromising your lifestyle.</p>
        </article>
      </section>
    </section>
  );
}

export default memo(LandingPage);
