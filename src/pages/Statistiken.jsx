import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWMData } from '../useWMData'

const WMContext = React.createContext(null)
const useWM = () => React.useContext(WMContext)

// ── Shared Layout ─────────────────────────────────────────────────────────
function PageIntro({ headline, text }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 16, lineHeight: 1.2 }}>
        {headline}
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720 }}>
        {text}
      </p>
    </div>
  )
}

// ── Übersicht Ranglisten ──────────────────────────────────────────────────
function RanglistenUebersicht() {
  const wm = useWM()
  const top3 = wm.weltrangliste.filter(r => r.total > 0).slice(0, 3)
  const champs = [...wm.weltmeister].reverse()
  return (
    <div>
      <PageIntro
        headline="Ergebnisse lügen nicht. Erinnerungen schon."
        text="Trommelschiessen ist kein Sport der vagen Eindrücke. Wer gut ist, sieht es hier. Wer dachte, er sei gut, sieht es auch hier — nur anders. Die Ranglisten der Trommelschiess-WM erfassen jeden Punkt, jeden Sieg, jede Niederlage seit 2006. Das Ergebnis ist eine der vollständigsten Leistungsdokumentationen im Amateurbereich des Trommelsports."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <Link to="/ranglisten/weltrangliste" className="card card--hover" style={{ padding: '32px', textDecoration: 'none' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌍</div>
          <h3 style={{ fontFamily: "'Bayon', sans-serif", fontSize: 24, color: 'var(--gruen)', marginBottom: 8, letterSpacing: '0.03em' }}>Weltrangliste</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>Wer steht wo. Warum. Und wie lange noch.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {top3.map((r, i) => (
              <div key={r.name} style={{ fontSize: 13, fontWeight: 600, color: ['var(--gold)','var(--gruen)','var(--gruen)'][i] }}>
                {['🥇','🥈','🥉'][i]} {r.name}
              </div>
            ))}
          </div>
        </Link>
        <Link to="/ranglisten/ewige-tabelle" className="card card--hover" style={{ padding: '32px', textDecoration: 'none' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <h3 style={{ fontFamily: "'Bayon', sans-serif", fontSize: 24, color: 'var(--gruen)', marginBottom: 8, letterSpacing: '0.03em' }}>Ewige Tabelle</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>Die Wahrheit über zwanzig Jahre Trommelschiessen. Komprimiert auf eine Liste.</p>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{wm.ewige_tabelle.filter(r => r.sp > 0).length} Trommler · alle WMs</div>
        </Link>
        <Link to="/ranglisten/weltmeister" className="card card--hover" style={{ padding: '32px', textDecoration: 'none' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
          <h3 style={{ fontFamily: "'Bayon', sans-serif", fontSize: 24, color: 'var(--gruen)', marginBottom: 8, letterSpacing: '0.03em' }}>Alle Weltmeister</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>Der erlesene Kreis der Gekrönten. Zehn Titel, acht Namen.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {champs.slice(0, 3).map(e => (
              <div key={e.jahr} style={{ fontSize: 13, color: 'var(--text-muted)' }}>{e.jahr}: {e.sieger}</div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  )
}

// ── Übersicht Stats ───────────────────────────────────────────────────────
const STATS_CARDS = [
  { slug: 'ballermann', emoji: '🎯', titel: 'Ballermänner', sub: 'Schiessen als Lebenseinstellung.' },
  { slug: 'schiessbuden', emoji: '🚪', titel: 'Schiessbuden', sub: 'Manche Trommler treffen öfter. Diese hier am öftersten.' },
  { slug: 'dinos', emoji: '🦕', titel: 'Trommel-Dinos', sub: 'Dabei seit Anbeginn. Immer noch da.' },
  { slug: 'remiskoenige', emoji: '🤝', titel: 'Remiskönige', sub: 'Unentschieden ist auch ein Ergebnis.' },
  { slug: 'knappste-rennen', emoji: '📏', titel: 'Knappste Rennen', sub: 'Ein Punkt Unterschied. Manchmal keiner.' },
  { slug: 'hoechste-siege', emoji: '💥', titel: 'Höchste Siege', sub: 'Wenn der Gegner aufgehört hat zu zählen.' },
  { slug: 'torreichste-spiele', emoji: '⚽', titel: 'Torreichste Spiele', sub: 'Verteidigung war keine Option.' },
  { slug: 'engste-duelle', emoji: '⚔️', titel: 'Engste Duelle', sub: 'Nahkampf auf der Trommel.' },
  { slug: 'siegesserien', emoji: '🔥', titel: 'Siegesserien', sub: 'Wer aufgehört hat zu verlieren.' },
  { slug: 'niederlagenserien', emoji: '💪', titel: 'Niederlagenserien', sub: 'Charakter zeigt sich nicht im Sieg.' },
  { slug: 'vergleich', emoji: '📊', titel: 'Turniere im Vergleich', sub: 'Welches Turnier war das beste?' },
  { slug: 'h2h', emoji: '⚔️', titel: 'Jeder gegen jeden', sub: 'Jedes Duell. Jedes Ergebnis. Seit 2006.' },
]

function StatsUebersicht() {
  return (
    <div>
      <PageIntro
        headline="Der Sport in Zahlen. Mehr Zahlen als erwartet. Mehr Sport auch."
        text="Zwanzig Jahre Trommelschiessen hinterlassen Spuren. Nicht nur in den Erinnerungen der Teilnehmer — sondern in einer Datenbank, die über 2.500 Spiele umfasst und jeden Treffer, jede Serie, jedes Unentschieden gespeichert hat. Ballermänner, Schiessbuden, Dinos, Remiskönige — und Kategorien, die man bei keinem anderen Weltverband findet."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {STATS_CARDS.map(c => (
          <Link key={c.slug} to={`/stats/${c.slug}`} className="card card--hover" style={{ padding: '24px', textDecoration: 'none' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{c.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--gruen)', marginBottom: 6 }}>{c.titel}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Weltrangliste ─────────────────────────────────────────────────────────
function Weltrangliste() {
  const wm = useWM()
  const rangliste = wm.weltrangliste.filter(r => r.total > 0)
  const hat2026 = rangliste.some(r => r.wm2026 > 0)
  const jahre = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2022, 2024, ...(hat2026 ? [2026] : [])]
  return (
    <div>
      <PageIntro
        headline="Wer steht wo. Warum. Und wie lange noch."
        text="Die Weltrangliste berechnet den aktuellen Leistungsstand aller Trommelschützen auf Basis der WM-Ergebnisse — gewichtet nach Platzierung und Punktausbeute. Sie ist kein Gefühl, kein Bauchgefühl und kein Trost. Sie ist das Ergebnis. Wer oben steht, hat es sich verdient. Wer unten steht, weiß, was zu tun ist. Wer in der Mitte steht, lügt sich meistens ein bisschen an."
      />
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
      <PageIntro
        headline="Die Wahrheit über zwanzig Jahre Trommelschiessen. Komprimiert auf eine Liste."
        text="Die Ewige Tabelle ist das Gedächtnis des Sports. Hier zählt nicht das letzte Turnier, nicht der eine großartige Tag, nicht der Sieg gegen den ewigen Lieblingsrivalen. Hier zählt alles — jedes Spiel, jeder Punkt, jede WM seit 2006. Wer hier oben steht, hat über Jahre konstant geliefert. Wer hier unten steht, hat zumindest immer mitgemacht. Und das, bei aller Ehrlichkeit dieser Tabelle, ist auch etwas wert."
      />
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

const CHAMP_FOTOS = {
  2024: '/spieler/Patrick_Christof_Weltmeister_2024_1.webp',
  2022: '/spieler/Müller_Praekel_Wachtendorf.webp',
  2018: '/spieler/Holger_Müller_Weltmeiseter_1.webp',
  2016: '/spieler/Henning_Diers_Weltmeister_2016_1.webp',
}

function Champs() {
  const wm = useWM()
  const events = [...wm.weltmeister].reverse()
  return (
    <div>
      <PageIntro
        headline="Der erlesene Kreis der Gekrönten. Acht Namen. Zehn Titel."
        text="Weltmeister wird man nicht durch Anwesenheit. Auch nicht durch Enthusiasmus, gute Laune oder die richtige Trommel. Weltmeister wird man, indem man an einem langen, heißen Turniertag besser ist als alle anderen — und das so lange durchhält, bis die letzte Partie gespielt ist. Diese Liste führt alle auf, die das geschafft haben. Manche einmal, einer zweimal. Alle zu Recht."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(e => (
          <Link key={e.jahr} to={`/turniere/${e.jahr}`} className="card card--hover" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: CHAMP_FOTOS[e.jahr] ? '72px 80px 1fr auto' : '80px 1fr auto', alignItems: 'center', gap: 20 }}>
            {CHAMP_FOTOS[e.jahr] && (
              <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={CHAMP_FOTOS[e.jahr]} alt={e.sieger} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
            )}
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--gruen)' }}>🏆 {e.sieger}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                {e.ort?.split('–')[0]?.trim()} · {e.punkte} Pkt · {e.teilnehmer} Teilnehmer
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

// ── Trommel-Dinos ─────────────────────────────────────────────────────────
const ALLE_JAHRE = [2006,2008,2010,2012,2014,2016,2018,2022,2024]
const DINOS_NAMES = ['Bastian Buse','Jenne Meyer','Sascha Wachtendorf']

function Dinos() {
  const wm = useWM()
  return (
    <div>
      <PageIntro
        headline="Dabei seit Anbeginn. Immer noch da. Immer noch gefährlich."
        text="Nur drei Spieler haben an jeder einzelnen WM teilgenommen — von der allerersten 2006 in Hamburg bis zur Jubiläums-WM 2026. Nicht zweimal ausgesetzt, nicht einmal gefehlt, nicht einmal einen Urlaub vorgezogen. Basti, Sascha und Jenne sind die Trommel-Dinos: eine aussterbende Spezies mit bemerkenswert hoher Ausdauer und einem offensichtlichen Problem, an Wochenenden Nein zu sagen."
      />
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
              <img src={src} alt="Trommelschiessen-Dinos WM 2024" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} loading="lazy" />
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
      <PageIntro
        headline="Schiessen als Lebenseinstellung. Diese Männer haben es verinnerlicht."
        text="Tore schiessen ist im Trommelschiessen kein Zufall — es ist Handwerk, Wiederholung und ein gesundes Verhältnis zur eigenen Treffsicherheit. Die Ballermänner sind jene Spieler, die über ihre gesamte WM-Karriere die meisten Einschläge erzielt haben. Wer hier oben steht, hat nicht einmal gut gezielt. Er hat einfach immer wieder gezielt. Und meistens getroffen."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }}>
        {['/spieler/Bastian_Buse_2.webp', '/spieler/Holger_Mueller_2.webp', '/spieler/Sascha_Wachtendorf_1.webp'].map((src, i) => (
          <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1/1' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} loading="lazy" />
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
      <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--gruen)', marginBottom: 16, marginTop: 48 }}>👑 Torschützenkönige</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
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
    </div>
  )
}

// ── Schiessbuden ──────────────────────────────────────────────────────────
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
      <PageIntro
        headline="Manche Trommler treffen öfter. Diese hier am öftersten."
        text="In jeder WM gibt es Paarungen, die sich scheinbar verabredet haben, die Trommel besonders ausgiebig zu beschäftigen. Die Schiessbuden-Statistik dokumentiert, wer den Gegner am häufigsten jubeln ließ. Verteidigung war für diese Männer immer nur ein theoretisches Konzept."
      />
      <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
        <img src="/spieler/Schiessbuden.webp" alt="Schiessbuden" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
      </div>
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
      <PageIntro
        headline="Unentschieden ist auch ein Ergebnis. Für manche sogar ein Spezialgebiet."
        text="Das Unentschieden im Trommelschiessen ist eine seltene, aber dokumentierte Erscheinung. Und wie bei allem Seltenen gibt es auch hier Spezialisten — Spieler, die statistisch auffällig oft mit einem Punkt nach Hause gehen. Ob das Strategie ist, Pech, oder die natürliche Folge eines ausgewogenen Charakters, lässt sich aus den Zahlen nicht herauslesen. Die Zahlen zeigen nur, wer es am häufigsten getan hat."
      />
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
      <PageIntro
        headline="Ein Punkt Unterschied. Manchmal keiner. Immer unvergesslich."
        text="Die WM-Geschichte kennt Turniere, die bereits zur Halbzeit entschieden waren — und solche, bei denen bis zur allerletzten Partie völlig unklar war, wer am Ende die Schale in die Höhe reckt. Die knappsten Titelrennen dokumentieren genau diese Momente: Turniere, bei denen die Tabelle so eng war, dass ein einziger Treffer die Geschichte verändert hätte."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }}>
        {[1,2,3,4,5,6].map(n => (
          <div key={n} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1/1' }}>
            <img src={`/spieler/Knappste_Rennen_${n}.webp`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} loading="lazy" />
          </div>
        ))}
      </div>
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
    rpc('rekorde_hoechste_siege').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const gefiltert = data.filter(r => r.differenz >= 3)
  const highlights = gefiltert.filter(r => r.differenz >= 4)
  const normal = gefiltert.filter(r => r.differenz === 3)
  return (
    <div>
      <PageIntro
        headline="Wenn der Gegner aufgehört hat zu zählen, hat der Sieger weitergemacht."
        text="Nicht jedes Spiel endet knapp. Manche Partien in der WM-Geschichte haben eine Deutlichkeit erreicht, die man entweder als Demonstration handwerklicher Überlegenheit bezeichnen kann — oder als stillose Übertreibung, je nach Perspektive. Die höchsten Siege aller Zeiten zeigen, wie weit der Abstand zwischen zwei Spielern an einem einzigen Tag werden kann. Der Verlierer dieser Partien war meistens trotzdem wieder beim nächsten Turnier. Das ist der Geist dieser WM."
      />
      {highlights.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>Absolute Ausreißer — 4+ Tore Abstand</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {highlights.map((r, i) => (
              <div key={i} style={{ background: 'var(--gruen)', borderRadius: 16, padding: '28px 32px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
                  <img src={`/spieler/${r.sieger.replace(/ /g, '_')}.jpg`} alt={r.sieger} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
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
            ))}
          </div>
        </div>
      )}
      {normal.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>3 Tore Abstand</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {normal.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center', padding: '16px 24px', borderBottom: i < normal.length - 1 ? '1px solid var(--border)' : 'none' }}>
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
      {gefiltert.length === 0 && <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)' }}>Noch keine Daten verfügbar.</div>}
    </div>
  )
}



// ── Torreichste Spiele ────────────────────────────────────────────────────
function TorreichsteSpiele() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    rpc('rekorde_torreichste_spiele').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const top = data[0]
  return (
    <div>
      <PageIntro
        headline="Verteidigung war keine Option."
        text="Manchmal treffen zwei Spieler aufeinander, die sich stillschweigend darauf geeinigt haben, die Trommel als Zielobjekt zu behandeln und den Rest des Spiels der Fantasie zu überlassen. Die torreichsten Spiele der WM-Geschichte sind das Ergebnis dieser Übereinkunft. Viele Treffer, wenig taktisches Kalkül, maximale Unterhaltung."
      />
      {top && (
        <div className="card" style={{ background: 'var(--gruen)', padding: '28px 32px', marginBottom: 40, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 6 }}>Heimspieler</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: 'white' }}>{top.home}</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{top.home_tore}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>WM {top.jahr}</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'rgba(255,255,255,0.3)' }}>:</div>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>{top.gesamt} Tore</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 6 }}>Gastspieler</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: 'white' }}>{top.away}</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{top.away_tore}</div>
          </div>
        </div>
      )}
      <div className="card" style={{ overflow: 'hidden' }}>
        {data.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: 16, alignItems: 'center', padding: '14px 24px', borderBottom: i < data.length - 1 ? '1px solid var(--border)' : 'none', background: i === 0 ? 'rgba(176,137,45,0.04)' : 'transparent' }}>
            <div style={{ fontWeight: i < 3 ? 700 : 400, color: 'var(--gruen)', fontSize: 14 }}>{r.home}</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: i < 3 ? 'var(--gold)' : 'var(--gruen)', whiteSpace: 'nowrap' }}>{r.home_tore}:{r.away_tore}</div>
            <div style={{ fontWeight: i < 3 ? 700 : 400, color: 'var(--gruen)', fontSize: 14 }}>{r.away}</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: i < 3 ? 'rgba(176,137,45,0.12)' : 'rgba(28,66,43,0.06)', borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: i < 3 ? 'var(--gold)' : 'var(--gruen)', display: 'inline-block' }}>{r.gesamt} Tore</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>WM {r.jahr}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Engste Duelle ─────────────────────────────────────────────────────────
function EngesteDuelle() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    rpc('rekorde_engste_duelle').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const top3 = data.slice(0, 3)
  return (
    <div>
      <PageIntro
        headline="Immer wieder die gleichen zwei. Immer wieder unentschieden."
        text="Bestimmte Paarungen im Trommelschiessen haben eine Geschichte. Eine lange, zähe, unentschiedene Geschichte. Die engsten Duelle dokumentieren Direktbegegnungen, die sich über mehrere WMs hinweg auf Augenhöhe entwickelt haben — Spieler, die sich gegenseitig so gut kennen, dass jede Partie zum psychologischen Schachspiel wird. Mit Trommel. Das macht es besser."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
        {top3.map((r, i) => (
          <div key={i} className="card" style={{ padding: '24px', textAlign: 'center', background: i === 0 ? 'var(--gruen)' : 'var(--white)' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 52, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.remis}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '6px 0 8px' }}>Remis</div>
            <div style={{ fontWeight: 700, color: i === 0 ? 'white' : 'var(--gruen)', fontSize: 15 }}>{r.spieler1}</div>
            <div style={{ fontSize: 13, color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '4px 0' }}>vs.</div>
            <div style={{ fontWeight: 700, color: i === 0 ? 'white' : 'var(--gruen)', fontSize: 15 }}>{r.spieler2}</div>
            <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.4)' : 'var(--text-light)', marginTop: 8 }}>{r.spiele} Spiele gesamt</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        {data.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center', padding: '14px 24px', borderBottom: i < data.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div>
              <div style={{ fontWeight: i < 3 ? 700 : 400, fontSize: 15, color: 'var(--gruen)' }}>{r.spieler1} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs.</span> {r.spieler2}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.spiele} Spiele insgesamt</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gruen)' }}>{r.remis}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Remis</div>
            </div>
            <div style={{ background: 'rgba(28,66,43,0.06)', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700, color: 'var(--gruen)' }}>
              {Math.round(r.remis / r.spiele * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Siegesserien ──────────────────────────────────────────────────────────
function Siegesserien() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    rpc('rekorde_siegesserien').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const sorted = [...data].sort((a, b) => b.serie - a.serie)
  const top = sorted[0]
  return (
    <div>
      <PageIntro
        headline="Wer aufgehört hat zu verlieren, hat angefangen zu dominieren."
        text="Siegesserien im Trommelschiessen entstehen nicht durch Glück. Sie entstehen durch Konstanz, durch das Ausnutzen jedes Vorteils, durch eine Kombination aus Präzision und der Fähigkeit, auch dann zu gewinnen, wenn es nicht läuft. Die längsten Siegesserien der WM-Geschichte zeigen, welche Spieler es geschafft haben, sich über viele Spiele hinweg auf einem Niveau zu halten, das niemand knacken konnte. Bis jemand es dann doch geknackt hat."
      />
      {top && (
        <div className="card" style={{ background: 'var(--gruen)', padding: '32px', marginBottom: 40, display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 8 }}>Längste Siegesserie aller Zeiten</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 80, color: 'var(--gold)', lineHeight: 1 }}>{top.serie}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Siege in Folge</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Spieler</div>
            <div style={{ fontWeight: 700, fontSize: 24, color: 'white' }}>{top.spieler}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>WM {top.von_jahr}{top.bis_jahr !== top.von_jahr ? ` – ${top.bis_jahr}` : ''}</div>
          </div>
        </div>
      )}
      <div className="card" style={{ overflow: 'hidden' }}>
        {sorted.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center', padding: '14px 24px', borderBottom: i < sorted.length - 1 ? '1px solid var(--border)' : 'none', background: i === 0 ? 'rgba(176,137,45,0.04)' : 'transparent' }}>
            <div>
              <div style={{ fontWeight: i < 3 ? 700 : 400, fontSize: 15, color: 'var(--gruen)' }}>{r.spieler}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>WM {r.von_jahr}{r.bis_jahr !== r.von_jahr ? ` – ${r.bis_jahr}` : ''}</div>
            </div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1, textAlign: 'right' }}>{r.serie}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 60 }}>Siege</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Niederlagenserien ─────────────────────────────────────────────────────
function Niederlagenserien() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    rpc('rekorde_niederlagenserien').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const sorted = [...data].sort((a, b) => b.serie - a.serie)
  const top = sorted[0]
  return (
    <div>
      <PageIntro
        headline="Charakter zeigt sich nicht im Sieg. Er zeigt sich darin, wieder anzutreten."
        text="Diese Statistik ist keine Schande. Sie ist eine Ehrung. Denn wer eine lange Niederlagenserie vorweisen kann, hat in dieser Zeit nicht aufgehört zu spielen — hat sich nicht gedrückt, nicht abgemeldet, nicht plötzlich einen Konflikt am Wochenende entdeckt. Diese Spieler sind angetreten, haben verloren, und sind beim nächsten Turnier wieder angetreten. Das verdient Respekt. Nicht viel. Aber echten."
      />
      {top && (
        <div className="card" style={{ background: 'var(--gruen)', padding: '32px', marginBottom: 40, display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 8 }}>Längste Niederlagenserie aller Zeiten</div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 80, color: '#dc2626', lineHeight: 1 }}>{top.serie}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Niederlagen in Folge</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Spieler</div>
            <div style={{ fontWeight: 700, fontSize: 24, color: 'white' }}>{top.spieler}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>WM {top.von_jahr}{top.bis_jahr !== top.von_jahr ? ` – ${top.bis_jahr}` : ''}</div>
          </div>
        </div>
      )}
      <div className="card" style={{ overflow: 'hidden' }}>
        {sorted.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center', padding: '14px 24px', borderBottom: i < sorted.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div>
              <div style={{ fontWeight: i < 3 ? 700 : 400, fontSize: 15, color: 'var(--gruen)' }}>{r.spieler}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>WM {r.von_jahr}{r.bis_jahr !== r.von_jahr ? ` – ${r.bis_jahr}` : ''}</div>
            </div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 36, color: i === 0 ? '#dc2626' : 'var(--text-muted)', lineHeight: 1, textAlign: 'right' }}>{r.serie}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 80 }}>Niederlagen</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Turniere im Vergleich ─────────────────────────────────────────────────
function TurniereImVergleich() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    rpc('rekorde_wm_vergleich').then(r => { if (Array.isArray(r)) setData(r); setLoading(false) })
  }, [])
  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>
  const sorted_tore = [...data].sort((a, b) => b.tore_pro_spiel - a.tore_pro_spiel)
  const max_tore = Math.max(...data.map(r => parseFloat(r.tore_pro_spiel)))
  return (
    <div>
      <PageIntro
        headline="Welches Turnier war eigentlich das beste? Die Zahlen haben eine Meinung."
        text="Tore pro Spiel, Teilnehmerzahl, Spannung im Titelkampf — es gibt viele Wege, ein Turnier zu messen. Diese Seite stellt alle WMs nebeneinander und lässt die Zahlen sprechen. Was dabei herauskommt, überrascht meistens. Die gefühlt beste WM ist selten die statistisch stärkste."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {sorted_tore.slice(0, 3).map((r, i) => (
          <div key={r.jahr} className="card" style={{ padding: '24px', textAlign: 'center', background: i === 0 ? 'var(--gruen)' : 'var(--white)' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', lineHeight: 1 }}>{r.tore_pro_spiel}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', margin: '6px 0 4px' }}>Tore/Spiel</div>
            <div style={{ fontWeight: 700, color: i === 0 ? 'white' : 'var(--gruen)', fontSize: 22, fontFamily: "'Bayon', sans-serif" }}>WM {r.jahr}</div>
            <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.4)' : 'var(--text-light)', marginTop: 4 }}>{r.tore_gesamt} Tore · {r.spiele} Spiele</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Alle WMs nach Toren pro Spiel</div>
        {sorted_tore.map((r, i) => (
          <div key={r.jahr} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 16, alignItems: 'center', padding: '12px 24px', borderBottom: i < sorted_tore.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 24, color: i === 0 ? 'var(--gold)' : 'var(--gruen)' }}>WM {r.jahr}</div>
            <div>
              <div style={{ background: 'var(--cream)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                <div style={{ width: `${Math.round(parseFloat(r.tore_pro_spiel) / max_tore * 100)}%`, height: '100%', borderRadius: 4, background: i === 0 ? 'var(--gold)' : 'var(--gruen)', opacity: i === 0 ? 1 : 0.7 }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{r.tore_gesamt} Tore · {r.spiele} Spiele</div>
            </div>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: i === 0 ? 'var(--gold)' : 'var(--gruen)', textAlign: 'right', minWidth: 48 }}>{r.tore_pro_spiel}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Head to Head ──────────────────────────────────────────────────────────
const SUPABASE_URL_H2H = 'https://pltaiozpoofchprydxuz.supabase.co'
const SUPABASE_KEY_H2H = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdGFpb3pwb29mY2hwcnlkeHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzg0MTksImV4cCI6MjA5MTkxNDQxOX0.nkV0AclS8hziq-HCk1kltp9T59u0tKqmcywLhprJ1HY'

function HeadToHead() {
  const wm = useWM()
  const [spieler1, setSpieler1] = React.useState('')
  const [spieler2, setSpieler2] = React.useState('')
  const [matches, setMatches] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  if (!wm) return <div style={{ textAlign: 'center', padding: 80 }}>Laden…</div>

  // Alle Trommler aus ewiger Tabelle, alphabetisch
  const alleTraommler = [...wm.ewige_tabelle]
    .filter(r => r.sp > 0)
    .map(r => r.name)
    .sort((a, b) => {
      const nachA = a.split(' ').slice(-1)[0]
      const nachB = b.split(' ').slice(-1)[0]
      return nachA.localeCompare(nachB, 'de')
    })

  React.useEffect(() => {
    if (!spieler1 || !spieler2) { setMatches([]); return }
    setLoading(true)
    fetch(`${SUPABASE_URL_H2H}/rest/v1/matches_archive?or=(and(home.eq.${encodeURIComponent(spieler1)},away.eq.${encodeURIComponent(spieler2)}),and(home.eq.${encodeURIComponent(spieler2)},away.eq.${encodeURIComponent(spieler1)}))&order=jahr.desc,spieltag.desc`, {
      headers: { 'apikey': SUPABASE_KEY_H2H, 'Authorization': `Bearer ${SUPABASE_KEY_H2H}` }
    })
    .then(r => r.json())
    .then(data => { setMatches(Array.isArray(data) ? data : []); setLoading(false) })
  }, [spieler1, spieler2])

  // Statistiken berechnen
  const stats = React.useMemo(() => {
    if (!matches.length || !spieler1 || !spieler2) return null
    let s1_siege = 0, s2_siege = 0, remis = 0, s1_tore = 0, s2_tore = 0
    matches.forEach(m => {
      const s1_home = m.home === spieler1
      const t1 = s1_home ? m.home_tore : m.away_tore
      const t2 = s1_home ? m.away_tore : m.home_tore
      s1_tore += t1; s2_tore += t2
      if (t1 > t2) s1_siege++
      else if (t2 > t1) s2_siege++
      else remis++
    })
    return { s1_siege, s2_siege, remis, s1_tore, s2_tore }
  }, [matches, spieler1, spieler2])

  const selectStyle = {
    padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)',
    fontSize: 15, fontFamily: 'Nunito Sans, sans-serif', background: 'white',
    color: 'var(--gruen)', fontWeight: 600, cursor: 'pointer', width: '100%',
    paddingRight: 36,
    paddingRight: 36,
  }

  return (
    <div>
      <PageIntro
        headline="Jedes Duell. Jedes Ergebnis. Jede Begegnung seit 2006."
        text="Zwanzig Jahre Trommelschiessen-WM bedeuten tausende Duelle zwischen denselben Spielern — manche auf Augenhöhe, manche einseitig, manche noch nie gespielt. Wähle zwei Trommler aus und sieh nach, wie die Geschichte zwischen ihnen aussieht. Die Trommel-WM hat ein gutes Gedächtnis."
      />

      {/* Dropdown-Auswahl */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: 40 }}>
        <div style={{ position: 'relative' }}>
          <select value={spieler1} onChange={e => setSpieler1(e.target.value)} style={selectStyle}>
            <option value="">Trommler wählen…</option>
            {alleTraommler.filter(n => n !== spieler2).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--text-muted)', textAlign: 'center', userSelect: 'none' }}>VS</div>
        <div style={{ position: 'relative' }}>
          <select value={spieler2} onChange={e => setSpieler2(e.target.value)} style={selectStyle}>
            <option value="">Trommler wählen…</option>
            {alleTraommler.filter(n => n !== spieler1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnisse */}
      {spieler1 && spieler2 && (
        loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Laden…</div>
        ) : matches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'rgba(28,66,43,0.08)', marginBottom: 16 }}>0</div>
            <h3 style={{ fontSize: 22, color: 'var(--gruen)', marginBottom: 8 }}>Diese Begegnung hat es noch nie gegeben!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{spieler1} und {spieler2} sind sich in der WM-Geschichte bisher nicht begegnet.</p>
          </div>
        ) : (
          <div>
            {/* Bilanz-Card */}
            {stats && (
              <div className="card" style={{ background: 'var(--gruen)', padding: '28px 32px', marginBottom: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{spieler1}</div>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 64, color: stats.s1_siege > stats.s2_siege ? 'var(--gold)' : 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{stats.s1_siege}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Siege · {stats.s1_tore} Tore</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 20, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>{matches.length} Spiele</div>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'rgba(255,255,255,0.4)' }}>{stats.remis}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Remis</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{spieler2}</div>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 64, color: stats.s2_siege > stats.s1_siege ? 'var(--gold)' : 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{stats.s2_siege}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Siege · {stats.s2_tore} Tore</div>
                  </div>
                </div>
              </div>
            )}

            {/* Alle Matches */}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
              Alle {matches.length} Begegnungen · neueste zuerst
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              {matches.map((m, i) => {
                const s1_home = m.home === spieler1
                const t1 = s1_home ? m.home_tore : m.away_tore
                const t2 = s1_home ? m.away_tore : m.home_tore
                const s1_wins = t1 > t2
                const s2_wins = t2 > t1
                const draw = t1 === t2
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: 16, alignItems: 'center', padding: '14px 24px', borderBottom: i < matches.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(28,66,43,0.02)' }}>
                    <div style={{ fontWeight: s1_wins ? 700 : 400, color: s1_wins ? 'var(--gruen)' : 'var(--text-muted)', fontSize: 14 }}>{spieler1}</div>
                    <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: draw ? 'var(--text-muted)' : 'var(--gruen)', whiteSpace: 'nowrap', textAlign: 'center', minWidth: 60 }}>
                      {t1}:{t2}
                    </div>
                    <div style={{ fontWeight: s2_wins ? 700 : 400, color: s2_wins ? 'var(--gruen)' : 'var(--text-muted)', fontSize: 14, textAlign: 'right' }}>{spieler2}</div>
                    <div style={{ textAlign: 'right', minWidth: 72 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>WM {m.jahr}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-light)' }}>ST {m.spieltag}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      )}

      {!spieler1 && !spieler2 && (
        <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--text-muted)' }}>
          <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'rgba(28,66,43,0.06)', marginBottom: 12 }}>VS</div>
          <p style={{ fontSize: 15 }}>Wähle zwei Trommler aus um ihre gemeinsame Geschichte zu sehen.</p>
        </div>
      )}
    </div>
  )
}

// ── ComingSoon ────────────────────────────────────────────────────────────
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
const SLUG_CONFIG = {
  'weltrangliste':      { section: 'ranglisten', component: 'weltrangliste' },
  'ewige-tabelle':      { section: 'ranglisten', component: 'ewige-tabelle' },
  'weltmeister':        { section: 'ranglisten', component: 'champs' },
  'ballermann':         { section: 'stats',      component: 'ballermann' },
  'schiessbuden':       { section: 'stats',      component: 'schiessbude' },
  'dinos':              { section: 'stats',      component: 'dinos' },
  'remiskoenige':       { section: 'stats',      component: 'remiskoenige' },
  'knappste-rennen':    { section: 'stats',      component: 'knappste' },
  'hoechste-siege':     { section: 'stats',      component: 'hoechste-siege' },
  'torreichste-spiele': { section: 'stats',      component: 'torreichste-spiele' },
  'engste-duelle':      { section: 'stats',      component: 'engste-duelle' },
  'siegesserien':       { section: 'stats',      component: 'siegesserien' },
  'niederlagenserien':  { section: 'stats',      component: 'niederlagenserien' },
  'vergleich':          { section: 'stats',      component: 'vergleich' },
  'h2h':                { section: 'stats',      component: 'h2h' },
  // Legacy
  'champs':             { section: 'ranglisten', component: 'champs' },
  'remiskoenig':        { section: 'stats',      component: 'remiskoenige' },
  'knappste':           { section: 'stats',      component: 'knappste' },
  'bestenlisten':       { section: 'stats',      component: 'ballermann' },
  'schiessbude':        { section: 'stats',      component: 'schiessbude' },
}

const RANGLISTEN_TABS = [
  { slug: 'weltrangliste', label: 'Weltrangliste' },
  { slug: 'ewige-tabelle', label: 'Ewige Tabelle' },
  { slug: 'weltmeister',   label: 'Alle Weltmeister' },
]
const STATS_TABS = [
  { slug: 'ballermann',         label: 'Ballermänner' },
  { slug: 'schiessbuden',       label: 'Schiessbuden' },
  { slug: 'dinos',              label: 'Trommel-Dinos' },
  { slug: 'remiskoenige',       label: 'Remiskönige' },
  { slug: 'knappste-rennen',    label: 'Knappste Rennen' },
  { slug: 'hoechste-siege',     label: 'Höchste Siege' },
  { slug: 'torreichste-spiele', label: 'Torreichste Spiele' },
  { slug: 'engste-duelle',      label: 'Engste Duelle' },
  { slug: 'siegesserien',       label: 'Siegesserien' },
  { slug: 'niederlagenserien',  label: 'Niederlagenserien' },
  { slug: 'vergleich',          label: 'Im Vergleich' },
  { slug: 'h2h',                label: 'Jeder gegen jeden' },
]

const SECTION_TITLES = {
  'weltrangliste':      { h1: 'Weltrangliste' },
  'ewige-tabelle':      { h1: 'Ewige Tabelle' },
  'weltmeister':        { h1: 'Alle Weltmeister' },
  'champs':             { h1: 'Alle Weltmeister' },
  'ballermann':         { h1: 'Ballermänner' },
  'bestenlisten':       { h1: 'Ballermänner' },
  'schiessbuden':       { h1: 'Schiessbuden' },
  'schiessbude':        { h1: 'Schiessbuden' },
  'dinos':              { h1: 'Trommel-Dinos' },
  'remiskoenige':       { h1: 'Remiskönige' },
  'remiskoenig':        { h1: 'Remiskönige' },
  'knappste-rennen':    { h1: 'Knappste Rennen' },
  'knappste':           { h1: 'Knappste Rennen' },
  'hoechste-siege':     { h1: 'Höchste Siege' },
  'torreichste-spiele': { h1: 'Torreichste Spiele' },
  'engste-duelle':      { h1: 'Engste Duelle' },
  'siegesserien':       { h1: 'Längste Siegesserien' },
  'niederlagenserien':  { h1: 'Längste Niederlagenserien' },
  'vergleich':          { h1: 'Turniere im Vergleich' },
  'h2h':                { h1: 'Jeder gegen jeden' },
}

const PAGE_META = {
  ranglisten: { eyebrow: 'Ranglisten', h1: 'Ranglisten' },
  stats:      { eyebrow: 'Stats',      h1: 'Stats' },
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
  const parts = loc.pathname.split('/').filter(Boolean)
  const section = parts[0] // 'ranglisten' oder 'stats'
  const slug = parts[1] || null // null = Übersichtsseite

  const config = slug ? SLUG_CONFIG[slug] : null
  const component = config?.component || null
  const tabs = section === 'ranglisten' ? RANGLISTEN_TABS : STATS_TABS
  const pageMeta = PAGE_META[section] || PAGE_META.stats
  const sectionTitle = slug ? (SECTION_TITLES[slug] || { h1: slug }) : null
  const activeSlug = slug
    ? (tabs.find(t => t.slug === slug)?.slug || tabs.find(t => SLUG_CONFIG[t.slug]?.component === component)?.slug || tabs[0].slug)
    : null
  const basePath = `/${section}`
  const isOverview = !slug

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="stats-header-section" style={{ background: 'var(--gruen)', padding: 'clamp(40px, 8vw, 60px) 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>{pageMeta.eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--white)', marginBottom: sectionTitle ? 8 : 32 }}>
            {sectionTitle?.h1 || pageMeta.h1}
          </h1>
          {!isOverview && (
            <>
              <div className="subnav-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 28, paddingTop: 8 }}>
                {tabs.map(t => (
                  <Link key={t.slug} to={`${basePath}/${t.slug}`} style={{
                    padding: '7px 16px', fontSize: 13, fontWeight: 600,
                    borderRadius: 999, border: '1px solid',
                    borderColor: activeSlug === t.slug ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                    background: activeSlug === t.slug ? 'var(--gold)' : 'transparent',
                    color: activeSlug === t.slug ? 'var(--gruen)' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (activeSlug !== t.slug) { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}}
                  onMouseLeave={e => { if (activeSlug !== t.slug) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}}
                  >{t.label}</Link>
                ))}
              </div>
              <style>{`@media (max-width: 700px) { .subnav-pills { display: none !important; } .stats-header-section { padding-bottom: 40px !important; } }`}</style>
            </>
          )}
          {isOverview && <div style={{ paddingBottom: 40 }} />}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {isOverview && section === 'ranglisten' && <RanglistenUebersicht />}
          {isOverview && section === 'stats'      && <StatsUebersicht />}
          {component === 'weltrangliste'      && <Weltrangliste />}
          {component === 'ewige-tabelle'      && <EwigeTabelle />}
          {component === 'champs'             && <Champs />}
          {component === 'ballermann'         && <Ballermann />}
          {component === 'schiessbude'        && <Schiessbude />}
          {component === 'dinos'              && <Dinos />}
          {component === 'remiskoenige'       && <Remiskoenige />}
          {component === 'knappste'           && <KnappsteRennen />}
          {component === 'hoechste-siege'     && <HoechsteSiege />}
          {component === 'torreichste-spiele' && <TorreichsteSpiele />}
          {component === 'engste-duelle'      && <EngesteDuelle />}
          {component === 'siegesserien'       && <Siegesserien />}
          {component === 'niederlagenserien'  && <Niederlagenserien />}
          {component === 'vergleich'          && <TurniereImVergleich />}
          {component === 'h2h'              && <HeadToHead />}
        </div>
      </section>
    </div>
  )
}
