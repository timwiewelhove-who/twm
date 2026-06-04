import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWMData } from '../useWMData'

const WMContext = React.createContext(null)
const useWM = () => React.useContext(WMContext)

// ── Weltrangliste ─────────────────────────────────────────────────────────
function Weltrangliste() {
  const wm = useWM()
  const rangliste = wm.weltrangliste.filter(r => r.total > 0)
  const hat2026 = rangliste.some(r => r.wm2026 > 0)
  const jahre = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2022, 2024, ...(hat2026 ? [2026] : [])]
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15, lineHeight: 1.7 }}>
        Die Weltrangliste berechnet den aktuellen Leistungsstand aller Trommelschützen auf Basis der WM-Ergebnisse. Sie ist kein Gefühl, kein Bauchgefühl und kein Trost. Sie ist das Ergebnis. Wer oben steht, hat es sich verdient. Wer in der Mitte steht, lügt sich meistens ein bisschen an.
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
            {rangliste.map((r, i) => (
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

// ── Ewige Tabelle ─────────────────────────────────────────────────────────
function EwigeTabelle() {
  const wm = useWM()
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15, lineHeight: 1.7 }}>
        Die Ewige Tabelle ist das Gedächtnis des Sports. Hier zählt nicht das letzte Turnier, nicht der eine großartige Tag. Hier zählt alles — jedes Spiel, jeder Punkt, jede WM seit 2006. Wer hier oben steht, hat über Jahre konstant geliefert. Wer hier unten steht, hat zumindest immer mitgemacht. Das ist auch etwas wert.
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
            {wm.ewige_tabelle.filter(r => r.sp > 0).map((r, i) => (
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

// ── Alle Weltmeister ──────────────────────────────────────────────────────
function Champs() {
  const wm = useWM()
  const events = [...wm.weltmeister].reverse()
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Weltmeister wird man nicht durch Anwesenheit. Auch nicht durch Enthusiasmus oder die richtige Trommel. Weltmeister wird man, indem man an einem langen, heißen Turniertag besser ist als alle anderen. Diese Liste führt alle auf, die das geschafft haben. Manche einmal, einer zweimal. Alle zu Recht.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(e => (
          <Link key={e.jahr} to={`/turniere/${e.jahr}`} className="card card--hover" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '80px 1fr auto', alignItems: 'center', gap: 20 }}>
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

// ── Dinos ─────────────────────────────────────────────────────────────────
const ALLE_JAHRE = [2006,2008,2010,2012,2014,2016,2018,2022,2024]
const DINOS_NAMES = ['Bastian Buse','Jenne Meyer','Sascha Wachtendorf']

function Dinos() {
  const wm = useWM()
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Nur drei Spieler haben an jeder einzelnen WM teilgenommen — von der allerersten 2006 in Hamburg bis zur Jubiläums-WM 2026. Nicht zweimal ausgesetzt, nicht einmal gefehlt, nicht einmal einen Urlaub vorgezogen. Basti, Sascha und Jenne sind die Trommel-Dinos: eine aussterbende Spezies mit bemerkenswert hoher Ausdauer und einem offensichtlichen Problem, an Wochenenden Nein zu sagen.
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
                <Link key={e.jahr} to={`/turniere/${e.jahr}`} style={{
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
      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>WM 2024 · Jaderberg</div>
        <div style={{ columns: '2 300px', columnGap: 12 }}>
          {['/dino-2.jpg', '/dino-1.jpg', '/dino-5.jpg'].map((src, i) => (
            <div key={i} style={{ breakInside: 'avoid', marginBottom: 12 }}>
              <img src={src} alt="Trommelschießen-Dinos WM 2024" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────
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

// ── Ballermänner ──────────────────────────────────────────────────────────
function Ballermann() {
  const wm = useWM()
  const [mode, setMode] = React.useState('absolut')
  const stats = calcStats(wm)
  const sorted = mode === 'absolut'
    ? [...stats].sort((a, b) => b.t - a.t)
    : [...stats].sort((a, b) => parseFloat(b.tQuote) - parseFloat(a.tQuote))
  const koenige = {}
  wm.weltmeister.forEach(e => {
    e.torschuetzenkoenig.split(' & ').forEach(name => {
      koenige[name.trim()] = (koenige[name.trim()] || 0) + 1
    })
  })
  const topKoenige = Object.entries(koenige).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Tore schießen ist im Trommelschießen kein Zufall — es ist Handwerk, Wiederholung und ein gesundes Verhältnis zur eigenen Treffsicherheit. Wer hier oben steht, hat nicht einmal gut gezielt. Er hat einfach immer wieder gezielt. Und meistens getroffen.
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
      <Toggle options={[{ id: 'absolut', label: 'Meiste Treffer' }, { id: 'quote', label: 'Beste Quote' }]} value={mode} onChange={setMode} />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th><th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'Tore' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'Tore'}</th>
              <th className="num">Spiele</th><th className="num">GG</th><th className="num">Diff</th>
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

// ── Schießbuden ───────────────────────────────────────────────────────────
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
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        In jeder WM gibt es Paarungen, die sich scheinbar verabredet haben, die Trommel besonders ausgiebig zu beschäftigen. Die Schießbuden-Statistik dokumentiert, wer den Gegner am häufigsten jubeln ließ. Verteidigung war für diese Männer immer nur ein theoretisches Konzept.
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
      <Toggle options={[{ id: 'absolut', label: 'Meiste Gegentore' }, { id: 'quote', label: 'Höchste Quote' }]} value={mode} onChange={setMode} />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th><th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'GG-Tore' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'GG-Tore'}</th>
              <th className="num">Tore</th><th className="num">Diff</th><th className="num">Spiele</th>
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

// ── Remiskönige ───────────────────────────────────────────────────────────
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
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Das Unentschieden im Trommelschießen ist eine seltene, aber dokumentierte Erscheinung. Und wie bei allem Seltenen gibt es auch hier Spezialisten. Ob das Strategie ist, Pech, oder die natürliche Folge eines ausgewogenen Charakters, lässt sich aus den Zahlen nicht herauslesen. Die Zahlen zeigen nur, wer es am häufigsten getan hat.
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
      <Toggle options={[{ id: 'absolut', label: 'Meiste Remis' }, { id: 'quote', label: 'Höchste Quote' }]} value={mode} onChange={setMode} />
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th><th>Trommler</th>
              <th className="num">{mode === 'absolut' ? 'Remis' : 'Quote'}</th>
              <th className="num">{mode === 'absolut' ? 'Quote' : 'Remis'}</th>
              <th className="num">%</th><th className="num">Spiele</th>
              <th className="num">Tore</th><th className="num">GG</th>
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

// ── Knappste Rennen ───────────────────────────────────────────────────────
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
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 15, lineHeight: 1.7 }}>
        Die WM-Geschichte kennt Turniere, die bereits zur Halbzeit entschieden waren — und solche, bei denen bis zur allerletzten Partie völlig unklar war, wer am Ende die Schale in die Höhe reckt. Die knappsten Titelrennen: Turniere, bei denen die Tabelle so eng war, dass ein einziger Treffer die Geschichte verändert hätte.
      </p>
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
                <div style={{ width: `${Math.round(r.diff / maxDiff * 100)}%`, height: '100%', borderRadius: 4, background: r.diff === 1 ? '#dc2626' : r.diff <= 2 ? '#ea580c' : r.diff <= 3 ? '#d97706' : 'var(--gruen)' }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 40, lineHeight: 1, color: r.diff === 1 ? '#dc2626' : r.diff <= 2 ? '#ea580c' : r.diff <= 3 ? '#d97706' : 'var(--gruen)' }}>{r.diff}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pkt. Diff.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Supabase RPC ──────────────────────────────────────────────────────────
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


// ── Höchste Siege ─────────────────────────────────────────────────────────
function HoechsteSiege() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    rpc('rekorde_hoechste_siege').then(r => {
      if (Array.isArray(r)) setData(r)
      setLoading(false)
    })
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>

  const gefiltert = data.filter(r => r.differenz >= 3)
  const highlights = gefiltert.filter(r => r.differenz >= 4)
  const normal = gefiltert.filter(r => r.differenz === 3)

  return (
    <div>
      <div style={{ marginBottom: 56 }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 16, lineHeight: 1.2 }}>
          Wenn der Gegner aufgehört hat zu zählen, hat der Sieger weitergemacht.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720 }}>
          Nicht jedes Spiel endet knapp. Manche Partien in der WM-Geschichte haben eine Deutlichkeit erreicht, die man entweder als Demonstration handwerklicher Überlegenheit bezeichnen kann — oder als stillose Übertreibung, je nach Perspektive. Die höchsten Siege aller Zeiten zeigen, wie weit der Abstand zwischen zwei Spielern an einem einzigen Tag werden kann. Der Verlierer dieser Partien war meistens trotzdem wieder beim nächsten Turnier. Das ist der Geist dieser WM.
        </p>
      </div>
      {highlights.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
            Absolute Ausreißer — 4+ Tore Abstand
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {highlights.map((r, i) => {
              const siegerImg = `/spieler/${r.sieger.replace(/ /g, '_')}.jpg`
              return (
                <div key={i} style={{
                  background: 'var(--gruen)', borderRadius: 16, padding: '28px 32px',
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center',
                }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
                    <img src={siegerImg} alt={r.sieger} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 6 }}>WM {r.jahr}</div>
                    <div style={{ fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 4 }}>{r.sieger}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>besiegte {r.verlierer}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{r.tore_s}:{r.tore_n}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>+{r.differenz} Tore</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {normal.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
            3 Tore Abstand
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {normal.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center',
                padding: '16px 24px', borderBottom: i < normal.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--gruen)', fontSize: 15 }}>{r.sieger}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>vs. {r.verlierer} · WM {r.jahr}</div>
                </div>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>{r.tore_s}:{r.tore_n}</div>
                <div style={{ background: 'rgba(28,66,43,0.08)', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700, color: 'var(--gruen)' }}>+{r.differenz}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {gefiltert.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)' }}>Noch keine Daten verfügbar.</div>
      )}
    </div>
  )
}

// ── Placeholder für noch nicht implementierte Seiten ──────────────────────
function ComingSoon({ titel, text }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 64, color: 'rgba(28,66,43,0.08)', marginBottom: 24 }}>BALD</div>
      <h2 style={{ fontSize: 28, color: 'var(--gruen)', marginBottom: 16 }}>{titel}</h2>
      <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>{text}</p>
    </div>
  )
}

// ── Slug-Mapping ──────────────────────────────────────────────────────────
// Definiert für jede URL welche Komponente und welcher Tab-Label aktiv ist
const SLUG_CONFIG = {
  // Ranglisten
  'weltrangliste':      { section: 'ranglisten', label: 'WELTRANGLISTE',      component: 'weltrangliste' },
  'ewige-tabelle':      { section: 'ranglisten', label: 'EWIGE TABELLE',       component: 'ewige-tabelle' },
  'weltmeister':        { section: 'ranglisten', label: 'ALLE WELTMEISTER',    component: 'champs' },
  // Stats
  'ballermann':         { section: 'stats', label: 'BALLERMÄNNER',            component: 'ballermann' },
  'schiessbuden':       { section: 'stats', label: 'SCHIESSBUDEN',            component: 'schiessbude' },
  'dinos':              { section: 'stats', label: 'TROMMEL-DINOS',           component: 'dinos' },
  'remiskoenige':       { section: 'stats', label: 'REMISKÖNIGE',             component: 'remiskoenige' },
  'knappste-rennen':    { section: 'stats', label: 'KNAPPSTE RENNEN',         component: 'knappste' },
  'hoechste-siege':     { section: 'stats', label: 'HÖCHSTE SIEGE',           component: 'hoechste-siege' },
  'torreichste-spiele': { section: 'stats', label: 'TORREICHSTE SPIELE',      component: 'torreichste-spiele' },
  'engste-duelle':      { section: 'stats', label: 'ENGSTE DUELLE',           component: 'engste-duelle' },
  'siegesserien':       { section: 'stats', label: 'SIEGESSERIEN',            component: 'siegesserien' },
  'niederlagenserien':  { section: 'stats', label: 'NIEDERLAGENSERIEN',       component: 'niederlagenserien' },
  'vergleich':          { section: 'stats', label: 'IM VERGLEICH',            component: 'vergleich' },
  // Legacy slugs (werden noch aus alten Links aufgerufen)
  'champs':             { section: 'ranglisten', label: 'ALLE WELTMEISTER',   component: 'champs' },
  'remiskoenig':        { section: 'stats', label: 'REMISKÖNIGE',             component: 'remiskoenige' },
  'knappste':           { section: 'stats', label: 'KNAPPSTE RENNEN',         component: 'knappste' },
  'rekorde':            { section: 'stats', label: 'REKORDE',                 component: 'vergleich' },
  'bestenlisten':       { section: 'stats', label: 'BALLERMÄNNER',            component: 'ballermann' },
  'schiessbude':        { section: 'stats', label: 'SCHIESSBUDEN',            component: 'schiessbude' },
}

const RANGLISTEN_TABS = [
  { slug: 'weltrangliste', label: 'Weltrangliste' },
  { slug: 'ewige-tabelle', label: 'Ewige Tabelle' },
  { slug: 'weltmeister',   label: 'Alle Weltmeister' },
]

const STATS_TABS = [
  { slug: 'ballermann',         label: 'Ballermänner' },
  { slug: 'schiessbuden',       label: 'Schießbuden' },
  { slug: 'dinos',              label: 'Trommel-Dinos' },
  { slug: 'remiskoenige',       label: 'Remiskönige' },
  { slug: 'knappste-rennen',    label: 'Knappste Rennen' },
  { slug: 'hoechste-siege',     label: 'Höchste Siege' },
  { slug: 'torreichste-spiele', label: 'Torreichste Spiele' },
  { slug: 'engste-duelle',      label: 'Engste Duelle' },
  { slug: 'siegesserien',       label: 'Längste Siegesserien' },
  { slug: 'niederlagenserien',  label: 'Längste Niederlagenserien' },
  { slug: 'vergleich',          label: 'Turniere im Vergleich' },
]

const PAGE_TITLES = {
  ranglisten: { eyebrow: 'Ranglisten', h1: 'Zahlen lügen nicht. Menschen schon.' },
  stats:      { eyebrow: 'Stats', h1: 'Der Sport in Zahlen.' },
}

const SECTION_TITLES = {
  'weltrangliste':      { h2: 'Weltrangliste',           sub: 'Wer steht wo. Warum. Und wie lange noch.' },
  'ewige-tabelle':      { h2: 'Ewige Tabelle',           sub: 'Die Wahrheit über zwanzig Jahre Trommelschießen.' },
  'weltmeister':        { h2: 'Alle Weltmeister',        sub: 'Der erlesene Kreis der Gekrönten.' },
  'champs':             { h2: 'Alle Weltmeister',        sub: 'Der erlesene Kreis der Gekrönten.' },
  'ballermann':         { h2: 'Ballermänner',            sub: 'Schießen als Lebenseinstellung.' },
  'bestenlisten':       { h2: 'Ballermänner',            sub: 'Schießen als Lebenseinstellung.' },
  'schiessbuden':       { h2: 'Schiessbuden',             sub: 'Manche Teams treffen öfter. Diese hier am öftersten.' },
  'schiessbude':        { h2: 'Schießbuden',             sub: 'Manche Teams treffen öfter. Diese hier am öftersten.' },
  'dinos':              { h2: 'Trommel-Dinos',           sub: 'Dabei seit Anbeginn. Immer noch da.' },
  'remiskoenige':       { h2: 'Remiskönige',             sub: 'Unentschieden ist auch ein Ergebnis.' },
  'remiskoenig':        { h2: 'Remiskönige',             sub: 'Unentschieden ist auch ein Ergebnis.' },
  'knappste-rennen':    { h2: 'Knappste Rennen',         sub: 'Ein Punkt Unterschied. Manchmal keiner.' },
  'knappste':           { h2: 'Knappste Rennen',         sub: 'Ein Punkt Unterschied. Manchmal keiner.' },
  'hoechste-siege':     { h2: 'Höchste Siege', sub: '' },
  'torreichste-spiele': { h2: 'Torreichste Spiele',      sub: 'Verteidigung war keine Option.' },
  'engste-duelle':      { h2: 'Engste Duelle',           sub: 'Nahkampf auf der Trommel.' },
  'siegesserien':       { h2: 'Längste Siegesserien',    sub: 'Wer aufgehört hat zu verlieren.' },
  'niederlagenserien':  { h2: 'Längste Niederlagenserien', sub: 'Charakter zeigt sich nicht im Sieg.' },
  'vergleich':          { h2: 'Turniere im Vergleich',   sub: 'Welches Turnier war das beste?' },
  'rekorde':            { h2: 'Rekorde',                 sub: 'Die Extremwerte des Sports.' },
}

// ── Hauptkomponente ───────────────────────────────────────────────────────
export default function Statistiken() {
  const { data: wm, loading } = useWMData()
  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>
  return (
    <WMContext.Provider value={wm}>
      <StatistikenInner />
    </WMContext.Provider>
  )
}

function StatistikenInner() {
  const loc = useLocation()
  const slug = loc.pathname.split('/').pop()
  const config = SLUG_CONFIG[slug]
  const section = config?.section || (loc.pathname.startsWith('/ranglisten') ? 'ranglisten' : 'stats')
  const component = config?.component || (section === 'ranglisten' ? 'weltrangliste' : 'ballermann')
  const tabs = section === 'ranglisten' ? RANGLISTEN_TABS : STATS_TABS
  const pageTitle = PAGE_TITLES[section]
  const sectionTitle = SECTION_TITLES[slug] || SECTION_TITLES[component] || { h2: '', sub: '' }

  // Aktiver Tab: entspricht dem slug oder dem component
  const activeSlug = tabs.find(t => t.slug === slug)?.slug
    || tabs.find(t => SLUG_CONFIG[t.slug]?.component === component)?.slug
    || tabs[0].slug

  const basePath = section === 'ranglisten' ? '/ranglisten' : '/stats'

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="stats-header-section" style={{ background: 'var(--gruen)', padding: 'clamp(40px, 8vw, 60px) 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>{pageTitle.eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--white)', marginBottom: sectionTitle.h2 ? 8 : 32 }}>
            {sectionTitle.h2 || pageTitle.h1}
          </h1>
          {sectionTitle.sub && (
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, marginBottom: 32, maxWidth: 560 }}>{sectionTitle.sub}</p>
          )}
          <div className="subnav-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 28, paddingTop: 8 }}>
            {tabs.map(t => (
              <Link key={t.slug} to={`${basePath}/${t.slug}`} style={{
                padding: '7px 16px',
                fontSize: 13, fontWeight: 600,
                borderRadius: 999,
                border: '1px solid',
                borderColor: activeSlug === t.slug ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                background: activeSlug === t.slug ? 'var(--gold)' : 'transparent',
                color: activeSlug === t.slug ? 'var(--gruen)' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (activeSlug !== t.slug) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                }
              }}
              onMouseLeave={e => {
                if (activeSlug !== t.slug) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                }
              }}
              >{t.label}</Link>
            ))}
          </div>
          <style>{`@media (max-width: 700px) { .subnav-pills { display: none !important; } .stats-header-section { padding-bottom: 40px !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {component === 'weltrangliste'      && <Weltrangliste />}
          {component === 'ewige-tabelle'      && <EwigeTabelle />}
          {component === 'champs'             && <Champs />}
          {component === 'ballermann'         && <Ballermann />}
          {component === 'schiessbude'        && <Schiessbude />}
          {component === 'dinos'              && <Dinos />}
          {component === 'remiskoenige'       && <Remiskoenige />}
          {component === 'knappste'           && <KnappsteRennen />}
          {component === 'hoechste-siege'     && <HoechsteSiege />}
          {component === 'torreichste-spiele' && <ComingSoon titel="Torreichste Spiele" text="Verteidigung war keine Option. Diese Statistik folgt in Kürze." />}
          {component === 'engste-duelle'      && <ComingSoon titel="Engste Duelle" text="Nahkampf auf der Trommel. Diese Statistik folgt in Kürze." />}
          {component === 'vergleich'          && <ComingSoon titel="Turniere im Vergleich" text="Welches Turnier war das beste? Die Zahlen haben eine Meinung. Folgt in Kürze." />}
          {component === 'siegesserien'       && <ComingSoon titel="Längste Siegesserien" text="Wer aufgehört hat zu verlieren, hat angefangen zu dominieren. Diese Statistik folgt in Kürze." />}
          {component === 'niederlagenserien'  && <ComingSoon titel="Längste Niederlagenserien" text="Charakter zeigt sich nicht im Sieg. Er zeigt sich darin, wieder anzutreten. Diese Statistik folgt in Kürze." />}
        </div>
      </section>
    </div>
  )
}
