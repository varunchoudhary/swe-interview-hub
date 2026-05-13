import { STRATEGY } from "../data";

export function StrategyView() {
  const tiers = [
    { label: "Safety Net (B/B+)", desc: "Apply first. Use for practice rounds. Build confidence and comp data.", color: "#64748b" },
    { label: "Target (A/A+/A++)", desc: "Main focus. Keep 3-4 active applications at a time and research deeply.", color: "#2563eb" },
    { label: "Dream (S/S+)", desc: "Apply after prep momentum. Add ML basics, quant skills, or domain-specific depth.", color: "#d9462f" },
  ];

  return (
    <section>
      <div className="strategy-grid">
        {STRATEGY.map(item => (
          <article className="phase-card" style={{ "--accent": item.color }} key={item.phase}>
            <div className="phase-head">
              <div>
                <span>{item.phase}</span>
                <h2>{item.title}</h2>
              </div>
              <strong>{item.weeks}</strong>
            </div>
            <ul>
              {item.items.map(task => <li key={task}>{task}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <section className="panel">
        <h2>Tier-Based Application Strategy</h2>
        <div className="tier-grid">
          {tiers.map(tier => (
            <article className="tier-card" style={{ "--accent": tier.color }} key={tier.label}>
              <h3>{tier.label}</h3>
              <p>{tier.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
