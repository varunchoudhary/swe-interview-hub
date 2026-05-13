import { Icon } from "./Icons";

const TABS = [
  ["strategy", "Strategy", "strategy"],
  ["tracker", "App Tracker", "tracker"],
  ["europe", "Europe Roles", "europe"],
];

export function Header({ tab, setTab }) {
  return (
    <header className="app-header">
      <div className="shell header-inner">
        <div className="brand-row">
          <div className="brand-mark">SWE</div>
          <div>
            <h1>Senior SWE Interview Command Center</h1>
            <p>Your personal hub for tracking top-company interview prep.</p>
          </div>
        </div>
        <nav className="tabs" aria-label="Primary">
          {TABS.map(([id, label, icon]) => (
            <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
              <Icon name={icon} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
