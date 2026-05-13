import { ALL_COMPANY_LIST, STATUS_COLORS, TIER_ORDER } from "../data";

export const TRACKER_STORAGE_KEY = "swe-interview-hub-tracker-v1";

export const createDefaultTracker = () =>
  ALL_COMPANY_LIST.map((company, index) => normalizeTrackerRow({
    id: `seed-${index}-${slugify(company.name)}`,
    ...company,
  }, index));

export const normalizeTrackerRow = (row, index = 0) => ({
  id: row.id || `row-${index}-${Date.now()}`,
  name: row.name || row.Company || "Untitled Company",
  tier: TIER_ORDER.includes(row.tier || row.Tier) ? row.tier || row.Tier : "B",
  status: STATUS_COLORS[row.status || row.Status] ? row.status || row.Status : "Not Applied",
  applied: row.applied || row["Applied Date"] || "",
  followUp: row.followUp || row["Follow-up Date"] || "",
  nextAction: row.nextAction || row["Next Action"] || "",
  notes: row.notes || row.Notes || "",
  link: row.link || row.Link || "",
  rounds: row.rounds || row.Rounds || "",
});

export const slugify = value =>
  String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const formatCsvCell = value => `"${String(value || "").replace(/"/g, '""')}"`;

export const trackerToCsv = tracker => {
  const headers = ["Company", "Tier", "Status", "Applied Date", "Follow-up Date", "Next Action", "Notes", "Link", "Rounds"];
  const rows = tracker.map(row => [
    row.name,
    row.tier,
    row.status,
    row.applied,
    row.followUp,
    row.nextAction,
    row.notes,
    row.link,
    row.rounds,
  ]);

  return [headers, ...rows].map(row => row.map(formatCsvCell).join(",")).join("\n");
};

export const parseCsv = text => {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some(cell => cell.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some(cell => cell.trim())) rows.push(row);
  if (rows.length < 2) return [];

  const headers = rows[0].map(header => header.trim());
  return rows.slice(1).map((cells, index) => {
    const raw = {};
    headers.forEach((header, cellIndex) => {
      raw[header] = cells[cellIndex] || "";
    });
    return normalizeTrackerRow(raw, index);
  });
};
