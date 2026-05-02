import { Link, useLocation } from 'react-router-dom'
import wm from '../data/wm.json'

function Weltrangliste() {
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
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2006</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2008</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2010</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2012</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2014</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2016</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2018</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2022</th>
              <th className="num rangliste-year" style={{ fontSize: 10 }}>2024</th>
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
                {[r.wm2006, r.wm2008, r.wm2010, r.wm2012, r.wm2014, r.wm2016, r.wm2018, r.wm2022, r.wm2024].map((v, j) => (
                  <td key={j} className="num rangliste-year" style={{ color: v === 100 ? 'var(--gold)' : v >= 50 ? 'var(--gruen)' : v > 0 ? 'var(--text-muted)' : 'var(--border)', fontSize: v === 0 ? 12 : 14 }}>
                    {v || '–'}
                  </td>
                ))}
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
  const events = [...wm.weltmeister].reverse()
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 32 }}>Alle Weltmeister</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(e => (
          <Link key={e.jahr} to={`/events/${e.jahr}`} className="card card--hover" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '80px 1fr auto', alignItems: 'center', gap: 20 }}>
            <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
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
  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Trommelschießen-Dinos</h2>
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
                  <h3 style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)', letterSpacing: '0.03em' }}>{name}</h3>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Dabei seit 2006 · Bestes Ergebnis: Platz {beste?.pl} ({beste?.jahr})
                </div>
              </div>
              {ewige && (
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>{ewige.pkt}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ewige Pkt.</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>{ewige.sp}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Spiele</div>
                  </div>
                  {weltR && <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>#{weltR.pl}</div>
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


function Ballermann() {
  // Tore summieren aus Abschlusstabellen
  const toreMap = {}
  const spieleMap = {}
  Object.values(wm.abschlusstabellen).forEach(tabelle => {
    tabelle.forEach(r => {
      toreMap[r.name] = (toreMap[r.name] || 0) + (r.t || 0)
      spieleMap[r.name] = (spieleMap[r.name] || 0) + (r.sp || 0)
    })
  })
  const top = Object.entries(toreMap)
    .map(([name, tore]) => ({ name, tore, sp: spieleMap[name], quote: (tore / spieleMap[name]).toFixed(3) }))
    .sort((a, b) => b.tore - a.tore)
  // Torschützenkönig-Titel
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
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>
        Die treffsichersten Trommler aller Zeiten – nach Gesamttoren und Torquote.
      </p>

      {/* Torschützenkönige */}
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>
        👑 Torschützenkönige
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
        {topKoenige.map(([name, anzahl], i) => (
          <div key={name} className="card" style={{
            padding: '20px 24px',
            background: i === 0 ? 'var(--gruen)' : 'var(--white)',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 40, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>
              {anzahl}x
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: i === 0 ? 'white' : 'var(--gruen)' }}>{name}</div>
              <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', marginTop: 2 }}>
                {wm.weltmeister
                  .filter(e => e.torschuetzenkoenig.includes(name))
                  .map(e => e.jahr).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Foto-Platzhalter für Henning Diers – wird ersetzt wenn Foto da */}
      <div style={{ marginBottom: 40, borderRadius: 16, overflow: 'hidden', maxWidth: 600 }}>
        <div style={{
          height: 280,
          background: 'linear-gradient(135deg, var(--gruen) 0%, #2a5c3f 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, position: 'relative',
        }}>
          <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 56, color: 'var(--gold)', lineHeight: 1 }}>HENNING DIERS</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>3× Torschützenkönig · 3× Weltmeister</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'var(--gold)' }} />
        </div>
      </div>

      {/* Top-Torschützen Tabelle */}
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>
        ⚽ Meiste Tore gesamt
      </h3>
      <div className="card" style={{ overflow: 'auto', marginBottom: 40 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">Tore</th>
              <th className="num">Spiele</th>
              <th className="num">Quote</th>
            </tr>
          </thead>
          <tbody>
            {top.map((r, i) => (
              <tr key={r.name} style={{ background: i === 0 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num pts">{r.tore}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.quote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Beste Torquote */}
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>
        🎯 Beste Torquote (mind. 100 Spiele)
      </h3>
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">Quote</th>
              <th className="num">Tore</th>
              <th className="num">Spiele</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(toreMap)
              .map(([name, tore]) => ({ name, tore, sp: spieleMap[name], quote: tore / spieleMap[name] }))
              .filter(r => r.sp >= 100)
              .sort((a, b) => b.quote - a.quote)
              .slice(0, 10)
              .map((r, i) => (
                <tr key={r.name}>
                  <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                  <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                  <td className="num pts">{r.quote.toFixed(3)}</td>
                  <td className="num" style={{ color: 'var(--text-muted)' }}>{r.tore}</td>
                  <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Schiessbude() {
  const ggMap = {}
  const spieleMap = {}
  const toreMap = {}
  Object.values(wm.abschlusstabellen).forEach(tabelle => {
    tabelle.forEach(r => {
      ggMap[r.name] = (ggMap[r.name] || 0) + (r.gg || 0)
      spieleMap[r.name] = (spieleMap[r.name] || 0) + (r.sp || 0)
      toreMap[r.name] = (toreMap[r.name] || 0) + (r.t || 0)
    })
  })

  const top = Object.entries(ggMap)
    .map(([name, gg]) => ({ name, gg, sp: spieleMap[name], t: toreMap[name], diff: toreMap[name] - gg, quote: (gg / spieleMap[name]).toFixed(3) }))
    .sort((a, b) => b.gg - a.gg)

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Schießbuden</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
        Die großzügigsten Torwächter des Trommelschießens – wer hat den Gegner am häufigsten jubeln lassen?
      </p>

      {/* Top 3 Highlight */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {top.slice(0, 3).map((r, i) => (
          <div key={r.name} className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{'🏚️🚪🕳️'[i]}</div>
            <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 48, color: i === 0 ? '#dc2626' : i === 1 ? '#ea580c' : '#d97706', lineHeight: 1 }}>{r.gg}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '6px 0 4px' }}>Gegentore</div>
            <div style={{ fontWeight: 700, color: 'var(--gruen)', fontSize: 16 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4 }}>{r.sp} Spiele · {r.quote}/Sp</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">Gegentore</th>
              <th className="num">Tore</th>
              <th className="num">Diff</th>
              <th className="num">Spiele</th>
              <th className="num">GG/Sp</th>
            </tr>
          </thead>
          <tbody>
            {top.map((r, i) => (
              <tr key={r.name}>
                <td className="rank">{i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num" style={{ color: '#dc2626', fontWeight: 700 }}>{r.gg}</td>
                <td className="num">{r.t}</td>
                <td className={`num ${r.diff > 0 ? 'pos' : r.diff < 0 ? 'neg' : ''}`}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.quote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(220,38,38,0.05)', borderRadius: 12, border: '1px solid rgba(220,38,38,0.1)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        💡 <strong>Hinweis:</strong> Wer viele Gegentore kassiert hat, ist meist auch lange dabei – die Dinos und Veteranen dominieren naturgemäß diese Liste. Für den echten Vergleich lohnt sich die Quote pro Spiel.
      </div>
    </div>
  )
}


function Remiskoenige() {
  const remisMap = {}
  const spieleMap = {}
  const toreMap = {}
  const ggMap = {}
  Object.values(wm.abschlusstabellen).forEach(tabelle => {
    tabelle.forEach(r => {
      remisMap[r.name] = (remisMap[r.name] || 0) + (r.u || 0)
      spieleMap[r.name] = (spieleMap[r.name] || 0) + (r.sp || 0)
      toreMap[r.name] = (toreMap[r.name] || 0) + (r.t || 0)
      ggMap[r.name] = (ggMap[r.name] || 0) + (r.gg || 0)
    })
  })

  const all = Object.entries(remisMap)
    .map(([name, u]) => ({
      name, u,
      sp: spieleMap[name],
      t: toreMap[name],
      gg: ggMap[name],
      quote: (u / spieleMap[name]).toFixed(3),
      quotePct: ((u / spieleMap[name]) * 100).toFixed(1),
    }))
    .sort((a, b) => b.u - a.u)

  const top3 = all.slice(0, 3)
  const topQuote = [...all].filter(r => r.sp >= 100).sort((a, b) => b.quote - a.quote).slice(0, 10)

  return (
    <div>
      <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 8 }}>Remiskönige</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>
        Wer holt am häufigsten das Unentschieden? Die Meister des kontrollierten Patt.
      </p>

      {/* Top 3 Highlight */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {top3.map((r, i) => (
          <div key={r.name} className="card" style={{ padding: '24px', textAlign: 'center', background: i === 0 ? 'var(--gruen)' : 'var(--white)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{'🤝🫱🫲'[i]}</div>
            <div style={{ fontFamily: "TrommelHead, 'Bayon', sans-serif", fontSize: 52, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.u}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '6px 0 4px' }}>Unentschieden</div>
            <div style={{ fontWeight: 700, color: i === 0 ? 'white' : 'var(--gruen)', fontSize: 16 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-light)', marginTop: 4 }}>{r.sp} Spiele · {r.quotePct}%</div>
          </div>
        ))}
      </div>

      {/* Alle Trommler – nach Unentschieden gesamt */}
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>
        🤝 Meiste Unentschieden gesamt
      </h3>
      <div className="card" style={{ overflow: 'auto', marginBottom: 40 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">Remis</th>
              <th className="num">Spiele</th>
              <th className="num">Quote</th>
              <th className="num">%</th>
              <th className="num">Tore</th>
              <th className="num">GG</th>
            </tr>
          </thead>
          <tbody>
            {all.map((r, i) => (
              <tr key={r.name} style={{ background: i === 0 ? 'rgba(28,66,43,0.05)' : 'transparent' }}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num pts">{r.u}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.quote}</td>
                <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.quotePct}%</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.t}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.gg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Beste Quote */}
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16 }}>
        📊 Höchste Remis-Quote (mind. 100 Spiele)
      </h3>
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}>Pl.</th>
              <th>Trommler</th>
              <th className="num">Quote</th>
              <th className="num">%</th>
              <th className="num">Remis</th>
              <th className="num">Spiele</th>
            </tr>
          </thead>
          <tbody>
            {topQuote.map((r, i) => (
              <tr key={r.name}>
                <td className="rank">{i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</td>
                <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                <td className="num pts">{r.quote}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.quotePct}%</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.u}</td>
                <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Statistiken() {
  const loc = useLocation()
  const sub = loc.pathname.split('/').pop()
  const tabs = [
    { id: 'weltrangliste', label: 'WELTRANGLISTE' },
    { id: 'ewige-tabelle', label: 'EWIGE TABELLE' },
    { id: 'champs', label: 'ALLE WELTMEISTER' },
    { id: 'dinos', label: 'DINOS' },
    { id: 'ballermann', label: 'BALLERMÄNNER' },
    { id: 'schiessbude', label: 'SCHIESSBUDEN' },
    { id: 'remiskoenig', label: 'REMISKÖNIGE' },
  ]
  const active = tabs.find(t => t.id === sub) ? sub : 'weltrangliste'

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '60px 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Zahlen & Daten</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'var(--white)', marginBottom: 32 }}>Statistiken</h1>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {tabs.map(t => (
              <Link key={t.id} to={`/statistiken/${t.id}`} style={{
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 600,
                color: active === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.15s',
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
          {active === 'dinos' && <Dinos />}
          {active === 'ballermann' && <Ballermann />}
          {active === 'schiessbude' && <Schiessbude />}
          {active === 'remiskoenig' && <Remiskoenige />}
        </div>
      </section>
    </div>
  )
}
