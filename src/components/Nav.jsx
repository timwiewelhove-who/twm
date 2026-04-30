import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  const isDark = isHome && !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [loc])

  const links = [
    { to: '/events', label: 'WM-Events' },
    { to: '/statistiken', label: 'Statistiken' },
    { to: '/wissenswertes', label: 'Wissenswertes' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(245,240,232,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(28,66,43,0.1)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/trommel.svg" alt="" style={{ height: 36, filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
          <span style={{ fontFamily: 'Bayon, sans-serif', fontSize: 22, color: isDark ? 'white' : 'var(--gruen)', letterSpacing: '0.05em', transition: 'color 0.3s' }}>TRMMLR</span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 15, fontWeight: 600, color: loc.pathname.startsWith(l.to) ? 'var(--gold)' : 'var(--gruen)',
              borderBottom: loc.pathname.startsWith(l.to) ? '2px solid var(--gold)' : '2px solid transparent',
              paddingBottom: 2, transition: 'color 0.15s',
            }}>{l.label}</Link>
          ))}
          <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--primary" style={{ fontSize: 14, padding: '8px 18px' }}>
            Live-Dashboard →
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(o => !o)} className="nav-burger" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: 'var(--gruen)', display: 'none' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{ display: 'block', padding: '12px 0', fontSize: 18, fontFamily: 'Bayon, sans-serif', color: 'var(--gruen)', borderBottom: '1px solid var(--border)' }}>{l.label}</Link>
          ))}
          <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            Live-Dashboard →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
