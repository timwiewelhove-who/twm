import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useWMData } from '../useWMData'

const TURNIER_TABS = [2026, 2024, 2022, 2018, 2016, 2014, 2012, 2010, 2008, 2006]

const INTRO_TEXTE = {
  2006: 'Die Geburtsstunde. In einer Norderstedter WG entstand die Idee, Tischkicker ernst zu nehmen — ernsthafter jedenfalls als die meisten anderen Dinge in diesem Sommer. Stephan Krontal gewann das erste Turnier, das noch keiner für ein erstes Turnier hielt.',
  2008: 'Die zweite Auflage, die erste mit Wiederholungsgefahr. Berne, Ubbo Meyers Garten, Bierbänke. Henning Diers setzte sich durch und machte klar: Das hier wird öfter stattfinden.',
  2010: 'Marco Praekel gewann seinen ersten Titel — ruhig, präzise, ohne viel Aufhebens. Berne blieb das Zuhause der WM, der Garten wurde zur Pilgerstätte.',
  2012: 'Holger Müller. Zum ersten Mal. Mit 46 Punkten und einer Dominanz, die niemand erwartet hatte. Maik Lösekann schoss die meisten Tore — aber es reichte nicht.',
  2014: 'Die Heimkehr nach Hamburg. Henning Diers holte seinen zweiten Titel — sechs Jahre nach dem ersten. Diesmal wusste er, wie es geht.',
  2016: 'Henning Diers wieder. Titel Nummer zwei in Hamburg, mit 71 Punkten. Einer der wenigen Spieler, die beweisen konnten: Wiederholung ist kein Zufall.',
  2018: 'Holger Müller holte sich zurück, was er 2012 begonnen hatte. Weltmeister und Torschützenkönig in einem — eine Kombination, die vorher keiner für möglich gehalten hatte. Berne war zum letzten Mal Austragungsort.',
  2022: 'Neue Stadt, neues Gesicht: Marco Praekel sicherte sich seinen zweiten Titel — diesmal in Oldenburg. Sascha Wachtendorf schoss die meisten Tore und blieb trotzdem ohne Schale.',
  2024: 'Patrick Christof. Von Platz 18 beim Debüt 2008 zum Weltmeister 2024 — die größte Aufholjagd der WM-Geschichte. Bastian Buse schoss 47 Tore und ging trotzdem leer aus.',
  2026: 'Die Jubiläums-WM. 20 Jahre nach der ersten Ausgabe in einer Norderstedter WG feierte das Trommelschießen seinen runden Geburtstag — mit 21 Trommelnden, alten Dinos, neuen Talenten und einer Edition, die es so nur einmal gibt.',
}

function getCountdown() {
  const ziel = new Date('2026-06-06T10:00:00')
  const diff = Math.max(0, ziel - new Date())
  return {
    tage: Math.floor(diff / 86400000),
    std: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    sek: Math.floor((diff % 60000) / 1000),
  }
}

export default function EventDetail() {
  const { data: wm, loading } = useWMData()
  const { jahr } = useParams()
  const [cd, setCd] = useState(getCountdown())
  const [selectedSpieltag, setSelectedSpieltag] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  const jahresMatches = useMemo(() =>
    (wm?.matches || []).filter(m => String(m.jahr) === jahr)
  , [wm?.matches, jahr])

  const maxSpieltag = useMemo(() =>
    jahresMatches.length > 0 ? Math.max(...jahresMatches.map(m => m.spieltag)) : 0
  , [jahresMatches])

  useEffect(() => {
    if (maxSpieltag > 0) setSelectedSpieltag(maxSpieltag)
  }, [maxSpieltag])

  const aktiverSpieltag = selectedSpieltag || maxSpieltag

  const event = wm?.weltmeister?.find(e => String(e.jahr) === jahr)
  const tabelle = wm?.abschlusstabellen?.[jahr]
  const fotos = wm?.fotos?.[jahr]

  const tabelleNachSpieltag = useMemo(() => {
    if (!tabelle) return null
    const rows = tabelle.map(r => ({ ...r, sp: 0, s: 0, u: 0, n: 0, t: 0, gg: 0, diff: 0, pkt: 0 }))
    jahresMatches.filter(m => m.spieltag <= aktiverSpieltag).forEach(m => {
      const home = rows.find(r => r.name === m.home)
      const away = rows.find(r => r.name === m.away)
      if (!home || !away) return
      home.sp++; home.t += m.home_tore; home.gg += m.away_tore
      away.sp++; away.t += m.away_tore; away.gg += m.home_tore
      if (m.home_tore > m.away_tore) { home.s++; home.pkt += 3; away.n++ }
      else if (m.home_tore < m.away_tore) { away.s++; away.pkt += 3; home.n++ }
      else { home.u++; home.pkt++; away.u++; away.pkt++ }
    })
    rows.forEach(r => { r.diff = r.t - r.gg })
    return [...rows].sort((a, b) => b.pkt !== a.pkt ? b.pkt - a.pkt : b.diff !== a.diff ? b.diff - a.diff : b.t - a.t)
      .map((r, i) => ({ ...r, pl: i + 1 }))
  }, [jahresMatches, aktiverSpieltag, tabelle])

  const torschuetzenNachSpieltag = useMemo(() => {
    const tore = {}; const spiele = {}
    jahresMatches.filter(m => m.spieltag <= aktiverSpieltag).forEach(m => {
      tore[m.home] = (tore[m.home] || 0) + m.home_tore
      tore[m.away] = (tore[m.away] || 0) + m.away_tore
      spiele[m.home] = (spiele[m.home] || 0) + 1
      spiele[m.away] = (spiele[m.away] || 0) + 1
    })
    return Object.entries(tore)
      .map(([name, t]) => ({ name, tore: t, spiele: spiele[name] || 0, quote: spiele[name] ? (t / spiele[name]).toFixed(2) : '0.00' }))
      .sort((a, b) => b.tore - a.tore)
  }, [jahresMatches, aktiverSpieltag])

  const spieltagErgebnisse = useMemo(() =>
    jahresMatches.filter(m => m.spieltag === aktiverSpieltag)
  , [jahresMatches, aktiverSpieltag])

  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>
  if (!event) return (
    <div style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>WM {jahr} nicht gefunden</h2>
      <Link to="/turniere" className="btn btn--primary" style={{ marginTop: 16, display: 'inline-flex' }}>← Zurück</Link>
    </div>
  )

  const is2026 = String(event.jahr) === '2026'
  const idx = wm.weltmeister.findIndex(e => String(e.jahr) === jahr)

  const BASE_URL = 'https://www.trommelschiessen.de'
  const DEFAULT_IMG = `${BASE_URL}/wm-2016-extra.jpg`
  const pageImages = fotos?.extra?.length > 0
    ? fotos.extra
    : fotos?.gruppe ? [fotos.gruppe] : []
  const ogImage = pageImages.length > 0
    ? `${BASE_URL}${pageImages[Math.floor(Math.random() * pageImages.length)]}`
    : DEFAULT_IMG
  const ogTitle = `WM ${event.jahr} · ${event.ort?.split('–')[0]?.trim()} | Trommelschiessen`
  const ogDesc = INTRO_TEXTE[event.jahr] || `Die Trommelschießen-Weltmeisterschaft ${event.jahr} in ${event.ort?.split('–')[0]?.trim()}. Weltmeister: ${event.sieger}.`
  const prev = wm.weltmeister[idx - 1]
  const next = wm.weltmeister[idx + 1]

  return (
    <div style={{ paddingTop: 80 }}>
      <Helmet>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${BASE_URL}/turniere/${jahr}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      {/* Hero */}
      <section className="hero-section-2026" style={{ background: 'var(--gruen)', padding: '60px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/turniere" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Alle WMs
          </Link>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>{event.datum} · {event.ort}</div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--white)', marginBottom: 0 }}>
            {`WM ${event.jahr}`}
          </h1>

          <div className="subnav-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 28, paddingBottom: 28 }}>
            {TURNIER_TABS.map(j => (
              <Link key={j} to={`/turniere/${j}`} style={{
                padding: '7px 16px', fontSize: 13, fontWeight: 600,
                borderRadius: 999, border: `1px solid ${String(j) === jahr ? 'var(--gold)' : 'rgba(255,255,255,0.25)'}`,
                background: String(j) === jahr ? 'var(--gold)' : 'transparent',
                color: String(j) === jahr ? '#1c422b' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>WM {j}</Link>
            ))}
          </div>
          <style>{`@media (max-width: 700px) { .subnav-pills { display: none !important; } .hero-section-2026 { padding-bottom: 32px !important; } }`}</style>
        </div>
      </section>

      {/* Fakten-Sektion */}
      <section className="section--sm" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'start' }}>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', margin: 0 }}>
                {INTRO_TEXTE[event.jahr] || ''}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Datum', value: event.datum },
                  { label: 'Ort', value: event.ort?.split('–')[0]?.trim() },
                  { label: 'Teilnehmer', value: event.teilnehmer },
                  { label: 'Sieger-Punkte', value: `${event.punkte} Pkt.` },
                  { label: 'Weltmeister', value: event.sieger, wide: true },
                  { label: 'Torschützenkönig', value: event.torschuetzenkoenig.includes('Tore') ? event.torschuetzenkoenig : `${event.torschuetzenkoenig} (${event.tore} Tore)`, wide: true },
                ].map(item => (
                  <div key={item.label} className="card" style={{ padding: '16px 20px', gridColumn: item.wide ? 'span 2' : 'span 1' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 20, color: 'var(--gruen)', lineHeight: 1.2 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Gruppenfoto */}
      {fotos?.gruppe && (
        <section className="section--sm" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
              Die Trommler · WM {event.jahr}
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <img src={fotos.gruppe} alt={`Alle Teilnehmer WM ${event.jahr}`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {/* Abschlusstabelle */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 36, color: 'var(--gruen)', margin: 0 }}>
              {aktiverSpieltag === maxSpieltag ? 'Abschlusstabelle' : `Tabelle nach Spieltag ${aktiverSpieltag}`}
            </h2>
            {maxSpieltag > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => setSelectedSpieltag(s => Math.max(1, (s || maxSpieltag) - 1))}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                <input type="number" min={1} max={maxSpieltag} value={aktiverSpieltag}
                  onChange={e => { const v = Number(e.target.value); if (v >= 1 && v <= maxSpieltag) setSelectedSpieltag(v) }}
                  onBlur={e => { const v = Number(e.target.value); setSelectedSpieltag(Math.min(maxSpieltag, Math.max(1, v || 1))) }}
                  style={{ width: 52, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 6, height: 32, fontSize: 15, fontFamily: "'Bayon', sans-serif", color: 'var(--gruen)', fontWeight: 700 }}
                />
                <button onClick={() => setSelectedSpieltag(s => Math.min(maxSpieltag, (s || maxSpieltag) + 1))}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
              </div>
            )}
          </div>
          {tabelleNachSpieltag ? (
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
                  {tabelleNachSpieltag.map(r => (
                    <tr key={r.name} style={{ background: r.pl === 1 ? 'rgba(176,137,45,0.06)' : 'transparent' }}>
                      <td className="rank">{r.pl === 1 ? '🏆' : r.pl}</td>
                      <td style={{ fontWeight: r.pl <= 3 ? 700 : 400 }}>
                        {!event.torschuetzenkoenig.includes('&') && r.name === event.torschuetzenkoenig ? '👑 ' : ''}{r.name}
                      </td>
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
          ) : (
            <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>Detaillierte Tabelle folgt</div>
          )}
        </div>
      </section>

      {/* Spieltage & Torschützen */}
      {jahresMatches.length > 0 && (
        <section className="section--sm" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: 0 }}>Spieltag {aktiverSpieltag}</h2>
                  {maxSpieltag > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => setSelectedSpieltag(s => Math.max(1, (s || maxSpieltag) - 1))}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                      <input type="number" min={1} max={maxSpieltag} value={aktiverSpieltag}
                        onChange={e => { const v = Number(e.target.value); if (v >= 1 && v <= maxSpieltag) setSelectedSpieltag(v) }}
                        onBlur={e => { const v = Number(e.target.value); setSelectedSpieltag(Math.min(maxSpieltag, Math.max(1, v || 1))) }}
                        style={{ width: 52, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 6, height: 32, fontSize: 15, fontFamily: "'Bayon', sans-serif", color: 'var(--gruen)', fontWeight: 700 }}
                      />
                      <button onClick={() => setSelectedSpieltag(s => Math.min(maxSpieltag, (s || maxSpieltag) + 1))}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
                    </div>
                  )}
                </div>
                <div className="card" style={{ overflow: 'hidden' }}>
                  {spieltagErgebnisse.map((m, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < spieltagErgebnisse.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ textAlign: 'right', fontSize: 15, fontWeight: 500 }}>{m.home}</div>
                      <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: 'var(--gruen)', textAlign: 'center', minWidth: 60 }}>{m.home_tore} : {m.away_tore}</div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{m.away}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: 28, color: 'var(--gruen)', margin: 0 }}>Torschützen</h2>
                  {maxSpieltag > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => setSelectedSpieltag(s => Math.max(1, (s || maxSpieltag) - 1))}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                      <input type="number" min={1} max={maxSpieltag} value={aktiverSpieltag}
                        onChange={e => { const v = Number(e.target.value); if (v >= 1 && v <= maxSpieltag) setSelectedSpieltag(v) }}
                        onBlur={e => { const v = Number(e.target.value); setSelectedSpieltag(Math.min(maxSpieltag, Math.max(1, v || 1))) }}
                        style={{ width: 52, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 6, height: 32, fontSize: 15, fontFamily: "'Bayon', sans-serif", color: 'var(--gruen)', fontWeight: 700 }}
                      />
                      <button onClick={() => setSelectedSpieltag(s => Math.min(maxSpieltag, (s || maxSpieltag) + 1))}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                  {torschuetzenNachSpieltag.slice(0, 3).map((r, i) => (
                    <div key={r.name} className="card" style={{ padding: '16px 12px', textAlign: 'center', border: i === 0 ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>{['🥇', '🥈', '🥉'][i]}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gruen)', marginBottom: 8 }}>{r.name}</div>
                      <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.tore}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Tore · Ø {r.quote}</div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ overflow: 'auto' }}>
                  <table className="data-table">
                    <thead><tr><th style={{ width: 36 }}>Pl.</th><th>Trommler</th><th className="num">Tore</th><th className="num">Ø</th><th className="num">Sp</th></tr></thead>
                    <tbody>
                      {torschuetzenNachSpieltag.slice(3).map((r, i) => (
                        <tr key={r.name}>
                          <td className="rank">{i + 4}</td>
                          <td>{r.name}</td>
                          <td className="num pts">{r.tore}</td>
                          <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.quote}</td>
                          <td className="num" style={{ color: 'var(--text-muted)' }}>{r.spiele}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Turnier-Statistiken */}
      {tabelle && tabelle.length > 0 && (() => {
        const sorted_t = [...tabelle].sort((a, b) => b.t - a.t)
        const sorted_gg = [...tabelle].sort((a, b) => b.gg - a.gg)
        const sorted_u = [...tabelle].sort((a, b) => b.u - a.u)
        const StatTable = ({ titel, emoji, rows, valueKey, valueLabel }) => (
          <div>
            <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 17, fontWeight: 700, color: 'var(--gruen)', marginBottom: 14 }}>{emoji} {titel}</h3>
            <div className="card" style={{ overflow: 'auto', marginBottom: 32 }}>
              <table className="data-table">
                <thead><tr><th style={{ width: 40 }}>Pl.</th><th>Trommler</th><th className="num">{valueLabel}</th><th className="num">Quote</th><th className="num">Spiele</th></tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.name} style={{ background: i === 0 ? 'rgba(176,137,45,0.05)' : 'transparent' }}>
                      <td className="rank">{i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td>
                      <td style={{ fontWeight: i < 3 ? 700 : 400 }}>{r.name}</td>
                      <td className="num pts">{r[valueKey]}</td>
                      <td className="num" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.sp > 0 ? (r[valueKey] / r.sp).toFixed(3) : '–'}</td>
                      <td className="num" style={{ color: 'var(--text-muted)' }}>{r.sp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
        return (
          <section className="section--sm" style={{ background: 'var(--cream)' }}>
            <div className="container">
              <h2 style={{ fontSize: 28, color: 'var(--gruen)', marginBottom: 8 }}>Turnier-Statistiken</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>Alle Werte beziehen sich ausschließlich auf die WM {event.jahr}.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                <StatTable titel="Ballermänner" emoji="⚽" rows={sorted_t} valueKey="t" valueLabel="Tore" />
                <StatTable titel="Schiessbuden" emoji="🥅" rows={sorted_gg} valueKey="gg" valueLabel="Gegentore" />
                <StatTable titel="Remiskönige" emoji="🤝" rows={sorted_u} valueKey="u" valueLabel="Remis" />
              </div>
            </div>
          </section>
        )
      })()}

      {/* Edition Jubilaire – nur für 2026 */}
      {is2026 && (
        <section className="section--sm" style={{ background: 'var(--white)' }}>
          <div className="container">
            <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 16 }}>Edition Jubilaire</h2>
            <div style={{ borderRadius: 16, overflow: 'hidden', background: '#0a1c12' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover' }}>
                <source src="/wm2026-teaser.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      {/* Extra-Fotos */}
      {fotos?.extra && fotos.extra.length > 0 && (
        <section className="section--sm" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Impressionen · WM {event.jahr}</div>
            <div style={{ columns: '2 280px', columnGap: 12 }}>
              {fotos.extra.map((src, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: 12 }}>
                  <img src={src} alt={`WM ${event.jahr}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="section--sm">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {prev ? <Link to={`/turniere/${prev.jahr}`} className="btn btn--outline">← WM {prev.jahr}</Link> : <div />}
          {next ? <Link to={`/turniere/${next.jahr}`} className="btn btn--outline">WM {next.jahr} →</Link> : <div />}
        </div>
      </section>
    </div>
  )
}
