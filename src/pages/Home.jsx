import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import wm from '../data/wm.json'

// Countdown to 06.06.2026
function Countdown() {
  const target = new Date('2026-06-06T10:00:00')
  const [diff, setDiff] = useState(target - new Date())

  useEffect(() => {
    const t = setInterval(() => setDiff(target - new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  const Block = ({ n, label }) => (
    <div style={{ textAlign: 'center', minWidth: 80 }}>
      <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--gold)', lineHeight: 1 }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
        {label}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 48px)', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Block n={d} label="Tage" />
      <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1.1 }}>:</div>
      <Block n={h} label="Stunden" />
      <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1.1 }}>:</div>
      <Block n={m} label="Minuten" />
      <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1.1 }}>:</div>
      <Block n={s} label="Sekunden" />
    </div>
  )
}

export default function Home() {
  const letzteWM = wm.weltmeister[wm.weltmeister.length - 1]
  const top3Rangliste = wm.weltrangliste.slice(0, 3)
  const top5Tabelle = wm.ewige_tabelle.slice(0, 5)
  const letzteEvents = [...wm.weltmeister].reverse().slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: 'var(--gruen)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'rgba(176,137,45,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '60px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <img src="/trommel.svg" alt="Trommel" style={{ height: 'clamp(60px, 10vw, 100px)', opacity: 0.9 }} />
            </div>

            <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 16 }}>
              06.06.2026 · Édition Jubilaire · 20 Jahre Trommelschießen
            </div>

            <h1 style={{
              fontSize: 'clamp(48px, 10vw, 120px)',
              color: 'var(--white)',
              marginBottom: 8,
            }}>
              10. Trommel&shy;schießen-WM
            </h1>

            <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(255,255,255,0.6)', marginBottom: 64, maxWidth: 600, margin: '16px auto 64px' }}>
              Das Runde muss ins Runde. Seit 2006.
            </p>

            <Countdown />

            <div style={{ marginTop: 64, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--gold">
                Live-Dashboard →
              </a>
              <Link to="/events" className="btn btn--white">
                WM-Archiv ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 40C480 80 240 10 0 20L0 80Z" fill="#f5f0e8"/>
          </svg>
        </div>
      </section>

      {/* TEASER: Letztes Ergebnis */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="eyebrow">Letztes Ergebnis</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--gruen)', marginBottom: 32 }}>
            WM {letzteWM.jahr} · {letzteWM.ort.split('–')[0].trim()}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { label: 'Weltmeister', value: letzteWM.sieger, icon: '🏆' },
              { label: 'Torschützenkönig', value: `${letzteWM.torschuetzenkoenig} (${letzteWM.tore} Tore)`, icon: '👑' },
              { label: 'Teilnehmer', value: letzteWM.teilnehmer, icon: '👥' },
              { label: 'Punkte (Sieger)', value: `${letzteWM.punkte} Pkt. in ${letzteWM.spiele} Spielen`, icon: '📊' },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--gruen)', fontFamily: 'Bayon, sans-serif' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to={`/events/${letzteWM.jahr}`} className="btn btn--outline">Zur Abschlusstabelle →</Link>
          </div>
        </div>
      </section>

      {/* TEASER: Weltrangliste */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">Weltrangliste</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 8 }}>Die besten Trommler aller Zeiten</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>Basierend auf WM-Platzierungen seit 2006</p>
              <Link to="/statistiken/weltrangliste" className="btn btn--outline">Vollständige Rangliste →</Link>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr><th>Pl.</th><th>Trommler</th><th className="num">Punkte</th></tr>
                </thead>
                <tbody>
                  {top3Rangliste.map((r, i) => (
                    <tr key={r.name}>
                      <td className="rank">{['🥇','🥈','🥉'][i]}</td>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td className="num pts">{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: Ewige Tabelle */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr><th>Pl.</th><th>Trommler</th><th className="num">Sp</th><th className="num">Pkt</th></tr>
                </thead>
                <tbody>
                  {top5Tabelle.map((r, i) => (
                    <tr key={r.name}>
                      <td className="rank">{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{i === 0 ? '🏆 ' : ''}{r.name}</td>
                      <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                      <td className="num pts">{r.pkt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="eyebrow">Ewige Tabelle</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 8 }}>Alle Spiele, alle Punkte</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>56 Trommler in der ewigen Wertung – von 2006 bis heute</p>
              <Link to="/statistiken/ewige-tabelle" className="btn btn--outline">Alle 56 Trommler →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: WM-Events */}
      <section className="section" style={{ background: 'var(--gruen)' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>WM-Archiv</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--white)', marginBottom: 40 }}>9 Turniere · 9 Weltmeister</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {letzteEvents.map(e => (
              <Link key={e.jahr} to={`/events/${e.jahr}`} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                transition: 'all 0.2s',
                display: 'block',
              }}
                onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.14)'; ev.currentTarget.style.borderColor = 'rgba(176,137,45,0.4)' }}
                onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.08)'; ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 40, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 18, marginTop: 8 }}>{e.sieger}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{e.ort} · {e.teilnehmer} Teilnehmer</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link to="/events" className="btn btn--white">Alle WMs ansehen →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
