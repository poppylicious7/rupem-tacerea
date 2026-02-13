import { sql } from "@vercel/postgres";
import Link from "next/link";

interface Story {
  id: string;
  name: string;
  title: string | null;
  story: string;
  age_range: string | null;
  created_at: string;
}

async function getApprovedStories(): Promise<Story[]> {
  try {
    const result = await sql`
      SELECT id, name, title, story, age_range, created_at
      FROM stories
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `;
    return result.rows as Story[];
  } catch {
    return [];
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function StoriesPage() {
  const stories = await getApprovedStories();

  return (
    <div className="container">
      <div className="content-warning">
        <strong>Avertisment privind conținutul:</strong> Poveștile de mai jos conțin
        descrieri ale violenței care pot fi tulburătoare pentru unii cititori.
        Dacă ai nevoie de sprijin, consultă <Link href="/resources" style={{ color: "#92400e", textDecoration: "underline" }}>pagina de resurse</Link>.
      </div>

      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Povești</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Experiențe reale împărtășite de persoane care au rupt tăcerea.
      </p>

      {stories.length === 0 ? (
        <div className="story-card" style={{ textAlign: "center" }}>
          <p style={{ color: "#6b7280" }}>
            Nu există povești publicate încă.
          </p>
          <Link href="/share" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Fii primul care împărtășește
          </Link>
        </div>
      ) : (
        stories.map((story) => (
          <article key={story.id} className="story-card">
            {story.title && (
              <h2 className="story-title">{story.title}</h2>
            )}
            <div className="story-content">{story.story}</div>
            <div className="story-signature">
              — {story.name}{story.age_range && `, ${story.age_range}`}
            </div>
          </article>
        ))
      )}

      <div className="resources-box" style={{ marginTop: "48px" }}>
        <h3>Vrei să împărtășești povestea ta?</h3>
        <p style={{ marginBottom: "16px" }}>
          Povestea ta poate ajuta pe altcineva să nu se simtă singur.
        </p>
        <Link href="/share" className="btn btn-primary">
          Împărtășește povestea ta
        </Link>
      </div>
    </div>
  );
}
