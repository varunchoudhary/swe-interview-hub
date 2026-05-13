import { useEffect, useMemo, useState } from "react";
import { STATUS_COLORS, TIER_ORDER } from "../data";
import { createDefaultTracker, normalizeTrackerRow, parseCsv, TRACKER_STORAGE_KEY, trackerToCsv } from "../utils/tracker";

const loadTracker = () => {
  try {
    const saved = window.localStorage.getItem(TRACKER_STORAGE_KEY);
    if (!saved) return createDefaultTracker();
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return createDefaultTracker();
    return parsed.map(normalizeTrackerRow);
  } catch {
    return createDefaultTracker();
  }
};

export function useTracker() {
  const [tracker, setTracker] = useState(loadTracker);
  const [filterTier, setFilterTier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("tier");

  useEffect(() => {
    window.localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(tracker));
  }, [tracker]);

  const filteredTracker = useMemo(() => tracker
    .filter(row => {
      const query = search.trim().toLowerCase();
      const matchTier = filterTier === "All" || row.tier === filterTier;
      const matchStatus = filterStatus === "All" || row.status === filterStatus;
      const searchable = [row.name, row.notes, row.nextAction, row.rounds].join(" ").toLowerCase();
      return matchTier && matchStatus && (!query || searchable.includes(query));
    })
    .sort((a, b) => {
      if (sortBy === "company") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status) || a.name.localeCompare(b.name);
      if (sortBy === "followUp") return (a.followUp || "9999-99-99").localeCompare(b.followUp || "9999-99-99") || a.name.localeCompare(b.name);
      if (sortBy === "applied") return (b.applied || "").localeCompare(a.applied || "") || a.name.localeCompare(b.name);
      return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || a.name.localeCompare(b.name);
    }), [filterStatus, filterTier, search, sortBy, tracker]);

  const stats = useMemo(() => Object.keys(STATUS_COLORS).map(status => ({
    label: status,
    count: tracker.filter(row => row.status === status).length,
  })).filter(stat => stat.count > 0), [tracker]);

  const updateTracker = (id, field, value) => {
    setTracker(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const addCompany = () => {
    setTracker(prev => [...prev, normalizeTrackerRow({ id: `custom-${Date.now()}`, name: "New Company" }, prev.length)]);
  };

  const deleteCompany = id => {
    setTracker(prev => prev.filter(row => row.id !== id));
  };

  const resetTracker = () => {
    setTracker(createDefaultTracker());
  };

  const exportCsv = () => {
    const blob = new Blob([trackerToCsv(tracker)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "swe-interview-tracker.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCsv = async file => {
    if (!file) return;
    const importedRows = parseCsv(await file.text());
    if (importedRows.length) setTracker(importedRows);
  };

  return {
    tracker,
    filteredTracker,
    stats,
    filterTier,
    filterStatus,
    search,
    sortBy,
    setFilterTier,
    setFilterStatus,
    setSearch,
    setSortBy,
    updateTracker,
    addCompany,
    deleteCompany,
    resetTracker,
    exportCsv,
    importCsv,
  };
}
