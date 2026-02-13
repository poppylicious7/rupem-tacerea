import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rupem Tăcerea | Breaking the Silence",
  description: "Un spațiu sigur pentru a împărtăși povești despre violență. Fiecare voce contează.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        {/* Quick Exit Button */}
        <a href="https://www.google.com" className="quick-exit">
          Ieșire rapidă
        </a>

        {/* Navigation */}
        <nav className="nav">
          <div className="nav-content">
            <Link href="/" className="nav-logo">
              Rupem Tăcerea
            </Link>
            <div className="nav-links">
              <Link href="/stories" className="nav-link">Povești</Link>
              <Link href="/share" className="nav-link">Împărtășește</Link>
              <Link href="/resources" className="nav-link">Resurse</Link>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer with resources */}
        <footer className="footer">
          <p>
            <strong>Ai nevoie de ajutor?</strong> Sună la{" "}
            <a href="tel:0800500333" style={{ color: "#7c3aed" }}>0800 500 333</a>{" "}
            (linie gratuită, 24/7)
          </p>
          <p style={{ marginTop: "8px" }}>
            <Link href="/resources" style={{ color: "#7c3aed" }}>
              Vezi toate resursele disponibile
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
