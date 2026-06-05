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

const WM_ORTE = [
  { name: 'Hamburg', lat: 53.5748, lng: 9.9595, wms: [2006, 2014, 2016, 2026], label: 'Hamburg' },
  { name: 'Berne', lat: 53.1817, lng: 8.4836, wms: [2008, 2010, 2012, 2018], label: 'Berne' },
  { name: 'Jaderberg', lat: 53.3330, lng: 8.1856, wms: [2024], label: 'Jaderberg' },
  { name: 'Oldenburg', lat: 53.1435, lng: 8.2146, wms: [2022], label: 'Oldenburg' },
]

// Einfache SVG-Karte Norddeutschland
function WMKarte() {
  // Bounding box: lng 7.8-10.5, lat 52.8-54.0
  const minLng = 7.8, maxLng = 10.5, minLat = 52.8, maxLat = 54.0
  const W = 600, H = 280

  function project(lat, lng) {
    const x = ((lng - minLng) / (maxLng - minLng)) * W
    const y = ((maxLat - lat) / (maxLat - minLat)) * H
    return { x, y }
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden', marginBottom: 56 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Küstenlinie grob */}
        <rect width={W} height={H} fill="rgba(28,66,43,0.3)" />
        <text x={W/2} y={H/2} textAnchor="middle" fill="rgba(255,255,255,0.06)" fontSize={48} fontFamily="sans-serif" dy={16}>NORDDEUTSCHLAND</text>

        {/* Verbindungslinien zwischen Orten */}
        {WM_ORTE.map((a, i) => WM_ORTE.slice(i+1).map(b => {
          const pa = project(a.lat, a.lng)
          const pb = project(b.lat, b.lng)
          return <line key={`${a.name}-${b.name}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="rgba(176,137,45,0.15)" strokeWidth={1} strokeDasharray="4 4" />
        }))}

        {/* Punkte */}
        {WM_ORTE.map(ort => {
          const { x, y } = project(ort.lat, ort.lng)
          const size = ort.wms.length
          const r = 8 + size * 4
          return (
            <g key={ort.name}>
              <circle cx={x} cy={y} r={r + 4} fill="rgba(176,137,45,0.15)" />
              <circle cx={x} cy={y} r={r} fill="var(--gold, #b0892d)" opacity={0.9} />
              <text x={x} y={y} textAnchor="middle" dy={5} fontSize={12} fontWeight="700" fill="#1c422b" fontFamily="sans-serif">
                {ort.wms.length}x
              </text>
              <text x={x} y={y + r + 14} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.8)" fontFamily="sans-serif" fontWeight="600">
                {ort.label}
              </text>
              <text x={x} y={y + r + 26} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">
                {ort.wms.join(' · ')}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

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
            {isOverview ? 'Getrommelte Weltgeschichte.' : 'Turniere'}
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
            <>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 16, lineHeight: 1.2 }}>
                  Seit 2006 wird hier Geschichte geschrieben.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720 }}>
                  Was als improvisierter Slam in einem Hamburger Hinterhof begann, ist heute ein Turnier mit Tradition, Archiv und erschreckend detaillierter Statistik. Zehn Auflagen, vier Austragungsorte, zehn Weltmeister.
                </p>
              </div>
              <WMKarte />
            </>
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
                  <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gruen)', marginBottom: 4 }}>📍 {e.ort}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{e.datum} · {e.teilnehmer} Teilnehmer</div>
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
