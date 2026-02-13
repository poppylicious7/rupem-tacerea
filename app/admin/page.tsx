"use client";

import { useState, useEffect } from "react";

interface Story {
  id: string;
  name: string;
  title: string | null;
  story: string;
  age_range: string | null;
  email: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState("pending");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStory, setEditedStory] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin?status=${filter}`, {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStories(data.stories);
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        setError("Sesiune expirată. Te rugăm să te autentifici din nou.");
      }
    } catch {
      setError("Nu s-au putut încărca poveștile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchStories();
    }
  }, [isLoggedIn, filter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`/api/admin?status=pending`, {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (response.ok) {
      setIsLoggedIn(true);
    } else {
      setError("Parolă incorectă");
    }
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setEditedTitle(story.title || "");
    setEditedStory(story.story);
    setAdminNotes(story.admin_notes || "");
  };

  const handleUpdateStory = async (newStatus?: string) => {
    if (!selectedStory) return;

    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          id: selectedStory.id,
          title: editedTitle,
          story: editedStory,
          status: newStatus || selectedStory.status,
          adminNotes,
        }),
      });

      if (response.ok) {
        setSelectedStory(null);
        fetchStories();
      } else {
        setError("Nu s-a putut actualiza povestea.");
      }
    } catch {
      setError("A apărut o eroare.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedStory || !confirm("Sigur vrei să ștergi această poveste?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin?id=${selectedStory.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });

      if (response.ok) {
        setSelectedStory(null);
        fetchStories();
      }
    } catch {
      setError("Nu s-a putut șterge povestea.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ maxWidth: "400px", paddingTop: "60px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "24px", textAlign: "center" }}>
          Admin
        </h1>
        <div className="story-card">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Parolă</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Autentifică-te
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px" }}>Admin - Povești</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          {["pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn ${filter === s ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "8px 16px", fontSize: "14px" }}
            >
              {s === "pending" ? "În așteptare" : s === "approved" ? "Aprobate" : "Respinse"}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</p>}

      {selectedStory ? (
        <div className="story-card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px" }}>Editare poveste</h2>
            <button
              onClick={() => setSelectedStory(null)}
              className="btn btn-secondary"
              style={{ padding: "6px 12px", fontSize: "14px" }}
            >
              Înapoi
            </button>
          </div>

          <div className="story-meta" style={{ marginBottom: "16px" }}>
            <strong>{selectedStory.name}{selectedStory.age_range && `, ${selectedStory.age_range}`}</strong>
            {selectedStory.email && (
              <span style={{ display: "block", marginTop: "4px" }}>
                Email: {selectedStory.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Titlu</label>
            <input
              type="text"
              className="form-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Titlu (opțional)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Poveste</label>
            <textarea
              className="form-input form-textarea"
              value={editedStory}
              onChange={(e) => setEditedStory(e.target.value)}
              style={{ minHeight: "300px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Note admin (nu se publică)</label>
            <textarea
              className="form-input"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Primary actions */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <button
              onClick={() => handleUpdateStory("approved")}
              className="btn btn-success"
              disabled={loading}
            >
              Publică
            </button>
            <button
              onClick={() => handleUpdateStory()}
              className="btn btn-primary"
              disabled={loading}
            >
              Salvează modificările
            </button>
          </div>

          {/* Secondary actions */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={() => handleUpdateStory("rejected")}
              className="btn-text"
              disabled={loading}
            >
              Respinge
            </button>
            <button
              onClick={handleDelete}
              className="btn-text btn-text-danger"
              disabled={loading}
            >
              Șterge
            </button>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <p>Se încarcă...</p>
          ) : stories.length === 0 ? (
            <div className="story-card" style={{ textAlign: "center" }}>
              <p style={{ color: "#6b7280" }}>Nu există povești în această categorie.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>Titlu / Preview</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story.id}>
                    <td>{story.name}{story.age_range && `, ${story.age_range}`}</td>
                    <td style={{ maxWidth: "300px" }}>
                      {story.title ? <strong>{story.title}</strong> : story.story.substring(0, 80) + "..."}
                    </td>
                    <td>{new Date(story.created_at).toLocaleDateString("ro-RO")}</td>
                    <td>
                      <span className={`status-badge status-${story.status}`}>
                        {story.status === "pending" ? "În așteptare" :
                          story.status === "approved" ? "Aprobată" : "Respinsă"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleSelectStory(story)}
                        className="btn btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "14px" }}
                      >
                        Editează
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
