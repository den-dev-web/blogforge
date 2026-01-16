import { getUiLabel } from "./i18n.js";

const initMenu = () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  const focusableSelector =
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])";
  const lockStyles = { scrollY: 0 };
  let lastFocused = null;
  let closeTimer = null;
  let isMenuOpen = false;
  const searchPanel = document.querySelector("[data-search-panel]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const getFocusable = () =>
    Array.from(menu.querySelectorAll(focusableSelector)).filter(
      (node) => !node.hasAttribute("disabled")
    );

  const lockScroll = () => {
    if (isMenuOpen) return;
    lockStyles.scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockStyles.scrollY}px`;
    document.body.style.width = "100%";
    isMenuOpen = true;
  };

  const unlockScroll = (restorePosition = true) => {
    if (!isMenuOpen) return;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    if (restorePosition) {
      window.scrollTo(0, lockStyles.scrollY);
    }
    isMenuOpen = false;
  };

  const finalizeClose = () => {
    menu.hidden = true;
    closeTimer = null;
  };

  const setOpenState = (isOpen, options = {}) => {
    const { restoreScroll = true } = options;
    if (isOpen) {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      menu.hidden = false;
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", getUiLabel("closeMenu"));
      lastFocused = document.activeElement;
      lockScroll();
      requestAnimationFrame(() => {
        menu.dataset.open = "true";
      });
      const focusTarget =
        menu.querySelector("[data-menu-close]") || getFocusable()[0];
      focusTarget?.focus();
      return;
    }

    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", getUiLabel("openMenu"));
    delete menu.dataset.open;
    unlockScroll(restoreScroll);
    const handleTransition = (event) => {
      if (event && event.target !== menu) return;
      menu.removeEventListener("transitionend", handleTransition);
      finalizeClose();
    };
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      finalizeClose();
    } else {
      menu.addEventListener("transitionend", handleTransition);
      closeTimer = window.setTimeout(handleTransition, 300);
    }
    (lastFocused || toggle).focus();
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      setOpenState(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpenState(!isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target === menu) {
      setOpenState(false);
      return;
    }

    if (event.target.closest("[data-menu-close]")) {
      setOpenState(false);
      return;
    }

    if (event.target.closest("[data-lang-switch]")) {
      setOpenState(false);
      return;
    }

    if (event.target.closest("[data-theme-toggle]")) {
      setOpenState(false);
      return;
    }

    if (event.target.closest("[data-menu-search]")) {
      setOpenState(false, { restoreScroll: false });
      window.setTimeout(() => {
        if (!searchPanel) return;
        searchPanel.hidden = false;
        const headerHeightValue = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--header-height");
        const headerHeight = Number.parseFloat(headerHeightValue) || 0;
        const targetTop =
          searchPanel.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        const input = searchPanel.querySelector("[data-search]");
        input?.focus({ preventScroll: true });
      }, 0);
      return;
    }

    if (event.target.closest("a")) {
      setOpenState(false, { restoreScroll: false });
    }
  });

  menu.addEventListener("keydown", handleKeydown);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setOpenState(false);
  });

  toggle.setAttribute("aria-label", getUiLabel("openMenu"));
  setOpenState(false);
};

export default initMenu;
