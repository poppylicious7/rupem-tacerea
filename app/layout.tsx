import type { Metadata } from "next";
import { Poppins, Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
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
      <body className={`${poppins.variable} ${beVietnam.variable}`}>
        {/* Quick Exit Button */}
        <a href="https://www.google.com" className="quick-exit" aria-label="Ieșire rapidă — părăsește acest site imediat">
          Ieșire rapidă
        </a>

        {/* Navigation */}
        <nav className="nav">
          <div className="nav-content">
            <Link href="/" className="nav-logo">
              Rupem Tăcerea
            </Link>
            <div className="nav-links">
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
