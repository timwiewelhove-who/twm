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
            <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
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
                  <h3 style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gruen)', letterSpacing: '0.03em' }}>{name}</h3>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Dabei seit 2006 · Bestes Ergebnis: Platz {beste?.pl} ({beste?.jahr})
                </div>
              </div>
              {ewige && (
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gold)' }}>{ewige.pkt}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ewige Pkt.</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gruen)' }}>{ewige.sp}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Spiele</div>
                  </div>
                  {weltR && <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gruen)' }}>#{weltR.pl}</div>
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

export default function Statistiken() {
  const loc = useLocation()
  const sub = loc.pathname.split('/').pop()
  const tabs = [
    { id: 'weltrangliste', label: 'Weltrangliste' },
    { id: 'ewige-tabelle', label: 'Ewige Tabelle' },
    { id: 'champs', label: 'Alle Weltmeister' },
    { id: 'dinos', label: 'Dinos' },
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
        </div>
      </section>
    </div>
  )
}
