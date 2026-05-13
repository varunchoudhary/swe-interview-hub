export function Icon({ name }) {
  const icons = {
    strategy: "M5 5h14M5 12h14M5 19h9",
    tracker: "M4 19V5m0 14h16M8 15v-4m4 4V8m4 7v-6",
    europe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8-9h16M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z",
    plus: "M12 5v14M5 12h14",
    upload: "M12 16V4m0 0 5 5m-5-5-5 5M5 20h14",
    download: "M12 4v12m0 0 5-5m-5 5-5-5M5 20h14",
    reset: "M4 12a8 8 0 1 0 2.3-5.7M4 5v5h5",
    external: "M14 4h6v6M20 4 10 14M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5",
    edit: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z",
    delete: "M5 7h14M9 7V5h6v2m-8 0 1 13h8l1-13",
    calendar: "M7 3v4m10-4v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
