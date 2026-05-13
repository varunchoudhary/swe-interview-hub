import { useRef, useState } from "react";
import { COMPANIES, STATUS_COLORS, TIER_ORDER } from "../data";
import { Icon } from "./Icons";

export function TrackerView({ tracker }) {
  const [selectedId, setSelectedId] = useState(null);
  const fileInputRef = useRef(null);
  const selected = tracker.tracker.find(row => row.id === selectedId);

  const handleReset = () => {
    if (window.confirm("Reset tracker to the default company list? This replaces current tracker rows.")) {
      tracker.resetTracker();
      setSelectedId(null);
    }
  };

  const handleImport = event => {
    tracker.importCsv(event.target.files?.[0]);
    event.target.value = "";
  };

  return (
    <section>
      <div className="tracker-toolbar">
        <div className="stats-row">
          {tracker.stats.map(stat => (
            <div className="stat" key={stat.label}>
              <span style={{ background: STATUS_COLORS[stat.label] }} />
              <small>{stat.label}</small>
              <strong>{stat.count}</strong>
            </div>
          ))}
        </div>
        <div className="actions-row">
          <input ref={fileInputRef} className="hidden-input" type="file" accept=".csv,text/csv" onChange={handleImport} />
          <button className="secondary-button" onClick={() => fileInputRef.current?.click()}><Icon name="upload" /> Import CSV</button>
          <button className="secondary-button" onClick={tracker.exportCsv}><Icon name="download" /> Export CSV</button>
          <button className="secondary-button danger" onClick={handleReset}><Icon name="reset" /> Reset</button>
          <button className="primary-button" onClick={tracker.addCompany}><Icon name="plus" /> Add Company</button>
        </div>
      </div>

      <div className="filters-row">
        <input value={tracker.search} onChange={event => tracker.setSearch(event.target.value)} placeholder="Search company, notes, next action..." />
        <select value={tracker.filterTier} onChange={event => tracker.setFilterTier(event.target.value)}>
          <option>All</option>
          {Object.keys(COMPANIES).map(tier => <option key={tier}>{tier}</option>)}
        </select>
        <select value={tracker.filterStatus} onChange={event => tracker.setFilterStatus(event.target.value)}>
          <option>All</option>
          {Object.keys(STATUS_COLORS).map(status => <option key={status}>{status}</option>)}
        </select>
        <select value={tracker.sortBy} onChange={event => tracker.setSortBy(event.target.value)}>
          <option value="tier">Sort by tier</option>
          <option value="company">Sort by company</option>
          <option value="status">Sort by status</option>
          <option value="applied">Sort by applied date</option>
          <option value="followUp">Sort by follow-up</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Follow-up</th>
              <th>Next Action</th>
              <th>Notes</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tracker.filteredTracker.length === 0 && (
              <tr><td colSpan="9" className="empty-cell">No companies match the current filters.</td></tr>
            )}
            {tracker.filteredTracker.map(row => (
              <tr key={row.id} className={selectedId === row.id ? "selected-row" : ""}>
                <td>
                  <input className="cell-input company-input" value={row.name} onChange={event => tracker.updateTracker(row.id, "name", event.target.value)} />
                </td>
                <td>
                  <select className="cell-select tier-select" value={row.tier} onChange={event => tracker.updateTracker(row.id, "tier", event.target.value)}>
                    {TIER_ORDER.map(tier => <option key={tier}>{tier}</option>)}
                  </select>
                </td>
                <td>
                  <select className="cell-select status-select" value={row.status} onChange={event => tracker.updateTracker(row.id, "status", event.target.value)} style={{ "--status": STATUS_COLORS[row.status] }}>
                    {Object.keys(STATUS_COLORS).map(status => <option key={status}>{status}</option>)}
                  </select>
                </td>
                <td><input className="cell-input date-input" type="date" value={row.applied} onChange={event => tracker.updateTracker(row.id, "applied", event.target.value)} /></td>
                <td><input className="cell-input date-input" type="date" value={row.followUp} onChange={event => tracker.updateTracker(row.id, "followUp", event.target.value)} /></td>
                <td><input className="cell-input action-input" value={row.nextAction} onChange={event => tracker.updateTracker(row.id, "nextAction", event.target.value)} placeholder="Next step" /></td>
                <td><input className="cell-input notes-input" value={row.notes} onChange={event => tracker.updateTracker(row.id, "notes", event.target.value)} placeholder="Notes" /></td>
                <td>
                  <div className="link-cell">
                    <input className="cell-input link-input" value={row.link} onChange={event => tracker.updateTracker(row.id, "link", event.target.value)} placeholder="https://..." />
                    {row.link && <a className="icon-button subtle" href={row.link} target="_blank" rel="noreferrer" aria-label={`Open ${row.name} link`}><Icon name="external" /></a>}
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="secondary-button compact" onClick={() => setSelectedId(row.id)}><Icon name="edit" /> Details</button>
                    <button className="icon-button subtle danger-icon" onClick={() => tracker.deleteCompany(row.id)} aria-label={`Delete ${row.name}`}><Icon name="delete" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <CompanyDetail
          row={selected}
          updateTracker={tracker.updateTracker}
          deleteCompany={tracker.deleteCompany}
          close={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}

function CompanyDetail({ row, updateTracker, deleteCompany, close }) {
  const update = field => event => updateTracker(row.id, field, event.target.value);

  const remove = () => {
    if (window.confirm(`Delete ${row.name} from the tracker?`)) {
      deleteCompany(row.id);
      close();
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="company-detail-title">
      <aside className="detail-panel">
        <div className="detail-head">
          <div>
            <h2 id="company-detail-title">{row.name}</h2>
            <p>Changes are saved automatically to this browser.</p>
          </div>
          <button className="icon-button subtle" onClick={close} aria-label="Close detail panel">×</button>
        </div>

        <label>Company<input value={row.name} onChange={update("name")} /></label>
        <div className="form-grid">
          <label>Tier<select value={row.tier} onChange={update("tier")}>{TIER_ORDER.map(tier => <option key={tier}>{tier}</option>)}</select></label>
          <label>Status<select value={row.status} onChange={update("status")}>{Object.keys(STATUS_COLORS).map(status => <option key={status}>{status}</option>)}</select></label>
        </div>
        <div className="form-grid">
          <label>Applied Date<input type="date" value={row.applied} onChange={update("applied")} /></label>
          <label>Follow-up Date<input type="date" value={row.followUp} onChange={update("followUp")} /></label>
        </div>
        <label>Next Action<input value={row.nextAction} onChange={update("nextAction")} placeholder="Email recruiter, prep system design, schedule mock..." /></label>
        <label>Job Link<input value={row.link} onChange={update("link")} placeholder="https://..." /></label>
        <label>Interview Rounds<textarea value={row.rounds} onChange={update("rounds")} placeholder="Recruiter screen, coding, system design, hiring manager..." /></label>
        <label>Notes<textarea value={row.notes} onChange={update("notes")} placeholder="Comp notes, recruiter context, prep gaps..." /></label>

        <div className="detail-actions">
          <button className="secondary-button danger" onClick={remove}><Icon name="delete" /> Delete</button>
          <div className="detail-actions-right">
            {row.link && <a className="secondary-button" href={row.link} target="_blank" rel="noreferrer"><Icon name="external" /> Open Link</a>}
            <button className="primary-button" onClick={close}>Done</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
