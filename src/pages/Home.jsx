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
      <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
  const Sep = () => (
    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1, marginBottom: 18 }}>:</div>
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
        <div className="container" style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
            06.06.2026 · Édition Jubilaire · 20 Jahre Trommelschiessen
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'white', marginBottom: 32 }}>
            10. Trommelschiessen-WM
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
                <div style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', fontWeight: 700, color: 'var(--gruen)', fontFamily: "'Bayon', sans-serif", lineHeight: 1.2 }}>{item.value}</div>
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
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--gruen)', marginBottom: 32 }}>Zahlen, Daten, Trommelschiessen</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Weltrangliste Card */}
            <Link to="/statistiken/weltrangliste" className="card card--hover" style={{
              padding: '32px', display: 'flex', flexDirection: 'column', gap: 16,
              background: 'var(--gruen)', color: 'white', overflow: 'hidden', position: 'relative',
            }}>
              
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Weltrangliste</div>
              <div>
                {top3Rangliste.map((r, i) => (
                  <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{['🥇','🥈','🥉'][i]}</span>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>{r.name}</span>
                    </div>
                    <span style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: 'var(--gold)' }}>{r.total}</span>
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
                    <span style={{ fontFamily: "'Bayon', sans-serif", fontSize: 20, color: 'var(--gold)' }}>{r.pkt}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 'auto' }}>Alle {wm.ewige_tabelle.length} Trommler ansehen →</div>
            </Link>
          </div>
        </div>
      </section>


      {/* Mood-Bilder Trenner – zwei nebeneinander */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 'clamp(240px, 35vw, 480px)', overflow: 'hidden' }}>
        <div style={{
          backgroundImage: 'url(/mood-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.25)' }} />
        </div>
        <div style={{
          backgroundImage: 'url(/wm-2016-extra.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,45,29,0.25)' }} />
        </div>
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



      {/* TEASER: WM 2026 Vorschau */}
      <section style={{ background: 'white', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">06. Juni 2026</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--gruen)', marginBottom: 16 }}>
                Édition Jubilaire
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                20 Jahre Trommelschießen. Die X. WM ist mehr als ein Turnier –
                sie ist das Jubiläum einer Idee, die in einer Norderstedter WG begann
                und heute echte Weltmeisterschafts-Geschichte schreibt.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/events/2026" className="btn btn--primary">Zur WM 2026 →</Link>
                <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn btn--outline">Live-Dashboard →</a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Auflage', value: 'X.', sub: '10. Weltmeisterschaft' },
                { label: 'Jahr', value: '2026', sub: '20 Jahre Trommelschießen' },
                { label: 'Datum', value: '06.06.', sub: 'Juni 2026' },
                { label: 'Format', value: 'TBD', sub: 'Teilnehmer werden bekannt' },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 40, color: 'var(--gruen)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: Ballermänner – großes Zitat-Style */}
      <section style={{ background: 'var(--cream-dark, #ede6d8)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Statistiken</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--gruen)', marginBottom: 16 }}>
                Ballermänner & Schiessbuden
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                Wer hat die meisten Tore geschossen – und wer die meisten kassiert?
                Sortierbar nach Gesamtzahl oder Quote pro Spiel.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/statistiken/ballermann" className="btn btn--primary">Ballermänner →</Link>
                <Link to="/statistiken/schiessbude" className="btn btn--outline">Schiessbuden →</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(() => {
                const alle = [...new Set(Object.values(wm.abschlusstabellen).flat().map(x=>x.name))]
                return alle.map(name => ({
                  name,
                  tore: Object.values(wm.abschlusstabellen).flat().filter(x=>x.name===name).reduce((s,x)=>s+(x.t||0),0)
                })).sort((a,b)=>b.tore-a.tore).slice(0,3).map((r,i) => ({
                  name: r.name, label: `Platz ${i+1}`, value: `${r.tore} Tore`
                }))
              })().map((r, i) => (
                <div key={r.name} className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)', lineHeight: 1, minWidth: 32 }}>{i+1}</span>
                    <span style={{ fontWeight: 600, color: 'var(--gruen)' }}>{r.name}</span>
                  </div>
                  <span style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: 'var(--gruen)' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: Remiskönige – kompaktes Zahlen-Highlight */}
      <section style={{ background: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <div className="eyebrow">Statistiken</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--gruen)', marginBottom: 40 }}>Remiskönige</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {(() => {
            const alleTrainer = [...new Set(Object.values(wm.abschlusstabellen).flat().map(x=>x.name))]
            const mitRemis = alleTrainer.map(name => ({
              name,
              remis: Object.values(wm.abschlusstabellen).flat().filter(x=>x.name===name).reduce((s,x)=>s+(x.u||0),0),
              sp: Object.values(wm.abschlusstabellen).flat().filter(x=>x.name===name).reduce((s,x)=>s+(x.sp||0),0),
            })).sort((a,b)=>b.remis-a.remis).slice(0,5)
            return mitRemis
          })().map((r, i) => {
              const remis = r.remis
              const sp = r.sp
              return (
                <div key={r.name} style={{
                  background: i === 0 ? 'var(--gruen)' : 'var(--cream)',
                  padding: '28px 24px',
                  borderRadius: i === 0 ? 'var(--radius-lg) 0 0 var(--radius-lg)' : i === 4 ? '0 var(--radius-lg) var(--radius-lg) 0' : 0,
                }}>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{remis}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '6px 0 4px' }}>Remis</div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: i === 0 ? 'white' : 'var(--gruen)' }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.4)' : 'var(--text-light)', marginTop: 2 }}>{sp > 0 ? `${((remis/sp)*100).toFixed(0)}% aller Spiele` : ''}</div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/statistiken/remiskoenig" className="btn btn--outline">Alle Remiskönige →</Link>
          </div>
        </div>
      </section>


      {/* TEASER: Spielerprofile */}
      <section style={{ background: 'var(--gruen)', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 60, top: 40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            {/* Avatare Preview */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(() => {
                const alle = [...new Set(Object.values(wm.abschlusstabellen).flat().map(r => r.name))]
                const mitPkt = wm.ewige_tabelle.map(r => r.name)
                return mitPkt.slice(0, 18).map((name, i) => {
                  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2)
                  const istChamp = wm.weltmeister.some(e => e.sieger === name)
                  return (
                    <Link key={name} to={`/spielerprofile/${encodeURIComponent(name)}`}
                      style={{ width: 52, height: 52, borderRadius: '50%',
                        background: istChamp ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                        border: istChamp ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Bayon', sans-serif", fontSize: 16,
                        color: istChamp ? 'var(--gruen)' : 'rgba(255,255,255,0.7)',
                        transition: 'transform 0.15s', textDecoration: 'none',
                        transform: `translateY(${i % 3 === 1 ? 8 : 0}px)`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = `translateY(${i % 3 === 1 ? 4 : -4}px) scale(1.1)`}
                      onMouseLeave={e => e.currentTarget.style.transform = `translateY(${i % 3 === 1 ? 8 : 0}px)`}
                      title={name}
                    >{initials}</Link>
                  )
                })
              })()}
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>+{wm.ewige_tabelle.length - 18}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Neu</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'white', marginBottom: 16 }}>Spielerprofile</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                Alle 56 Trommler mit vollständigen Karrieredaten, Platzierungsverläufen und WM-Ergebnissen. Goldene Avatare sind Weltmeister.
              </p>
              <Link to="/spielerprofile" className="btn" style={{ background: 'var(--gold)', color: 'var(--gruen)', fontWeight: 700, border: 'none' }}>
                Alle Profile ansehen →
              </Link>
            </div>
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
            Trommelschiessen-Dinos
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
