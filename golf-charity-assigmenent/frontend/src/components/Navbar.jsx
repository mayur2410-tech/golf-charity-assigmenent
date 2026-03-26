import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GlowButton from './GlowButton';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{ padding: '0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 800,
            boxShadow: '0 0 20px rgba(59,130,246,0.4)',
          }}>
            ⛳
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
            Golf<span className="gradient-text">Win</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'Prizes', id: 'prizes' },
            { label: 'Charities', id: 'charities' },
            { label: 'Pricing', id: 'pricing' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              <GlowButton
                variant="ghost"
                size="sm"
                onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}
              >
                Dashboard
              </GlowButton>
              <GlowButton size="sm" onClick={logoutUser}>Logout</GlowButton>
            </>
          ) : (
            <>
              <GlowButton variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</GlowButton>
              <GlowButton size="sm" onClick={() => navigate('/register')}>Get Started</GlowButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
