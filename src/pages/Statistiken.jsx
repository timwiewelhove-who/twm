import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWMData } from '../useWMData'

const WMContext = React.createContext(null)
const useWM = () => React.useContext(WMContext)


function Weltrangliste() {
  const wm = useWM()
  const hat2026 = wm.weltrangliste.some(r => r.wm2026 > 0)
  const jahre = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2022, 2024, ...(hat2026 ? [2026] : [])]
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Weltrangliste</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>
        Punkte werden für WM-Platzierungen vergeben. Gewinner: 100 Pkt, Finalist: 75, Halbfinale: 50 etc.
      </p>
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              {jahre.map(j => (
                <th key={j} className="num rangliste-year" style={{ fontSize: 10, color: j === 2026 ? 'var(--gold)' : 'inherit' }}>{j}</th>
              ))}
              <th className="num" style={{ fontWeight: 700 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {wm.weltrangliste.map((r, i) => (
              <tr key={r.name}>
                <td className="rank">{i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>
                  {i === 0 ? '🥇 ' : i === 1 ? '🥈 ' : i === 2 ? '🥉 ' : ''}{r.name}
                </td>
                {jahre.map(j => {
                  const v = r[`wm${j}`] ?? 0
                  return (
                    <td key={j} className="num rangliste-year" style={{ color: v === 100 ? 'var(--gold)' : v >= 50 ? 'var(--gruen)' : v > 0 ? 'var(--text-muted)' : 'var(--border)', fontSize: v === 0 ? 12 : 14 }}>
                      {v || '–'}
                    </td>
                  )
                })}
                <td className="num pts">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EwigeTabelle() {
  const wm = useWM()
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Ewige Tabelle</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>
        Sieg: 3 Punkte · Unentschieden: 1 Punkt. Alle WMs seit 2006.
      </p>
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
            {wm.ewige_tabelle.map((r, i) => (
              <tr key={r.name} style={{ background: i === 0 ? 'rgba(176,137,45,0.05)' : 'transparent' }}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : r.pl}</td>
                <td style={{ fontWeight: i < 5 ? 600 : 400 }}>{r.name}</td>
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
    </div>
  )
}

function Champs() {
  const wm = useWM()
  const events = [...wm.weltmeister].reverse()
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 32 }}>Alle Weltmeister</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(e => (
          <Link key={e.jahr} to={`/events/${e.jahr}`} className="card card--hover" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '80px 1fr auto', alignItems: 'center', gap: 20 }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--gruen)' }}>🏆 {e.sieger}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                {e.ort.split('–')[0].trim()} · {e.punkte} Pkt · {e.teilnehmer} Teilnehmer
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Torschützenkönig</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gruen)' }}>👑 {e.torschuetzenkoenig}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


const ALLE_JAHRE = [2006,2008,2010,2012,2014,2016,2018,2022,2024]
const DINOS_NAMES = ['Bastian Buse','Jenne Meyer','Sascha Wachtendorf']

function Dinos() {
  const wm = useWM()
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Trommelschiessen-Dinos</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Nur drei Trommler waren bei allen {ALLE_JAHRE.length} WMs dabei – von der Premiere 2006 in Hamburg bis 2024 in Jaderberg.
      </p>
      {DINOS_NAMES.map(name => {
        const ewige = wm.ewige_tabelle.find(r => r.name === name)
        const weltR = wm.weltrangliste.find(r => r.name === name)
        const ergebnisse = ALLE_JAHRE.map(j => {
          const t = wm.abschlusstabellen[String(j)] || []
          const r = t.find(r => r.name === name)
          return { jahr: j, pl: r?.pl, pkt: r?.pkt }
        })
        const beste = ergebnisse.reduce((best, e) => (!best || e.pl < best.pl) ? e : best, null)
        return (
          <div key={name} className="card" style={{ padding: '28px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 28 }}>🦕</span>
                  <h3 style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)', letterSpacing: '0.03em' }}>{name}</h3>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Dabei seit 2006 · Bestes Ergebnis: Platz {beste?.pl} ({beste?.jahr})
                </div>
              </div>
              {ewige && (
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>{ewige.pkt}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ewige Pkt.</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>{ewige.sp}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Spiele</div>
                  </div>
                  {weltR && <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>#{weltR.pl}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weltrangliste</div>
                  </div>}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ergebnisse.map(e => (
                <Link key={e.jahr} to={`/events/${e.jahr}`} style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: e.pl === 1 ? 'rgba(176,137,45,0.15)' : e.pl <= 3 ? 'rgba(28,66,43,0.08)' : 'rgba(0,0,0,0.04)',
                  color: e.pl === 1 ? 'var(--gold)' : e.pl <= 3 ? 'var(--gruen)' : 'var(--text-muted)',
                  border: '1px solid', borderColor: e.pl === 1 ? 'rgba(176,137,45,0.3)' : 'rgba(0,0,0,0.08)',
                }}>
                  {e.jahr}: Pl. {e.pl}
                </Link>
              ))}
            </div>
          </div>
        )
      })}
      {/* Foto-Mosaik – Masonry via CSS columns */}
      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>WM 2024 · Jaderberg</div>
        <div style={{ columns: '2 300px', columnGap: 12 }}>
          {['/dino-2.jpg', '/dino-1.jpg', '/dino-5.jpg'].map((src, i) => (
            <div key={i} style={{ breakInside: 'avoid', marginBottom: 12 }}>
              <img
                src={src}
                alt="Trommelschießen-Dinos WM 2024"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ── Toggle Button Helper ──────────────────────────────────────────────────
function Toggle({ options, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--cream)', borderRadius: 10, padding: 4, gap: 2, marginBottom: 32 }}>
      {options.map(opt => (
        <button key={opt.id} onClick={() => onChange(opt.id)} style={{
          padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: 600, transition: 'all 0.15s',
          background: value === opt.id ? 'var(--gruen)' : 'transparent',
          color: value === opt.id ? 'white' : 'var(--text-muted)',
        }}>{opt.label}</button>
      ))}
    </div>
  )
}

// ── Berechne Statistiken aus Abschlusstabellen ────────────────────────────
function calcStats(wm) {
  const map = {}
  Object.values(wm.abschlusstabellen).forEach(tab => {
    tab.forEach(r => {
      if (!map[r.name]) map[r.name] = { name: r.name, sp: 0, s: 0, u: 0, n: 0, t: 0, gg: 0 }
      map[r.name].sp += r.sp || 0
      map[r.name].s  += r.s  || 0
      map[r.name].u  += r.u  || 0
      map[r.name].n  += r.n  || 0
      map[r.name].t  += r.t  || 0
      map[r.name].gg += r.gg || 0
    })
  })
  return Object.values(map).map(r => ({
    ...r,
    diff: r.t - r.gg,
    tQuote: r.sp ? (r.t / r.sp).toFixed(3) : '0.000',
    ggQuote: r.sp ? (r.gg / r.sp).toFixed(3) : '0.000',
    uQuote: r.sp ? (r.u / r.sp).toFixed(3) : '0.000',
    uPct: r.sp ? ((r.u / r.sp) * 100).toFixed(1) : '0.0',
  }))
}

function Ballermann() {
  const wm = useWM()
  const [mode, setMode] = React.useState('absolut')
  const stats = calcStats(wm)

  const sorted = mode === 'absolut'
    ? [...stats].sort((a, b) => b.t - a.t)
    : [...stats].sort((a, b) => parseFloat(b.tQuote) - parseFloat(a.tQuote))

  // Torschützenkönige
  const koenige = {}
  wm.weltmeister.forEach(e => {
    e.torschuetzenkoenig.split(' & ').forEach(name => {
      koenige[name.trim()] = (koenige[name.trim()] || 0) + 1
    })
  })
  const topKoenige = Object.entries(koenige).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Ballermänner</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
        Die treffsichersten Trommler aller Zeiten.
      </p>

      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>👑 Torschützenkönige</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {topKoenige.map(([name, anzahl], i) => (
          <div key={name} className="card" style={{ padding: '20px 24px', background: i === 0 ? 'var(--gruen)' : 'var(--white)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{anzahl}x</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: i === 0 ? 'white' : 'var(--gruen)' }}>{name}</div>
              <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', marginTop: 2 }}>
                {wm.weltmeister.filter(e => e.torschuetzenkoenig.includes(name)).map(e => e.jahr).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toggle
        options={[{ id: 'absolut', label: 'Meiste Treffer' }, { id: 'quote', label: 'Beste Quote' }]}
        value={mode} onChange={setMode}
      />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'Tore' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'Tore'}</th>
              <th className="num">Spiele</th>
              <th className="num">GG</th>
              <th className="num">Diff</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.name} style={{ background: i === 0 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num pts">{mode === 'absolut' ? r.t : r.tQuote}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{mode === 'absolut' ? r.tQuote : r.t}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.gg}</td>
                <td className={`num ${r.diff > 0 ? 'pos' : r.diff < 0 ? 'neg' : ''}`}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Schiessbude() {
  const wm = useWM()
  const [mode, setMode] = React.useState('absolut')
  const stats = calcStats(wm)

  const sorted = mode === 'absolut'
    ? [...stats].sort((a, b) => b.gg - a.gg)
    : [...stats].sort((a, b) => parseFloat(b.ggQuote) - parseFloat(a.ggQuote))

  const top3 = [...stats].sort((a, b) => b.gg - a.gg).slice(0, 3)

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Schiessbuden</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
        Die großzügigsten Torwächter – wer hat den Gegner am häufigsten jubeln lassen?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {top3.map((r, i) => (
          <div key={r.name} className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 52, color: ['#dc2626','#ea580c','#d97706'][i], lineHeight: 1 }}>{r.gg}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '6px 0 4px' }}>Gegentore</div>
            <div style={{ fontWeight: 700, color: 'var(--gruen)', fontSize: 16 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4 }}>{r.sp} Spiele · {r.ggQuote}/Sp</div>
          </div>
        ))}
      </div>

      <Toggle
        options={[{ id: 'absolut', label: 'Meiste Gegentore' }, { id: 'quote', label: 'Höchste Quote' }]}
        value={mode} onChange={setMode}
      />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'GG-Tore' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'GG-Tore'}</th>
              <th className="num">Tore</th>
              <th className="num">Diff</th>
              <th className="num">Spiele</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.name}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num" style={{ color: '#dc2626', fontWeight: i < 3 ? 700 : 400 }}>{mode === 'absolut' ? r.gg : r.ggQuote}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{mode === 'absolut' ? r.ggQuote : r.gg}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.t}</td>
                <td className={`num ${r.diff > 0 ? 'pos' : r.diff < 0 ? 'neg' : ''}`}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

function Remiskoenige() {
  const wm = useWM()
  const [mode, setMode] = React.useState('absolut')
  const stats = calcStats(wm)

  const sorted = mode === 'absolut'
    ? [...stats].sort((a, b) => b.u - a.u)
    : [...stats].sort((a, b) => parseFloat(b.uQuote) - parseFloat(a.uQuote))

  const top3 = [...stats].sort((a, b) => b.u - a.u).slice(0, 3)

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Remiskönige</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
        Wer holt am häufigsten das Unentschieden? Die Meister des kontrollierten Patt.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {top3.map((r, i) => (
          <div key={r.name} className="card" style={{ padding: '24px', textAlign: 'center', background: i === 0 ? 'var(--gruen)' : 'var(--white)' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 52, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.u}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '6px 0 4px' }}>Unentschieden</div>
            <div style={{ fontWeight: 700, color: i === 0 ? 'white' : 'var(--gruen)', fontSize: 16 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-light)', marginTop: 4 }}>{r.sp} Spiele · {r.uPct}%</div>
          </div>
        ))}
      </div>

      <Toggle
        options={[{ id: 'absolut', label: 'Meiste Remis' }, { id: 'quote', label: 'Höchste Quote' }]}
        value={mode} onChange={setMode}
      />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'Remis' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'Remis'}</th>
              <th className="num">%</th>
              <th className="num">Spiele</th>
              <th className="num">Tore</th>
              <th className="num">GG</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.name}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num pts">{mode === 'absolut' ? r.u : r.uQuote}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{mode === 'absolut' ? r.uQuote : r.u}</td>
                <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.uPct}%</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.t}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.gg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



function KnappsteRennen() {
  const wm = useWM()
  const rennen = wm.weltmeister.map(e => {
    const tab = wm.abschlusstabellen[String(e.jahr)] || []
    const diff = tab.length >= 2 ? tab[0].pkt - tab[1].pkt : null
    return { ...e, zweiter: tab[1]?.name, s_pkt: tab[0]?.pkt, z_pkt: tab[1]?.pkt, diff }
  }).filter(r => r.diff !== null).sort((a, b) => a.diff - b.diff)

  const maxDiff = Math.max(...rennen.map(r => r.diff))

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Knappste Rennen</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>
        Kein WM-Titel wurde je mit mehr als 5 Punkten Vorsprung gewonnen. 2016 entschied ein einziger Punkt über die Meisterschaft.
      </p>

      {/* Highlight: engste WM */}
      {(() => {
        const r = rennen[0]
        return (
          <div className="card" style={{ background: 'var(--gruen)', padding: '32px', marginBottom: 40, display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 8 }}>Engste WM aller Zeiten</div>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 80, color: 'var(--gold)', lineHeight: 1 }}>1</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Punkt Unterschied · WM {r.jahr}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Sieger</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: 'white' }}>🏆 {r.sieger}</div>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>{r.s_pkt} Punkte</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Zweiter</div>
                <div style={{ fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{r.zweiter}</div>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: 'rgba(255,255,255,0.4)' }}>{r.z_pkt} Punkte</div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Alle Rennen */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {rennen.map((r, i) => (
          <div key={r.jahr} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 16, alignItems: 'center', padding: '16px 24px', borderBottom: i < rennen.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)', lineHeight: 1 }}>{r.jahr}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.ort}</div>
            </div>
            <div>
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                <strong style={{ color: 'var(--gruen)' }}>{r.sieger}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}> ({r.s_pkt} Pkt) vs. {r.zweiter} ({r.z_pkt} Pkt)</span>
              </div>
              <div style={{ background: 'var(--cream)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.round(r.diff / maxDiff * 100)}%`,
                  height: '100%',
                  borderRadius: 4,
                  background: r.diff === 1 ? '#dc2626' : r.diff <= 2 ? '#ea580c' : r.diff <= 3 ? '#d97706' : 'var(--gruen)',
                }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 40, lineHeight: 1, color: r.diff === 1 ? '#dc2626' : r.diff <= 2 ? '#ea580c' : r.diff <= 3 ? '#d97706' : 'var(--gruen)' }}>{r.diff}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pkt. Diff.</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(176,137,45,0.08)', borderRadius: 12, border: '1px solid rgba(176,137,45,0.2)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        In 9 WMs betrug der maximale Vorsprung des Siegers <strong style={{color:'var(--gruen)'}}>5 Punkte</strong>. Das Trommelschießen bleibt bis zur letzten Runde offen.
      </div>
    </div>
  )
}

export default function Statistiken() {
  const { data: wm, loading } = useWMData()
  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>
  return (
    <WMContext.Provider value={wm}>
      <StatistikenInner />
    </WMContext.Provider>
  )
}

function Bestenlisten() {
  const { data: wm } = useWMData()
  if (!wm) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const ALLE = wm.ewige_tabelle || []
  const WRL  = wm.weltrangliste || []
  const sorted_t   = [...ALLE].filter(r => r.sp > 0).sort((a, b) => (b.t / b.sp) - (a.t / a.sp))
  const sorted_gg  = [...ALLE].filter(r => r.sp > 0).sort((a, b) => (a.gg / a.sp) - (b.gg / b.sp))
  const sorted_u   = [...ALLE].filter(r => r.sp > 0).sort((a, b) => (b.u / b.sp) - (a.u / a.sp))
  const dinos_min  = 6
  const dinos      = WRL.filter(r => {
    const wmCount = Object.keys(r).filter(k => k.startsWith('wm')).length
    return wmCount >= dinos_min
  }).sort((a, b) => {
    const wa = Object.keys(a).filter(k => k.startsWith('wm')).length
    const wb = Object.keys(b).filter(k => k.startsWith('wm')).length
    return wb - wa || b.total - a.total
  })

  function BestenCard({ title, emoji, rows, col, label, format }) {
    return (
      <div className="card" style={{ marginBottom: 40, padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>{emoji} {title}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>{label}</p>
        <table className="data-table">
          <thead><tr><th className="num">PL.</th><th>TROMMLER</th><th className="num">SP</th><th className="num">{col.toUpperCase()}</th><th className="num">QUOTE</th></tr></thead>
          <tbody>
            {rows.slice(0, 10).map((r, i) => {
              const val = format(r)
              const quote = col === 't' ? (r.t / r.sp).toFixed(3) : col === 'gg' ? (r.gg / r.sp).toFixed(3) : (r.u / r.sp).toFixed(3)
              return (
                <tr key={r.name}>
                  <td className="num" style={{ color: 'var(--text-muted)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</td>
                  <td><Link to={`/spielerprofile/${encodeURIComponent(r.name)}`} style={{ color: 'var(--gruen)', fontWeight: 600 }}>{r.name}</Link></td>
                  <td className="num">{r.sp}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{val}</td>
                  <td className="num" style={{ color: 'var(--text-muted)' }}>{quote}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 32, marginTop: 8 }}>
      <BestenCard title="Ballermänner" emoji="⚽" rows={sorted_t} col="t" label="Meiste Tore pro Spiel (mind. 10 Spiele)" format={r => r.t} />
      <BestenCard title="Schiessbuden" emoji="🎯" rows={sorted_gg} col="gg" label="Wenigste Gegentore pro Spiel (mind. 10 Spiele)" format={r => r.gg} />
      <BestenCard title="Remiskönige" emoji="🤝" rows={sorted_u} col="u" label="Meiste Unentschieden pro Spiel (mind. 10 Spiele)" format={r => r.u} />
      <div className="card" style={{ marginBottom: 40, padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>🦕 Dinos</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Trommler mit mindestens {dinos_min} WM-Teilnahmen</p>
        <table className="data-table">
          <thead><tr><th className="num">PL.</th><th>TROMMLER</th><th className="num">WMs</th><th className="num">WRL PKT.</th></tr></thead>
          <tbody>
            {dinos.map((r, i) => {
              const wmCount = Object.keys(r).filter(k => k.startsWith('wm')).length
              return (
                <tr key={r.name}>
                  <td className="num" style={{ color: 'var(--text-muted)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</td>
                  <td><Link to={`/spielerprofile/${encodeURIComponent(r.name)}`} style={{ color: 'var(--gruen)', fontWeight: 600 }}>{r.name}</Link></td>
                  <td className="num" style={{ fontWeight: 700 }}>{wmCount}</td>
                  <td className="num">{r.total ?? '–'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const SUPABASE_URL = 'https://pltaiozpoofchprydxuz.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdGFpb3pwb29mY2hwcnlkeHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzg0MTksImV4cCI6MjA5MTkxNDQxOX0.nkV0AclS8hziq-HCk1kltp9T59u0tKqmcywLhprJ1HY'

async function rpc(fn) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: '{}'
  })
  return res.json()
}

function Rekorde() {
  const [loading, setLoading] = React.useState(true)
  const [hoechsteSiege, setHoechsteSiege] = React.useState([])
  const [meisteTore, setMeisteTore] = React.useState([])
  const [engsteDuelle, setEngsteDuelle] = React.useState([])
  const [wmVergleich, setWmVergleich] = React.useState([])

  React.useEffect(() => {
    async function load() {
      const [r1, r2, r3, r4] = await Promise.all([
        rpc('rekorde_hoechste_siege'),
        rpc('rekorde_meiste_tore'),
        rpc('rekorde_engste_duelle'),
        rpc('rekorde_wm_vergleich'),
      ])
      if (Array.isArray(r1)) setHoechsteSiege(r1)
      if (Array.isArray(r2)) setMeisteTore(r2)
      if (Array.isArray(r3)) setEngsteDuelle(r3)
      if (Array.isArray(r4)) setWmVergleich(r4)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 32, marginTop: 8 }}>
      {/* Höchste Siege */}
      <div className="card" style={{ padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>🏅 Höchste Siege</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Größte Tordifferenz in einem Spiel</p>
        <table className="data-table">
          <thead><tr><th>SIEGER</th><th>VERLIERER</th><th className="num">ERG.</th><th className="num">DIFF</th><th className="num">WM</th></tr></thead>
          <tbody>
            {hoechsteSiege.slice(0, 10).map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--gruen)' }}>{r.sieger}</td>
                <td style={{ color: 'var(--text-muted)' }}>{r.verlierer}</td>
                <td className="num">{r.tore_s}:{r.tore_n}</td>
                <td className="num" style={{ fontWeight: 700 }}>+{r.differenz}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.jahr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Torreichste Spiele */}
      <div className="card" style={{ padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>⚽ Torreichste Spiele</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Meiste Tore in einem einzelnen Spiel</p>
        <table className="data-table">
          <thead><tr><th>HEIM</th><th>GAST</th><th className="num">ERG.</th><th className="num">∑</th><th className="num">WM</th></tr></thead>
          <tbody>
            {meisteTore.slice(0, 10).map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.home}</td>
                <td style={{ color: 'var(--text-muted)' }}>{r.away}</td>
                <td className="num">{r.home_tore}:{r.away_tore}</td>
                <td className="num" style={{ fontWeight: 700 }}>{r.gesamt}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.jahr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Engste Duelle */}
      <div className="card" style={{ padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>🤝 Engste Duelle</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Meiste Unentschieden zwischen zwei Spielern</p>
        <table className="data-table">
          <thead><tr><th>SPIELER 1</th><th>SPIELER 2</th><th className="num">REMIS</th><th className="num">SP</th></tr></thead>
          <tbody>
            {engsteDuelle.slice(0, 10).map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--gruen)' }}>{r.spieler1}</td>
                <td style={{ color: 'var(--text-muted)' }}>{r.spieler2}</td>
                <td className="num" style={{ fontWeight: 700 }}>{r.remis}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.spiele}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WM Vergleich */}
      <div className="card" style={{ padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 4 }}>📊 WM im Vergleich</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Torreichste und torloseste WMs</p>
        <table className="data-table">
          <thead><tr><th className="num">WM</th><th className="num">SPIELE</th><th className="num">TORE</th><th className="num">∅ / SPIEL</th></tr></thead>
          <tbody>
            {wmVergleich.map((r, i) => (
              <tr key={i} style={{ background: i === 0 ? 'rgba(176,137,45,0.05)' : i === wmVergleich.length - 1 ? 'rgba(220,38,38,0.04)' : 'transparent' }}>
                <td className="num" style={{ fontWeight: 700 }}>{r.jahr}{i === 0 ? ' 🔥' : i === wmVergleich.length - 1 ? ' 🥶' : ''}</td>
                <td className="num">{r.spiele}</td>
                <td className="num">{r.tore_gesamt}</td>
                <td className="num" style={{ fontWeight: i === 0 || i === wmVergleich.length - 1 ? 700 : 400, color: i === 0 ? 'var(--gold)' : i === wmVergleich.length - 1 ? '#dc2626' : 'inherit' }}>{r.tore_pro_spiel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatistikenInner() {
  const loc = useLocation()
  const sub = loc.pathname.split('/').pop()
  const tabs = [
    { id: 'weltrangliste', label: 'WELTRANGLISTE' },
    { id: 'ewige-tabelle', label: 'EWIGE TABELLE' },
    { id: 'champs', label: 'ALLE WELTMEISTER' },
    { id: 'ballermann', label: 'BALLERMÄNNER & SCHIESSBUDEN' },
    { id: 'schiessbude', label: 'SCHIESSBUDEN', hidden: true },
    { id: 'bestenlisten', label: 'BESTENLISTEN', hidden: true },
    { id: 'dinos', label: 'DINOS' },
    { id: 'remiskoenig', label: 'REMISKÖNIGE' },
    { id: 'knappste', label: 'KNAPPSTE RENNEN' },
    { id: 'rekorde', label: 'REKORDE' },
  ]
  const active = tabs.find(t => t.id === sub) ? sub : 'weltrangliste'

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '60px 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Zahlen & Daten</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'var(--white)', marginBottom: 32 }}>Statistiken</h1>
          <div className="stats-tabs" style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
            {tabs.filter(t => !t.hidden).map(t => (
              <Link key={t.id} to={`/statistiken/${t.id}`} style={{
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 600,
                color: active === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}>{t.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {active === 'weltrangliste' && <Weltrangliste />}
          {active === 'ewige-tabelle' && <EwigeTabelle />}
          {active === 'champs' && <Champs />}
          {(active === 'ballermann' || active === 'schiessbude' || active === 'bestenlisten') && <Bestenlisten />}
          {active === 'dinos' && <Dinos />}
          {active === 'remiskoenig' && <Remiskoenige />}
          {active === 'knappste' && <KnappsteRennen />}
          {active === 'rekorde' && <Rekorde />}
        </div>
      </section>
    </div>
  )
}
