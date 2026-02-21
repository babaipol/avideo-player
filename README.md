# I-PAC — Indian Political Action Committee

A modern Next.js 15 website for the Indian Political Action Committee (I-PAC), India's foremost data-driven political consulting firm.

## Tech Stack

- **Next.js 15** — App Router, Server Components, TypeScript
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **next-themes** — Dark/light mode
- **react-icons** — Icon library
- **react-intersection-observer** — Scroll-triggered animations

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── careers/
│   ├── contact/
│   ├── driving-force/
│   ├── media/
│   ├── our-impact/
│   ├── our-work/
│   └── page.tsx            # Homepage
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── data/                   # Static data files
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
├── providers/              # Context providers
└── types/                  # TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- 🎨 Modern dark UI with glassmorphic design
- 🗺️ Interactive India map with campaign presence
- 📊 Animated impact statistics
- 🎠 Campaign carousel with smooth transitions
- 📱 Fully responsive design
- ♿ WCAG 2.1 accessible
- 🌙 Dark/light mode toggle
- ⚡ Optimized for performance
- 🔍 SEO-ready with metadata
