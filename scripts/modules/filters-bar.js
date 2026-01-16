const initFiltersBar = () => {
  const bar = document.querySelector("[data-filter-bar]");
  if (!bar) return;

  const topItems = Array.from(bar.querySelectorAll("[data-filter-item]"));
  const details = bar.querySelector("[data-filter-group]");
  const summary = details?.querySelector("summary");

  const setTopActive = (active) => {
    topItems.forEach((item) => {
      item.setAttribute("aria-pressed", item === active ? "true" : "false");
    });
  };

  const setSubActive = (active) => {
    const group = active.closest("[data-filter-subgroup]");
    if (!group) return;
    group.querySelectorAll("[data-filter-subitem]").forEach((item) => {
      item.setAttribute("aria-pressed", item === active ? "true" : "false");
    });
  };

  bar.addEventListener("click", (event) => {
    const top = event.target.closest("[data-filter-item]");
    if (top) {
      setTopActive(top);
      if (details && summary && top !== summary) {
        details.removeAttribute("open");
      }
    }

    const sub = event.target.closest("[data-filter-subitem]");
    if (sub) {
      setSubActive(sub);
      if (summary) {
        setTopActive(summary);
      }
    }
  });

  if (details && summary) {
    details.addEventListener("toggle", () => {
      if (details.open) {
        setTopActive(summary);
      }
    });
  }

  const initialTop = topItems.find(
    (item) => item.getAttribute("aria-pressed") === "true"
  );
  if (initialTop) {
    setTopActive(initialTop);
  }

  const initialSub = bar.querySelector(
    "[data-filter-subitem][aria-pressed=\"true\"]"
  );
  if (initialSub) {
    setSubActive(initialSub);
  }
};

export default initFiltersBar;
