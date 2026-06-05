import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gruen-dark, #122d1d)', color: 'rgba(255,255,255,0.7)', padding: '48px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src="/trommel.svg" alt="" style={{ height: 32, opacity: 0.8 }} />
              <span style={{ fontFamily: "'Bayon', sans-serif", fontSize: 20, color: 'var(--gold)', letterSpacing: '0.05em' }}>TRMMLR</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>Trommelschießen-Weltmeisterschaft<br />seit 2006 · Édition Jubilaire 2026</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Navigation</div>
            {[['/', 'Startseite'], ['/events', 'WM-Events'], ['/statistiken', 'Statistiken'], ['/wissenswertes', 'Über']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Live</div>
            <a href="https://live.trommelschiessen.de" target="_blank" rel="noopener" style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Live-Dashboard</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
          <span>© {new Date().getFullYear()} Trommelschießen-WM · Trommel, Trommel, Mors, Mors!</span>
          <Link to="/rechtliches" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Impressum & Datenschutz</Link>
        </div>
      </div>
    </footer>
  )
}
