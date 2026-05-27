# ⚡ Neon Syndicate

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat&logo=framer" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Contentful_CMS-3-2477cc?style=flat&logo=contentful" alt="Contentful CMS">
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel" alt="Vercel">
</p>

A cyberpunk esports hub built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.  
The site delivers an immersive, layered visual experience with rotating holographic rings, glassmorphism panels, and a full‑screen scanline overlay.  
All dynamic content is managed headlessly via **Contentful CMS** and updates automatically without redeploying.

---

## 🚀 Live Site

[Neon Syndicate ](https://neon-syndicate-website.vercel.app/) 

---

## 🎯 Core Features

- **Four‑layer depth system** – background grid, animated midground rings, content cards, and a fixed scanline overlay for a true cyberpunk feel
- **Live countdown timer** – hydration‑safe clock counting down to a CMS‑defined Grand Final date
- **Tournament bracket** – quarter‑finals, semis, and finals connected by SVG lines, with winners pulled directly from Contentful
- **Team roster** – player cards showing avatar, name, role, kills, wins, and a calculated K/W ratio
- **News section** – clickable news cards that open a pop‑up with full article text (all managed in Contentful)
- **Authentication modal** – join/sign‑in flow with validation and neon styling
- **Incremental Static Regeneration (ISR)** – content refreshes every 60 seconds, no redeploy needed

---

## 🧠 Contentful CMS Integration

All dynamic sections of the site are powered by Contentful:

| Section | Content Type | Fields Used |
|--------|--------------|--------------|
| **Team Roster** | `player` | name, role, avatar, stats (kills/wins) |
| **Tournament Bracket** | `match` | round, order, teamA, teamB, winner, matchDate, map |
| **Featured Match** | `match` (Final) | matchDate, map, teamA, teamB |
| **Latest News** | `newsArticle` | title, slug, date, excerpt, image |

Every time a content editor publishes changes in Contentful, the live site picks them up within 60 seconds via ISR.

---

## 🧱 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS, custom glass‑morphism utilities
- **Animation:** Framer Motion
- **CMS:** Contentful (content delivery API)
- **Deployment:** Vercel
- **Language:** TypeScript

---

## 📂 Project Structure
├── app/ # Next.js App Router pages & layouts
├── components/ # Reusable UI and section components
│ ├── ui/ # GlassCard, NeonButton, SectionDivider, etc.
│ └── ... # Hero, FeaturedMatch, TeamRoster, etc.
├── lib/ # Contentful client & data‑fetching functions
├── public/ # Static assets
└── styles/ # Global CSS (scanlines, glitch effects)

text

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- A Contentful account with a space and API keys

### Installation

```bash
git clone https://github.com/Yash19-j/neon-syndicate-website
cd neon-syndicate
npm install
Environment Variables
Create a .env.local file in the root:

text
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_token
Run the development server
bash
npm run dev
Open http://localhost:3000 to see the site.

🌐 Deployment
Push the repository to GitHub.

Import the project into Vercel.

Add the same CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables in the Vercel dashboard.

Deploy. The site will rebuild automatically on every push, and content refreshes via ISR.

📝 License & Copyright
© 2026 Neon Syndicate. All rights reserved.

This project is built for educational / portfolio purposes. All player names, team names, and match data are fictional and used solely to demonstrate the integration of a headless CMS with a Next.js frontend.