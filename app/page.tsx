import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Split hero: image left, purple text right */}
      <section className="hero-split" style={{ display: "flex", minHeight: "560px" }}>
        {/* Left: image */}
        <div className="hero-split-image" style={{ flex: "1 1 50%", position: "relative", minHeight: "400px" }}>
          <Image
            src="/Hero-stories.jpg"
            alt="Persoană cu mesajul 'Love Shouldn't Hurt' scris pe spate — imagine simbolică pentru campania împotriva violenței domestice"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Photo credit */}
          <p style={{
            position: "absolute",
            bottom: "8px",
            left: "10px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.6)",
            zIndex: 1,
          }}>
            Photo by <a href="https://unsplash.com/@slphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: "rgba(255,255,255,0.6)" }}>Sydney Latham</a> on <a href="https://unsplash.com/photos/love-shouldnt-hurt-printed-on-back-of-woman-3zgllN5P7Mc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: "rgba(255,255,255,0.6)" }}>Unsplash</a>
          </p>
        </div>

        {/* Right: purple background with text */}
        <div style={{
          flex: "1 1 50%",
          background: "#7c3aed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 48px",
          color: "white",
        }}>
          <p className="hero-tagline" style={{ marginBottom: "24px" }}>Vocea ta contează</p>
          <h1 className="hero-title-large" style={{ fontSize: "52px", lineHeight: 1.15, marginBottom: "24px" }}>
            Rupem Tăcerea
          </h1>
          <p className="hero-subtitle-large" style={{ fontSize: "20px", lineHeight: 1.7, marginBottom: "48px", opacity: 0.95 }}>
            Spune-ți povestea. Te ascultăm, fără judecată.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/share" className="btn btn-white">Împărtășește</Link>
            <Link href="/stories" className="btn btn-outline-white">Citește</Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Un spațiu sigur */}
        <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "26px", marginBottom: "16px", color: "#1f2937" }}>
            Un spațiu sigur pentru tine
          </h2>
          <p style={{ maxWidth: "550px", margin: "0 auto", color: "#6b7280", fontSize: "17px", lineHeight: "1.7" }}>
            Indiferent de rolul pe care l-ai avut sau cât timp a trecut —<br />
            povestea ta are loc aici.
          </p>
        </div>

        {/* Vocea ta are putere */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "24px", textAlign: "center" }}>
            Vocea ta are putere
          </h2>
          <div className="features-grid">
            <div className="feature-card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#7c3aed", letterSpacing: "1px", marginBottom: "12px" }}>01</div>
              <h3>Anonim și sigur</h3>
              <p>Nimeni nu trebuie să știe că ești tu. Poți folosi doar un prenume sau să rămâi complet anonim.</p>
            </div>

            <div className="feature-card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#7c3aed", letterSpacing: "1px", marginBottom: "12px" }}>02</div>
              <h3>Orice poveste contează</h3>
              <p>Nu trebuie să ai o poveste dramatică sau să fii „suficient de afectat". Dacă violența ți-a atins viața — sub orice formă — povestea ta are loc aici.</p>
            </div>

            <div className="feature-card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#7c3aed", letterSpacing: "1px", marginBottom: "12px" }}>03</div>
              <h3>Revizuit cu grijă</h3>
              <p>Fiecare poveste este citită de un moderator înainte de publicare — pentru a păstra un spațiu sigur și respectuos.</p>
            </div>

            <div className="feature-card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#7c3aed", letterSpacing: "1px", marginBottom: "12px" }}>04</div>
              <h3>Despre ce nu vorbim, nu există</h3>
              <p>Fiecare poveste spusă face violența mai puțin invizibilă — și pe cel care o citește mai puțin singur.</p>
            </div>
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
