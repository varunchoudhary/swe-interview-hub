import { useState, useRef, useEffect } from "react";

const COMPANIES = {
  "S+": ["Anthropic", "OpenAI", "Google DeepMind", "Rentech", "TGS", "xAI", "Citadel Securities", "Jane Street", "HRT"],
  "S": ["Citadel", "D.E. Shaw", "Jump", "Optiver", "Two Sigma", "Tesla (Autopilot)", "Five Rings", "SpaceX"],
  "S-": ["IMC", "SIG", "DRW", "Akuna"],
  "A++": ["Databricks", "Netflix", "Anduril", "Google", "Meta", "Sierra AI", "Roblox"],
  "A+": ["Snowflake", "Waymo", "Stripe", "LinkedIn", "Figma", "Plaid", "Uber", "Airbnb", "Block (Cash App)", "Ramp", "Coinbase", "Nvidia", "AWS (Annapurna)", "Meta (Ads/M1ON/MRS)", "Palantir", "Decagon"],
  "A": ["Notion", "Block (Square)", "Apple", "DoorDash", "Datadog", "Robinhood", "MongoDB", "Google (GCP)", "Tesla", "Harvey", "Meta (Reality Labs)", "Pinterest"],
  "A-": ["Snap", "AWS", "Dropbox", "Google (YouTube)", "Rippling", "Upstart", "Vercel", "Cloudflare", "CrowdStrike", "Affirm", "Reddit", "Verkada", "Rubrik", "Lyft", "Instacart", "Twilio", "Okta", "Riot Games", "Circle", "TTD", "Pure Storage", "SoFi"],
  "B+": ["TikTok", "Discord", "Amazon", "Microsoft", "Bloomberg", "AMD", "Adobe", "Atlassian", "DocuSign", "Box", "Intuit", "HubSpot"],
  "B": ["Duolingo", "Asana", "Spotify", "Epic Games", "Etsy", "Twitch", "AppLovin", "PayPal", "Workday"],
  "B-": ["Oracle", "Zoom", "IBM", "Salesforce", "C1", "eBay", "Shopify", "Walmart"],
};

const EUROPE_ROLES = [
  { company: "Anthropic", location: "London, UK", role: "Senior Research Engineer", link: "https://anthropic.com/careers" },
  { company: "Stripe", location: "Dublin, IE / London, UK", role: "Senior Backend Engineer", link: "https://stripe.com/jobs" },
  { company: "Google DeepMind", location: "London, UK", role: "Senior SWE / Research Engineer", link: "https://deepmind.google/careers" },
  { company: "Snowflake", location: "Dublin, IE / Amsterdam, NL", role: "Senior Software Engineer", link: "https://careers.snowflake.com" },
  { company: "Figma", location: "London, UK", role: "Senior Engineer", link: "https://figma.com/careers" },
  { company: "Databricks", location: "Amsterdam, NL / London, UK", role: "Senior Backend Engineer", link: "https://databricks.com/careers" },
  { company: "Palantir", location: "London, UK", role: "Forward Deployed SWE", link: "https://palantir.com/careers" },
  { company: "Spotify", location: "Stockholm, SE / London, UK", role: "Senior Backend Engineer", link: "https://spotify.com/careers" },
  { company: "Cloudflare", location: "Lisbon, PT / London, UK", role: "Senior SWE - Infrastructure", link: "https://cloudflare.com/careers" },
  { company: "Airbnb", location: "Dublin, IE", role: "Senior Full Stack Engineer", link: "https://airbnb.com/careers" },
];

const STRATEGY = [
  {
    phase: "Phase 1", title: "DSA Mastery", weeks: "Weeks 1–4", color: "#e11d48",
    items: [
      "LeetCode: 3 mediums + 1 hard daily. Focus: Arrays, Trees, Graphs, DP",
      "NeetCode 150 — complete all patterns systematically",
      "Time yourself: 25 min mediums, 40 min hards",
      "For S+/S companies (Jane Street, Citadel): add competitive programming (Codeforces Div. 2)",
      "Mock interview weekly on Pramp or interviewing.io",
    ]
  },
  {
    phase: "Phase 2", title: "System Design", weeks: "Weeks 3–6", color: "#7c3aed",
    items: [
      "Read: 'Designing Data-Intensive Applications' (Kleppmann) — chapters 1–6",
      "Practice: Design Twitter Feed, Uber, YouTube, Distributed Cache, Rate Limiter",
      "For A++ tier: focus on scale (millions of users, global infra)",
      "For S tier quant firms: focus on low-latency, data pipelines, real-time systems",
      "Record yourself explaining designs — review clarity & depth",
    ]
  },
  {
    phase: "Phase 3", title: "Behavioral & Leadership", weeks: "Weeks 5–7", color: "#0891b2",
    items: [
      "Prepare 10 STAR stories: conflict, failure, ownership, cross-team, ambiguity",
      "For S+/A++ companies: emphasize impact at scale and independent ownership",
      "Research each company's engineering blog + recent tech decisions",
      "Tailor stories to company values (Anthropic=safety, Stripe=reliability, Meta=scale)",
      "Practice with a senior peer or coach — get brutal feedback",
    ]
  },
  {
    phase: "Phase 4", title: "Company-Specific Prep", weeks: "Week 6–8", color: "#059669",
    items: [
      "Top-tier (S+): expect 6–8 rounds, research papers, ML system design",
      "A++ tier: product sense + eng design combo rounds",
      "Quant firms: math + probability + brain teasers on top of coding",
      "Use Glassdoor + Blind for recent interview questions per company",
      "Apply to B tier first for practice, then A/S tier",
    ]
  },
];

const STATUS_COLORS = {
  "Not Applied": "#6b7280",
  "Applied": "#3b82f6",
  "OA / Screen": "#f59e0b",
  "Technical": "#8b5cf6",
  "Onsite": "#ec4899",
  "Offer": "#10b981",
  "Rejected": "#ef4444",
};

const ALL_COMPANY_LIST = Object.entries(COMPANIES).flatMap(([tier, cos]) =>
  cos.map(c => ({ name: c, tier }))
);

const BOT_SYSTEM = `You are a senior tech career coach specializing in European tech job markets. 
Help the user find relevant senior software engineering roles in Europe based on their preferences. 
Be specific about cities, visa sponsorship likelihood, and relocation packages. 
Keep responses concise (3-5 sentences max). Format role suggestions as bullet points.`;

export default function App() {
  const [tab, setTab] = useState("strategy");
  const [tracker, setTracker] = useState(() =>
    ALL_COMPANY_LIST.map(c => ({ ...c, status: "Not Applied", notes: "", applied: "" }))
  );
  const [filterTier, setFilterTier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [botMessages, setBotMessages] = useState([
    { role: "assistant", content: "Hey! I'm your Europe Job Scout 🌍 Tell me your preferences — backend/frontend, preferred country, remote/hybrid — and I'll surface the best senior SWE opportunities for you." }
  ]);
  const [botInput, setBotInput] = useState("");
  const [botLoading, setBotLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [botMessages]);

  const updateTracker = (idx, field, value) => {
    setTracker(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const addCompany = () => {
    setTracker(prev => [...prev, { name: "New Company", tier: "B", status: "Not Applied", notes: "", applied: "" }]);
  };

  const sendBot = async () => {
    if (!botInput.trim() || botLoading) return;
    const userMsg = { role: "user", content: botInput };
    setBotMessages(prev => [...prev, userMsg]);
    setBotInput("");
    setBotLoading(true);
    try {
      const history = [...botMessages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: BOT_SYSTEM,
          messages: history,
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't get a response.";
      setBotMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setBotMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
    }
    setBotLoading(false);
  };

  const filteredTracker = tracker.filter(r => {
    const matchTier = filterTier === "All" || r.tier === filterTier;
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchTier && matchStatus && matchSearch;
  });

  const stats = Object.keys(STATUS_COLORS).map(s => ({
    label: s, count: tracker.filter(r => r.status === s).length
  })).filter(s => s.count > 0);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f5" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "28px 32px 0", borderBottom: "1px solid #1e2a4a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #e11d48, #7c3aed)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚀</div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(90deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Senior SWE Interview Command Center
            </h1>
          </div>
          <p style={{ margin: "0 0 20px 48px", color: "#64748b", fontSize: 13 }}>Your personal hub for cracking top tech companies</p>
          <div style={{ display: "flex", gap: 4 }}>
            {[["strategy", "📋 Strategy"], ["tracker", "📊 App Tracker"], ["europe", "🌍 Europe Roles"], ["bot", "🤖 Job Scout Bot"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{
                background: tab === id ? "rgba(255,255,255,0.1)" : "transparent",
                color: tab === id ? "#fff" : "#64748b",
                border: "none", borderBottom: tab === id ? "2px solid #e11d48" : "2px solid transparent",
                padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, borderRadius: "8px 8px 0 0", transition: "all 0.2s"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 32px" }}>

        {/* STRATEGY TAB */}
        {tab === "strategy" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {STRATEGY.map((s, i) => (
                <div key={i} style={{ background: "#111827", border: `1px solid ${s.color}33`, borderRadius: 14, padding: 22, borderLeft: `3px solid ${s.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: 1 }}>{s.phase}</span>
                      <h3 style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 700, color: "#f8fafc" }}>{s.title}</h3>
                    </div>
                    <span style={{ background: `${s.color}22`, color: s.color, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{s.weeks}</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>🎯 Tier-Based Application Strategy</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Safety Net (B/B+)", desc: "Apply first. Use for practice rounds. Build confidence and comp data.", color: "#6b7280" },
                  { label: "Target (A/A+/A++)", desc: "Your main focus. 3–4 active applications at a time. Deep company research.", color: "#3b82f6" },
                  { label: "Dream (S/S+)", desc: "Apply after 2+ weeks of prep. Requires extra effort: ML basics, quant skills.", color: "#e11d48" },
                ].map((t, i) => (
                  <div key={i} style={{ background: "#0a0a0f", borderRadius: 10, padding: 16, borderTop: `2px solid ${t.color}` }}>
                    <div style={{ fontWeight: 700, color: t.color, marginBottom: 6, fontSize: 13 }}>{t.label}</div>
                    <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRACKER TAB */}
        {tab === "tracker" && (
          <div>
            {/* Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[s.label] }} />
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{s.count}</span>
                </div>
              ))}
              <button onClick={addCompany} style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>+ Add Company</button>
            </div>
            {/* Filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search company..." style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 8, padding: "8px 14px", color: "#f8fafc", fontSize: 13, outline: "none", width: 200 }} />
              <select value={filterTier} onChange={e => setFilterTier(e.target.value)} style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 8, padding: "8px 14px", color: "#f8fafc", fontSize: 13, outline: "none" }}>
                <option>All</option>
                {Object.keys(COMPANIES).map(t => <option key={t}>{t}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 8, padding: "8px 14px", color: "#f8fafc", fontSize: 13, outline: "none" }}>
                <option>All</option>
                {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            {/* Table */}
            <div style={{ background: "#111827", borderRadius: 14, overflow: "hidden", border: "1px solid #1e2a4a" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0a0a0f" }}>
                    {["Company", "Tier", "Status", "Applied Date", "Notes"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTracker.map((row, idx) => {
                    const realIdx = tracker.indexOf(row);
                    return (
                      <tr key={realIdx} style={{ borderTop: "1px solid #1e2a4a" }}>
                        <td style={{ padding: "10px 16px" }}>
                          <input value={row.name} onChange={e => updateTracker(realIdx, "name", e.target.value)}
                            style={{ background: "transparent", border: "none", color: "#f8fafc", fontSize: 13, fontWeight: 600, outline: "none", width: "100%" }} />
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <span style={{ background: "#1e2a4a", color: "#94a3b8", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{row.tier}</span>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <select value={row.status} onChange={e => updateTracker(realIdx, "status", e.target.value)}
                            style={{ background: `${STATUS_COLORS[row.status]}22`, color: STATUS_COLORS[row.status], border: `1px solid ${STATUS_COLORS[row.status]}44`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, outline: "none", cursor: "pointer" }}>
                            {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <input type="date" value={row.applied} onChange={e => updateTracker(realIdx, "applied", e.target.value)}
                            style={{ background: "transparent", border: "none", color: "#64748b", fontSize: 12, outline: "none" }} />
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <input value={row.notes} onChange={e => updateTracker(realIdx, "notes", e.target.value)} placeholder="Add notes..."
                            style={{ background: "#0a0a0f", border: "1px solid #1e2a4a", borderRadius: 6, padding: "4px 10px", color: "#94a3b8", fontSize: 12, outline: "none", width: "180px" }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EUROPE ROLES TAB */}
        {tab === "europe" && (
          <div>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Curated senior SWE openings at top-tier companies with European presence. Use the Job Scout Bot for personalized searches.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {EUROPE_ROLES.map((r, i) => (
                <div key={i} style={{ background: "#111827", border: "1px solid #1e2a4a", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{r.company}</div>
                      <div style={{ fontSize: 13, color: "#e11d48", fontWeight: 600, marginTop: 2 }}>{r.role}</div>
                    </div>
                    <a href={r.link} target="_blank" rel="noreferrer" style={{ background: "#1e2a4a", color: "#94a3b8", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", textDecoration: "none", fontWeight: 600 }}>Apply →</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14 }}>📍</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{r.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOT TAB */}
        {tab === "bot" && (
          <div style={{ display: "flex", flexDirection: "column", height: "500px" }}>
            <div style={{ background: "#111827", borderRadius: "14px 14px 0 0", border: "1px solid #1e2a4a", borderBottom: "none", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #3b82f6, #7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>Europe Job Scout</div>
                <div style={{ fontSize: 11, color: "#22c55e" }}>● AI-powered • Knows EU market</div>
              </div>
            </div>
            <div style={{ flex: 1, background: "#0a0a0f", border: "1px solid #1e2a4a", overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {botMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.role === "user" ? "linear-gradient(135deg, #e11d48, #7c3aed)" : "#111827",
                    border: m.role === "assistant" ? "1px solid #1e2a4a" : "none",
                    color: "#f8fafc", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap"
                  }}>{m.content}</div>
                </div>
              ))}
              {botLoading && (
                <div style={{ display: "flex", gap: 4, padding: "12px 16px", background: "#111827", border: "1px solid #1e2a4a", borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#64748b", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />)}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ background: "#111827", border: "1px solid #1e2a4a", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 16, display: "flex", gap: 10 }}>
              <input
                value={botInput} onChange={e => setBotInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendBot()}
                placeholder="e.g. backend roles in Berlin or Amsterdam, open to relocation..."
                style={{ flex: 1, background: "#0a0a0f", border: "1px solid #1e2a4a", borderRadius: 10, padding: "10px 16px", color: "#f8fafc", fontSize: 13, outline: "none" }}
              />
              <button onClick={sendBot} disabled={botLoading} style={{
                background: "linear-gradient(135deg, #e11d48, #7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: botLoading ? 0.5 : 1
              }}>Send</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #1e2a4a; border-radius: 3px; }
      `}</style>
    </div>
  );
}
