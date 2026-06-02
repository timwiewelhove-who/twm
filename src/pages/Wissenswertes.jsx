import { Link, useLocation } from 'react-router-dom'
import Presse from './Presse'

const HISTORIE = `Wenn Wohnzimmer zu Stadien mutieren und das Sofa als Fankurve dient, dann steht mal wieder ein großes Turnier auf dem Küchenkalender. Aus alten Hüten werden noch ältere Tricks gezaubert: Bierflaschen als Anzeigetafel oder Chili con carne, um dem laschen mexikanischen Querpassfußball einen Schuss Würze zu geben. Holger, Maik und Torsten haben für France 98 ihre WG in „Stade Chemin Bouleau" umbenannt. „Ey Digger, das heißt doch einfach nur 'Stadion am Birkenweg' auf Französisch", reichte als Erklärung völlig aus. Hausnummer 13 in 22850 Norderstedt, so viel schiebt der Chronist aus heutiger Sicht gerne noch hinterher.

Auf der Suche nach erheiternden Spielchen, falls Holland gegen Südkorea plus zwölf Wicküler nebst lustigen Schnäppchen die Stimmung nicht zur La Ola bringen, wippte ein kleiner Softball in den Torwartfingern von Torsten hin und her. Irgendwann marschierte er mit den 36,5 Zentimetern im Umfang in den Waschraum der WG. Nur dieses Zimmer darf seither als Geburtsort des Trommelschießens in Betracht kommen. Bei rund vier Metern Länge und der Waschmaschine am einen Ende war allen Beteiligten schnell klar: Das Runde muss ins Runde! Das Mutterhaus des Trommelschießens wird übrigens oft mit Wembley verglichen und wurde aus Ehrfurcht vor dieser technisch hoch anspruchsvollen Disziplin schon früher abgerissen als die Londoner Kultstätte selbst.

Die Regularien waren auch schnell formuliert: Ab da, wo sich der hellblaue Teppich leicht wölbt, wird geschossen. Anlauf bis zu Maiks Zimmertür, jeder fünf Mal im Duell, immer abwechselnd, wie Elfmeterschießen. Ob Liga oder Gruppenphase mit K.o.-System, das kommt auf die Anzahl der Gäste an. Erst unter Wettbewerbsbedingungen entstand übrigens die wichtigste Regel: Der Ball muss in der Trommel liegen bleiben!!!

Die Wäscheständerzone wurde schnell zum VIP-Bereich mit der besten Sicht auf Krones Präzision, Jennes Gefühl oder Vossis unvergessener Außenristtechnik. Den Rest der Geschichte könnt ihr alle selbst schreiben. Also: Ran an die Trommel!`

const REGELWERK_SECTIONS = [
  {
    title: 'Das Spiel',
    text: 'Trommelschießen ist einfach. Das ist eine seiner größten Stärken — und einer der Hauptgründe, warum es seit 2006 ohne nennenswerte Regelreformen ausgekommen ist. Zwei Spieler, eine Trommel, fünf Schüsse pro Seite, abwechselnd. Wer mehr trifft, gewinnt. Wer gleich oft trifft, teilt. Wer weniger trifft, verliert. Das war\'s. Alles andere ist Ausführungsbestimmung.',
  },
  {
    title: 'Das Spielgerät',
    items: [
      { label: 'Die Trommel', text: 'Maximal 80 cm breit, maximal 100 cm hoch, Trommeldurchmesser zwischen 25 und 35 cm. Top-Lader sind nicht erlaubt.' },
      { label: 'Die Trommille', text: 'Das offizielle Schussgerät — maximal 41,5 cm Umfang und maximal 500 Gramm. Nach dem Schuss muss sie in der Trommel verbleiben. Springt sie wieder heraus, zählt der Treffer nicht. Diese Regel klingt trivial. Sie ist es nicht.' },
      { label: 'Das Schuhwerk', text: 'Darf frei gewählt werden. Das ist eine der wenigen Entscheidungen im Trommelschießen, die vollständig beim Spieler liegen.' },
      { label: 'Die Schussdistanz', text: 'Beträgt 3 Meter. Sie gilt für das gesamte Turnier und für alle Spieler gleich.' },
    ],
  },
  {
    title: 'Das Turnierformat',
    text: 'Gespielt wird im Doppel-Round-Robin: jeder gegen jeden, Hin- und Rückrunde. In der Rückrunde werden Heim- und Gastrecht automatisch getauscht. Bei gerader Teilnehmerzahl hat jeder Spieler pro Spieltag genau eine Partie. Bei ungerader Teilnehmerzahl rotiert das Freilos automatisch — mit einer Ausnahme: Der amtierende Weltmeister ist im ersten Spieltag vom Freilos ausgenommen. Er eröffnet das Turnier als Heimspieler.',
  },
  {
    title: 'Tabellenberechnung',
    items: [
      { label: 'Sieg', text: '3 Punkte' },
      { label: 'Unentschieden', text: '1 Punkt' },
      { label: 'Niederlage', text: '0 Punkte' },
    ],
    tiebreaker: 'Bei Punktgleichstand entscheiden in dieser Reihenfolge: Tordifferenz · Erzielte Tore · Direktvergleich · Los (wird in der Abschlusstabelle als „(Los)" gekennzeichnet)',
  },
  {
    title: 'Weltrangliste',
    text: 'Punkte werden nach Endplatzierung vergeben: Platz 1 = 100, Platz 2 = 80, Platz 3 = 70, Platz 4 = 60, Platz 5 = 50, Platz 6 = 40, Platz 7 = 35, Platz 8 = 30, Platz 9 = 25, Platz 10 = 20, ab Platz 11 absteigend bis mindestens 1 Punkt. Bei Losverfahren teilen sich die betroffenen Spieler die Weltranglistenpunkte der entsprechenden Plätze gleichmäßig — so bleibt das Zufallselement aus der Weltrangliste heraus.',
  },
  {
    title: 'Die Institution',
    items: [
      { label: 'Die Trommeltrombosse', text: 'Stephan Krontal und Holger Müller. Alle nicht in Absprache ausgetragenen Veranstaltungen sind untrommelkonform — aber ausdrücklich zur Nachahmung erwünscht. Ohne Trommeltrombosse kein offizieller Trommel-Slam, kein Weltranglisteneintrag.' },
      { label: 'Die Oberhäupter', text: 'Vier an der Zahl, demokratisch gewählt. Sie koordinieren die Trommelevents, entscheiden über Ort und Zeit und regeln Sonderfälle. Beschlüsse werden mit einfacher Mehrheit gefasst. Amtszeit: ein Jahr.' },
      { label: 'Der Trommelausrichter', text: 'Trägt die Verantwortung für einen Slam: Einladungen, Trommelwerkzeug, Verpflegung. Der Obolus (Unkostenbeitrag) wird vom Ausrichter festgelegt und soll 50 € pro Person nicht überschreiten.' },
      { label: 'Die Trommler-Anmeldung', text: 'Ist verbindlich. Wer sich anmeldet, verpflichtet sich zur Teilnahme. Wer nicht erscheint, zahlt den Obolus trotzdem. Bei Sonderfällen entscheiden die Oberhäupter.' },
    ],
  },
]

export default function Wissenswertes() {
  const loc = useLocation()
  const sub = loc.pathname.split('/').pop()
  const tabs = [
    { id: 'historie',  label: 'HISTORIE' },
    { id: 'regelwerk', label: 'REGELWERK' },
    { id: 'presse',    label: 'PRESSE' },
    { id: 'olympia',   label: 'WARUM OLYMPISCH?' },
  ]
  const active = tabs.find(t => t.id === sub) ? sub : 'historie'

  const SECTION_TITLES = {
    'historie':  { h1: 'Wie alles anfing.' },
    'regelwerk': { h1: 'Einfacher als Fußball.' },
    'presse':    { h1: 'Die Welt schaut hin.' },
    'olympia':   { h1: 'Warum olympisch?' },
  }
  const title = SECTION_TITLES[active] || SECTION_TITLES['historie']

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--gruen)', padding: '60px 0 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 12 }}>Info</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--white)', marginBottom: 32 }}>{title.h1}</h1>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
            {tabs.map(t => (
              <Link key={t.id} to={`/info/${t.id}`} style={{
                padding: '14px 20px', fontSize: 14, fontWeight: 600,
                color: active === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                marginBottom: -1, transition: 'color 0.15s', whiteSpace: 'nowrap',
              }}>{t.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container--narrow">
          {active === 'historie' && (
            <div>
              {HISTORIE.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text)', marginBottom: 24 }}>{p}</p>
              ))}
              <div style={{ margin: '48px 0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
                  Grüße aus Maschine · Ocean Breeze
                </div>
                <div style={{ borderRadius: 16, overflow: 'hidden', background: '#0a1c12', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                  <video controls playsInline style={{ width: '100%', display: 'block', maxHeight: 500, objectFit: 'contain', background: '#0a1c12' }}>
                    <source src="/greetings-maschine.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div style={{ marginTop: 40, padding: '24px', background: 'var(--gruen)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>Trommel, Trommel … mors, mors!!!</div>
              </div>
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

          {active === 'regelwerk' && (
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 40 }}>
                Trommelschießen hat seit 2006 ein Regelwerk, das auf einer Seite Platz hat. Das soll so bleiben.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {REGELWERK_SECTIONS.map(s => (
                  <div key={s.title} className="card" style={{ padding: '28px' }}>
                    <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--gruen)', marginBottom: 12, letterSpacing: 0 }}>{s.title}</h3>
                    {s.text && <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: s.items || s.tiebreaker ? 16 : 0 }}>{s.text}</p>}
                    {s.items && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {s.items.map(item => (
                          <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'start' }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gruen)', paddingTop: 2 }}>{item.label}</div>
                            <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.text}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.tiebreaker && (
                      <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--cream)', borderRadius: 8, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <strong style={{ color: 'var(--gruen)' }}>Tiebreaker: </strong>{s.tiebreaker}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: '24px', background: 'var(--gruen)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 28, color: 'var(--gold)' }}>Trommel, Trommel … mors, mors!!!</div>
              </div>
            </div>
          )}

          {active === 'presse' && <Presse />}

          {active === 'olympia' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Weiterleiten…</p>
              {/* Redirect happens via App.jsx route */}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
