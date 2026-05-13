export const COMPANIES = {
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

export const EUROPE_ROLES = [
  { company: "Anthropic", location: "London, UK", role: "Senior Research Engineer", link: "https://anthropic.com/careers", visa: "Likely", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Stripe", location: "Dublin, IE / London, UK", role: "Senior Backend Engineer", link: "https://stripe.com/jobs", visa: "Likely", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Google DeepMind", location: "London, UK", role: "Senior SWE / Research Engineer", link: "https://deepmind.google/careers", visa: "Likely", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Snowflake", location: "Dublin, IE / Amsterdam, NL", role: "Senior Software Engineer", link: "https://careers.snowflake.com", visa: "Possible", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Figma", location: "London, UK", role: "Senior Engineer", link: "https://figma.com/careers", visa: "Possible", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Databricks", location: "Amsterdam, NL / London, UK", role: "Senior Backend Engineer", link: "https://databricks.com/careers", visa: "Likely", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Palantir", location: "London, UK", role: "Forward Deployed SWE", link: "https://palantir.com/careers", visa: "Likely", remote: "Office-led", lastChecked: "2026-05-13" },
  { company: "Spotify", location: "Stockholm, SE / London, UK", role: "Senior Backend Engineer", link: "https://spotify.com/careers", visa: "Possible", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Cloudflare", location: "Lisbon, PT / London, UK", role: "Senior SWE - Infrastructure", link: "https://cloudflare.com/careers", visa: "Possible", remote: "Hybrid", lastChecked: "2026-05-13" },
  { company: "Airbnb", location: "Dublin, IE", role: "Senior Full Stack Engineer", link: "https://airbnb.com/careers", visa: "Possible", remote: "Hybrid", lastChecked: "2026-05-13" },
];

export const STRATEGY = [
  {
    phase: "Phase 1",
    title: "DSA Mastery",
    weeks: "Weeks 1-4",
    color: "#d9462f",
    items: [
      "LeetCode: 3 mediums + 1 hard daily. Focus: Arrays, Trees, Graphs, DP",
      "NeetCode 150: complete all patterns systematically",
      "Time yourself: 25 min mediums, 40 min hards",
      "For S+/S companies: add competitive programming and probability practice",
      "Mock interview weekly on Pramp or interviewing.io",
    ],
  },
  {
    phase: "Phase 2",
    title: "System Design",
    weeks: "Weeks 3-6",
    color: "#2563eb",
    items: [
      "Read Designing Data-Intensive Applications, chapters 1-6",
      "Practice: feed, rideshare, video, distributed cache, rate limiter",
      "For A++ tier: focus on global scale and operational tradeoffs",
      "For quant firms: focus on low-latency systems and data pipelines",
      "Record yourself explaining designs and review clarity",
    ],
  },
  {
    phase: "Phase 3",
    title: "Behavioral",
    weeks: "Weeks 5-7",
    color: "#0891b2",
    items: [
      "Prepare 10 STAR stories: conflict, failure, ownership, ambiguity",
      "Emphasize impact at scale and independent ownership",
      "Research engineering blogs and recent technical decisions",
      "Tailor stories to company values and product constraints",
      "Practice with a senior peer or coach and capture feedback",
    ],
  },
  {
    phase: "Phase 4",
    title: "Company Prep",
    weeks: "Weeks 6-8",
    color: "#16a34a",
    items: [
      "Top-tier companies may include 6-8 rounds and research discussions",
      "A++ tier often blends product sense with engineering design",
      "Quant firms add math, probability, and systems performance",
      "Use Glassdoor and Blind for recent interview reports",
      "Apply to B tier first for practice, then A/S tier",
    ],
  },
];

export const STATUS_COLORS = {
  "Not Applied": "#64748b",
  "Applied": "#2563eb",
  "OA / Screen": "#d97706",
  "Technical": "#7c3aed",
  "Onsite": "#db2777",
  "Offer": "#059669",
  "Rejected": "#dc2626",
};

export const TIER_ORDER = Object.keys(COMPANIES);

export const ALL_COMPANY_LIST = Object.entries(COMPANIES).flatMap(([tier, companies]) =>
  companies.map(name => ({ name, tier }))
);
