import { EUROPE_ROLES } from "../data";
import { Icon } from "./Icons";

export function EuropeRolesView() {
  return (
    <section>
      <div className="section-head">
        <div>
          <h2>European Target Companies</h2>
          <p>Curated companies with strong European senior engineering presence. Links point to career pages unless a specific role is tracked.</p>
        </div>
      </div>
      <div className="roles-grid">
        {EUROPE_ROLES.map(role => (
          <article className="role-card" key={`${role.company}-${role.location}`}>
            <div className="role-top">
              <div>
                <h3>{role.company}</h3>
                <p>{role.role}</p>
              </div>
              <a className="icon-button" href={role.link} target="_blank" rel="noreferrer" aria-label={`Open ${role.company} careers`}>
                <Icon name="external" />
              </a>
            </div>
            <dl className="role-meta">
              <div><dt>Location</dt><dd>{role.location}</dd></div>
              <div><dt>Visa</dt><dd>{role.visa}</dd></div>
              <div><dt>Remote</dt><dd>{role.remote}</dd></div>
              <div><dt>Checked</dt><dd>{role.lastChecked}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
