# 🚀 Senior SWE Interview Command Center

A personal interview prep hub for senior software engineers targeting top tech companies. Built with React + Vite, powered by Claude AI.

![App Preview](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite) ![Claude AI](https://img.shields.io/badge/Claude-Sonnet-orange?style=flat)

---

## ✨ Features

### 📋 Interview Strategy
An 8-week, 4-phase prep plan tailored for senior backend engineers:
- **Phase 1 – DSA Mastery** (Weeks 1–4): LeetCode patterns, NeetCode 150, timed practice
- **Phase 2 – System Design** (Weeks 3–6): Distributed systems, databases, caching, queues
- **Phase 3 – Behavioral** (Weeks 5–7): STAR stories, company-specific values
- **Phase 4 – Company-Specific Prep** (Weeks 6–8): Tier-based application sequencing

### 📊 Application Tracker
Track all 98 companies from the Blind "Hottest Companies" list:
- Pre-loaded with all tiers: S+, S, S-, A++, A+, A, A-, B+, B, B-
- Status tracking: Not Applied → Applied → OA/Screen → Technical → Onsite → Offer/Rejected
- Filter by tier, status, or search by name
- Add custom companies
- Notes and applied date per company

### 🌍 Europe Roles
Curated senior SWE openings at top-tier companies with European offices across London, Dublin, Amsterdam, Stockholm, and Lisbon.

### 🤖 AI Job Scout Bot
An AI-powered chatbot (Claude Sonnet) that helps you find and research senior SWE roles in Europe based on your preferences — cities, remote/hybrid, visa sponsorship, and more.

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Claude Sonnet API** — Powers the Job Scout Bot
- **Vanilla CSS-in-JS** — No external UI library needed

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/swe-interview-hub.git
cd swe-interview-hub

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your Anthropic API key

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your API key from [console.anthropic.com](https://console.anthropic.com).

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Then add `VITE_ANTHROPIC_API_KEY` in your Vercel project under **Settings → Environment Variables**.

### Deploy to Netlify

```bash
npm run build
# Drag the `dist/` folder to netlify.com/drop
```

Add the env variable in **Site Settings → Environment Variables**.

---

## 📁 Project Structure

```
swe-interview-hub/
├── src/
│   ├── App.jsx          # Main app (all components)
│   └── main.jsx         # React entry point
├── index.html           # HTML shell
├── vite.config.js       # Vite configuration
├── package.json
├── .env.example         # Environment variable template
└── .gitignore
```

---

## 🗺 Roadmap

- [ ] Persist tracker data to localStorage
- [ ] Export tracker to CSV
- [ ] Add interview notes per company
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
