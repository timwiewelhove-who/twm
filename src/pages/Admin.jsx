import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import wm from '../data/wm.json'

const PASSWORD = 'trommel2026'

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('twm_admin') === PASSWORD) setAuth(true)
  }, [])

  function login() {
    if (pw === PASSWORD) {
      sessionStorage.setItem('twm_admin', PASSWORD)
      setAuth(true)
    } else {
      setErr(true)
      setTimeout(() => setErr(false), 1500)
    }
  }

  if (!auth) return (
    <div style={{ minHeight: '100vh', background: 'var(--gruen)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
      <div style={{ width: 320, padding: 40, background: 'rgba(0,0,0,0.25)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gold)', marginBottom: 8, textAlign: 'center' }}>TRMMLR</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 32 }}>Admin-Bereich</div>
        <input
          type="password"
          placeholder="Passwort"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: '12px 16px', marginBottom: 12, borderRadius: 8,
            background: err ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${err ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.15)'}`,
            color: '#fff', fontSize: 16, fontFamily: 'Nunito Sans, sans-serif',
            boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s'
          }}
        />
        <button onClick={login} className="btn btn--gold" style={{ width: '100%', justifyContent: 'center' }}>
          Anmelden
        </button>
        {err && <div style={{ color: '#f87171', fontSize: 13, textAlign: 'center', marginTop: 10 }}>Falsches Passwort</div>}
      </div>
    </div>
  )

  const letzteWM = wm.weltmeister[wm.weltmeister.length - 1]
  const events = [...wm.weltmeister].reverse()

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'var(--gruen)', padding: '40px 0 32px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 32, color: 'var(--gold)' }}>Admin</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>trommelschiessen.de</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="https://trommelwm.vercel.app/admin" target="_blank" rel="noopener" className="btn btn--outline" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)', fontSize: 14 }}>
              Live-Admin →
            </a>
            <button onClick={() => { sessionStorage.removeItem('twm_admin'); setAuth(false) }}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontFamily: 'Nunito Sans, sans-serif' }}>
              Abmelden
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 32px' }}>
        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'WM-Events', value: wm.weltmeister.length },
            { label: 'Trommler (ewige Tabelle)', value: wm.ewige_tabelle.length },
            { label: 'Weltrangliste', value: wm.weltrangliste.length },
            { label: 'Aktueller Champion', value: letzteWM.sieger },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Bayon, sans-serif', fontSize: 28, color: 'var(--gruen)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* WM Events */}
        <h2 style={{ fontSize: 28, color: 'var(--gruen)', marginBottom: 16 }}>WM-Events</h2>
        <div className="card" style={{ overflow: 'hidden', marginBottom: 40 }}>
          <table className="data-table">
            <thead>
              <tr><th>Jahr</th><th>Sieger</th><th>Ort</th><th>TN</th><th>Tabelle</th><th></th></tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.jahr}>
                  <td style={{ fontFamily: 'Bayon, sans-serif', fontSize: 20, color: 'var(--gold)' }}>{e.jahr}</td>
                  <td style={{ fontWeight: 600 }}>🏆 {e.sieger}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 14 }}>{e.ort}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{e.teilnehmer}</td>
                  <td>
                    {wm.abschlusstabellen[e.jahr]
                      ? <span style={{ color: '#16a34a', fontSize: 13, fontWeight: 600 }}>✓ {wm.abschlusstabellen[e.jahr].length} Einträge</span>
                      : <span style={{ color: '#dc2626', fontSize: 13 }}>Fehlt</span>}
                  </td>
                  <td>
                    <Link to={`/events/${e.jahr}`} style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Ansehen →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div className="card" style={{ padding: '24px', background: 'rgba(28,66,43,0.05)', border: '1px solid rgba(28,66,43,0.15)' }}>
          <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 8, fontFamily: 'Nunito Sans, sans-serif', fontWeight: 700 }}>Daten & Inhalte pflegen</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Alle Tabellen und Statistiken sind in <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>src/data/wm.json</code> gespeichert.
            Das Live-Dashboard (Ergebnisse eintragen, Spieltag steuern) ist unter{' '}
            <a href="https://trommelwm.vercel.app/admin" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 600 }}>trommelwm.vercel.app/admin</a> erreichbar.
          </p>
        </div>
      </div>
    </div>
  )
}
