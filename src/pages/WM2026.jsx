import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWMData } from '../useWMData'
import { supabase } from '../supabase'
import { gameId, calcTableUpTo, calcTorschuetzenUpTo } from '../logic'

function getCountdown() {
  const ziel = new Date('2026-06-06T10:00:00')
  const diff = Math.max(0, ziel - new Date())
  return {
    tage: Math.floor(diff / 86400000),
    std:  Math.floor((diff % 86400000) / 3600000),
    min:  Math.floor((diff % 3600000) / 60000),
    sek:  Math.floor((diff % 60000) / 1000),
  }
}

// ─── Live-Tabelle ─────────────────────────────────────────────────────────────
function LiveTabelle({ schedule, results, players }) {
  const latest = (() => {
    for (let i = schedule.length - 1; i >= 0; i--)
      if (schedule[i].some(m => results[gameId(m.home, m.away)])) return i
    return 0
  })()
  const rows = calcTableUpTo(schedule, results, latest)
  const played = Object.keys(results).length
  const total = schedule.reduce((s, st) => s + st.length, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: 0 }}>Aktuelle Tabelle</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{played} / {total} Spiele</span>
          <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>● LIVE</span>
        </div>
      </div>
      <div className="card" style={{ overflow: 'auto', marginBottom: 16 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>Pl.</th>
              <th>Schütze</th>
              <th className="num">Sp</th>
              <th className="num">S</th>
              <th className="num">U</th>
              <th className="num">N</th>
              <th className="num">T</th>
              <th className="num">TD</th>
              <th className="num">Pkt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const td = r.tore - r.gegen
              return (
                <tr key={r.i} style={{ background: idx === 0 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                  <td className="rank">{idx === 0 ? '🏆' : idx + 1}</td>
                  <td style={{ fontWeight: idx < 3 ? 700 : 400, color: idx === 0 ? 'var(--gruen)' : 'inherit' }}>
                    {players[r.i]}
                  </td>
                  <td className="num">{r.sp}</td>
                  <td className="num">{r.s}</td>
                  <td className="num">{r.u}</td>
                  <td className="num">{r.n}</td>
                  <td className="num">{r.tore}:{r.gegen}</td>
                  <td className={`num ${td > 0 ? 'pos' : td < 0 ? 'neg' : ''}`}>{td > 0 ? '+' : ''}{td}</td>
                  <td className="num pts">{r.pkt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Live Torschützen ─────────────────────────────────────────────────────────
function LiveTorschuetzen({ schedule, results, players }) {
  const latest = (() => {
    for (let i = schedule.length - 1; i >= 0; i--)
      if (schedule[i].some(m => results[gameId(m.home, m.away)])) return i
    return 0
  })()
  const rows = calcTorschuetzenUpTo(schedule, results, players, latest)
  const top3 = rows.slice(0, 3)
  const medals = ['🥇', '🥈', '🥉']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: 0 }}>Torschützen</h2>
        <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>● LIVE</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {top3.map((r, i) => (
          <div key={r.i} className="card" style={{
            padding: '16px 12px', textAlign: 'center',
            border: i === 0 ? '2px solid var(--gold)' : '1px solid var(--border)'
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{medals[i]}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gruen)', marginBottom: 6, wordBreak: 'break-word' }}>{players[r.i]}</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 32, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.tore}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Tore · Ø {r.avg.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Aktueller Spieltag ───────────────────────────────────────────────────────
function AktuellerSpieltag({ schedule, results, players }) {
  const current = (() => {
    for (let i = 0; i < schedule.length; i++)
      if (!schedule[i].every(m => results[gameId(m.home, m.away)])) return i
    return schedule.length - 1
  })()
  const st = schedule[current] || []
  const done = st.filter(m => results[gameId(m.home, m.away)]).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: 0 }}>Spieltag {current + 1}</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{done} / {st.length} gespielt</span>
          <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>● LIVE</span>
        </div>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        {st.map((m, i) => {
          const r = results[gameId(m.home, m.away)]
          const done = !!r
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr auto',
              alignItems: 'center', gap: 12, padding: '12px 20px',
              borderBottom: i < st.length - 1 ? '1px solid var(--border)' : 'none',
              background: done ? 'rgba(22,163,74,0.03)' : 'transparent'
            }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{players[m.home]}</div>
              <div style={{
                fontFamily: "'Bayon', sans-serif", fontSize: 20,
                color: done ? 'var(--gruen)' : 'var(--text-muted)',
                minWidth: 60, textAlign: 'center'
              }}>
                {done ? `${r.home} : ${r.away}` : 'vs.'}
              </div>
              <div style={{ fontWeight: 500, fontSize: 14, textAlign: 'right' }}>{players[m.away]}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 50, textAlign: 'right' }}>
                {done ? '✓' : `M${m.machine + 1}`}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Live-Block Container ─────────────────────────────────────────────────────
function LiveBlock() {
  const [tournament, setTournament] = useState(null)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLive()
    const sub = supabase.channel('wm2026-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament' }, () => loadLive())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, payload => {
        if (payload.eventType === 'DELETE') {
          setResults(prev => { const n = { ...prev }; delete n[payload.old.game_id]; return n })
        } else {
          const r = payload.new
          setResults(prev => ({ ...prev, [r.game_id]: { home: r.home_score, away: r.away_score } }))
        }
      })
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  async function loadLive() {
    const { data } = await supabase.from('tournament').select('*').order('created_at', { ascending: false }).limit(1)
    if (data?.length > 0 && data[0].started) {
      setTournament(data[0])
      const { data: rData } = await supabase.from('results').select('*')
      if (rData) {
        const rMap = {}
        rData.forEach(r => { rMap[r.game_id] = { home: r.home_score, away: r.away_score } })
        setResults(rMap)
      }
    }
    setLoading(false)
  }

  // Noch kein Turnier gestartet
  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
      Live-Daten werden geladen…
    </div>
  )

  if (!tournament) return (
    <div style={{ background: 'var(--gruen)', borderRadius: 16, padding: '40px 32px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)', marginBottom: 12 }}>
        DAS TURNIER STARTET BALD
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
        Am 06.06.2026 werden hier die Live-Ergebnisse, die aktuelle Tabelle<br />
        und die Torschützenliste in Echtzeit aktualisiert.
      </div>
      <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener"
        className="btn" style={{ background: 'var(--gold)', color: 'var(--gruen)', fontWeight: 700, border: 'none' }}>
        Zum Live-Dashboard →
      </a>
    </div>
  )

  const { players, schedule } = tournament

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <LiveTabelle schedule={schedule} results={results} players={players} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
        <AktuellerSpieltag schedule={schedule} results={results} players={players} />
        <LiveTorschuetzen schedule={schedule} results={results} players={players} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener"
          className="btn btn--outline">
          Vollständiges Live-Dashboard →
        </a>
      </div>
    </div>
  )
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function WM2026() {
  const { data: wm, loading: wmLoading } = useWMData()
  const [cd, setCd] = useState(getCountdown())

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--gruen)', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-2024.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>
            Edition Jubilaire · 20 Jahre Trommelschießen
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 88px)', color: 'white', lineHeight: 1, marginBottom: 24 }}>
            X. TRMMLR-WM
          </h1>
          <div style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>06. Juni 2026</div>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px 32px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { val: cd.tage, label: 'Tage' },
              { val: cd.std, label: 'Stunden' },
              { val: cd.min, label: 'Minuten' },
              { val: cd.sek, label: 'Sekunden' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', minWidth: 80, padding: '0 8px' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--gold)', lineHeight: 1 }}>
                  {String(item.val).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infos */}
      <section className="section--sm" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 16 }}>Das Jubiläum</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15 }}>
                2006 wurde in einer Norderstedter WG eine Sportart geboren. 20 Jahre später feiern wir die 10. Weltmeisterschaft – die Edition Jubilaire. Alte Dinos, neue Talente, ein Ball, eine Trommel.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginTop: 12 }}>
                Wer schreibt das nächste Kapitel dieser Geschichte?
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Edition', value: '10.', sub: 'Jubiläums-WM' },
                { label: 'Datum', value: '06.06.', sub: 'Juni 2026' },
                { label: 'Ort', value: 'Loony Park', sub: 'Berne' },
                { label: 'Bisherige WMs', value: '9', sub: 'seit 2006' },
                { label: 'Trommler', value: '56', sub: 'in der ewigen Tabelle' },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: 'var(--gruen)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Titelverteidiger */}
          <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 24 }}>Titelverteidiger</h2>
          <div className="card" style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 48 }}>
            <img src="/spieler/Patrick_Christof.jpg" alt="Patrick Christof" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '3px solid var(--gold)', flexShrink: 0 }} onError={e => { e.target.style.display='none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Weltmeister 2024</div>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: 'var(--gruen)', lineHeight: 1 }}>Patrick Christof</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Von Platz 18 (2008) zum Weltmeister – die größte Aufholjagd der Geschichte</div>
            </div>
            <Link to="/spielerprofile/Patrick%20Christof" className="btn btn--outline">Profil →</Link>
          </div>


        </div>
      </section>

      {/* ── LIVE-BLOCK ── */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            Live · 06.06.2026
          </div>
          <LiveBlock />
        </div>
      </section>

      <section className="section--sm" style={{ background: 'white' }}>
        <div className="container">
          {/* Video */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 16 }}>Edition Jubilaire</h2>
            <div style={{ borderRadius: 16, overflow: 'hidden', background: '#0a1c12' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover' }}>
                <source src="/wm2026-teaser.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '48px', background: 'var(--gruen)', borderRadius: 16 }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', color: 'var(--gold)', marginBottom: 12 }}>TROMMEL. TROMMEL. MORS. MORS.</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 24 }}>
              Die 10. Weltmeisterschaft im Trommelschießen hat noch nicht stattgefunden.<br />
              Am 06.06.2026 kann das Turnier live auf dem Dashboard verfolgt werden.
            </div>
            <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn" style={{ background: 'var(--gold)', color: 'var(--gruen)', fontWeight: 700, border: 'none' }}>
              Jetzt Live-Dashboard ansehen →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
