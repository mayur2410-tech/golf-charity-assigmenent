import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Target, Heart, Trophy, Users,
  Dice5, BookOpen, ChevronRight, LogOut, Settings,
  BarChart2, X, Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const userLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/scores', icon: Target, label: 'My Scores' },
  { to: '/dashboard/charity', icon: Heart, label: 'Charity' },
  { to: '/dashboard/winnings', icon: Trophy, label: 'Winnings' },
];

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/draw', icon: Dice5, label: 'Draw Control' },
  { to: '/admin/charities', icon: Heart, label: 'Charities' },
  { to: '/admin/winners', icon: Trophy, label: 'Winners' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
];

export default function Sidebar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = user?.role === 'admin' ? adminLinks : userLinks;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          position: 'fixed', top: 16, left: 16, zIndex: 100,
          background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: 10, padding: '8px', color: 'white', cursor: 'pointer',
        }}
        id="sidebar-toggle"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 39 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 0 20px rgba(59,130,246,0.4)',
            }}>
              ⛳
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'white', fontSize: '1rem' }}>
                Golf<span className="gradient-text">Win</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </div>
            </div>
          </div>
        </div>

        {/* User info */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.85rem', color: 'white', flexShrink: 0,
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {user?.subscriptionStatus === 'active' ? (
                  <span className="badge badge-active" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>● Active</span>
                ) : (
                  <span className="badge badge-inactive" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>● Inactive</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav style={{ padding: '16px 16px', flex: 1 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingLeft: 8 }}>
            Navigation
          </div>
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
          <button
            onClick={handleLogout}
            className="sidebar-link"
            style={{ width: '100%', background: 'none', border: 'none', color: '#f87171' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sidebar-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
