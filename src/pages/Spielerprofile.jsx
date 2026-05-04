import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import wm from '../data/wm.json'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const JAHRE = [2006,2008,2010,2012,2014,2016,2018,2022,2024]

// Berechne alle Spieler aus den Abschlusstabellen
function berechneAlle() {
  const map = {}
  Object.entries(wm.abschlusstabellen).forEach(([jahr, tab]) => {
    tab.forEach(r => {
      if (!map[r.name]) map[r.name] = { name: r.name, plaetze: {}, sp:0, s:0, u:0, n:0, t:0, gg:0 }
      map[r.name].plaetze[parseInt(jahr)] = r.pl
      map[r.name].sp += r.sp; map[r.name].s += r.s
      map[r.name].u  += r.u;  map[r.name].n += r.n
      map[r.name].t  += r.t;  map[r.name].gg += r.gg
    })
  })
  const titelMap = {}; const tskMap = {}
  wm.weltmeister.forEach(e => {
    titelMap[e.sieger] = (titelMap[e.sieger] || 0) + 1
    e.torschuetzenkoenig.split(' & ').forEach(n => { tskMap[n.trim()] = (tskMap[n.trim()] || 0) + 1 })
  })
  const pktMap = Object.fromEntries(wm.ewige_tabelle.map(r => [r.name, r.pkt]))
  return Object.values(map).map(s => ({
    ...s,
    titel: titelMap[s.name] || 0,
    tsk: tskMap[s.name] || 0,
    pkt: pktMap[s.name] || 0,
    wms: Object.keys(s.plaetze).length,
    bestePlatz: Math.min(...Object.values(s.plaetze)),
  })).sort((a,b) => b.pkt - a.pkt)
}

const ALLE = berechneAlle()


// Name → Basis-Dateipfad
function getFotoBase(name) {
  return name
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss').replace(/ /g, '_')
}

// Avatar-Kreis: zeigt _1.jpg oder Initialen
function FotoAvatar({ name, size = 80, fontSize = 22 }) {
  const [hasPhoto, setHasPhoto] = React.useState(true)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  const istChamp = wm.weltmeister.some(e => e.sieger === name)
  const borderStyle = istChamp ? '3px solid var(--gold)' : '2px solid rgba(28,66,43,0.15)'

  if (hasPhoto) {
    return (
      <img
        src={`/spieler/${getFotoBase(name)}_1.jpg`}
        alt={name}
        onError={() => setHasPhoto(false)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: borderStyle, flexShrink: 0 }}
      />
    )
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: istChamp ? 'var(--gold)' : 'rgba(28,66,43,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bayon', sans-serif", fontSize,
      color: 'var(--gruen)', flexShrink: 0, border: borderStyle,
    }}>{initials}</div>
  )
}

// Galerie: lädt _1, _2, _3 ... bis Ladefehler
function FotoGalerie({ name, onNoPhoto }) {
  const [fotos, setFotos] = React.useState([1])
  const [aktiv, setAktiv] = React.useState(0)
  const [maxVersuch, setMaxVersuch] = React.useState(2)
  const [keinFoto, setKeinFoto] = React.useState(false)
  const base = getFotoBase(name)

  React.useEffect(() => {
    setFotos([1]); setAktiv(0); setMaxVersuch(2); setKeinFoto(false)
  }, [name])

  const handleLoad = (idx) => {
    if (idx === maxVersuch - 1 && maxVersuch <= 5) {
      setFotos(prev => [...prev, maxVersuch])
      setMaxVersuch(prev => prev + 1)
    }
  }
  const handleError = (n) => {
    if (n === 1) {
      // Erstes Foto fehlt → kein Foto vorhanden
      setKeinFoto(true)
      setFotos([])
      if (onNoPhoto) onNoPhoto()
    } else {
      setFotos(prev => prev.filter(x => x < n))
    }
  }

  const istChamp = wm.weltmeister.some(e => e.sieger === name)

  // Kein Foto: nichts rendern, Layout wird vom Parent angepasst
  if (keinFoto) return null

  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 12, background: 'var(--gruen)', aspectRatio: '3/4', maxHeight: 480 }}>
        {fotos.map((n, i) => (
          <img
            key={n}
            src={`/spieler/${base}_${n}.jpg`}
            alt={`${name} ${n}`}
            onLoad={() => handleLoad(i)}
            onError={() => handleError(n)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              opacity: i === aktiv ? 1 : 0,
              transition: 'opacity 0.3s',
              display: i <= aktiv + 1 ? 'block' : 'none',
            }}
          />
        ))}
        {istChamp && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: 'var(--gruen)', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
            🏆 Weltmeister
          </div>
        )}
        {fotos.length > 1 && (
          <>
            <button onClick={() => setAktiv(a => Math.max(0, a-1))} disabled={aktiv === 0}
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: aktiv === 0 ? 0.3 : 1 }}>‹</button>
            <button onClick={() => setAktiv(a => Math.min(fotos.length-1, a+1))} disabled={aktiv === fotos.length-1}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: aktiv === fotos.length-1 ? 0.3 : 1 }}>›</button>
          </>
        )}
      </div>
      {fotos.length > 1 && (
        <div style={{ display: 'flex', gap: 8 }}>
          {fotos.map((n, i) => (
            <button key={n} onClick={() => setAktiv(i)} style={{ padding: 0, border: i === aktiv ? '2px solid var(--gold)' : '2px solid transparent', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', width: 56, height: 56, flexShrink: 0 }}>
              <img src={`/spieler/${base}_${n}.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function KarriereChart({ spieler }) {
  const canvasRef = React.useRef(null)
  const chartRef = React.useRef(null)

  React.useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    const punkte = JAHRE.map(j => spieler.plaetze[j] || null)
    const labels = JAHRE.map(j => String(j))

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: punkte,
          borderColor: '#1c422b',
          borderWidth: 2.5,
          pointBackgroundColor: punkte.map(p => p === spieler.bestePlatz ? '#b0892d' : '#1c422b'),
          pointRadius: punkte.map(p => p !== null ? (p === spieler.bestePlatz ? 7 : 5) : 0),
          tension: 0.3,
          spanGaps: false,
          fill: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => `WM ${items[0].label}`,
              label: item => item.raw !== null ? `Platz ${item.raw}` : 'Nicht dabei'
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(28,66,43,0.08)' }, ticks: { font: { size: 12 } } },
          y: {
            reverse: true,
            min: 1,
            max: Math.max(...Object.values(spieler.plaetze)) + 2,
            ticks: { stepSize: 5, callback: v => `${v}.`, font: { size: 11 } },
            grid: { color: 'rgba(28,66,43,0.08)' }
          }
        }
      }
    })
    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [spieler])

  return (
    <div style={{ position: 'relative', width: '100%', height: 220 }}>
      <canvas ref={canvasRef} role="img" aria-label={`Karriereverlauf ${spieler.name}`} />
    </div>
  )
}

function SpielerDetail({ spieler }) {
  const [hatFoto, setHatFoto] = React.useState(true)
  const siegQ = spieler.sp ? (spieler.s / spieler.sp * 100).toFixed(1) : 0
  const torQ  = spieler.sp ? (spieler.t / spieler.sp).toFixed(3) : 0
  const ggQ   = spieler.sp ? (spieler.gg / spieler.sp).toFixed(3) : 0
  const diff  = spieler.t - spieler.gg

  return (
    <div>
      {/* Header – grüner Streifen mit Back-Link */}
      <div style={{ background: 'var(--gruen)', padding: '80px 0 48px' }}>
        <div className="container">
          <Link to="/spielerprofile" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'inline-block', marginBottom: 0 }}>← Alle Profile</Link>
        </div>
      </div>

      {/* Foto + Stats – klar unterhalb des Headers */}
      <section style={{ background: 'var(--cream)', paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: hatFoto ? 'minmax(220px, 340px) 1fr' : '1fr', gap: 32, alignItems: 'start', padding: '40px 0' }}>
            {hatFoto && (
              <div>
                <FotoGalerie name={spieler.name} onNoPhoto={() => setHatFoto(false)} />
              </div>
            )}
            <div>
              <h1 style={{ color: 'var(--gruen)', fontSize: 'clamp(26px, 3.5vw, 48px)', marginBottom: 12, lineHeight: 1.1 }}>{spieler.name}</h1>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {spieler.titel > 0 && <span style={{ background: 'var(--gold)', color: 'var(--gruen)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>🏆 {spieler.titel}× Weltmeister</span>}
                {spieler.tsk > 0 && <span style={{ background: 'rgba(28,66,43,0.1)', color: 'var(--gruen)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>👑 {spieler.tsk}× Torschützenkönig</span>}
                <span style={{ background: 'rgba(28,66,43,0.07)', color: 'var(--text-muted)', fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{spieler.wms} WMs · {spieler.sp} Spiele</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
            {[
              { label: 'Siege', value: spieler.s, sub: `${siegQ}%` },
              { label: 'Remis', value: spieler.u, sub: `${(spieler.u/spieler.sp*100).toFixed(1)}%` },
              { label: 'Niederlagen', value: spieler.n },
              { label: 'Tore', value: spieler.t, sub: `${torQ}/Sp` },
              { label: 'Gegentore', value: spieler.gg, sub: `${ggQ}/Sp` },
              { label: 'Tordifferenz', value: diff > 0 ? `+${diff}` : diff, color: diff > 0 ? 'var(--gruen)' : diff < 0 ? '#dc2626' : 'inherit' },
              { label: 'Beste Platz.', value: `${spieler.bestePlatz}.` },
              { label: 'Gesamt-Pkt.', value: spieler.pkt, sub: 'Weltrangliste' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(28,66,43,0.06)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 32, color: s.color || 'var(--gruen)', lineHeight: 1 }}>{s.value}</div>
                {s.sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.sub}</div>}
              </div>
            ))}
              </div>
            </div>
          </div>

          {/* Karrierekurve */}
          <h2 style={{ fontSize: 28, color: 'var(--gruen)', marginBottom: 24 }}>Karriereverlauf</h2>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Platzierung bei jeder WM · Goldpunkt = beste Platzierung
            </div>
            <KarriereChart spieler={spieler} />
            <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
              {JAHRE.map(j => {
                const pl = spieler.plaetze[j]
                return (
                  <div key={j} style={{ textAlign: 'center', minWidth: 48 }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: pl ? (pl === spieler.bestePlatz ? 'var(--gold)' : 'var(--gruen)') : 'var(--text-light)', lineHeight: 1 }}>
                      {pl ? `${pl}.` : '–'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{j}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* WM-Ergebnisse Details */}
          <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: '40px 0 24px' }}>WM-Ergebnisse</h2>
          <div className="card" style={{ overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>WM</th><th>Ort</th><th className="num">Pl.</th>
                  <th className="num">Sp</th><th className="num">S</th><th className="num">U</th><th className="num">N</th>
                  <th className="num">T</th><th className="num">GG</th><th className="num">Pkt</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(wm.abschlusstabellen)
                  .filter(([, tab]) => tab.some(r => r.name === spieler.name))
                  .sort(([a],[b]) => parseInt(b) - parseInt(a))
                  .map(([jahr, tab]) => {
                    const r = tab.find(x => x.name === spieler.name)
                    const wme = wm.weltmeister.find(x => String(x.jahr) === jahr)
                    return (
                      <tr key={jahr} style={{ background: r.pl === 1 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                        <td><Link to={`/events/${jahr}`} style={{ color: 'var(--gruen)', fontWeight: 600 }}>{jahr}</Link></td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{wme?.ort || '–'}</td>
                        <td className="rank">{r.pl === 1 ? '🏆' : `${r.pl}.`}</td>
                        <td className="num">{r.sp}</td>
                        <td className="num" style={{ color: 'var(--gruen)' }}>{r.s}</td>
                        <td className="num">{r.u}</td>
                        <td className="num" style={{ color: '#dc2626' }}>{r.n}</td>
                        <td className="num">{r.t}</td>
                        <td className="num">{r.gg}</td>
                        <td className="num pts">{r.pkt}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

function SpielerListe() {
  const [suche, setSuche] = React.useState('')
  const gefiltert = ALLE.filter(s => s.name.toLowerCase().includes(suche.toLowerCase()))

  return (
    <div>
      <div style={{ background: 'var(--gruen)', padding: '80px 0 48px' }}>
        <div className="container">
          <div className="eyebrow">Trommelschießen-WM</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 16 }}>Spielerprofile</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 560 }}>
            Alle 56 Trommler mit Karrierestatistiken, Platzierungsverläufen und WM-Ergebnissen.
          </p>
          <input
            type="text" placeholder="Trommler suchen..."
            value={suche} onChange={e => setSuche(e.target.value)}
            style={{ marginTop: 24, padding: '12px 20px', borderRadius: 10, border: 'none', fontSize: 15, width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
          />
        </div>
      </div>

      <section style={{ background: 'var(--cream)', padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {gefiltert.map((s, i) => (
              <Link key={s.name} to={`/spielerprofile/${encodeURIComponent(s.name)}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <FotoAvatar name={s.name} size={44} fontSize={14} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'var(--gruen)', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.name}
                      {s.titel > 0 && <span style={{ marginLeft: 6, fontSize: 13 }}>🏆</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {s.wms} WMs · Ø Platz {s.sp > 0 ? (Object.values(s.plaetze).reduce((a,b)=>a+b,0)/s.wms).toFixed(1) : '–'} · {s.pkt} Pkt
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--text-light)' }}>→</div>
                </div>
              </Link>
            ))}
          </div>
          {gefiltert.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Kein Trommler gefunden.</p>}
        </div>
      </section>
    </div>
  )
}

export default function Spielerprofile() {
  const { name } = useParams()
  if (name) {
    const decoded = decodeURIComponent(name)
    const spieler = ALLE.find(s => s.name === decoded)
    if (!spieler) return <div style={{ padding: '120px 24px', textAlign: 'center' }}>Spieler nicht gefunden.</div>
    return <SpielerDetail spieler={spieler} />
  }
  return <SpielerListe />
}
