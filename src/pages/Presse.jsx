import { useState } from 'react'
import { Link } from 'react-router-dom'

const ARTIKEL = [
  {
    id: 'abendblatt2006',
    quelle: 'Hamburger Abendblatt',
    datum: '3.–5. Juni 2006',
    titel: 'Die Welt zu Gast im Garten',
    untertitel: 'Warum zwei Hamburger ihre Waschmaschinen mit Fußbällen füttern',
    jahr: 2006,
    pdf: '/presse/2006_Hamburger_Abendblatt.pdf',
    text: `HAMBURG – Das Kürzel, das in diesen Tagen so inflationär gebraucht wird, scheint nicht misszuverstehen: WM steht für Weltmeisterschaft. Doch für Holger Müller und Stephan Krontal bedeutet das globale Fußballfest etwas anderes: „Waschmaschine".

Das Trommelschießen – das von den Organisatoren erfundene Turnier – ist so simpel wie genial: Aus einer Entfernung von 3,50 Metern versuchen die Spieler, den kleinen Ball in die Trommel einer Waschmaschine zu schießen. Als Treffer zählen nur Schüsse, die in der Maschine liegen bleiben.

Gespielt wird im Duell „Eins gegen eins": Fünf Schüsse gibt jeder Trommler ab, abwechselnd wie im Elfmeterschießen. Steht es nach den fünf Versuchen unentschieden, gibt es weitere Runden nach dem K.o.-Prinzip.

„Die Welt zu Gast im Garten" – so das Motto der beiden Hamburger, die ihren WG-Garten zur Weltmeisterschafts-Arena erklärt haben. Mit 50 bis 100 Zuschauern wird gerechnet. Der amtierende Trommel-Weltmeister Stephan Krontal will seinen Titel verteidigen.`,
    zitat: '"Die Welt zu Gast im Garten – das ist unser Motto." – Hamburger Abendblatt, Juni 2006',
  },
  {
    id: 'kreisblatt2008mai',
    quelle: 'Delmenhorster Kreisblatt',
    datum: '25. Mai 2008',
    titel: 'Wenn das Runde ins Runde muss',
    untertitel: 'Berner Fußballfreunde veranstalten „Trommelschießen"',
    jahr: 2008,
    pdf: '/presse/2008_Delmenhorster_Kreisblatt_Mai.pdf',
    text: `Ziel des nicht ganz ernst gemeinten Turniers ist es, mit kleinen Fußbällen auf die Öffnungen von Waschmaschinen zu schießen – und das aus einer Distanz von immerhin 3,5 Metern.

Frank Firneisen, Sascha Wachtendorf und Jens Meyer haben sich zur Fußball-EM etwas Besonderes einfallen lassen. Am Sonnabend, 31. Mai, 10 Uhr veranstalten sie in Berne ein „Trommelschießen".

Und darum geht es bei dem nicht ganz ernstgemeinten Turnier: Die Teilnehmer müssen aus einer Entfernung von 3,5 Metern kleine Fußbälle auf die Öffnung von Waschmaschinen schießen. Jeder Sportler hat insgesamt 32 angemeldet – hat fünf Versuche. Wer am besten zielt, gewinnt.

Die Idee zum „Trommelschießen" ist nicht neu – das geben die Veranstalter gerne zu. Schon 1998 kamen die Studenten einer Wohngemeinschaft in Hamburg darauf, in ihrer Wohnung „das Runde ins Runde" zu schießen. Daraus entstand eine erste Meisterschaft mit vielen Bernern in Hamburg, bei der 18 Teilnehmer antraten.

„Dass es diesmal 32 Sportler sind, die ihr Glück versuchen, zeigt die Etablierung des Trommelschießens", sind die Organisatoren überzeugt. Sie seien schon „ganz heiß" auf die Veranstaltung am 31. Mai. „Und natürlich wird auch der amtierende Trommel-Weltmeister Stephan Krontal versuchen, seinen Titel zu verteidigen."`,
    zitat: '"Wenn das Runde ins Runde muss – aus einer Distanz von immerhin 3,5 Metern."',
  },
  {
    id: 'kreisblatt2008juni',
    quelle: 'Delmenhorster Kreisblatt',
    datum: '11. Juni 2008',
    titel: 'Der Ball muss in der Trommel liegen bleiben',
    untertitel: 'Plädoyer für einen netten Zeitvertreib während der Fußball-EM',
    jahr: 2008,
    pdf: '/presse/2008_Delmenhorster_Kreisblatt_Juni.pdf',
    text: `Eine Waschmaschine, ein kleiner Fußball und 3,50 Meter Abstand zum Schießen – viel mehr braucht man eigentlich nicht zum „Trommelschießen". Dennoch kann man viel mehr daraus machen, wie Fußballfreunde aus Berne beweisen.

Gespielt wird im Duell „Eins gegen eins". Fünf Schüsse gibt jeder Trommler ab, abwechselnd wie im Elfmeterschießen. Ein Treffer, und das Trommelschießen ist das wichtigste Regelwerk des Trommelschießens: markiert, wenn der Ball in der Trommel liegen bleibt. Steht es nach den fünf Versuchen unentschieden, das weitere Vorgabe: Es kann eine Liga (Jeder gegen jeden), ein K.o.-System oder eine Gruppenphase plus K.o.-System gespielt werden.

Zum zweiten Mal nach 2006 trafen sich Fußballer aus Berne und deren Freunde aus Hamburg zu solch einer großen Trommelmeisterschaft. Henning Diers, in der diesjährigen Kreisliga als ehemaliger Stürmer der Spielvereinigung Berne bekannt, gewann am Ende das Double: Er wurde „Europameister" und „Torschützenkönig" mit 20 Treffern. Verdient, aber nicht im Schönsten.

Zu staunen war nicht die Professionalität der Organisatoren (Sprecher Pult, Bauwerbung, Viel Beistand und vier Schiedspieler auf unterschiedlichste Weise, die Runde ins Runde zu kriegen.`,
    zitat: '"Der Ball muss in der Trommel liegen bleiben." – Torsten Heidemann, Delmenhorster Kreisblatt',
  },
]

export default function Presse() {
  const [aktiv, setAktiv] = useState(null)
  const offen = aktiv ? ARTIKEL.find(a => a.id === aktiv) : null

  return (
    <div>
      <div style={{ background: 'var(--gruen)', padding: '80px 0 48px' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Über das Trommelschießen</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>Presse</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, maxWidth: 560 }}>
            Das Trommelschießen in der Öffentlichkeit – Zeitungsartikel aus der frühen Geschichte des Turniers.
          </p>
        </div>
      </div>

      <section className="section--sm" style={{ background: 'var(--cream)', paddingBottom: 80 }}>
        <div className="container">

          {/* Artikel-Karten */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
            {ARTIKEL.map(a => (
              <div key={a.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s' }}
                onClick={() => setAktiv(aktiv === a.id ? null : a.id)}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {/* Zeitungs-Header */}
                <div style={{ background: 'var(--gruen)', padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                    {a.quelle} · {a.datum}
                  </div>
                  <div style={{ fontFamily: "'Bayon', sans-serif", fontSize: 24, color: 'white', lineHeight: 1.2 }}>{a.titel}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{a.untertitel}</div>
                </div>
                {/* Zitat */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.zitat}</div>
                </div>
                <div style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--gruen)' }}>
                    {aktiv === a.id ? 'Text verbergen ↑' : 'Text lesen ↓'}
                  </button>
                  <a href={a.pdf} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
                    style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6 }}>
                    PDF →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Aufgeklappter Artikel-Text */}
          {offen && (
            <div className="card" style={{ padding: '32px 40px', marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                {offen.quelle} · {offen.datum}
              </div>
              <h2 style={{ fontSize: 28, color: 'var(--gruen)', marginBottom: 6 }}>{offen.titel}</h2>
              <div style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 24 }}>{offen.untertitel}</div>
              <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, whiteSpace: 'pre-line', maxWidth: 720 }}>
                {offen.text}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
                <a href={offen.pdf} target="_blank" rel="noopener" className="btn btn--outline" style={{ fontSize: 13 }}>
                  Original-PDF ansehen →
                </a>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Digitalisiert aus dem Original-Zeitungsartikel
                </span>
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(28,66,43,0.05)', borderRadius: 12, padding: '20px 24px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            📰 Hast du weitere Zeitungsartikel oder Medienberichte über das Trommelschießen? Die Geschichte des Turniers soll vollständig dokumentiert werden.
          </div>
        </div>
      </section>
    </div>
  )
}
