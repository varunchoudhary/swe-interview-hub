import { useState } from "react";
import "./App.css";
import { EuropeRolesView } from "./components/EuropeRolesView";
import { Header } from "./components/Header";
import { StrategyView } from "./components/StrategyView";
import { TrackerView } from "./components/TrackerView";
import { useTracker } from "./hooks/useTracker";

export default function App() {
  const [tab, setTab] = useState("strategy");
  const tracker = useTracker();

  return (
    <div className="app">
      <Header tab={tab} setTab={setTab} />
      <main className="shell page-shell">
        {tab === "strategy" && <StrategyView />}
        {tab === "tracker" && <TrackerView tracker={tracker} />}
        {tab === "europe" && <EuropeRolesView />}
      </main>
    </div>
  );
}
