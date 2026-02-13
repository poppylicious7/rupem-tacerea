import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="hero-gradient">
        <p className="hero-tagline">Vocea ta contează</p>
        <h1 className="hero-title-large">Rupem Tăcerea</h1>
        <p className="hero-subtitle-large">
          Spune-ți povestea. Te ascultăm, fără judecată.
        </p>
        <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/share" className="btn btn-white">
            Împărtășește povestea ta
          </Link>
          <Link href="/stories" className="btn btn-outline-white">
            Citește povești
          </Link>
        </div>
      </section>

      <div className="container">
        <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "26px", marginBottom: "16px", color: "#1f2937" }}>
            Un spațiu sigur pentru tine
          </h2>
          <p style={{ maxWidth: "550px", margin: "0 auto", color: "#6b7280", fontSize: "17px", lineHeight: "1.7" }}>
            Violența prosperă în tăcere. Aici, povestea ta este ascultată și respectată.
            Nu ești singur și nu ești de vină.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Anonim și sigur</h3>
            <p>Folosește doar prenumele sau rămâi complet anonim. Tu decizi.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💜</div>
            <h3>Te ascultăm</h3>
            <p>Fiecare poveste este importantă. Suntem aici să ascultăm, nu să judecăm.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Revizuit cu grijă</h3>
            <p>Un moderator citește fiecare poveste pentru a păstra un spațiu sigur.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Ajuți pe alții</h3>
            <p>Povestea ta poate fi lumina de care altcineva are nevoie azi.</p>
          </div>
        </div>

        <div className="help-box">
          <h3>Ai nevoie de ajutor?</h3>
          <p>
            Sună gratuit la <a href="tel:0800500333"><strong>0800 500 333</strong></a> — disponibil 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
