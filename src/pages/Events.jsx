import { Link, useLocation } from 'react-router-dom'
import { useWMData } from '../useWMData'

const TURNIER_TABS = [
  { jahr: 2026, label: 'WM 2026' },
  { jahr: 2024, label: 'WM 2024' },
  { jahr: 2022, label: 'WM 2022' },
  { jahr: 2018, label: 'WM 2018' },
  { jahr: 2016, label: 'WM 2016' },
  { jahr: 2014, label: 'WM 2014' },
  { jahr: 2012, label: 'WM 2012' },
  { jahr: 2010, label: 'WM 2010' },
  { jahr: 2008, label: 'WM 2008' },
  { jahr: 2006, label: 'WM 2006' },
]

const WM_ORTE = [
  { name: 'Hamburg', lat: 53.5748, lng: 9.9595, wms: [2006, 2014, 2016, 2026], label: 'Hamburg' },
  { name: 'Berne', lat: 53.1817, lng: 8.4836, wms: [2008, 2010, 2012, 2018], label: 'Berne' },
  { name: 'Jaderberg', lat: 53.4200, lng: 8.0500, wms: [2024], label: 'Jaderberg' },
  { name: 'Oldenburg', lat: 53.0800, lng: 8.2800, wms: [2022], label: 'Oldenburg' },
]

import { useEffect, useRef } from 'react'

function WMKarte() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) return

    // Leaflet dynamisch laden
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => {
      const L = window.L
      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
        .setView([53.35, 8.9], 8)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO'
      }).addTo(map)

      const goldIcon = L.divIcon({
        className: '',
        html: (count) => `<div style="background:#b0892d;color:#1c422b;width:${24+count*8}px;height:${24+count*8}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${count>1?13:11}px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2)">${count}x</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      WM_ORTE.forEach(ort => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="background:#b0892d;color:#1c422b;width:${24+ort.wms.length*8}px;height:${24+ort.wms.length*8}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25)">${ort.wms.length}x</div>`,
          iconSize: [24+ort.wms.length*8, 24+ort.wms.length*8],
          iconAnchor: [(24+ort.wms.length*8)/2, (24+ort.wms.length*8)/2],
        })
        L.marker([ort.lat, ort.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${ort.label}</strong><br/>${ort.wms.join(' · ')}`)
      })

      mapInstanceRef.current = map
    }
    document.head.appendChild(script)

    return () => {}
  }, [])

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 56, height: 360, border: '1px solid var(--border)', position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', filter: 'grayscale(1) sepia(0.4) hue-rotate(80deg) saturate(0.6) brightness(0.92)' }} />
    </div>
  )
}

export default function Events() {
  const { data: wm, loading } = useWMData()
  const loc = useLocation()
  const isOverview = loc.pathname === '/turniere' || loc.pathname === '/turniere/'

  if (loading || !wm?.weltmeister?.length) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Laden…</div>

  const events = [...wm.weltmeister].reverse()

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="stats-header-section" style={{ background: 'var(--gruen)', padding: 'clamp(40px, 8vw, 60px) 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>Turniere</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--white)', marginBottom: isOverview ? 0 : 8 }}>
            {isOverview ? 'Getrommelte Weltgeschichte.' : 'Turniere'}
          </h1>
          {!isOverview && (
            <>
              <div className="subnav-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 28, paddingTop: 8 }}>
                {TURNIER_TABS.map(t => (
                  <Link key={t.jahr} to={`/turniere/${t.jahr}`} style={{
                    padding: '7px 16px', fontSize: 13, fontWeight: 600,
                    borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)',
                    background: 'transparent', color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
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
          {isOverview && (
            <>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 16, lineHeight: 1.2 }}>
                  Seit 2006 wird hier Geschichte geschrieben.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720 }}>
                  Was als improvisierter Slam in einem Hamburger Hinterhof begann, ist heute ein Turnier mit Tradition, Archiv und erschreckend detaillierter Statistik. Zehn Auflagen, vier Austragungsorte, zehn Weltmeister.
                </p>
              </div>
              <WMKarte />
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map(e => (
              <Link key={e.jahr} to={`/turniere/${e.jahr}`} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr auto',
                alignItems: 'center', gap: 24,
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '24px 28px', transition: 'all 0.2s',
              }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = 'var(--gold)'; ev.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)' }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'var(--border)'; ev.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 48, color: 'var(--gold)', lineHeight: 1 }}>{e.jahr}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gruen)', marginBottom: 4 }}>📍 {e.ort}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{e.datum} · {e.teilnehmer} Teilnehmer</div>
                </div>
                <div style={{ fontSize: 24, color: 'var(--text-light)' }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
