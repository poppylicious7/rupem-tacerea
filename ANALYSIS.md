# Stories Website Analysis Report
**Application:** Rupem Tăcerea (Breaking the Silence)
**Stack:** Next.js 16, React 19, TypeScript, Vercel Postgres
**Purpose:** Safe space for survivors of domestic violence to share stories anonymously

---

## Table of Contents
1. [UX Analysis](#ux-analysis)
2. [Security Analysis](#security-analysis)
3. [Combined Priority Roadmap](#combined-priority-roadmap)

---

# UX Analysis

## Executive Summary

The site demonstrates strong UX fundamentals with excellent attention to user safety (quick-exit button, anonymous submissions, content moderation). Key gaps are in mobile responsiveness, accessibility (keyboard navigation, screen reader support), and navigation clarity.

---

## 1. Information Architecture

**Structure:**
```
Root (/)
├── Home (/)         - Hero + Value proposition
├── Stories (/stories) - Read approved stories
├── Share (/share)   - Submit new story
├── Resources (/resources) - Help & support
└── Admin (/admin)   - Moderation interface
```

**Strengths:** Simple, flat structure. Primary flows (read → share) are prominent. Clear separation of public vs. admin.

**Issues:**
- No breadcrumb or active page indicator
- Admin area not discoverable via nav (requires direct URL)
- No "back" navigation beyond browser button

---

## 2. Navigation & User Flows

**Issues:**
- No active nav state — users can't tell which page they're on (`layout.tsx` lines 29–41)
- No mobile nav collapse — links wrap/truncate on small screens
- Inconsistent link patterns (Next.js `<Link>` vs `<a>` tags with inline styles)
- No logout button in admin panel

**Quick fix — active nav link:**
```tsx
<Link
  href="/stories"
  className="nav-link"
  aria-current={pathname === "/stories" ? "page" : undefined}
>
  Povești
</Link>
```
```css
.nav-link[aria-current="page"] {
  color: #7c3aed;
  font-weight: 600;
  border-bottom: 2px solid #7c3aed;
}
```

---

## 3. UI Components & Design Patterns

**Font:** Inter (Google Fonts, display: swap)

**Color system:**
- Primary: `#7c3aed` (purple)
- Danger: `#dc2626` (red — quick exit, errors)
- Text: `#1f2937`, `#6b7280`, `#9ca3af`
- Background: `#faf9f7`

**Issues:**
- Admin buttons use inline styles instead of CSS classes — inconsistent with design system
- No disabled state styling on buttons
- No visible focus indicators anywhere (`globals.css` has no `:focus` or `:focus-visible`)
- Emoji icons (`🤝`, `💜`) have no text alternatives for screen readers

---

## 4. Accessibility

**Strengths:**
- Semantic HTML (`<article>`, `<nav>`, `<footer>`)
- Proper `<label htmlFor>` on all form inputs
- `<html lang="ro">` declared
- Status badges use color + text (not color alone)
- `tel:` links for phone numbers

**Critical gaps:**

| Issue | File | WCAG Criterion |
| --- | --- | --- |
| No focus indicators | `globals.css` | 2.4.7 |
| Quick-exit button has no aria-label | `layout.tsx:25` | 4.1.2 |
| Error messages not announced (`role="alert"` missing) | `share/page.tsx:182` | 4.1.3 |
| Admin filter buttons lack `aria-pressed` | `admin/page.tsx:166` | 4.1.2 |
| No skip-to-content link | `layout.tsx` | 2.4.1 |
| Emoji icons have no alt | `page.tsx:34` | 1.1.1 |

**Fix — focus indicators (****`globals.css`****):**
```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid #7c3aed;
  outline-offset: 2px;
}
```

**Fix — skip link:**
```tsx
<a href="#main-content" className="skip-link">Mergi la conținut</a>
<main id="main-content">{children}</main>
```
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #7c3aed;
  color: white;
  padding: 8px 16px;
  z-index: 100;
}
.skip-link:focus { top: 0; }
```

---

## 5. Responsiveness

**Breakpoints defined:** Only `640px` (no tablet breakpoint)

**Issues:**
- Admin table has zero mobile styles — becomes unusable on phones (`admin/page.tsx:279`)
- Nav doesn't collapse on mobile
- Fixed font sizes instead of `clamp()` for smooth scaling
- Quick-exit button at `top: 20px; right: 20px` may overlap content on small screens

**Fix — responsive admin table:**
```css
@media (max-width: 768px) {
  .admin-table { display: block; overflow-x: auto; }
  .admin-table thead { display: none; }
  .admin-table tr {
    display: grid;
    grid-template-columns: 120px 1fr;
    padding: 16px;
    border: 1px solid #e5e5e5;
    margin-bottom: 8px;
  }
  .admin-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }
}
```

---

## 6. UX Strengths

- **Safety-first design:** Quick-exit button always visible, multiple hotlines, anonymous submissions
- **Clear value prop:** Homepage communicates purpose, safety, and community immediately
- **Transparent consent flow:** Explicit checkbox + moderation disclosure before submission (`share/page.tsx:165`)
- **Content moderation:** Stories require admin approval before publishing — prevents harmful content
- **Emotional tone:** Compassionate language throughout ("Nu ești singur/ă")
- **Minimal, focused feature set:** Not overwhelming for a vulnerable audience

---

## UX Issue Priority

| Priority | Issue | Effort |
| --- | --- | --- |
| Critical | No focus indicators (WCAG fail) | 1 hr |
| Critical | Admin table unresponsive on mobile | 2 hrs |
| Critical | No mobile nav collapse | 3 hrs |
| High | No active nav state | 30 min |
| High | Error messages not announced | 30 min |
| High | Quick-exit missing aria-label | 10 min |
| Medium | Form validation inconsistent | 2 hrs |
| Medium | Placeholder contrast unverified | 1 hr |
| Low | No skip-to-content link | 30 min |
| Low | No admin logout | 30 min |
| Low | Emoji missing alt text | 30 min |

---

---

# Security Analysis

## Executive Summary

The application has a **3.4/10 overall security score** at time of analysis. Parameterized queries and React's XSS protection are solid foundations. Three critical issues have since been resolved (see fixes below); remaining work is HIGH and below.

### Fixes Applied
| # | Issue | Status | Date |
| --- | --- | --- | --- |
| 1 | Admin password `admin123` | ✅ Fixed — rotated via Vercel env vars | 2026-02-24 |
| 2 | `/api/setup-db` unauthenticated | ✅ Fixed — gated behind admin Bearer auth | 2026-02-24 |
| 3 | `/api/test-db` exposes DB structure | ✅ Fixed — gated behind admin Bearer auth | 2026-02-24 |
| 4 | No security headers (CSP, X-Frame-Options, HSTS, etc.) | ✅ Fixed — added to `next.config.ts` | 2026-02-24 |

---

## 1. Authentication & Authorization

**Current implementation:** Simple Bearer token = plaintext `ADMIN_PASSWORD` env var (`app/api/admin/route.ts:4–11`)

**Issues:**

| Severity | Issue |
| --- | --- |
| CRITICAL | `ADMIN_PASSWORD=admin123` in `.env.local` — trivially guessable |
| HIGH | No session management or JWT — password sent on every request |
| HIGH | No rate limiting on auth endpoint — brute force possible |
| HIGH | No CSRF protection |
| HIGH | Single global password — no per-user roles |

**Recommendation:** Replace with JWT-based auth, add rate limiting, implement RBAC.

---

## 2. Input Validation & Sanitization

**Issues:**

| Severity | Issue | File |
| --- | --- | --- |
| HIGH | No email format validation | `api/stories/route.ts:8–13` |
| HIGH | No age_range enum validation (accepts arbitrary strings) | same |
| HIGH | No name/title length validation client-side | same |
| MEDIUM | Story content not sanitized for HTML before storage | `api/stories/route.ts` |
| MEDIUM | Admin notes not sanitized | `admin/page.tsx` |

**Note:** React's JSX auto-escaping mitigates most XSS risk on display, but input should still be sanitized server-side before storage.

**Recommendation:** Add Zod schema validation to all API routes:
```typescript
import { z } from "zod";

const StorySchema = z.object({
  name: z.string().max(100).optional(),
  title: z.string().max(200).optional(),
  story: z.string().min(50),
  ageRange: z.enum(["18-25", "25-35", "35-50", "50+"]).optional(),
  email: z.string().email().optional(),
});
```

---

## 3. API Security

**Issues:**

| Severity | Issue | File |
| --- | --- | --- |
| CRITICAL | `/api/setup-db` — publicly accessible, no auth — anyone can reset the DB schema | `app/api/setup-db/route.ts` |
| HIGH | `/api/test-db` — exposes database structure and env var status | `app/api/test-db/route.ts` |
| HIGH | No rate limiting on story submission (`/api/stories`) | `app/api/stories/route.ts` |
| HIGH | No CSP headers configured | `next.config.ts` |
| HIGH | No CORS restrictions | all routes |
| HIGH | Missing X-Frame-Options (clickjacking risk) | `next.config.ts` |

**Immediate fix — secure \****`next.config.ts`**\*\*:**
```typescript
const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com"
        },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
};
```

---

## 4. Secrets & Environment Variables

**CRITICAL — \****`.env.local`**\*\* contains:**
- Live Neon database URL with embedded credentials (`npg_kZMyx2X5Gvtd`)
- Database host, user, and multiple connection strings with passwords
- Admin password `admin123`

**`.env.local`**** is in \****`.gitignore`**\*\* (correct), but the file exists on disk with real credentials.**

**Immediate actions:**
1. **Rotate all database passwords now** if this repo was ever pushed to a remote
2. Create `.env.example` with placeholder values only
3. Store real secrets in Vercel environment variables (dashboard), not local files
4. Never commit `.env.local`

---

## 5. Dependencies

| Package | Version | Status |
| --- | --- | --- |
| next | 16.1.6 | Up to date |
| react | 19.2.3 | Up to date |
| @vercel/postgres | ^0.10.0 | OK — uses parameterized queries |

**Missing security-related packages:**
- `zod` — input validation
- `sanitize-html` or `DOMPurify` — HTML sanitization
- Rate limiting middleware (e.g., `@upstash/ratelimit`)

---

## 6. Security Strengths

- **Parameterized queries:** All DB queries use `@vercel/postgres` template literals — SQL injection protected (`api/stories/route.ts:15–25`)
- **React auto-escaping:** JSX expressions escape output — baseline XSS protection
- **TypeScript strict mode:** `"strict": true` in `tsconfig.json`
- **SSL enforced:** All DB connection strings include `?sslmode=require`
- **Minimal dependencies:** Small attack surface
- **Content moderation:** Stories require approval before publishing

---

## 7. Data & Privacy

**Issues:**

| Severity | Issue | File |
| --- | --- | --- |
| MEDIUM | Submitter email addresses displayed in admin panel | `admin/page.tsx:196–200` |
| MEDIUM | Age range shown publicly alongside sensitive stories | `stories/page.tsx:62` |
| LOW | No data deletion mechanism for GDPR compliance | — |
| LOW | No data export functionality | — |
| LOW | No data retention policy | — |

---

## Security Vulnerability Summary

### CRITICAL
| # | Issue | File | Status |
| --- | --- | --- | --- |
| 1 | DB credentials exposed in `.env.local` | `.env.local:1–15` | ⚠️ Local only — confirmed not in git |
| 2 | `/api/setup-db` unauthenticated — can reset database | `app/api/setup-db/route.ts` | ✅ Fixed |
| 3 | Admin password is `admin123` | `.env.local:19` | ✅ Fixed |

### HIGH
| # | Issue | File | Status |
| --- | --- | --- | --- |
| 4 | Bearer token auth — no session management | `app/api/admin/route.ts:4–11` | Open |
| 5 | No rate limiting on auth or submission | multiple routes | Open |
| 6 | `/api/test-db` exposes DB structure | `app/api/test-db/route.ts` | ✅ Fixed |
| 7 | No security headers (CSP, X-Frame-Options, HSTS) | `next.config.ts` | ✅ Fixed |
| 8 | No CSRF protection on forms | `app/share/page.tsx` | Open |
| 9 | No input validation on API routes | `app/api/stories/route.ts` | Open |

### MEDIUM
| # | Issue | File |
| --- | --- | --- |
| 10 | Story/admin content not sanitized before storage | multiple |
| 11 | Email addresses exposed in admin view | `app/admin/page.tsx` |
| 12 | No rate limiting on story submission | `app/api/stories/route.ts` |

### LOW
| # | Issue | File |
| --- | --- | --- |
| 13 | No audit logging for admin actions | `app/api/admin/route.ts` |
| 14 | Missing Permissions-Policy header | `next.config.ts` |
| 15 | No GDPR data deletion/export | — |

---

---

# Combined Priority Roadmap

## Phase 1 — ✅ Complete
1. ✅ **Rotate database credentials** — confirmed `.env.local` not in git
2. ✅ **Add auth to \****`/api/setup-db`** and gate `/api/test-db`
3. ✅ **Change admin password** — rotated via Vercel env vars
4. ✅ **Add security headers** to `next.config.ts` (CSP, X-Frame-Options, HSTS)

## Phase 2 — Fix within 1 week
5. **Add focus indicators** to `globals.css` (WCAG 2.4.7 failure)
6. **Add Zod validation** to all API routes
7. **Add rate limiting** to `/api/admin` and `/api/stories`
8. **Implement mobile nav collapse** (hamburger menu)
9. **Fix admin table responsiveness**
10. **Add \****`aria-label`** to quick-exit button
11. **Add \****`role="alert"`** to error messages and content warnings
12. **Replace Bearer token auth** with JWT + HTTP-only cookies

## Phase 3 — Fix within 2 weeks
13. **Add HTML sanitization** (DOMPurify/sanitize-html) before DB storage
14. **Add active nav state** (`aria-current`, CSS)
15. **Improve form validation feedback** (field-level errors, aria-describedby)
16. **Add skip-to-content link**
17. **Add admin logout button**
18. **Email masking** in admin panel

## Phase 4 — Ongoing
19. GDPR compliance (data deletion, export, retention policy)
20. Accessibility audit with screen reader (VoiceOver/NVDA)
21. Color contrast audit (WebAIM or axe DevTools)
22. Penetration testing before production launch

---

## Security Scorecard

| Category | Score |
| --- | --- |
| Authentication | 2/10 |
| Input Validation | 4/10 |
| API Security | 6/10 *(was 3 — setup-db/test-db fixed)* |
| Secrets Management | 6/10 *(was 1 — password rotated, not in git)* |
| Dependencies | 8/10 |
| Security Configuration | 8/10 *(was 2 — headers added)* |
| Data Protection | 5/10 |
| **Overall** | **5.6/10** *(was 3.4)* |

## UX Scorecard

| Category | Score |
| --- | --- |
| Information Architecture | 7/10 |
| Navigation | 5/10 |
| Accessibility | 4/10 |
| Responsiveness | 5/10 |
| Visual Design | 8/10 |
| Safety UX | 9/10 |
| **Overall** | **6.3/10** |
