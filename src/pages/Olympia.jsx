import { Link } from 'react-router-dom'

const ARGUMENTE = [
  {
    nr: '01',
    titel: 'Das IOC öffnet sich',
    text: 'Breakdance, Skateboarding, Klettern, Surfen – das IOC hat in den letzten Jahren konsequent neue Sportarten aufgenommen, um jüngere und urbanere Zielgruppen zu erreichen. Paris durfte Breakdance selbst vorschlagen. Hamburg hätte dasselbe Recht. Und was wäre urbaner, norddeutscher und origineller als Trommelschießen?',
    emoji: '🏛️',
  },
  {
    nr: '02',
    titel: 'Klare Regeln, faire Chancen',
    text: 'Trommelschießen hat ein präzises Regelwerk: 3 Meter Abstand, Elfmeter-Duell, Ball muss in der Trommel liegen bleiben. Keine Interpretation, kein Schiedsrichter-Ermessen. Die Sieger-Entscheidung ist glasklarer als beim Eiskunstlauf, beim Turnen – oder beim Breakdance, wo Kreativität und Persönlichkeit bewertet werden.',
    emoji: '📐',
  },
  {
    nr: '03',
    titel: 'Minimaler Infrastrukturaufwand',
    text: 'Olympia bedeutet Milliarden für Sportstätten. Trommelschießen braucht eine Waschmaschine, einen Fußball und 3 Meter freie Fläche. Die Arena lässt sich in jedem Hamburger Hinterhof aufbauen – klimaneutral, nachhaltig, ohne Betonsünden. Das IOC wäre begeistert. Der Zukunftsrat Hamburg auch.',
    emoji: '♻️',
  },
  {
    nr: '04',
    titel: 'Hamburger DNA',
    text: 'Trommelschießen wurde in einer Norderstedter WG erfunden – wenige Kilometer von der geplanten Olympia-Arena in Altona entfernt. Kein Sport ist so hamburgisch. Wenn Hamburg schon Olympia ausrichten darf, dann verdient Hamburg auch eine Heimsportart. Tischtennis kommt aus dem britischen Wohnzimmer. Trommelschießen kommt aus dem norddeutschen Waschkeller.',
    emoji: '⚓',
  },
  {
    nr: '05',
    titel: 'Zuschauer-Garantie',
    text: 'Rudern um 7 Uhr morgens. Schießen mit Luftgewehr. Moderner Fünfkampf schaut niemand. Trommelschießen hingegen hat seit 2006 bewiesen: Es zieht Zuschauer an, es erzeugt Lacher, Spannung und echte Emotionen. Ein Trommelschießen-Finale im Volksparkstadion – ausverkauft, garantiert.',
    emoji: '🎪',
  },
  {
    nr: '06',
    titel: 'Technisch anspruchsvoll',
    text: 'Wer noch nie versucht hat, einen Fußball aus 3 Metern in eine Waschmaschinentrommel zu schießen, unterschätzt die Herausforderung dramatisch. Die Öffnung hat etwa 23 cm Durchmesser. Ein Fußball misst 22 cm. Die Fehlertoleranz ist nahezu null. Das ist Präzisionssport auf Weltklasse-Niveau – vergleichbar mit dem Schießen, nur mit mehr Spaßfaktor.',
    emoji: '🎯',
  },
  {
    nr: '07',
    titel: 'Inklusion und Gleichheit',
    text: 'Trommelschießen erfordert keine besondere Körpergröße, kein Startkapital, keine jahrelange Vereinsmitgliedschaft. Ein Ball, eine Maschine, fünf Schüsse. Jeder kann mitmachen. Das IOC kämpft seit Jahren für mehr Inklusion im Sport. Trommelschießen ist die Antwort.',
    emoji: '🤝',
  },
]

const VERGLEICHE = [
  { sport: 'Rhythmische Sportgymnastik', grund: 'Seit 1984 olympisch. Hauptsächlich in Osteuropa gespielt. Bewertet nach Ästhetik.', trommel: 'Trommelschießen: Klares Ergebnis. Ball drin oder nicht.' },
  { sport: 'Breakdance (Paris 2024)', grund: 'Einmalig olympisch auf Antrag des Gastgebers. Bewertung nach Kreativität, Persönlichkeit und Musikalität.', trommel: 'Trommelschießen: Auch Gastgeber-Antrag möglich. Bewertung: null oder eins.' },
  { sport: 'Moderner Fünfkampf', grund: 'Kombination aus Schwimmen, Fechten, Reiten, Laufen und Schießen. Pferdelose Länder strukturell benachteiligt.', trommel: 'Trommelschießen: Keine Pferde. Keine Benachteiligung. Waschmaschine reicht.' },
  { sport: 'Synchronschwimmen', grund: 'Olympisch seit 1984. Lange nur für Frauen. Bewertung subjektiv.', trommel: 'Trommelschießen: Offen für alle Geschlechter. Mixed-Event von Anfang an.' },
]

export default function Olympia() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--gruen)', padding: '100px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(176,137,45,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, right: 80, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(176,137,45,0.08)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)', marginBottom: 20 }}>Über das Trommelschießen</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05, marginBottom: 24, maxWidth: 820 }}>
            Warum Trommelschiessen olympisch sein sollte
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.8, maxWidth: 640, marginBottom: 32 }}>
            Ein ernsthafter Plädoyer für die Aufnahme der ältesten Norderstedter Mannschaftssportart ins olympische Programm –
            am besten 2036 in Hamburg.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: 'var(--gold)', color: 'var(--gruen)', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 20 }}>
              🗳️ Hamburg-Referendum 31. Mai 2026
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
              Die Trommler: geschlossen pro Olympia Hamburg
            </span>
          </div>
        </div>
      </div>

      {/* Foto */}
      <section style={{ background: 'white', padding: '64px 0' }}>
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
            Fünf Maschinen. Fünf Ringe. Eine Vision.
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', lineHeight: 0 }}>
            <img
              src="/olympia-waschmaschinen.jpg"
              alt="Fünf Waschmaschinen im Garten, deren bunte Bullaugen die olympischen Ringe ergeben"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: 'white', padding: '72px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--gruen)', marginBottom: 20, lineHeight: 1.2 }}>
                Das IOC hat Breakdance aufgenommen.<br />Warum nicht Trommelschiesssen?
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text)', marginBottom: 20 }}>
                Paris 2024 hat bewiesen: Gastgeberstädte dürfen eigene Sportarten vorschlagen. Das Internationale Olympische Komitee hat Breakdance, Skateboarding, Sportklettern und Surfen ins Programm aufgenommen – allesamt Sportarten, die außerhalb ihrer Communities kaum jemand kannte. Trommelschießen ist älter, präziser und deutlich norddeutschaffener.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text)', marginBottom: 20 }}>
                Am 31. Mai 2026 stimmen die Hamburgerinnen und Hamburger darüber ab, ob sich die Stadt für die Olympischen Spiele 2036, 2040 oder 2044 bewirbt. Die Trommelschießen-WM-Gemeinschaft ist geschlossen dafür. Nicht zuletzt in der stillen Hoffnung, dass eine der ikonischsten Norderstedter Erfindungen endlich die Bühne bekommt, die sie verdient.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text)' }}>
                Hier sind sieben sorgfältig recherchierte, vollkommen ernstzunehmende Argumente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Argumente */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>7 Argumente</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--gruen)', marginBottom: 56 }}>
            Die Beweislage ist eindeutig
          </h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {ARGUMENTE.map((arg, i) => (
              <div key={arg.nr} className="card" style={{
                padding: '32px 36px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0 32px',
                alignItems: 'start',
                borderLeft: `4px solid ${i === 0 ? 'var(--gold)' : 'transparent'}`,
              }}>
                <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 52, color: 'rgba(28,66,43,0.08)', lineHeight: 1, userSelect: 'none', minWidth: 64, textAlign: 'right' }}>
                  {arg.nr}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{arg.emoji}</span>
                    <h3 style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--gruen)', margin: 0 }}>{arg.titel}</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>{arg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Vergleichstabelle */}
      <section style={{ background: 'var(--gruen)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.7)', marginBottom: 16 }}>Sportartenvergleich</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'white', marginBottom: 12 }}>
            Trommelschiesssen vs. bereits olympische Sportarten
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 40, maxWidth: 560 }}>
            Die folgende Übersicht basiert auf öffentlich zugänglichen Fakten. Die Schlussfolgerungen sind die unserer eigenen.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {VERGLEICHE.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '24px 28px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 24,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(176,137,45,0.6)', marginBottom: 6 }}>Bereits olympisch</div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 16, marginBottom: 8 }}>{v.sport}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{v.grund}</div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Trommelschießen</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{v.trommel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hamburg-Kontext */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Hamburg 2036 / 2040 / 2044</div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--gruen)', marginBottom: 20 }}>
                Die Heimsportart wartet auf ihre Bühne
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text)', marginBottom: 16 }}>
                Hamburg bewirbt sich um die Ausrichtung der Olympischen und Paralympischen Spiele. Das Konzept „Hamburg+" setzt auf bestehende Sportstätten, kurze Wege und Nachhaltigkeit. Die Science City Bahrenfeld als Olympisches Dorf. Das Volksparkstadion als Herzstück.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text)', marginBottom: 16 }}>
                Und irgendwo in Norderstedt wartet eine Waschmaschine auf ihren großen Auftritt.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text)' }}>
                Frankreich hat Breakdance olympisch gemacht, weil es eine urbane Kulturbewegung des Gastgeberlandes war. Trommelschießen ist die urbane Kulturbewegung Norddeutschlands. Der Hamburger Senat sollte die Zeichen der Zeit erkennen. Das Referendum findet am 31. Mai 2026 statt. Die Trommler sind bereit.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { value: '2006', label: 'Gründungsjahr', sub: 'in Norderstedt' },
                { value: '56', label: 'Weltmeister', sub: 'in der ewigen Tabelle' },
                { value: '9', label: 'WMs', sub: 'in Norddeutschland' },
                { value: '1', label: 'Sportart', sub: 'die Hamburg verdient' },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: '20px' }}>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 44, color: 'var(--gruen)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fazit CTA */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 'clamp(28px, 5vw, 56px)', color: 'var(--gruen)', lineHeight: 1.1, marginBottom: 24 }}>
              TROMMEL. TROMMEL.<br />MORS. MORS. OLYMPIA.
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 32 }}>
              Die Trommelschießen-WM-Gemeinschaft spricht sich geschlossen für Olympia in Hamburg aus.
              Nicht weil wir naiv sind. Sondern weil wir wissen, dass große Ideen immer klein anfangen –
              in einer Norderstedter WG, mit einem Ball, einer Maschine und einem Traum.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/wissenswertes/historie" className="btn btn--primary">Die Geschichte des Trommelschießens</Link>
              <Link to="/statistiken/weltrangliste" className="btn btn--outline">Weltrangliste ansehen</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
