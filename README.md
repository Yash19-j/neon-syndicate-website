# ⚡ Neon Syndicate

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat&logo=framer" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Contentful_CMS-3-2477cc?style=flat&logo=contentful" alt="Contentful CMS">
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel" alt="Vercel">
</p>

> A cyberpunk esports hub built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion** — fully CMS-driven, ISR-powered, layered with holographic rings, glassmorphism panels, and scanline overlays.

Four visual layers, live tournament data, team rosters, news pop-ups, and a real-time countdown to the Grand Final — all editable in Contentful, all updating live without a redeploy.

---

## 🌐 Live Demo

🔗 **[Neon-Syndicate](https://neon-syndicate-website.vercel.app/)**

---

## 🎯 Features

- **Four-layer depth system** — background grid → animated midground rings → glass content cards → fixed scanline overlay, producing a genuine cyberpunk parallax feel.
- **Live countdown timer** — hydration-safe clock ticking down to a CMS-defined Grand Final date.
- **Tournament bracket** — quarter-finals, semis, and finals connected by SVG lines, with winners pulled live from Contentful.
- **Team roster** — player cards with avatar, role, kills, wins, and an auto-calculated **K/W ratio**.
- **News pop-ups** — clickable news cards that open a modal with the full article body, all editable in the CMS.
- **Authentication modal** — join / sign-in flow with validation and neon styling.
- **Incremental Static Regeneration (ISR)** — content refreshes every 60 seconds, zero redeploys.

---

## 🧠 Contentful CMS Integration

Every dynamic section is powered headlessly by Contentful — editors publish, the live site picks the change up within 60 seconds via ISR.

| Section              | Content Type        | Fields Used                                          |
|----------------------|---------------------|------------------------------------------------------|
| **Team Roster**      | `player`            | name, role, avatar, kills, wins                      |
| **Tournament Bracket** | `match`           | round, order, teamA, teamB, winner, matchDate, map   |
| **Featured Match**   | `match` (Final)     | matchDate, map, teamA, teamB                         |
| **Latest News**      | `newsArticle`       | title, slug, date, excerpt, image                    |

---

## 🏗️ Data Flow

```
   Contentful CMS
         │
         ▼
   lib/contentful.ts  ──►  data fetchers (typed)
         │
         ▼
   Next.js App Router  ──►  ISR (revalidate: 60s)
         │
         ▼
   React Components  ──►  Framer Motion animations
         │
         ▼
   Vercel Edge  ──►  Browser
```

---

## 🧰 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom glassmorphism utilities
- **Animation:** Framer Motion
- **CMS:** Contentful (Content Delivery API)
- **Rendering:** Incremental Static Regeneration (60s revalidation)
- **Hosting:** Vercel

---

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages & layouts
├── components/
│   ├── ui/                 # GlassCard, NeonButton, SectionDivider, etc.
│   └── ...                 # Hero, FeaturedMatch, TeamRoster, etc.
├── lib/                    # Contentful client & data-fetching functions
├── public/                 # Static assets
└── styles/                 # Global CSS (scanlines, glitch effects)
```

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- A Contentful account with a space and API keys

### Setup

```bash
# Clone the repo
git clone https://github.com/Yash19-j/neon-syndicate-website.git
cd neon-syndicate-website

# Install dependencies
npm install
```

Create a `.env.local` file in the project root:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_token
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

The site is deployed on **Vercel**. To replicate:

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` to the Vercel environment variables.
4. Deploy. Every push rebuilds the site, and every CMS edit refreshes via ISR within 60 seconds — no manual redeploys needed.

---

## 🛣️ Roadmap

- Live match-day countdown notifications (web push).
- Player profile pages with full match history.
- Public API for tournament standings.
- Admin-side preview mode for unpublished Contentful entries.
- Audio layer — ambient synthwave loop with mute toggle.

---

## 📝 Project Status

This is a **portfolio project** built to demonstrate headless CMS integration, advanced Next.js 14 patterns (App Router + ISR), and high-impact cyberpunk frontend design. All player names, team names, and match data are fictional.

---

## 👤 Author

**Yash Jindal**

- LinkedIn: [YashJindal19](https://www.linkedin.com/in/yashjindal19/)
- Email: [jindal198yjbj@gmail.com](mailto:jindal198yjbj@gmail.com)
- GitHub: [@Yash19-j](https://github.com/Yash19-j)

---

## 📄 License

**Copyright © 2026 Yash Jindal. All Rights Reserved.**

Neon Syndicate is the proprietary work of Yash Jindal. No part of this codebase may be copied, modified, distributed, sublicensed, or used in any form — commercial or non-commercial — without prior written permission from the copyright holder.

All player names, team names, and match data are fictional and used purely to demonstrate headless CMS integration with a Next.js frontend.

For licensing inquiries, contact: **jindal198yjbj@gmail.com**