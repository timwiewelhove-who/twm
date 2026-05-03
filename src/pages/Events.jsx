import { Link } from 'react-router-dom'
import { PlateIcon } from '../components/PlateIcon'
import wm from '../data/wm.json'

export default function Events() {
  const events = [...wm.weltmeister].reverse()

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '80px 0 60px' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Geschichte</div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--white)' }}>WM-Events</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, marginTop: 12 }}>9 Turniere seit 2006 · 20 Jahre Trommelschießen</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((e, i) => (
              <Link key={e.jahr} to={`/events/${e.jahr}`} style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                alignItems: 'center',
                gap: 24,
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = 'var(--gold)'; ev.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)' }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'var(--border)'; ev.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gruen)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <PlateIcon size={18} color='var(--gold)' /> {e.sieger} {e.titel === 1 ? '' : `(${e.titel}. Titel)`}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                    {e.ort} · {e.datum} · {e.teilnehmer} Teilnehmer · 👑 {e.torschuetzenkoenig} ({e.tore} Tore)
                  </div>
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
