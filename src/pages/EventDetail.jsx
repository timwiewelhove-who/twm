import { useParams, Link } from 'react-router-dom'
import wm from '../data/wm.json'

export default function EventDetail() {
  const { jahr } = useParams()
  const event = wm.weltmeister.find(e => String(e.jahr) === jahr)
  const tabelle = wm.abschlusstabellen[jahr]

  if (!event) return (
    <div style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>WM {jahr} nicht gefunden</h2>
      <Link to="/events" className="btn btn--primary" style={{ marginTop: 16, display: 'inline-flex' }}>← Zurück</Link>
    </div>
  )

  const idx = wm.weltmeister.findIndex(e => String(e.jahr) === jahr)
  const prev = wm.weltmeister[idx - 1]
  const next = wm.weltmeister[idx + 1]

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: 'var(--gruen)', padding: '80px 0 60px' }}>
        <div className="container">
          <Link to="/events" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Alle WMs
          </Link>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>{event.datum} · {event.ort}</div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--white)' }}>WM {event.jahr}</h1>
          <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Weltmeister</div>
              <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 24, color: 'var(--gold)' }}>🏆 {event.sieger}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Torschützenkönig</div>
              <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 24, color: 'var(--gold)' }}>👑 {event.torschuetzenkoenig} ({event.tore} Tore)</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Teilnehmer</div>
              <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 24, color: 'var(--white)' }}>{event.teilnehmer}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Sieger-Punkte</div>
              <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 24, color: 'var(--white)' }}>{event.punkte} Pkt.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Abschlusstabelle */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 24 }}>Abschlusstabelle</h2>
          {tabelle ? (
            <div className="card" style={{ overflow: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 48 }}>Pl.</th>
                    <th>Trommler</th>
                    <th className="num">Sp</th>
                    <th className="num">S</th>
                    <th className="num">U</th>
                    <th className="num">N</th>
                    <th className="num">T</th>
                    <th className="num">GG</th>
                    <th className="num">Diff</th>
                    <th className="num">Pkt</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelle.map(r => (
                    <tr key={r.name} style={{ background: r.pl === 1 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                      <td className="rank">{r.pl === 1 ? '🏆' : r.pl}</td>
                      <td style={{ fontWeight: r.pl <= 3 ? 700 : 400 }}>
                        {r.name === event.torschuetzenkoenig && !event.torschuetzenkoenig.includes('&') ? '👑 ' : ''}{r.name}
                      </td>
                      <td className="num">{r.sp}</td>
                      <td className="num">{r.s}</td>
                      <td className="num">{r.u}</td>
                      <td className="num">{r.n}</td>
                      <td className="num">{r.t}</td>
                      <td className="num">{r.gg}</td>
                      <td className={`num ${r.diff > 0 ? 'pos' : r.diff < 0 ? 'neg' : ''}`}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
                      <td className="num pts">{r.pkt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>
              Detaillierte Tabelle folgt
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="section--sm">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {prev ? (
            <Link to={`/events/${prev.jahr}`} className="btn btn--outline">← WM {prev.jahr}</Link>
          ) : <div />}
          {next ? (
            <Link to={`/events/${next.jahr}`} className="btn btn--outline">WM {next.jahr} →</Link>
          ) : <div />}
        </div>
      </section>
    </div>
  )
}
