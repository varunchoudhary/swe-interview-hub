import { useState, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DEFAULT_COMPANIES = {
  "S+": ["Anthropic", "OpenAI", "Google DeepMind", "Rentech", "TGS", "xAI", "Citadel Securities", "Jane Street", "HRT"],
  "S":  ["Citadel", "D.E. Shaw", "Jump", "Optiver", "Two Sigma", "Tesla (Autopilot)", "Five Rings", "SpaceX"],
  "S-": ["IMC", "SIG", "DRW", "Akuna"],
  "A++":["Databricks", "Netflix", "Anduril", "Google", "Meta", "Sierra AI", "Roblox"],
  "A+": ["Snowflake", "Waymo", "Stripe", "LinkedIn", "Figma", "Plaid", "Uber", "Airbnb", "Block (Cash App)", "Ramp", "Coinbase", "Nvidia", "AWS (Annapurna)", "Meta (Ads/M1ON/MRS)", "Palantir", "Decagon"],
  "A":  ["Notion", "Block (Square)", "Apple", "DoorDash", "Datadog", "Robinhood", "MongoDB", "Google (GCP)", "Tesla", "Harvey", "Meta (Reality Labs)", "Pinterest"],
  "A-": ["Snap", "AWS", "Dropbox", "Google (YouTube)", "Rippling", "Upstart", "Vercel", "Cloudflare", "CrowdStrike", "Affirm", "Reddit", "Verkada", "Rubrik", "Lyft", "Instacart", "Twilio", "Okta", "Riot Games", "Circle", "TTD", "Pure Storage", "SoFi"],
  "B+": ["TikTok", "Discord", "Amazon", "Microsoft", "Bloomberg", "AMD", "Adobe", "Atlassian", "DocuSign", "Box", "Intuit", "HubSpot"],
  "B":  ["Duolingo", "Asana", "Spotify", "Epic Games", "Etsy", "Twitch", "AppLovin", "PayPal", "Workday"],
  "B-": ["Oracle", "Zoom", "IBM", "Salesforce", "C1", "eBay", "Shopify", "Walmart"],
};

const DEFAULT_EUROPE_ROLES = [
  { id: 1, company: "Anthropic",       location: "London, UK",              role: "Senior Research Engineer",      link: "https://anthropic.com/careers" },
  { id: 2, company: "Stripe",          location: "Dublin, IE / London, UK", role: "Senior Backend Engineer",        link: "https://stripe.com/jobs" },
  { id: 3, company: "Google DeepMind", location: "London, UK",              role: "Senior SWE / Research Engineer", link: "https://deepmind.google/careers" },
  { id: 4, company: "Snowflake",       location: "Dublin, IE / Amsterdam",  role: "Senior Software Engineer",       link: "https://careers.snowflake.com" },
  { id: 5, company: "Figma",           location: "London, UK",              role: "Senior Engineer",                link: "https://figma.com/careers" },
  { id: 6, company: "Databricks",      location: "Amsterdam / London, UK",  role: "Senior Backend Engineer",        link: "https://databricks.com/careers" },
  { id: 7, company: "Palantir",        location: "London, UK",              role: "Forward Deployed SWE",           link: "https://palantir.com/careers" },
  { id: 8, company: "Spotify",         location: "Stockholm / London",      role: "Senior Backend Engineer",        link: "https://spotify.com/careers" },
  { id: 9, company: "Cloudflare",      location: "Lisbon, PT / London, UK", role: "Senior SWE - Infrastructure",    link: "https://cloudflare.com/careers" },
  { id:10, company: "Airbnb",          location: "Dublin, IE",              role: "Senior Full Stack Engineer",     link: "https://airbnb.com/careers" },
];

const STRATEGY = [
  { phase:"Phase 1", title:"DSA Mastery", weeks:"Weeks 1-4", color:"#e11d48", items:[
    "LeetCode: 3 mediums + 1 hard daily - Arrays, Trees, Graphs, Heaps, DP, Backtracking",
    "NeetCode 150 - complete all patterns; don't skip hard graph/DP problems",
    "Time strictly: 25 min mediums, 40 min hards. Analyze optimal solution if stuck",
    "For S+/S quant firms (Jane Street, Citadel): supplement with Codeforces Div. 2 problems",
    "Weekly mock on interviewing.io - anonymous, with real engineers at target companies",
    "Track weak patterns: revisit 2-3 problem types weekly until fully comfortable",
  ]},
  { phase:"Phase 2", title:"System Design", weeks:"Weeks 2-6", color:"#7c3aed", items:[
    "Read 'Designing Data-Intensive Applications' (Kleppmann) - all chapters, take notes",
    "Must-know designs: Payment System, Rate Limiter, Search Autocomplete, Notification Service, Ad Click Aggregator",
    "Go deep on: consistent hashing, leader election, CAP theorem, event-driven vs request-driven",
    "For backend roles: master DB indexing, query optimization, connection pooling, sharding",
    "For S/A++ tier: be ready for 'design a system like Kafka' or 'design a real-time leaderboard'",
    "Record yourself on Loom explaining a design - watch for clarity, structure, and depth gaps",
  ]},
  { phase:"Phase 3", title:"Behavioral & Leadership", weeks:"Weeks 5-7", color:"#0891b2", items:[
    "Prepare 10 STAR stories: technical conflict, production incident, cross-team influence, ambiguity, mentoring",
    "Quantify every story: 'reduced p99 latency by 40%', 'unblocked 3 teams', 'saved $200k/month in infra'",
    "For A++/S tier: stories must show you drove decisions, not just executed them",
    "Research engineering blogs: Stripe, Cloudflare, Databricks, Notion all publish deep tech posts",
    "Tailor values per company: Anthropic=safety, Stripe=correctness, Meta=scale, Airbnb=craft",
    "Do 2 full mock interviews with a senior peer - get written feedback on communication and depth",
  ]},
  { phase:"Phase 4", title:"Company-Specific Prep", weeks:"Weeks 6-8", color:"#059669", items:[
    "S+ tier (Anthropic, OpenAI, xAI): expect ML system design, research paper discussions, 6-8 rounds",
    "Quant firms (Jane Street, Citadel, HRT): add probability, brain teasers, market microstructure basics",
    "A++ tier (Databricks, Netflix, Anduril): strong infra/backend system design + leadership signals",
    "A+ tier (Stripe, Airbnb, Figma): product + technical hybrid - understand their core product deeply",
    "Use Blind + Glassdoor for recent interview reports per company - patterns repeat",
    "Apply B tier in Week 2 for reps, A tier in Week 4, S tier only after 2 full mock loops",
  ]},
];

const SENIOR_RESOURCES = [
  { icon:"📘", title:"Designing Data-Intensive Apps",   desc:"Martin Kleppmann - the bible for distributed systems. Read cover to cover.",         tag:"System Design" },
  { icon:"💻", title:"NeetCode 150",                    desc:"neetcode.io - structured DSA patterns with video explanations. Senior must-complete.",tag:"DSA" },
  { icon:"🧠", title:"interviewing.io",                 desc:"Anonymous mock interviews with engineers at FAANG/top startups.",                    tag:"Mock Interviews" },
  { icon:"🎥", title:"ByteByteGo (YouTube + Book)",     desc:"Alex Xu's system design channel + 'System Design Interview Vol 1 & 2' books.",       tag:"System Design" },
  { icon:"📝", title:"Blind + Glassdoor",               desc:"Check recent interview reports per company. Patterns repeat across cycles.",          tag:"Company Research" },
  { icon:"🔁", title:"Pramp",                           desc:"Free peer mock interviews. Use for behavioral rounds and early DSA practice.",        tag:"Mock Interviews" },
  { icon:"📖", title:"High Scalability Blog",           desc:"highscalability.com - real architecture breakdowns of Stripe, Netflix, Discord.",     tag:"System Design" },
  { icon:"⚡", title:"Codeforces Div. 2",              desc:"Required for quant firms (Jane Street, Citadel, HRT). Practice A-C problems weekly.", tag:"DSA (Quant)" },
  { icon:"🎙️", title:"Pragmatic Engineer Newsletter",  desc:"Gergely Orosz - how top engineers think about systems, ownership, and impact.",       tag:"Behavioral" },
  { icon:"🏢", title:"Company Engineering Blogs",       desc:"Stripe, Cloudflare, Databricks, Notion, Figma - read 2-3 posts per target company.", tag:"Company Research" },
];

const STRATEGY_SWE2 = [
  { phase:"Phase 1", title:"DSA Foundations", weeks:"Weeks 1-3", color:"#f59e0b", items:[
    "LeetCode: 2 mediums daily. Focus: Arrays, Strings, HashMaps, Two Pointers, Binary Search",
    "Complete NeetCode 75 first (not 150) - right difficulty for SWE2 level",
    "Time yourself: 30 min per medium. Don't look at solutions for at least 20 min",
    "Key patterns: Sliding Window, Fast/Slow Pointers, BFS/DFS on trees",
    "Mock interview every 2 weeks on Pramp - builds real interview stamina",
  ]},
  { phase:"Phase 2", title:"System Design Basics", weeks:"Weeks 2-5", color:"#06b6d4", items:[
    "At SWE2 level, expect high-level design - not deep distributed systems",
    "Learn: Client-Server model, REST APIs, SQL vs NoSQL basics, caching concepts",
    "Practice designing: URL Shortener, Instagram Feed, Simple Chat App",
    "Focus on: scalability reasoning, basic DB schema design, API contracts",
    "Watch: Gaurav Sen & ByteByteGo on YouTube - free and beginner-friendly",
  ]},
  { phase:"Phase 3", title:"Behavioral Basics", weeks:"Weeks 4-6", color:"#10b981", items:[
    "Prepare 5-6 STAR stories: a bug you fixed, a feature you owned, a teamwork example",
    "Focus on growth mindset - interviewers want to see you learn from mistakes",
    "Talk about code reviews, mentorship received, and how you ask for help",
    "Research the company's product - show genuine interest and curiosity",
    "Practice answering: 'Tell me about yourself' in under 2 minutes",
  ]},
  { phase:"Phase 4", title:"Targeting the Right Roles", weeks:"Weeks 5-7", color:"#8b5cf6", items:[
    "Start with B/B+ tier (Amazon, Microsoft, Spotify) - great for SWE2 level",
    "A- tier (Cloudflare, Reddit, Lyft) - stretch targets, very achievable with prep",
    "A/A+ tier (Stripe, Airbnb, Datadog) - ambitious but possible with strong DSA",
    "Avoid S/S+ tier for now - focus on leveling up, revisit in 1-2 years",
    "Apply broadly: aim for 15-20 applications to get 4-5 interview loops",
  ]},
];

const STATUS_COLORS = {
  "Not Applied": "#6b7280",
  "Applied":     "#3b82f6",
  "OA / Screen": "#f59e0b",
  "Technical":   "#8b5cf6",
  "Onsite":      "#ec4899",
  "Offer":       "#10b981",
  "Rejected":    "#ef4444",
};

const TIERS = ["S+","S","S-","A++","A+","A","A-","B+","B","B-"];

const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

const buildDefaultTracker = () =>
  Object.entries(DEFAULT_COMPANIES).flatMap(([tier, cos]) =>
    cos.map(c => ({ id: `${tier}-${c}`, name: c, tier, status: "Not Applied", notes: "", applied: "" }))
  );

const BOT_SYSTEM = `You are a senior tech career coach specializing in European tech job markets and interview preparation.
Help users find senior SWE roles in Europe, prep strategies, and career advice.
Be specific about cities, visa sponsorship, relocation packages, and salary ranges.
Keep responses concise (4-6 sentences). Format role suggestions as bullet points when listing multiple options.`;

export default function App() {
  const [user, setUser]           = useState(() => load("auth_user", null));
  const [authMode, setAuthMode]   = useState("login");
  const [authForm, setAuthForm]   = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [tab, setTab]             = useState("strategy");

  const [tracker, setTracker]           = useState(() => load("tracker_data", buildDefaultTracker()));
  const [filterTier, setFilterTier]     = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch]             = useState("");
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompany, setNewCompany]         = useState({ name: "", tier: "B", status: "Not Applied" });

  const [europeRoles, setEuropeRoles] = useState(() => load("europe_roles", DEFAULT_EUROPE_ROLES));
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole]         = useState({ company: "", location: "", role: "", link: "" });
  const [europeSubTab, setEuropeSubTab] = useState("roles");

  const [botMessages, setBotMessages] = useState([
    { role: "assistant", content: "Hey! I'm your Europe Job Scout 🌍 Tell me your preferences — backend/frontend, preferred country, remote/hybrid — and I'll surface the best senior SWE opportunities for you." }
  ]);
  const [botInput, setBotInput]     = useState("");
  const [botLoading, setBotLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { save("tracker_data", tracker); }, [tracker]);
  useEffect(() => { save("europe_roles", europeRoles); }, [europeRoles]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [botMessages]);

  const handleAuth = () => {
    setAuthError("");
    if (!authForm.email || !authForm.password) return setAuthError("Please fill in all fields.");
    if (authMode === "signup" && !authForm.name) return setAuthError("Please enter your name.");
    if (authMode === "signup" && authForm.password.length < 6) return setAuthError("Password must be at least 6 characters.");
    const users = load("users_db", {});
    if (authMode === "signup") {
      if (users[authForm.email]) return setAuthError("Account already exists. Please log in.");
      users[authForm.email] = { name: authForm.name, email: authForm.email, password: authForm.password };
      save("users_db", users);
      const u = { name: authForm.name, email: authForm.email };
      save("auth_user", u); setUser(u);
    } else {
      const u = users[authForm.email];
      if (!u || u.password !== authForm.password) return setAuthError("Invalid email or password.");
      const session = { name: u.name, email: u.email };
      save("auth_user", session); setUser(session);
    }
  };

  const logout = () => { save("auth_user", null); setUser(null); setAuthForm({ name: "", email: "", password: "" }); };

  const updateTracker = (id, field, value) => setTracker(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  const deleteCompany = (id) => setTracker(prev => prev.filter(r => r.id !== id));
  const addCompany = () => {
    if (!newCompany.name.trim()) return;
    setTracker(prev => [...prev, { ...newCompany, id: `custom-${Date.now()}`, notes: "", applied: "" }]);
    setNewCompany({ name: "", tier: "B", status: "Not Applied" }); setShowAddCompany(false);
  };

  const addRole = () => {
    if (!newRole.company.trim() || !newRole.role.trim()) return;
    setEuropeRoles(prev => [...prev, { ...newRole, id: Date.now() }]);
    setNewRole({ company: "", location: "", role: "", link: "" }); setShowAddRole(false);
  };
  const deleteRole = (id) => setEuropeRoles(prev => prev.filter(r => r.id !== id));

  const sendBot = async () => {
    if (!botInput.trim() || botLoading) return;
    const userMsg = { role: "user", content: botInput };
    setBotMessages(prev => [...prev, userMsg]); setBotInput(""); setBotLoading(true);
    try {
      const history = [...botMessages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: BOT_SYSTEM, messages: history }),
      });
      const data = await res.json();
      setBotMessages(prev => [...prev, { role: "assistant", content: data.content?.map(b => b.text||"").join("")||"Sorry, couldn't get a response." }]);
    } catch { setBotMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]); }
    setBotLoading(false);
  };

  const filteredTracker = tracker.filter(r =>
    (filterTier === "All" || r.tier === filterTier) &&
    (filterStatus === "All" || r.status === filterStatus) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const stats = Object.keys(STATUS_COLORS).map(s => ({ label: s, count: tracker.filter(r => r.status === s).length })).filter(s => s.count > 0);

  const SI = { background: "#0a0a0f", border: "1px solid #1e2a4a", borderRadius: 8, padding: "10px 14px", color: "#f8fafc", fontSize: 13, outline: "none", width: "100%" };
  const SB = (bg="#e11d48") => ({ background: bg, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700 });
  const SC = { background: "#111827", border: "1px solid #1e2a4a", borderRadius: 14, padding: 20 };
  const SL = { fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 6 };

  // LOGIN SCREEN
  if (!user) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: 420, background: "#111827", border: "1px solid #1e2a4a", borderRadius: 20, padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #e11d48, #7c3aed)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>🚀</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>SWE Interview Hub</h1>
          <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13 }}>Your personal career command center</p>
        </div>
        <div style={{ display: "flex", background: "#0a0a0f", borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
          {["login","signup"].map(m => (
            <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }} style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, background: authMode===m ? "#1e2a4a" : "transparent", color: authMode===m ? "#f8fafc" : "#64748b" }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {authMode === "signup" && (
            <div><label style={SL}>Full Name</label><input style={SI} placeholder="Varun Choudhary" value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} /></div>
          )}
          <div><label style={SL}>Email</label><input style={SI} type="email" placeholder="you@example.com" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label style={SL}>Password</label><input style={SI} type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key==="Enter" && handleAuth()} /></div>
          {authError && <div style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13 }}>{authError}</div>}
          <button onClick={handleAuth} style={{ ...SB(), padding: "12px", marginTop: 4, borderRadius: 10, fontSize: 14, background: "linear-gradient(135deg, #e11d48, #7c3aed)" }}>
            {authMode === "login" ? "Log In →" : "Create Account →"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#475569", fontSize: 12, marginTop: 20 }}>Your data is saved locally in your browser.</p>
      </div>
    </div>
  );

  const PhaseCard = ({ s }) => (
    <div style={{ background: "#111827", border: `1px solid ${s.color}33`, borderRadius: 14, padding: 22, borderLeft: `3px solid ${s.color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: 1 }}>{s.phase}</span>
          <h3 style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 700, color: "#f8fafc" }}>{s.title}</h3>
        </div>
        <span style={{ background: `${s.color}22`, color: s.color, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{s.weeks}</span>
      </div>
      <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
        {s.items.map((item, j) => <li key={j} style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>)}
      </ul>
    </div>
  );

  const ResourceGrid = ({ resources }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {resources.map((r, i) => (
        <div key={i} style={{ background: "#0a0a0f", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20 }}>{r.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 13 }}>{r.title}</div>
              <span style={{ fontSize: 10, background: "#1e2a4a", color: "#64748b", padding: "2px 7px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 8 }}>{r.tag}</span>
            </div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f5" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "20px 32px 0", borderBottom: "1px solid #1e2a4a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #e11d48, #7c3aed)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚀</div>
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f8fafc" }}>SWE Interview Command Center</h1>
                <p style={{ margin: 0, color: "#64748b", fontSize: 12 }}>Crack the top 1% of tech interviews</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f8fafc" }}>{user.name}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{user.email}</div>
              </div>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3b82f6, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" }}>
                {user.name[0].toUpperCase()}
              </div>
              <button onClick={logout} style={{ background: "#1e2a4a", color: "#94a3b8", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>Logout</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[["strategy","📋 Senior"],["swe2","🌱 SWE2"],["tracker","📊 Tracker"],["europe","🌍 Europe + Bot"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ background: tab===id ? "rgba(255,255,255,0.08)" : "transparent", color: tab===id ? "#fff" : "#64748b", border: "none", borderBottom: tab===id ? "2px solid #e11d48" : "2px solid transparent", padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600, borderRadius: "8px 8px 0 0", transition: "all 0.2s" }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px" }}>

        {/* SENIOR STRATEGY */}
        {tab === "strategy" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #e11d4811, #7c3aed11)", border: "1px solid #e11d4833", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>🏆</span>
              <div>
                <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 15 }}>Senior Software Engineer — 5-7 Years Experience</div>
                <div style={{ color: "#64748b", fontSize: 13, marginTop: 3 }}>8-week plan for backend engineers targeting Senior roles. Emphasis on depth, ownership, and cracking top-tier companies.</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {STRATEGY.map((s, i) => <PhaseCard key={i} s={s} />)}
            </div>
            <div style={{ ...SC, marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>🎯 Tier-Based Application Strategy</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Safety Net (B/B+)", desc: "Apply in Week 2. Build confidence, calibrate storytelling, collect comp data.", color: "#6b7280" },
                  { label: "Target (A/A+/A++)", desc: "Main focus from Week 4. 3-4 active loops at a time. Deep company research required.", color: "#3b82f6" },
                  { label: "Dream (S/S+)", desc: "Apply Week 6+ only. Needs extra prep: ML basics for AI labs, quant skills for trading firms.", color: "#e11d48" },
                ].map((t, i) => (
                  <div key={i} style={{ background: "#0a0a0f", borderRadius: 10, padding: 16, borderTop: `2px solid ${t.color}` }}>
                    <div style={{ fontWeight: 700, color: t.color, marginBottom: 6, fontSize: 13 }}>{t.label}</div>
                    <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={SC}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>📚 Senior Engineer Resource Checklist</h3>
              <ResourceGrid resources={SENIOR_RESOURCES} />
            </div>
          </div>
        )}

        {/* SWE2 STRATEGY */}
        {tab === "swe2" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #f59e0b11, #06b6d411)", border: "1px solid #f59e0b33", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>🌱</span>
              <div>
                <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 15 }}>Software Engineer 2 — 2-3 Years Experience</div>
                <div style={{ color: "#64748b", fontSize: 13, marginTop: 3 }}>7-week plan focused on clean code, fundamentals, and growth potential.</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {STRATEGY_SWE2.map((s, i) => <PhaseCard key={i} s={s} />)}
            </div>
            <div style={{ ...SC, marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>🎯 SWE2 vs Senior - Key Interview Differences</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Coding", swe2: "Clean solutions to mediums. Explain clearly as you code.", senior: "Mediums + hards. Optimal time/space complexity expected.", color: "#f59e0b" },
                  { label: "System Design", swe2: "High-level design, basic scalability. Show you understand tradeoffs.", senior: "Deep dive: sharding, replication, consistency, latency.", color: "#06b6d4" },
                  { label: "Behavioral", swe2: "Show teamwork, curiosity, learning from feedback.", senior: "Show ownership, cross-team impact, mentoring others.", color: "#10b981" },
                ].map((t, i) => (
                  <div key={i} style={{ background: "#0a0a0f", borderRadius: 10, padding: 16, borderTop: `2px solid ${t.color}` }}>
                    <div style={{ fontWeight: 700, color: t.color, marginBottom: 10, fontSize: 13 }}>{t.label}</div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>SWE2</div>
                      <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>{t.swe2}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Senior</div>
                      <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>{t.senior}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={SC}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>📚 SWE2 Resource Checklist</h3>
              <ResourceGrid resources={[
                { icon:"💻", title:"NeetCode 75",                  desc:"Core DSA patterns - free at neetcode.io",                    tag:"DSA" },
                { icon:"📖", title:"Cracking the Coding Interview", desc:"Classic prep book, chapters 1-8",                            tag:"DSA" },
                { icon:"🎥", title:"ByteByteGo (YouTube)",          desc:"Visual system design for beginners",                         tag:"System Design" },
                { icon:"🎤", title:"Pramp",                         desc:"Free peer mock interviews - do 1 every 2 weeks",             tag:"Mock Interviews" },
                { icon:"📝", title:"Glassdoor",                     desc:"Look up exact interview questions per company",              tag:"Company Research" },
                { icon:"🧠", title:"interviewing.io",               desc:"Anonymous mock interviews with real engineers",              tag:"Mock Interviews" },
              ]} />
            </div>
          </div>
        )}

        {/* TRACKER */}
        {tab === "tracker" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[s.label] }} />
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{s.count}</span>
                </div>
              ))}
              <div style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>{tracker.length} companies total</div>
              <button onClick={() => setShowAddCompany(v => !v)} style={SB()}>+ Add Company</button>
            </div>

            {showAddCompany && (
              <div style={{ ...SC, marginBottom: 16, border: "1px solid #e11d4844" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc", marginBottom: 14 }}>Add New Company</div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto auto", gap: 10, alignItems: "end" }}>
                  <div><label style={SL}>Company Name</label><input style={SI} placeholder="e.g. Revolut" value={newCompany.name} onChange={e => setNewCompany(p => ({ ...p, name: e.target.value }))} /></div>
                  <div><label style={SL}>Tier</label><select style={SI} value={newCompany.tier} onChange={e => setNewCompany(p => ({ ...p, tier: e.target.value }))}>{TIERS.map(t => <option key={t}>{t}</option>)}</select></div>
                  <div><label style={SL}>Status</label><select style={SI} value={newCompany.status} onChange={e => setNewCompany(p => ({ ...p, status: e.target.value }))}>{Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}</select></div>
                  <button onClick={addCompany} style={{ ...SB("#10b981"), whiteSpace: "nowrap" }}>Save</button>
                  <button onClick={() => setShowAddCompany(false)} style={{ ...SB("#1e2a4a"), color: "#94a3b8", whiteSpace: "nowrap" }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search company..." style={{ ...SI, width: 200 }} />
              <select value={filterTier} onChange={e => setFilterTier(e.target.value)} style={{ ...SI, width: "auto" }}><option>All</option>{TIERS.map(t => <option key={t}>{t}</option>)}</select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...SI, width: "auto" }}><option>All</option>{Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}</select>
              <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 12 }}>{filteredTracker.length} results</span>
            </div>

            <div style={{ background: "#111827", borderRadius: 14, overflow: "hidden", border: "1px solid #1e2a4a" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0a0a0f" }}>
                    {["Company","Tier","Status","Applied Date","Notes",""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTracker.map(row => (
                    <tr key={row.id} style={{ borderTop: "1px solid #1e2a4a" }}>
                      <td style={{ padding: "10px 16px" }}>
                        <input value={row.name} onChange={e => updateTracker(row.id, "name", e.target.value)} style={{ background: "transparent", border: "none", color: "#f8fafc", fontSize: 13, fontWeight: 600, outline: "none", width: "100%" }} />
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <select value={row.tier} onChange={e => updateTracker(row.id, "tier", e.target.value)} style={{ background: "#1e2a4a", color: "#94a3b8", border: "none", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                          {TIERS.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <select value={row.status} onChange={e => updateTracker(row.id, "status", e.target.value)} style={{ background: `${STATUS_COLORS[row.status]}22`, color: STATUS_COLORS[row.status], border: `1px solid ${STATUS_COLORS[row.status]}44`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, outline: "none", cursor: "pointer" }}>
                          {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <input type="date" value={row.applied} onChange={e => updateTracker(row.id, "applied", e.target.value)} style={{ background: "transparent", border: "none", color: "#64748b", fontSize: 12, outline: "none" }} />
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <input value={row.notes} onChange={e => updateTracker(row.id, "notes", e.target.value)} placeholder="Add notes..." style={{ background: "#0a0a0f", border: "1px solid #1e2a4a", borderRadius: 6, padding: "4px 10px", color: "#94a3b8", fontSize: 12, outline: "none", width: 180 }} />
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <button onClick={() => deleteCompany(row.id)} title="Remove" style={{ background: "transparent", border: "none", color: "#374151", cursor: "pointer", fontSize: 16, padding: 4, borderRadius: 6 }}
                          onMouseOver={e => e.currentTarget.style.color="#ef4444"} onMouseOut={e => e.currentTarget.style.color="#374151"}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EUROPE + BOT */}
        {tab === "europe" && (
          <div>
            <div style={{ display: "flex", background: "#111827", border: "1px solid #1e2a4a", borderRadius: 12, padding: 4, marginBottom: 20, width: "fit-content", gap: 4 }}>
              {[["roles","🌍 Europe Roles"],["bot","🤖 Job Scout Bot"]].map(([id, label]) => (
                <button key={id} onClick={() => setEuropeSubTab(id)} style={{ background: europeSubTab===id ? "linear-gradient(135deg, #e11d48, #7c3aed)" : "transparent", color: europeSubTab===id ? "#fff" : "#64748b", border: "none", borderRadius: 8, padding: "8px 24px", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>{label}</button>
              ))}
            </div>

            {europeSubTab === "roles" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>Senior SWE openings at top-tier companies with European presence. Add your own discoveries below.</p>
                  <button onClick={() => setShowAddRole(v => !v)} style={SB()}>+ Add Role</button>
                </div>

                {showAddRole && (
                  <div style={{ ...SC, marginBottom: 16, border: "1px solid #e11d4844" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc", marginBottom: 14 }}>Add New Role</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto auto", gap: 10, alignItems: "end" }}>
                      {[["Company","company","e.g. Revolut"],["Location","location","e.g. London, UK"],["Role","role","e.g. Senior Backend Engineer"],["Job Link","link","https://..."]].map(([label, key, ph]) => (
                        <div key={key}><label style={SL}>{label}</label><input style={SI} placeholder={ph} value={newRole[key]} onChange={e => setNewRole(p => ({ ...p, [key]: e.target.value }))} /></div>
                      ))}
                      <button onClick={addRole} style={{ ...SB("#10b981"), whiteSpace: "nowrap" }}>Save</button>
                      <button onClick={() => setShowAddRole(false)} style={{ ...SB("#1e2a4a"), color: "#94a3b8", whiteSpace: "nowrap" }}>Cancel</button>
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                  {europeRoles.map(r => (
                    <div key={r.id} style={{ ...SC, display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{r.company}</div>
                          <div style={{ fontSize: 13, color: "#e11d48", fontWeight: 600, marginTop: 2 }}>{r.role}</div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {r.link && <a href={r.link} target="_blank" rel="noreferrer" style={{ background: "#1e2a4a", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 11, textDecoration: "none", fontWeight: 600 }}>Apply →</a>}
                          <button onClick={() => deleteRole(r.id)} style={{ background: "transparent", border: "none", color: "#374151", cursor: "pointer", fontSize: 15, padding: "4px 6px", borderRadius: 6 }}
                            onMouseOver={e => e.currentTarget.style.color="#ef4444"} onMouseOut={e => e.currentTarget.style.color="#374151"}>🗑</button>
                        </div>
                      </div>
                      {r.location && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14 }}>📍</span><span style={{ fontSize: 12, color: "#64748b" }}>{r.location}</span></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {europeSubTab === "bot" && (
              <div style={{ display: "flex", flexDirection: "column", height: "520px" }}>
                <div style={{ background: "#111827", borderRadius: "14px 14px 0 0", border: "1px solid #1e2a4a", borderBottom: "none", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #3b82f6, #7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Europe Job Scout</div>
                    <div style={{ fontSize: 11, color: "#22c55e" }}>● AI-powered • Knows EU market • Ask anything</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                    {["Backend in Berlin?", "Visa sponsorship?", "Best SWE cities?"].map(q => (
                      <button key={q} onClick={() => setBotInput(q)} style={{ background: "#1e2a4a", color: "#94a3b8", border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 11, cursor: "pointer" }}>{q}</button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, background: "#0a0a0f", border: "1px solid #1e2a4a", overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                  {botMessages.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.role==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role==="user" ? "linear-gradient(135deg, #e11d48, #7c3aed)" : "#111827", border: m.role==="assistant" ? "1px solid #1e2a4a" : "none", color: "#f8fafc", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{m.content}</div>
                    </div>
                  ))}
                  {botLoading && (
                    <div style={{ display: "flex", gap: 4, padding: "12px 16px", background: "#111827", border: "1px solid #1e2a4a", borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                      {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#64748b", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i*0.2}s` }} />)}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ background: "#111827", border: "1px solid #1e2a4a", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 16, display: "flex", gap: 10 }}>
                  <input value={botInput} onChange={e => setBotInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendBot()} placeholder="e.g. best backend roles in Amsterdam with visa sponsorship..." style={{ ...SI, flex: 1 }} />
                  <button onClick={sendBot} disabled={botLoading} style={{ ...SB(), background: "linear-gradient(135deg, #e11d48, #7c3aed)", opacity: botLoading ? 0.5 : 1, padding: "10px 24px" }}>Send ↑</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #1e2a4a; border-radius: 3px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        select option { background: #111827; color: #f8fafc; }
      `}</style>
    </div>
  );
}
