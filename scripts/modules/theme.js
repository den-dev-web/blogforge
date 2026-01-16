const THEME_STORAGE_KEY = "blogforge-theme";
const THEMES = new Set(["light", "dark"]);

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    /* ignore storage errors */
  }
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  });
};

const initTheme = () => {
  const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  const storedTheme = getStoredTheme();
  let hasStoredTheme = THEMES.has(storedTheme);
  const initialTheme = hasStoredTheme
    ? storedTheme
    : mediaQuery?.matches
      ? "dark"
      : "light";

  applyTheme(initialTheme);
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  });
  if (hasStoredTheme) {
    setStoredTheme(initialTheme);
  }

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    hasStoredTheme = true;
  });

  mediaQuery?.addEventListener("change", (event) => {
    if (hasStoredTheme) return;
    applyTheme(event.matches ? "dark" : "light");
  });
};

export default initTheme;
