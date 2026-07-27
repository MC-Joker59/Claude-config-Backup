---
name: project-test-apps
description: "Test Apps Creation folder — static HTML web apps, no build tools"
metadata: 
  node_type: memory
  type: project
  originSessionId: 52d990ba-e6f4-4f81-92c9-ffcbb4c3a202
---

Project folder: `C:\Users\PaulMARTINCHAN\Documents\Absis Conseil\Test Apps Creation\`

Apps created so far:
- `Mini-CRM\crm.html` — CRM app with modals, toasts, localStorage
- `Habit-Tracker\index.html` — habit tracker with streaks, Chart.js, localStorage
- `carnet-ordre-benchmark\` — multi-page benchmark web app (6 HTML pages + css/js/data), same socle as agrica-benchmark; subject: OMS carnet d'ordres; data to be filled at prompt 3

**Why:** User builds quick standalone tools for Absis Conseil work without any server or build toolchain.

**How to apply:** All new apps go in this folder as single `.html` files or multi-page folders. No npm, no bundler, no backend. Use CDN libraries (e.g. Chart.js from CDN) when external dependencies are needed. Persist data with localStorage. Multi-page benchmarks reuse the agrica-benchmark socle (Tailwind CDN + Playfair Display + Inter + custom CSS design system).

[[project-agrica-benchmark]]

[[user-stack-preference]]
