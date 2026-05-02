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
      <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
  const Sep = () => (
    <div style={{ fontFamily: "'Russo One', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1, marginBottom: 18 }}>:</div>
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
            06.06.2026 · Édition Jubilaire · 20 Jahre Trommelschiessen
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { label: 'Weltmeister', value: letzteWM.sieger, icon: '🏆' },
              { label: 'Torschützenkönig', value: `${letzteWM.torschuetzenkoenig}`, sub: `${letzteWM.tore} Tore`, icon: '👑' },
              { label: 'Teilnehmer', value: letzteWM.teilnehmer, icon: '👥' },
              { label: 'Sieger-Punkte', value: `${letzteWM.punkte} Pkt.`, sub: `in ${letzteWM.spiele} Spielen`, icon: '📊' },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 22 }}>{item.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)' }}>{item.label}</div>
                <div style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', fontWeight: 700, color: 'var(--gruen)', fontFamily: "'Russo One', sans-serif", lineHeight: 1.2 }}>{item.value}</div>
                {item.sub && <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to={`/events/${letzteWM.jahr}`} className="btn btn--outline">Zur Abschlusstabelle →</Link>
          </div>
        </div>
      </section>

      {/* TEASER: Statistiken – 2 Karten nebeneinander */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="eyebrow">Statistiken</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 32 }}>Zahlen, Daten, Trommelschießen</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Weltrangliste Card */}
            <Link to="/statistiken/weltrangliste" className="card card--hover" style={{
              padding: '32px', display: 'flex', flexDirection: 'column', gap: 16,
              background: 'var(--gruen)', color: 'white', overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.06, lineHeight: 1 }}>🌍</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Weltrangliste</div>
              <div>
                {top3Rangliste.map((r, i) => (
                  <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{['🥇','🥈','🥉'][i]}</span>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>{r.name}</span>
                    </div>
                    <span style={{ fontFamily: "'Russo One', sans-serif", fontSize: 22, color: 'var(--gold)' }}>{r.total}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 'auto' }}>Alle {wm.weltrangliste.length} Trommler ansehen →</div>
            </Link>

            {/* Ewige Tabelle Card */}
            <Link to="/statistiken/ewige-tabelle" className="card card--hover" style={{
              padding: '32px', display: 'flex', flexDirection: 'column', gap: 16,
              border: '2px solid var(--gruen)', overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.04, lineHeight: 1 }}>📊</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ewige Tabelle</div>
              <div>
                {top5Tabelle.map((r, i) => (
                  <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, color: 'var(--text-light)', minWidth: 20 }}>{i + 1}</span>
                      <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--gruen)' }}>{i === 0 ? '🏆 ' : ''}{r.name}</span>
                    </div>
                    <span style={{ fontFamily: "'Russo One', sans-serif", fontSize: 20, color: 'var(--gold)' }}>{r.pkt}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 'auto' }}>Alle {wm.ewige_tabelle.length} Trommler ansehen →</div>
            </Link>
          </div>
        </div>
      </section>


      {/* Mood-Bild Trenner */}
      <div style={{
        height: 'clamp(280px, 40vw, 520px)',
        backgroundImage: 'url(/mood-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.3)' }} />
      </div>

      {/* TEASER: WM-Events – Foto-ready grid */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="eyebrow">WM-Archiv</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: 'var(--gruen)', marginBottom: 32 }}>9 Turniere · 9 Weltmeister</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {letzteEvents.map((e, i) => (
              <Link key={e.jahr} to={`/events/${e.jahr}`} className="card card--hover" style={{
                display: 'block', overflow: 'hidden', position: 'relative',
              }}>
                <div style={{
                  height: 180, position: 'relative', overflow: 'hidden',
                  background: 'var(--gruen)',
                  backgroundImage: wm.fotos?.[e.jahr]?.gruppe ? `url(${wm.fotos[e.jahr].gruppe})` : 'none',
                  backgroundSize: 'cover', backgroundPosition: 'center 30%',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.45)' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
                    <span style={{ background: 'var(--gold)', color: 'white', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{e.jahr}</span>
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--gruen)', fontSize: 17, marginBottom: 4 }}>🏆 {e.sieger}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{e.ort.split('–')[0].trim()} · {e.teilnehmer} Teilnehmer</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/events" className="btn btn--outline">Alle WMs ansehen →</Link>
          </div>
        </div>
      </section>

      {/* DINOS */}
      <section style={{
        position: 'relative', overflow: 'hidden', padding: '80px 0',
        backgroundImage: 'url(/dino-5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.85)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Treue Trommler</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: 'white', marginBottom: 16, maxWidth: 600 }}>
            Trommelschießen-Dinos
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.8, maxWidth: 540, marginBottom: 32 }}>
            Jenne Meyer, Bastian Buse und Sascha Wachtendorf – drei Trommler, die bei keiner einzigen WM gefehlt haben.
            Seit 2006, durch Hitze und Regen, durch Niedersachsen und Hamburg, immer dabei, immer an der Trommel.
            Echte Dinos.
          </p>
          <Link to="/statistiken/dinos" className="btn btn--gold">Dino-Statistiken ansehen →</Link>
        </div>
      </section>
    </div>
  )
}
