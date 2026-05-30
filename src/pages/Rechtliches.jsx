export default function Rechtliches() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: 'var(--gruen)', padding: '80px 0 60px' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(176,137,45,0.8)' }}>Rechtliches</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'white' }}>Impressum & Datenschutz</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>

          {/* Impressum */}
          <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 24 }}>Impressum</h2>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 48 }}>
            <p style={{ marginBottom: 16, lineHeight: 1.8 }}>
              <strong>Verantwortlich für den Inhalt dieser Website:</strong>
            </p>
            <p style={{ lineHeight: 1.8, marginBottom: 16 }}>
              Holger Müller<br />
              Bei der Apostelkirche 5<br />
              20257 Hamburg
            </p>
            <p style={{ lineHeight: 1.8, marginBottom: 16 }}>
              Stephan Krontal<br />
              Basselweg 57<br />
              22527 Hamburg
            </p>
            <p style={{ lineHeight: 1.8 }}>
              E-Mail: <a href="mailto:moin@trommelschiessen.com" style={{ color: 'var(--gruen)' }}>moin@trommelschiessen.com</a>
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 48 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>Haftung für Inhalte</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 16 }}>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden von Rechtsverletzungen werden wir entsprechende Inhalte umgehend entfernen.
            </p>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>Haftung für Links</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 16 }}>
              Unser Angebot enthält Links zu externen Webseiten Dritter. Für deren Inhalte sind stets die jeweiligen Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir entsprechende Links umgehend entfernen.
            </p>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>Urheberrecht</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 16 }}>
              Die durch uns erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung. Downloads sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>Hinweis zu Medieninhalten</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Diese Website kann Bilder, Musikausschnitte oder Videoclips enthalten, die im Rahmen von Trommelschießen-Events entstanden sind. Wir bemühen uns, ausschließlich Inhalte zu verwenden, für die wir die erforderlichen Rechte besitzen oder die zur freien Nutzung freigegeben sind. Sollten Sie der Ansicht sein, dass ein auf dieser Website verwendeter Inhalt Ihre Urheberrechte verletzt, bitten wir Sie, uns umgehend unter <a href="mailto:moin@trommelschiessen.com" style={{ color: 'var(--gruen)' }}>moin@trommelschiessen.com</a> zu kontaktieren. Wir werden den betreffenden Inhalt nach Prüfung unverzüglich entfernen.
            </p>
          </div>

          {/* Datenschutz */}
          <h2 style={{ fontSize: 32, color: 'var(--gruen)', marginBottom: 24 }}>Datenschutzerklärung</h2>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>1. Allgemeines</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Diese Website wird betrieben von Holger Müller, Hamburg. Die Verwendung personenbezogener Daten richtet sich nach den geltenden gesetzlichen Bestimmungen (DSGVO, TMG) sowie der durch den Nutzer erteilten Einwilligung. Der Schutz personenbezogener Daten hat für uns einen hohen Stellenwert.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>2. Hosting & Technik</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Diese Website wird gehostet bei <strong>Vercel Inc.</strong> (San Francisco, CA, USA). Die Datenbank wird betrieben über <strong>Supabase</strong>. Beide Anbieter haben angemessene Maßnahmen zur Datensicherheit getroffen. Bei jedem Aufruf der Website werden automatisch Verbindungsdaten (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite) im Serverlog gespeichert. Diese Daten werden nicht mit anderen Daten zusammengeführt.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>3. Erhobene Daten & Zweck</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Wir verarbeiten ausschließlich Namen von Turnierteilnehmern zu folgenden Zwecken:
            </p>
            <ul style={{ lineHeight: 2, color: 'var(--text-muted)', paddingLeft: 20, marginTop: 8 }}>
              <li>Ermittlung und Dokumentation von Turnierergebnissen</li>
              <li>Erstellung von Tabellen, Statistiken und historischen Ranglisten</li>
            </ul>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginTop: 12 }}>
              Es werden keine E-Mail-Adressen, Adressen oder sonstige Kontaktdaten von Besuchern dieser Website erhoben. Die Teilnahme an einem Turnier und die damit verbundene Speicherung des Namens erfolgt auf freiwilliger Basis.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>4. Speicherdauer</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Turnierdaten (Namen, Ergebnisse, Platzierungen) werden auf unbestimmte Zeit gespeichert, da sie historischen Wert für die Dokumentation der Trommelschießen-Weltmeisterschaften haben. Eine Löschung ist auf Anfrage möglich.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>5. Cookies</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools. Es werden lediglich technisch notwendige Session-Daten verarbeitet.
            </p>
          </div>

          <div className="card" style={{ padding: '28px 32px', marginBottom: 48 }}>
            <h3 style={{ fontSize: 18, color: 'var(--gruen)', marginBottom: 12 }}>6. Ihre Rechte & Kontakt</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 12 }}>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch bezüglich Ihrer gespeicherten Daten. Für alle datenschutzrelevanten Anfragen wenden Sie sich an:
            </p>
            <p style={{ lineHeight: 1.8 }}>
              <a href="mailto:moin@trommelschiessen.com" style={{ color: 'var(--gruen)', fontWeight: 600 }}>moin@trommelschiessen.com</a>
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginTop: 12 }}>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich an die zuständige Aufsichtsbehörde wenden: <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener" style={{ color: 'var(--gruen)' }}>www.bfdi.bund.de</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
