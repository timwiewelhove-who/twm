import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import wm from '../data/wm.json'

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

export default function WM2026() {
  const [cd, setCd] = useState(getCountdown())
  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--gruen)', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-2024.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 16, textTransform: 'uppercase' }}>
            Édition Jubilaire · 20 Jahre Trommelschießen
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
      <section className="section--sm" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 16 }}>Das Jubiläum</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15 }}>
                2006 wurde in einer Norderstedter WG eine Sportart geboren. 20 Jahre später feiern wir die 10. Weltmeisterschaft – die Édition Jubilaire. Alte Dinos, neue Talente, ein Ball, eine Trommel.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginTop: 12 }}>
                Wer schreibt das nächste Kapitel dieser Geschichte?
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Edition', value: 'X.', sub: 'Jubiläums-WM' },
                { label: 'Datum', value: '06.06.', sub: 'Juni 2026' },
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

          {/* Bisherige Champions */}
          <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 24 }}>Alle bisherigen Champions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
            {[...wm.weltmeister].reverse().map(e => (
              <Link key={e.jahr} to={`/events/${e.jahr}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '12px 18px', display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.15s' }}
                  onMouseEnter={el => el.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={el => el.currentTarget.style.transform = 'none'}>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gruen)' }}>🏆 {e.sieger}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.ort}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '48px', background: 'var(--gruen)', borderRadius: 16 }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', color: 'var(--gold)', marginBottom: 12 }}>TROMMEL. TROMMEL. MORS. MORS.</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 24 }}>Das Live-Dashboard wird am 06.06.2026 freigeschaltet.</div>
            <a href="https://trommelwm.vercel.app" target="_blank" rel="noopener" className="btn" style={{ background: 'var(--gold)', color: 'var(--gruen)', fontWeight: 700, border: 'none' }}>
              Jetzt Live-Dashboard ansehen →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
