export default function ResourcesPage() {
  return (
    <div className="container">
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Resurse și ajutor</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Dacă tu sau cineva cunoscut trece prin violență domestică, există ajutor disponibil.
      </p>

      <div className="story-card" style={{ borderLeft: "4px solid #dc2626", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", color: "#dc2626", marginBottom: "12px" }}>
          În caz de urgență
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "8px" }}>
          <strong>112</strong> - Număr unic de urgență
        </p>
        <p style={{ color: "#6b7280" }}>
          Dacă ești în pericol imediat, sună la 112.
        </p>
      </div>

      <div className="story-card">
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Linii telefonice de ajutor</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="tel:0800500333" style={{ color: "#7c3aed" }}>0800 500 333</a>
          </h3>
          <p style={{ fontWeight: "600", marginBottom: "4px" }}>Telefonul Sufletului</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Linie gratuită, disponibilă 24/7. Suport pentru victime ale violenței domestice.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="tel:0216106" style={{ color: "#7c3aed" }}>021 610 6</a>
          </h3>
          <p style={{ fontWeight: "600", marginBottom: "4px" }}>Linia Verde ANES</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Agenția Națională pentru Egalitatea de Șanse între Femei și Bărbați.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="tel:116111" style={{ color: "#7c3aed" }}>116 111</a>
          </h3>
          <p style={{ fontWeight: "600", marginBottom: "4px" }}>Telefonul Copilului</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Pentru copii și adolescenți care au nevoie de ajutor.
          </p>
        </div>
      </div>

      <div className="story-card">
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Organizații de sprijin</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="https://www.anais.ro" target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed" }}>
              Asociația ANAIS
            </a>
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Servicii de consiliere, adăpost și asistență juridică pentru victime.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="https://www.sensi-blu.ro" target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed" }}>
              Fundația Sensi Blu
            </a>
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Centre de primire în regim de urgență pentru victime ale violenței domestice.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
            <a href="https://www.cpedm.ro" target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed" }}>
              CPE - Centrul Parteneriat pentru Egalitate
            </a>
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Programe de suport și advocacy pentru drepturile femeilor.
          </p>
        </div>
      </div>

      <div className="story-card">
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Ce poți face</h2>

        <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Dacă ești victimă:</h3>
        <ul style={{ marginLeft: "20px", marginBottom: "20px", color: "#374151" }}>
          <li>Nu ești singură/singur și nu este vina ta</li>
          <li>Pregătește un plan de siguranță</li>
          <li>Păstrează documente importante într-un loc sigur</li>
          <li>Spune cuiva în care ai încredere ce se întâmplă</li>
          <li>Contactează o organizație de sprijin pentru consiliere</li>
        </ul>

        <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Dacă cunoști o victimă:</h3>
        <ul style={{ marginLeft: "20px", color: "#374151" }}>
          <li>Ascultă fără să judeci</li>
          <li>Crede ce îți spune</li>
          <li>Oferă sprijin, nu soluții forțate</li>
          <li>Respectă deciziile persoanei</li>
          <li>Ajută cu informații despre resurse disponibile</li>
        </ul>
      </div>

      <div className="content-warning" style={{ marginTop: "32px" }}>
        <strong>Siguranța ta online:</strong> Dacă îți faci griji că cineva îți verifică
        activitatea online, poți folosi butonul &quot;Ieșire rapidă&quot; din colțul din dreapta sus
        pentru a părăsi rapid acest site.
      </div>
    </div>
  );
}
