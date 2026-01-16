# BlogForge

BlogForge is a static frontend project for a content-driven media platform, focused on modular architecture, progressive enhancement, and performance-aware UX without frameworks.

🔗 Live demo: https://den-dev-web.github.io/blogforge/

---

## 📌 About the Project

BlogForge simulates a modern blog / media platform with article listings, individual article pages, filtering, localization, and theme switching.  
The project demonstrates how a **scalable, content-oriented frontend** can be built using native web technologies and a structured architecture, while remaining fully compatible with static hosting.

---

## ⚙️ Tech Stack

- **HTML5** — semantic markup, accessibility considerations, meta and Open Graph tags  
- **CSS3** — modular stylesheet architecture  
  - `styles/settings`
  - `elements`
  - `objects`
  - `components`
  - `utilities`
  - CSS custom properties and responsive layout
- **JavaScript (ES Modules)** — modular architecture (`scripts/modules/*`), initialized via `app.js`  
- **Data** — static JSON content source (`articles.json`)  
- **Media** — local images and videos stored in `assets/`

---

## 🧩 Architecture & Development Approach

- Domain-driven modular JavaScript structure:
  - `catalog` — article list rendering
  - `article-page` — single article logic
  - `filters-bar` — filtering and navigation
  - `i18n` — localization handling
  - `theme` — theme switching logic
  - `forms` — UI-only form interactions
- Progressive enhancement:
  - base content renders without JavaScript
  - interactive features are enabled only when relevant DOM elements are present
- Data handling:
  - loading content from `articles.json`
  - simple caching strategy
  - safe fallbacks for missing data
- Localization:
  - `data-i18n` attributes
  - language switching without page reload
- UX and performance considerations:
  - lazy-loaded images
  - skeleton screens for loading states
  - incremental content loading

---

## ✨ Key Features

- Article catalog with filtering
- Individual article pages
- Localization support with language switching
- Theme toggle
- Skeleton loaders for content loading
- Responsive and accessible layout
- Media-rich content presentation

---

## 🎯 What This Project Demonstrates

- Ability to design content-heavy frontend architectures without frameworks
- Clean separation of concerns in JavaScript modules
- Strong understanding of semantic HTML and accessibility
- Performance-conscious UI decisions for static sites
- Scalable structure suitable for blogs and media platforms

---

## 🧪 Local Development

Due to the use of `fetch` for loading JSON data, the project must be served via a local static server.

Example options:

```bash
python -m http.server
