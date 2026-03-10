import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
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
      <body className={`${poppins.variable} ${inter.variable}`}>
        {/* Quick Exit Button */}
        <a href="https://www.google.com" className="quick-exit" aria-label="Ieșire rapidă — părăsește acest site imediat">
          Ieșire rapidă
        </a>

        {/* Navigation */}
        <nav className="nav" style={{ height: "60px", display: "flex", alignItems: "center", background: "#8f1eae" }}>
          <div className="nav-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 160px 0 40px" }}>
            <Link href="/" className="nav-logo">
              Rupem Tăcerea
            </Link>
            <div className="nav-links" style={{ marginRight: "140px" }}>
              <Link href="/share" className="nav-link">Împărtășește</Link>
              <Link href="/stories" className="nav-link">Experiențe</Link>
              <Link href="/resources" className="nav-link">Resurse</Link>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer with resources */}
        <footer className="footer">
          <p>
            <strong>Ai nevoie de ajutor?</strong> Sună la{" "}
            <a href="tel:0800500333" style={{ color: "#8f1eae" }}>0800 500 333</a>{" "}
            (linie gratuită, 24/7)
          </p>
          <p style={{ marginTop: "8px" }}>
            <Link href="/resources" style={{ color: "#8f1eae" }}>
              Vezi toate resursele disponibile
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
