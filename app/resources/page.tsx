export default function ResourcesPage() {
  const lilacCard = { background: "var(--lilac)", borderRadius: "var(--radius)", padding: "24px" } as const;
  const whiteCard = { background: "white", border: "1.5px solid var(--purple)", borderRadius: "var(--radius)", padding: "24px" } as const;
  const columnCard = { background: "white", borderRadius: "var(--radius)", padding: "32px", display: "flex", flexDirection: "column" as const, gap: "16px" };

  return (
    <div className="container">
      <h1 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "32px" }}>Resurse</h1>

      {/* Two column containers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "64px" }}>

        {/* Left white container */}
        <div style={columnCard}>
          <p style={{ fontSize: "15px", lineHeight: 1.7, opacity: 0.8, marginBottom: "8px" }}>
            Pentru situații de pericol iminent contactează unul din serviciile de mai jos
          </p>

          {/* Emergency — red border */}
          <div style={{ background: "white", border: "2px solid var(--red)", borderRadius: "var(--radius)", padding: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--red)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              În caz de urgență
            </h2>
            <p style={{ fontSize: "17px", color: "var(--red)", fontWeight: 700, marginBottom: "6px" }}>
              112 - Număr unic de urgență
            </p>
            <p style={{ fontSize: "14px", color: "var(--dark)", opacity: 0.8 }}>
              Dacă ești în pericol imediat, sună la 112.
            </p>
          </div>

          {/* 0800 500 333 — lilac */}
          <div style={lilacCard}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
              <a href="tel:0800500333" style={{ color: "var(--purple)", textDecoration: "none" }}>0800 500 333</a>
            </h2>
            <p style={{ fontSize: "14px", color: "var(--dark)", lineHeight: 1.6 }}>
              Linie gratuită, disponibilă 24/7. Suport pentru victime ale violenței domestice.
            </p>
          </div>

          {/* 116 111 — lilac */}
          <div style={lilacCard}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
              <a href="tel:116111" style={{ color: "var(--purple)", textDecoration: "none" }}>116 111</a>
            </h2>
            <p style={{ fontSize: "14px", color: "var(--dark)", lineHeight: 1.6 }}>
              Telefonul Copilului pentru copii și adolescenți care au nevoie de ajutor
            </p>
          </div>
        </div>

        {/* Right white container */}
        <div style={columnCard}>
          <p style={{ fontSize: "15px", lineHeight: 1.7, opacity: 0.8, marginBottom: "8px" }}>
            Dacă te refaci după o situație de violență, există ajutor disponibil
          </p>

          {/* ANAIS — white + purple border */}
          <div style={whiteCard}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
              <a href="tel:0736380879" style={{ color: "var(--purple)", textDecoration: "none" }}>0736 380 879</a>
            </h2>
            <p style={{ fontSize: "14px", color: "var(--dark)", lineHeight: 1.6 }}>
              Asociația ANAIS — suport psihologic și juridic
            </p>
          </div>

          {/* Atena Delphi — white + purple border */}
          <div style={whiteCard}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
              <a href="tel:0743777000" style={{ color: "var(--purple)", textDecoration: "none" }}>0743 777 000</a>
            </h2>
            <p style={{ fontSize: "14px", color: "var(--dark)", lineHeight: 1.6 }}>
              Asociația Atena Delphi CJ — suport psihologic și juridic
            </p>
          </div>

          {/* Fundația Sensiblu — white + purple border */}
          <div style={whiteCard}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
              <a href="tel:0787541854" style={{ color: "var(--purple)", textDecoration: "none" }}>0787 541 854</a>
            </h2>
            <p style={{ fontSize: "14px", color: "var(--dark)", lineHeight: 1.6 }}>
              Fundația Sensiblu — harta serviciilor pentru victimele violenței domestice.{" "}
              <a href="https://fundatiasensiblu.ro/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--purple)" }}>
                fundatiasensiblu.ro
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Ce poți face */}
      <h2 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "40px" }}>Ce poți face:</h2>

      <div style={{ background: "white", borderRadius: "var(--radius)", padding: "32px", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "var(--purple)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
          Dacă crezi că treci printr-o situație de violență
        </h3>
        <ul style={{ paddingLeft: "20px", lineHeight: 2, listStyleType: "disc" }}>
          <li>Nu ești singură/singur și nu este vina ta</li>
          <li>Pregătește un plan de siguranță</li>
          <li>Păstrează documente importante într-un loc sigur</li>
          <li>Spune cuiva în care ai încredere ce se întâmplă</li>
          <li>Contactează o organizație de sprijin pentru consiliere</li>
        </ul>
      </div>

      <div style={{ background: "white", borderRadius: "var(--radius)", padding: "32px", marginBottom: "48px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "var(--purple)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
          Dacă cunoști pe cineva care are nevoie de ajutor
        </h3>
        <ul style={{ paddingLeft: "20px", lineHeight: 2, listStyleType: "disc" }}>
          <li>Ascultă fără să judeci</li>
          <li>Crede ce îți spune</li>
          <li>Oferă sprijin, nu soluții forțate</li>
          <li>Respectă deciziile persoanei</li>
          <li>Ajută cu informații despre resurse disponibile</li>
        </ul>
      </div>

      <div className="resources-box">
        <h3>Siguranța ta online</h3>
        <p style={{ fontSize: "15px", opacity: 0.85 }}>
          Dacă îți faci griji că cineva îți verifică activitatea online, poți folosi butonul
          &quot;Ieșire rapidă&quot; din colțul din dreapta sus pentru a părăsi rapid acest site.
        </p>
      </div>
    </div>
  );
}
