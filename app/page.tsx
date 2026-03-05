import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Split hero */}
      <section className="hero-split">
        <div className="hero-split-image">
          <Image
            src="/Hero-stories.jpg"
            alt="Persoană cu mesajul 'Love Shouldn't Hurt' scris pe spate — imagine simbolică pentru campania împotriva violenței domestice"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Purple overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(143, 30, 174, 0.35)", borderRadius: "inherit" }} />
          {/* Photo credit */}
          <p style={{ position: "absolute", bottom: "10px", left: "12px", fontSize: "11px", color: "rgba(255,255,255,0.6)", zIndex: 1 }}>
            Photo by{" "}
            <a href="https://unsplash.com/@slphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: "rgba(255,255,255,0.6)" }}>
              Sydney Latham
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/love-shouldnt-hurt-printed-on-back-of-woman-3zgllN5P7Mc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: "rgba(255,255,255,0.6)" }}>
              Unsplash
            </a>
          </p>
        </div>

        <div className="hero-split-text">
          <p className="hero-tagline">Vocea ta contează</p>
          <h1 className="hero-title-large">Rupem Tăcerea</h1>
          <p className="hero-subtitle-large" style={{ marginBottom: "40px" }}>
            Spune-ți povestea. Te ascultăm, fără judecată.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/share" className="btn btn-primary">Împărtășește</Link>
            <Link href="/stories" className="btn btn-outline">Citește</Link>
          </div>
        </div>
      </section>

      {/* Un spațiu sigur */}
      <section className="safe-space-section">
        <div className="safe-space-inner">
          <div className="safe-space-image">
            <Image
              src="/Hero-stories.jpg"
              alt="Două persoane discutând — imagine simbolică pentru suport și înțelegere"
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
          <div className="safe-space-text">
            <h2>Un spațiu sigur pentru tine</h2>
            <p>
              Violența prosperă în tăcere. Indiferent cât timp a trecut,
              aici, povestea ta este ascultată și respectată.
              Nu ești singur și nu ești tu de vină pentru ce ți s-a întâmplat.
            </p>
          </div>
        </div>
      </section>

      {/* Vocea ta are putere */}
      <section className="power-section">
        <div className="power-inner">
          <div className="power-left">
            <h2>Vocea ta are putere</h2>
            <p>
              Fiecare poveste publicată aici a aparținut cuiva care a ales să vorbească.
              Dacă te gândești să o faci, iată ce trebuie să știi.
            </p>
            <p>
              Rupem Tăcerea nu e terapie. Dar poate avea efect terapeutic.
            </p>
          </div>

          <div className="power-cards">
            <div className="power-card power-card-purple">
              <span className="card-num">01</span>
              <h3>Anonim și sigur</h3>
              <p>Folosește doar prenumele sau rămâi complet anonim. E decizia ta.</p>
            </div>

            <div className="power-card power-card-lilac">
              <span className="card-num">02</span>
              <h3>Orice poveste contează</h3>
              <p>Nu există un prag de suferință pentru a conta. Dacă te-a marcat, merită spus.</p>
            </div>

            <div className="power-card power-card-light">
              <span className="card-num" style={{ color: "var(--purple)" }}>03</span>
              <h3>Revizuit cu grijă</h3>
              <p>Un moderator citește fiecare poveste pentru a păstra un spațiu sigur.</p>
            </div>

            <div className="power-card power-card-purple">
              <span className="card-num">04</span>
              <h3>Despre ce nu vorbim, nu există</h3>
              <p>Fiecare poveste publicată îi spune cuiva: și eu am trecut prin asta.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: "0" }}>
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
