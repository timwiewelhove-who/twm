import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import wm from '../data/wm.json'

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
    <div style={{ textAlign: 'center', minWidth: 60 }}>
      <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
  const Sep = () => (
    <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1, marginBottom: 18 }}>:</div>
  )

  return (
    <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 32px)', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'nowrap' }}>
      <Block n={d} label="Tage" /><Sep />
      <Block n={h} label="Std" /><Sep />
      <Block n={m} label="Min" /><Sep />
      <Block n={s} label="Sek" />
    </div>
  )
}

// Dinos: in allen 9 WMs dabei
const ALLE_JAHRE = [2006,2008,2010,2012,2014,2016,2018,2022,2024]
function getDinos() {
  const allNames = new Set()
  ALLE_JAHRE.forEach(j => {
    const t = wm.abschlusstabellen[String(j)] || []
    t.forEach(r => allNames.add(r.name))
  })
  const dinos = []
  allNames.forEach(name => {
    const inAll = ALLE_JAHRE.every(j => {
      const t = wm.abschlusstabellen[String(j)] || []
      return t.some(r => r.name === name || r.name.includes(name.split(' ')[0]) && r.name.includes(name.split(' ').pop()))
    })
    if (inAll) dinos.push(name)
  })
  return dinos.sort()
}

export default function Home() {
  const letzteWM = wm.weltmeister[wm.weltmeister.length - 1]
  const top3Rangliste = wm.weltrangliste.slice(0, 3)
  const top5Tabelle = wm.ewige_tabelle.slice(0, 5)
  const letzteEvents = [...wm.weltmeister].reverse().slice(0, 3)
  const dinos = getDinos()

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
        backgroundImage: 'url(/hero-2024.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.82)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', width: '100%', maxWidth: 700 }}>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.65)', marginBottom: 32, letterSpacing: '0.01em' }}>
            Die nächste Trommelschießen-WM kommt bald
          </p>
          <Countdown />
          <div style={{ marginTop: 40 }}>
            <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--gold">
              Live-Dashboard →
            </a>
          </div>
        </div>
      </section>

      {/* MANIFEST */}
      <section style={{ background: 'var(--gruen)', padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 20 }}>
            06.06.2026 · Édition Jubilaire · 20 Jahre Trommelschießen
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'white', marginBottom: 32 }}>
            10. Trommelschießen-WM
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 680, margin: '0 auto 40px' }}>
            Eine Waschmaschine, ein Ball, und der unbändige Wille das Runde ins Runde zu bekommen –
            das ist Trommelschießen. Seit 2006 treffen sich die besten Trommler Norddeutschlands,
            um den begehrten Titel des Trommelweltmeisters auszuspielen. Was als WG-Erfindung
            in Norderstedt begann, ist heute eine echte Weltmeisterschaft mit Tradition, Leidenschaft
            und Trommel, Trommel, Mors, Mors.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/events" className="btn btn--white">WM-Archiv ansehen</Link>
            <Link to="/wissenswertes/historie" className="btn btn--outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}>Die Geschichte →</Link>
          </div>
        </div>
      </section>

      {/* TEASER: Letztes Ergebnis */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="eyebrow">Letztes Ergebnis</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 32 }}>
            WM {letzteWM.jahr} · {letzteWM.ort.split('–')[0].trim()}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Weltmeister', value: letzteWM.sieger, icon: '🏆' },
              { label: 'Torschützenkönig', value: `${letzteWM.torschuetzenkoenig} (${letzteWM.tore} Tore)`, icon: '👑' },
              { label: 'Teilnehmer', value: letzteWM.teilnehmer, icon: '👥' },
              { label: 'Punkte (Sieger)', value: `${letzteWM.punkte} Pkt. in ${letzteWM.spiele} Spielen`, icon: '📊' },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gruen)', fontFamily: 'Bayon, sans-serif' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to={`/events/${letzteWM.jahr}`} className="btn btn--outline">Zur Abschlusstabelle →</Link>
          </div>
        </div>
      </section>

      {/* TEASER: Weltrangliste */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">Weltrangliste</div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--gruen)', marginBottom: 8 }}>Die besten Trommler aller Zeiten</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>Basierend auf WM-Platzierungen seit 2006</p>
              <Link to="/statistiken/weltrangliste" className="btn btn--outline">Vollständige Rangliste →</Link>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead><tr><th>Pl.</th><th>Trommler</th><th className="num">Punkte</th></tr></thead>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'start' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead><tr><th>Pl.</th><th>Trommler</th><th className="num">Sp</th><th className="num">Pkt</th></tr></thead>
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
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--gruen)', marginBottom: 8 }}>Alle Spiele, alle Punkte</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>56 Trommler in der ewigen Wertung – von 2006 bis heute</p>
              <Link to="/statistiken/ewige-tabelle" className="btn btn--outline">Alle 56 Trommler →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: WM-Events */}
      <section className="section" style={{ background: 'var(--gruen)' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>WM-Archiv</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: 'var(--white)', marginBottom: 32 }}>9 Turniere · 9 Weltmeister</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {letzteEvents.map(e => (
              <Link key={e.jahr} to={`/events/${e.jahr}`} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '20px', display: 'block', transition: 'all 0.2s',
              }}
                onMouseEnter={ev => { ev.currentTarget.style.background='rgba(255,255,255,0.14)'; ev.currentTarget.style.borderColor='rgba(176,137,45,0.4)' }}
                onMouseLeave={ev => { ev.currentTarget.style.background='rgba(255,255,255,0.08)'; ev.currentTarget.style.borderColor='rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 17, marginTop: 6 }}>{e.sieger}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{e.ort.split('–')[0].trim()} · {e.teilnehmer} TN</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/events" className="btn btn--white">Alle WMs ansehen →</Link>
          </div>
        </div>
      </section>

      {/* DINOS */}
      {dinos.length > 0 && (
        <section className="section" style={{ background: 'var(--cream-dark, #ede6d8)' }}>
          <div className="container">
            <div className="eyebrow">Treue Trommler</div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 8 }}>Trommelschießen-Dinos</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
              Diese Trommler waren bei allen {ALLE_JAHRE.length} Turnieren dabei – von 2006 bis 2024.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {dinos.map(name => (
                <div key={name} className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🦕</span>
                  <span style={{ fontWeight: 600, color: 'var(--gruen)' }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Link to="/wissenswertes/dinos" className="btn btn--outline">Mehr über die Dinos →</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
