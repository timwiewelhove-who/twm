import { Link, useLocation } from 'react-router-dom'
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
  const loc = useLocation()
  const isOverview = loc.pathname === '/turniere' || loc.pathname === '/turniere/'

  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>

  const events = [...wm.weltmeister].reverse()

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="stats-header-section" style={{ background: 'var(--gruen)', padding: 'clamp(40px, 8vw, 60px) 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>Turniere</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--white)', marginBottom: isOverview ? 0 : 8 }}>
            {isOverview ? 'Zehn Mal Weltgeschichte.' : 'Turniere'}
          </h1>
          {!isOverview && (
            <>
              <div className="subnav-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 28, paddingTop: 8 }}>
                {TURNIER_TABS.map(t => (
                  <Link key={t.jahr} to={`/turniere/${t.jahr}`} style={{
                    padding: '7px 16px', fontSize: 13, fontWeight: 600,
                    borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)',
                    background: 'transparent', color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                  >{t.label}</Link>
                ))}
              </div>
              <style>{`@media (max-width: 700px) { .subnav-pills { display: none !important; } .stats-header-section { padding-bottom: 40px !important; } }`}</style>
            </>
          )}
          {isOverview && <div style={{ paddingBottom: 40 }} />}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {isOverview && (
            <div style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 16, lineHeight: 1.2 }}>
                Seit 2006 wird hier Geschichte geschrieben.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720 }}>
                Was als improvisierter Slam in einem Hamburger Hinterhof begann, ist heute ein Turnier mit Tradition, Archiv und erschreckend detaillierter Statistik. Zehn Auflagen, zehn Weltmeister, zehn Geschichten. Hier sind sie alle — von den chaotischen Anfängen 2006 bis zur Jubiläums-WM 2026, bei der niemand behaupten kann, er wäre nicht gewarnt worden.
              </p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map(e => (
              <Link key={e.jahr} to={`/turniere/${e.jahr}`} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr auto',
                alignItems: 'center', gap: 24,
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '24px 28px', transition: 'all 0.2s',
              }}
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
