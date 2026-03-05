"use client";

import { useState } from "react";
import Link from "next/link";

export default function SharePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [consentPublic, setConsentPublic] = useState(false);
  const [consentOwnership, setConsentOwnership] = useState(false);
  const [consentEditing, setConsentEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Anonim",
          title,
          story,
          ageRange: age,
          email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || "A apărut o eroare. Te rugăm să încerci din nou.");
      }
    } catch {
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: "60px" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>💜</div>
        <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>Mulțumim</h1>
        <p style={{ color: "#6b7280", maxWidth: "500px", margin: "0 auto 32px" }}>
          Povestea ta a fost trimisă și va fi revizuită de un moderator.
          Dacă este aprobată, va apărea pe pagina de povești.
        </p>
        <Link href="/stories" className="btn btn-primary">
          Vezi poveștile publicate
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Împărtășește povestea ta</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px", lineHeight: 2 }}>
        Povestea ta poate ajuta pe altcineva să nu se simtă singur.<br />
        În același timp, studiile arată că împărtășirea poveștii personale poate aduce o eliberare sufletească și o descărcare.<br />
        Poți alege să apari cu prenumele tău sau să rămâi anonim.
      </p>

      <div className="story-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Cum vrei să apari? (opțional)
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Prenume sau lasă gol pentru Anonim"
            />
            <p className="form-hint">
              Ex: Maria, Ana, sau lasă gol pentru a apărea ca &quot;Anonim&quot;
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Titlu (opțional)
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Am învățat să fiu puternică"
              maxLength={200}
            />
            <p className="form-hint">
              Un titlu scurt care să rezume povestea ta.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="story" className="form-label">
              Povestea ta *
            </label>
            <textarea
              id="story"
              className="form-input form-textarea"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Scrie povestea ta aici..."
              required
            />
            <p className="form-hint">
              Scrie cât de mult sau cât de puțin dorești. Nu include informații
              care te pot identifica (adrese, nume complete, etc.)
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Vârsta ta (opțional)
            </label>
            <input
              type="number"
              id="age"
              className="form-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ex: 25"
              min="1"
              max="120"
              style={{ maxWidth: "120px" }}
            />
            <p className="form-hint">
              Vârsta va apărea lângă nume, ex: &quot;Maria, 33&quot;
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email (opțional)
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doar dacă vrei să revizuiești editările"
            />
            <p className="form-hint">
              Dacă lași emailul, te vom contacta pentru a aproba eventualele
              corecții minore înainte de publicare.
            </p>
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", marginBottom: "12px" }}>
              <input
                type="checkbox"
                checked={consentPublic}
                onChange={(e) => setConsentPublic(e.target.checked)}
                style={{ marginTop: "4px", flexShrink: 0 }}
              />
              <span style={{ fontSize: "14px", color: "#374151" }}>
                Înțeleg că povestea mea va fi publicată public pe acest site.
              </span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", marginBottom: "12px" }}>
              <input
                type="checkbox"
                checked={consentOwnership}
                onChange={(e) => setConsentOwnership(e.target.checked)}
                style={{ marginTop: "4px", flexShrink: 0 }}
              />
              <span style={{ fontSize: "14px", color: "#374151" }}>
                Confirm că aceasta este povestea mea — perspectiva mea personală despre cum violența mi-a afectat
                viața, indiferent de rolul pe care l-am avut (victimă, martor, persoană apropiată). Nu îmi asum
                dreptul de a spune povestea altcuiva în locul lui.
              </span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={consentEditing}
                onChange={(e) => setConsentEditing(e.target.checked)}
                style={{ marginTop: "4px", flexShrink: 0 }}
              />
              <span style={{ fontSize: "14px", color: "#374151" }}>
                Sunt de acord ca moderatorii să facă corecții minore de ortografie sau claritate,
                fără a schimba sensul poveștii mele.
              </span>
            </label>
          </div>

          {error && (
            <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !consentPublic || !consentOwnership || !consentEditing}
            style={{ width: "100%" }}
          >
            {isSubmitting ? "Se trimite..." : "Trimite povestea"}
          </button>
        </form>
      </div>

      <div className="resources-box">
        <h3>Ai nevoie de ajutor?</h3>
        <p>
          Dacă ești în pericol sau ai nevoie de sprijin,
          consultă <Link href="/resources" style={{ color: "#7c3aed" }}>pagina de resurse</Link> sau
          sună la <a href="tel:0800500333" style={{ color: "#7c3aed" }}>0800 500 333</a>.
        </p>
      </div>
    </div>
  );
}
