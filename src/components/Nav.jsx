import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    to: '/events',
    label: 'WM-Events',
    children: [
      { to: '/events/2024', label: 'WM 2024 · Jaderberg' },
      { to: '/events/2022', label: 'WM 2022 · Oldenburg' },
      { to: '/events/2018', label: 'WM 2018 · Berne' },
      { to: '/events/2016', label: 'WM 2016 · Hamburg' },
      { to: '/events/2014', label: 'WM 2014 · Hamburg' },
      { to: '/events/2012', label: 'WM 2012 · Berne' },
      { to: '/events/2010', label: 'WM 2010 · Berne' },
      { to: '/events/2008', label: 'WM 2008 · Berne' },
      { to: '/events/2006', label: 'WM 2006 · Hamburg' },
      { to: '/events', label: '→ Alle WMs', divider: true },
    ]
  },
  {
    to: '/statistiken',
    label: 'Statistiken',
    children: [
      { to: '/statistiken/weltrangliste', label: 'Weltrangliste' },
      { to: '/statistiken/ewige-tabelle', label: 'Ewige Tabelle' },
      { to: '/statistiken/champs', label: 'Alle Weltmeister' },
      { to: '/statistiken/ballermann', label: 'Ballermänner' },
      { to: '/statistiken/schiessbude', label: 'Schießbuden' },
      { to: '/statistiken/dinos', label: 'Dinos' },
    ]
  },
  {
    to: '/wissenswertes',
    label: 'Wissenswertes',
    children: [
      { to: '/wissenswertes/historie', label: 'Historie' },
      { to: '/wissenswertes/regelwerk', label: 'Regelwerk' },
    ]
  },
]

function DropdownItem({ item, isDark, onClose }) {
  const loc = useLocation()
  const active = loc.pathname === item.to
  return (
    <Link
      to={item.to}
      onClick={onClose}
      style={{
        display: 'block',
        padding: item.divider ? '10px 20px 12px' : '9px 20px',
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        color: active ? 'var(--gold)' : 'var(--gruen)',
        borderTop: item.divider ? '1px solid var(--border)' : 'none',
        marginTop: item.divider ? 4 : 0,
        transition: 'background 0.1s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {item.label}
    </Link>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  const isDark = isHome && !scrolled
  const timeoutRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); setActiveDropdown(null) }, [loc])

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(245,240,232,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(28,66,43,0.1)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/trommel.svg" alt="" style={{ height: 36, filter: isDark ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.3s' }} />
          <span style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 22, color: isDark ? 'white' : 'var(--gruen)', letterSpacing: '0.05em', transition: 'color 0.3s' }}>TRMMLR</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-links">
          {NAV_ITEMS.map(item => {
            const isActive = loc.pathname.startsWith(item.to)
            const showDrop = activeDropdown === item.label
            return (
              <div key={item.to} style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}>
                <Link to={item.to} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '8px 14px',
                  fontSize: 15, fontWeight: 600,
                  color: isActive ? 'var(--gold)' : isDark ? 'rgba(255,255,255,0.85)' : 'var(--gruen)',
                  borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  paddingBottom: 6, transition: 'color 0.15s',
                }}>
                  {item.label}
                  <span style={{ fontSize: 10, opacity: 0.6, marginTop: 1 }}>▾</span>
                </Link>
                {/* Dropdown */}
                {showDrop && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: 'white',
                    borderRadius: 10,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    minWidth: 200,
                    paddingTop: 6, paddingBottom: 6,
                    zIndex: 200,
                  }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}>
                    {item.children.map(child => (
                      <DropdownItem key={child.to} item={child} isDark={false} onClose={() => setActiveDropdown(null)} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--primary" style={{ fontSize: 14, padding: '8px 18px', marginLeft: 8 }}>
            Live →
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(o => !o)} className="nav-burger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: isDark ? 'white' : 'var(--gruen)', display: 'none' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', maxHeight: '80vh', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <div key={item.to}>
              <Link to={item.to} style={{ display: 'block', padding: '14px 24px 6px', fontSize: 18, fontFamily: "TrommelHead, 'Bayon', sans-serif", color: 'var(--gruen)', letterSpacing: '0.03em', borderBottom: '1px solid var(--border)' }}>
                {item.label}
              </Link>
              {item.children.map(child => (
                !child.divider && (
                  <Link key={child.to} to={child.to} style={{ display: 'block', padding: '10px 24px 10px 36px', fontSize: 14, color: 'var(--text-muted)', borderBottom: '1px solid rgba(28,66,43,0.06)' }}>
                    {child.label}
                  </Link>
                )
              ))}
            </div>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
              Live-Dashboard →
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
