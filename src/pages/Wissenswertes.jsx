import { Link, useLocation } from 'react-router-dom'
import Presse from './Presse'

const HISTORIE = `Wenn Wohnzimmer zu Stadien mutieren und das Sofa als Fankurve dient, dann steht mal wieder ein großes Turnier auf dem Küchenkalender. Aus alten Hüten werden noch ältere Tricks gezaubert: Bierflaschen als Anzeigetafel oder Chili con carne, um dem laschen mexikanischen Querpassfußball einen Schuss Würze zu geben. Holger, Maik und Torsten haben für France 98 ihre WG in „Stade Chemin Bouleau" umbenannt. „Ey Digger, das heißt doch einfach nur 'Stadion am Birkenweg' auf Französisch", reichte als Erklärung völlig aus. Hausnummer 13 in 22850 Norderstedt, so viel schiebt der Chronist aus heutiger Sicht gerne noch hinterher.

Auf der Suche nach erheiternden Spielchen, falls Holland gegen Südkorea plus zwölf Wicküler nebst lustigen Schnäppchen die Stimmung nicht zur La Ola bringen, wippte ein kleiner Softball in den Torwartfingern von Torsten hin und her. Irgendwann marschierte er mit den 36,5 Zentimetern im Umfang in den Waschraum der WG. Nur dieses Zimmer darf seither als Geburtsort des Trommelschießens in Betracht kommen. Bei rund vier Metern Länge und der Waschmaschine am einen Ende war allen Beteiligten schnell klar: Das Runde muss ins Runde! Das Mutterhaus des Trommelschießens wird übrigens oft mit Wembley verglichen und wurde aus Ehrfurcht vor dieser technisch hoch anspruchsvollen Disziplin schon früher abgerissen als die Londoner Kultstätte selbst.

Die Regularien waren auch schnell formuliert: Ab da, wo sich der hellblaue Teppich leicht wölbt, wird geschossen. Anlauf bis zu Maiks Zimmertür, jeder fünf Mal im Duell, immer abwechselnd, wie Elfmeterschießen. Ob Liga oder Gruppenphase mit K.o.-System, das kommt auf die Anzahl der Gäste an. Erst unter Wettbewerbsbedingungen entstand übrigens die wichtigste Regel: Der Ball muss in der Trommel liegen bleiben!!!

Die Wäscheständerzone wurde schnell zum VIP-Bereich mit der besten Sicht auf Krones Präzision, Jennes Gefühl oder Vossis unvergessener Außenristtechnik. Den Rest der Geschichte könnt ihr alle selbst schreiben. Also: Ran an die Trommel!`

const REGELWERK = [
  { title: 'Die Trommeltrombosse', text: 'Stephan Krontal und Holger Müller. Alle nicht in Absprache ausgetragenen Veranstaltungen sind Untrommelkonform – aber ausdrücklich zur Nachahmung erwünscht. Ohne Trommeltrombosse kein offizieller Trommel-Slam.' },
  { title: 'Trommler-Anmeldung', text: 'Jeder Trommler, der sich anmeldet, verpflichtet sich zu trommeln. Erscheint er nicht, wird der Obolus einbehalten. Bei Sonderfällen (Krankheit o. ä.) entscheiden die Oberhäupter.' },
  { title: 'Obolus', text: 'Der Unkostenbeitrag wird vom Ausrichter angeschlagen und soll 50,00 € / Person nicht überschreiten.' },
  { title: 'Oberhäupter', text: '4 Oberhäupter werden nach normaler Auszählung gewählt. Beschlüsse werden mit einfacher Mehrheit beschlossen. Sie koordinieren Events, entscheiden über Teilnehmerzahl und mögliche Relegationen.' },
  { title: 'Trommelspiel', text: 'Die Entfernung darf zwischen 3–5 Metern liegen, muss aber vor dem Turnier festgesetzt werden. Das Schuhwerk darf selbst gewählt werden. Springt die Trommille wieder aus der Trommel, ist dies kein gültiger Treffer.' },
  { title: 'Die Trommel', text: 'Nicht größer als 80 cm breit und 100 cm hoch. Durchmesser: 25–35 cm. Keine Top-Lader erlaubt.' },
  { title: 'Die Trommille (Trommelpille)', text: 'Nicht größer als 41,5 cm Umfang und nicht schwerer als 500 Gramm.' },
  { title: 'Trommelzeit', text: 'April–Mai: Schongang (Liga) · Juli–August: Trommelfelle (WM) · Oktober–November: Schleudergang (Knockout) · Januar–Februar: Trommelwirbel (Play-Offs)' },
]

export default function Wissenswertes() {
  const loc = useLocation()
  const sub = loc.pathname.split('/').pop()
  const tabs = [
    { id: 'historie', label: 'HISTORIE' },
    { id: 'regelwerk', label: 'REGELWERK' },
    { id: 'presse', label: 'PRESSE' },
  ]
  const active = tabs.find(t => t.id === sub) ? sub : 'historie'

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '60px 0 0' }}>
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>ÜBER DAS SPIEL</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'var(--white)', marginBottom: 32 }}>Wissenswertes</h1>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {tabs.map(t => (
              <Link key={t.id} to={`/wissenswertes/${t.id}`} style={{
                padding: '14px 24px', fontSize: 15, fontWeight: 600,
                color: active === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                marginBottom: -1, transition: 'color 0.15s',
              }}>{t.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container--narrow">
          {active === 'historie' && (
            <div>
              <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 32 }}>Die Geschichte des Trommelschiessens</h2>
              {HISTORIE.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text)', marginBottom: 24 }}>{p}</p>
              ))}
              {/* Greetings from Maschine – Video */}
              <div style={{ margin: '48px 0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
                  Grüße aus Maschine · Ocean Breeze
                </div>
                <div style={{ borderRadius: 16, overflow: 'hidden', background: '#0a1c12', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                  <video
                    controls playsInline
                    style={{ width: '100%', display: 'block', maxHeight: 500, objectFit: 'contain', background: '#0a1c12' }}
                  >
                    <source src="/greetings-maschine.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div style={{ marginTop: 40, padding: '24px', background: 'var(--gruen)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>Trommel, Trommel … mors, mors!!!</div>
              </div>

              {/* Mood-Galerie */}
              <div style={{ marginTop: 48 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Impressionen · WM 2016 Hamburg</div>
                <div style={{ columns: '2 260px', columnGap: 12 }}>
                  {['/mood-0.jpg', '/mood-3.jpg', '/mood-1.jpg', '/mood-6.jpg', '/mood-2.jpg', '/meisterschale.jpg'].map((src, i) => (
                    <div key={i} style={{ breakInside: 'avoid', marginBottom: 12 }}>
                      <img src={src} alt="Trommelschießen-WM Impressionen" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'presse' && <Presse />}
          {active === 'regelwerk' && (
            <div>
              <h2 style={{ fontSize: 36, color: 'var(--gruen)', marginBottom: 32 }}>Regelwerk</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {REGELWERK.map(r => (
                  <div key={r.title} className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--gruen)', marginBottom: 8, letterSpacing: 0 }}>{r.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: '24px', background: 'var(--gruen)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>Trommel, Trommel … mors, mors!!!</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
