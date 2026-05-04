const ARTIKEL = [
  {
    id: 'abendblatt2006',
    quelle: 'Hamburger Abendblatt',
    datum: '3.–5. Juni 2006',
    titel: 'Die Welt zu Gast im Garten',
    untertitel: 'Warum zwei Hamburger ihre Waschmaschinen mit Fußbällen füttern',
    pdf: '/presse/2006_Hamburger_Abendblatt.pdf',
    text: `HAMBURG – Das Kürzel, das in diesen Tagen so inflationär gebraucht wird, scheint nicht misszuverstehen: WM steht für Weltmeisterschaft. Doch für Holger Müller und Stephan Krontal bedeutet das globale Fußballfest etwas anderes: „Waschmaschine".

Das Trommelschießen – das von den Organisatoren erfundene Turnier – ist so simpel wie genial: Aus einer Entfernung von 3 Metern versuchen die Spieler, den kleinen Ball in die Trommel einer Waschmaschine zu schießen. Als Treffer zählen nur Schüsse, die in der Maschine liegen bleiben.

Gespielt wird im Duell „Eins gegen eins": Fünf Schüsse gibt jeder Trommler ab, abwechselnd wie im Elfmeterschießen. Steht es nach den fünf Versuchen unentschieden, gibt es weitere Runden nach dem K.o.-Prinzip.

„Die Welt zu Gast im Garten" – so das Motto der beiden Hamburger, die ihren WG-Garten zur Weltmeisterschafts-Arena erklärt haben. Mit 50 bis 100 Zuschauern wird gerechnet. Der amtierende Trommel-Weltmeister Stephan Krontal will seinen Titel verteidigen.`,
  },
  {
    id: 'kreisblatt2008mai',
    quelle: 'Delmenhorster Kreisblatt',
    datum: '25. Mai 2008',
    titel: 'Wenn das Runde ins Runde muss',
    untertitel: 'Berner Fußballfreunde veranstalten „Trommelschießen"',
    pdf: '/presse/2008_Delmenhorster_Kreisblatt_Mai.pdf',
    text: `BERNE – Ziel des nicht ganz ernst gemeinten Turniers ist es, mit kleinen Fußbällen auf die Öffnungen von Waschmaschinen zu schießen – und das aus einer Distanz von immerhin 3 Metern.

Frank Firneisen, Sascha Wachtendorf und Jens Meyer haben sich zur Fußball-EM etwas Besonderes einfallen lassen. Am Sonnabend, 31. Mai, 10 Uhr veranstalten sie in Berne ein „Trommelschießen".

Die Teilnehmer müssen aus einer Entfernung von 3 Metern kleine Fußbälle auf die Öffnung von Waschmaschinen schießen. Jeder Sportler – insgesamt haben sich 32 angemeldet – hat fünf Versuche. Wer am besten zielt, gewinnt.

Die Idee zum „Trommelschießen" ist nicht neu: Schon 1998 kamen die Studenten einer Wohngemeinschaft in Hamburg darauf, in ihrer Wohnung „das Runde ins Runde" zu schießen. Daraus entstand eine erste Meisterschaft mit 18 Teilnehmern.

„Dass es diesmal 32 Sportler sind, zeigt die Etablierung des Trommelschießens", sind die Organisatoren überzeugt. Natürlich wird auch der amtierende Trommel-Weltmeister Stephan ‚Krone' Krontal versuchen, seinen Titel zu verteidigen.`,
  },
  {
    id: 'kreisblatt2008juni',
    quelle: 'Delmenhorster Kreisblatt',
    datum: '11. Juni 2008',
    titel: 'Der Ball muss in der Trommel liegen bleiben',
    untertitel: 'Plädoyer für einen netten Zeitvertreib während der Fußball-EM',
    pdf: '/presse/2008_Delmenhorster_Kreisblatt_Juni.pdf',
    text: `BERNE – Eine Waschmaschine, ein kleiner Fußball und 3 Meter Abstand zum Schießen – viel mehr braucht man eigentlich nicht zum „Trommelschießen". Dennoch kann man viel mehr daraus machen, wie Fußballfreunde aus Berne beweisen.

Gespielt wird im Duell „Eins gegen eins". Fünf Schüsse gibt jeder Trommler ab, abwechselnd wie im Elfmeterschießen. Das wichtigste Regelwerk des Trommelschießens: Der Ball muss in der Trommel liegen bleiben.

Zum zweiten Mal nach 2006 trafen sich Fußballer aus Berne und deren Freunde aus Hamburg zu solch einer großen Trommelmeisterschaft. Henning Diers, in der diesjährigen Kreisliga als ehemaliger Stürmer der Spielvereinigung Berne bekannt, gewann am Ende das Double: Er wurde „Europameister" und „Torschützenkönig" mit 20 Treffern.

Zu staunen war nicht die Professionalität der Organisatoren – Sprecherpult, Bierstand und vier Schiedspieler auf unterschiedlichste Weise, die Runde ins Runde zu kriegen. Die Kunstrasen-Fläche sorgte dafür, dass das echte Grün des Gastgebers an diesen Stellen ungeschoren davon kam.

Von Torsten Heidemann`,
  },
]

export default function Presse() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 48 }}>
        Pressearchiv · 3 Artikel
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
        {ARTIKEL.map(a => (
          <article key={a.id}>
            {/* Zeitungs-Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
                {a.quelle} · {a.datum}
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--gruen)', marginBottom: 6, lineHeight: 1.2 }}>{a.titel}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', fontStyle: 'italic' }}>{a.untertitel}</p>
            </div>

            {/* Artikel-Text */}
            <div style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--text)', whiteSpace: 'pre-line', maxWidth: 720, marginBottom: 24 }}>
              {a.text}
            </div>

            {/* PDF-Link */}
            <a
              href={a.pdf}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: 'var(--gruen)',
                padding: '10px 18px', border: '1.5px solid var(--border)',
                borderRadius: 8, textDecoration: 'none', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gruen)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gruen)' }}
            >
              <span>📄</span> Original-PDF öffnen
            </a>

            <div style={{ height: 1, background: 'var(--border)', marginTop: 48 }} />
          </article>
        ))}
      </div>

      <div style={{ marginTop: 48, padding: '20px 24px', background: 'rgba(28,66,43,0.05)', borderRadius: 12, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        📰 Hast du weitere Zeitungsartikel über das Trommelschießen? Melde dich – die Geschichte soll vollständig dokumentiert werden.
      </div>
    </div>
  )
}
