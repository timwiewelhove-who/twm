import { useParams, Link } from 'react-router-dom'
import wm from '../data/wm.json'

export default function EventDetail() {
  const { jahr } = useParams()
  const event = wm.weltmeister.find(e => String(e.jahr) === jahr)
  const tabelle = wm.abschlusstabellen[jahr]
  const fotos = wm.fotos?.[jahr]

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
      {/* Hero – sauberer grüner Hintergrund, kein Foto */}
      <section style={{
        background: 'var(--gruen)',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/events" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Alle WMs
          </Link>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>{event.datum} · {event.ort}</div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--white)' }}>WM {event.jahr}</h1>
          <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Weltmeister', value: `🏆 ${event.sieger}` },
              { label: 'Torschützenkönig', value: `👑 ${event.torschuetzenkoenig} (${event.tore} Tore)` },
              { label: 'Teilnehmer', value: event.teilnehmer },
              { label: 'Sieger-Punkte', value: `${event.punkte} Pkt.` },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '14px 20px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 20, color: 'var(--gold)' }}>{item.value}</div>
              </div>
            ))}
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
                        {!event.torschuetzenkoenig.includes('&') && r.name === event.torschuetzenkoenig ? '👑 ' : ''}{r.name}
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
            <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>Detaillierte Tabelle folgt</div>
          )}
        </div>
      </section>

      {/* Gruppenfoto – groß, nach der Tabelle */}
      {fotos?.gruppe && (
        <section style={{ background: 'var(--cream)' }}>
          <div className="container" style={{ paddingBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16, paddingTop: 48 }}>
              Die Trommler · WM {event.jahr}
            </div>
          </div>
          <img
            src={fotos.gruppe}
            alt={`Alle Teilnehmer WM ${event.jahr}`}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 600, objectFit: 'cover', objectPosition: 'center 20%' }}
            loading="lazy"
          />
        </section>
      )}

      {/* Extra-Fotos (z.B. WM 2016 mit Henning) */}
      {fotos?.extra && fotos.extra.length > 0 && (
        <section className="section--sm" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Impressionen · WM {event.jahr}</div>
            <div style={{ columns: '2 280px', columnGap: 12 }}>
              {fotos.extra.map((src, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: 12 }}>
                  <img src={src} alt={`WM ${event.jahr}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="section--sm">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {prev ? <Link to={`/events/${prev.jahr}`} className="btn btn--outline">← WM {prev.jahr}</Link> : <div />}
          {next ? <Link to={`/events/${next.jahr}`} className="btn btn--outline">WM {next.jahr} →</Link> : <div />}
        </div>
      </section>
    </div>
  )
}
