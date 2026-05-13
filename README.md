# 🚀 Senior SWE Interview Command Center

A personal interview prep hub for senior software engineers targeting top tech companies. Built with React + Vite.

![App Preview](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)

---

## ✨ Features

### 📋 Interview Strategy
An 8-week, 4-phase prep plan tailored for senior backend engineers:
- **Phase 1 – DSA Mastery** (Weeks 1–4): LeetCode patterns, NeetCode 150, timed practice
- **Phase 2 – System Design** (Weeks 3–6): Distributed systems, databases, caching, queues
- **Phase 3 – Behavioral** (Weeks 5–7): STAR stories, company-specific values
- **Phase 4 – Company-Specific Prep** (Weeks 6–8): Tier-based application sequencing

### 📊 Application Tracker
Track all 107 companies from the target company list:
- Pre-loaded with all tiers: S+, S, S-, A++, A+, A, A-, B+, B, B-
- Status tracking: Not Applied → Applied → OA/Screen → Technical → Onsite → Offer/Rejected
- Filter by tier, status, or search by name, notes, next action, and rounds
- Add custom companies
- Notes, applied date, follow-up date, next action, job link, and interview rounds per company
- Import and export tracker data as CSV
- Reset tracker data to the default company list

### 🌍 Europe Roles
Curated senior SWE target companies with European offices across London, Dublin, Amsterdam, Stockholm, and Lisbon.

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Vanilla CSS** — component-scoped structure without an external UI library

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/swe-interview-hub.git
cd swe-interview-hub

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag the `dist/` folder to netlify.com/drop
```

---

## 📁 Project Structure

```
swe-interview-hub/
├── src/
│   ├── components/      # App views and shared UI components
│   ├── hooks/           # Tracker state and persistence
│   ├── utils/           # CSV and tracker helpers
│   ├── App.css          # Application styling
│   ├── App.jsx          # Main app shell
│   ├── data.js          # Static company, strategy, and role data
│   └── main.jsx         # React entry point
├── index.html           # HTML shell
├── vite.config.js       # Vite configuration
├── package.json
└── .gitignore
```

---

## 🗺 Roadmap

- [x] Persist tracker data to localStorage
- [x] Export tracker to CSV
- [x] Import tracker data from CSV
- [x] Add interview notes per company
- [x] Add next action and follow-up date tracking
- [ ] Calendar view for interview schedule
- [ ] Salary negotiation tips per company tier

---

## 🤝 Contributing

PRs welcome! Feel free to open an issue for bugs or feature requests.

---

## 📄 License

MIT — use freely for your own job search!

---

> Built to crack the top 1% of tech interviews. Good luck! 💪
