import initCatalog from "./modules/catalog.js";
import initArticlePage from "./modules/article-page.js";
import initHomeSections from "./modules/home-sections.js";
import initReveal from "./modules/reveal.js";
import initMenu from "./modules/menu.js";
import initForms from "./modules/forms.js";
import { initLanguage } from "./modules/i18n.js";
import initFiltersBar from "./modules/filters-bar.js";
import initTheme from "./modules/theme.js";

initTheme();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (header) {
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    };
    setHeaderHeight();
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(() => setHeaderHeight());
      observer.observe(header);
    } else {
      window.addEventListener("resize", () => {
        window.requestAnimationFrame(setHeaderHeight);
      });
    }
  }

  const rerenderCatalog = initCatalog();
  const rerenderHomeSections = initHomeSections();
  const rerenderArticle = initArticlePage();
  initReveal();
  initMenu();
  initForms();
  initFiltersBar();
  initLanguage(() => {
    if (typeof rerenderCatalog === "function") {
      rerenderCatalog();
    }
    if (typeof rerenderHomeSections === "function") {
      rerenderHomeSections();
    }
    if (typeof rerenderArticle === "function") {
      rerenderArticle();
    }
  });
});
