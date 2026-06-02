import { Link } from 'react-router-dom'
import { useWMData } from '../useWMData'

const TURNIER_TABS = [
  { jahr: 2026, label: 'WM 2026' },
  { jahr: 2024, label: 'WM 2024' },
  { jahr: 2022, label: 'WM 2022' },
  { jahr: 2018, label: 'WM 2018' },
  { jahr: 2016, label: 'WM 2016' },
  { jahr: 2014, label: 'WM 2014' },
  { jahr: 2012, label: 'WM 2012' },
  { jahr: 2010, label: 'WM 2010' },
  { jahr: 2008, label: 'WM 2008' },
  { jahr: 2006, label: 'WM 2006' },
]

export default function Events() {
  const { data: wm, loading } = useWMData()
  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>
  const events = [...wm.weltmeister].reverse()
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '60px 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>Turniere</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'var(--white)', marginBottom: 16 }}>Zehn Mal Weltgeschichte.</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, marginBottom: 32, maxWidth: 560 }}>
            Seit 2006 wird der Trommelschieß-Weltmeister im direkten Duell ermittelt. Hier sind alle Auflagen — von den chaotischen Anfängen bis zur Jubiläums-WM 2026.
          </p>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
            {TURNIER_TABS.map(t => (
              <Link key={t.jahr} to={`/turniere/${t.jahr}`} style={{
                padding: '12px 18px',
                fontSize: 14, fontWeight: 600,
                color: 'rgba(255,255,255,0.6)',
                borderBottom: '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >{t.label}</Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((e) => (
              <Link key={e.jahr} to={`/turniere/${e.jahr}`} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', gap: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', transition: 'all 0.2s' }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = 'var(--gold)'; ev.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)' }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'var(--border)'; ev.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gruen)', marginBottom: 4 }}>🏆 {e.sieger}{e.titel > 1 ? ` (${e.titel}. Titel)` : ''}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{e.ort} · {e.datum} · {e.teilnehmer} Teilnehmer · 👑 {e.torschuetzenkoenig} ({e.tore} Tore)</div>
                </div>
                <div style={{ fontSize: 24, color: 'var(--text-light)' }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
