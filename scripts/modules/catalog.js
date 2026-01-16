const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_QUERY_DELAY = 200;
const LOAD_MORE_DELAY = 400;

const I18N = {
  uk: {
    categories: {
      technology: "Технології",
      business: "Бізнес",
      design: "Дизайн",
      science: "Наука",
      lifestyle: "Lifestyle",
      all: "Всі",
    },
    ui: {
      endList: "Кінець списку",
      empty: "Немає матеріалів за фільтром.",
      error: "Не вдалося завантажити матеріали.",
      retry: "Спробувати ще",
    },
  },
  en: {
    categories: {
      technology: "Technology",
      business: "Business",
      design: "Design",
      science: "Science",
      lifestyle: "Lifestyle",
      all: "All",
    },
    ui: {
      endList: "End of list",
      empty: "No articles match your filters yet.",
      error: "Unable to load articles.",
      retry: "Retry",
    },
  },
  ru: {
    categories: {
      technology: "Технологии",
      business: "Бизнес",
      design: "Дизайн",
      science: "Наука",
      lifestyle: "Lifestyle",
      all: "Все",
    },
    ui: {
      endList: "Конец списка",
      empty: "Нет материалов по фильтру.",
      error: "Не удалось загрузить материалы.",
      retry: "Повторить",
    },
  },
};

const formatDateTime = (value, time) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const dateLabel = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  if (time) {
    return `${dateLabel} ${time}`;
  }
  if (typeof value === "string" && value.includes("T")) {
    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${dateLabel} ${timeLabel}`;
  }
  return dateLabel;
};

const getLang = () => document.documentElement.dataset.lang || "uk";

const resolveText = (value, lang) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.uk || value.en || value.ru || "";
};

const getCategoryLabel = (category, lang) => {
  const dict = I18N[lang] || I18N.uk;
  return dict.categories[category] || category;
};

const getUiLabel = (key, lang) => {
  const dict = I18N[lang] || I18N.uk;
  return dict.ui[key] || key;
};

const DEFAULT_TAGS = {
  technology: ["#інженерія", "#платформа"],
  business: ["#стратегія", "#зростання"],
  design: ["#дизайн", "#система"],
  science: ["#дослідження", "#майбутнє"],
  lifestyle: ["#ритуали", "#фокус"],
};

const DEFAULT_REACTIONS = [
  { emoji: "✨", count: 2 },
  { emoji: "👍", count: 2 },
  { emoji: "❤️", count: 1 },
  { emoji: "🔥", count: 1 },
];

const buildPicture = (image, alt) => {
  const picture = document.createElement("picture");
  const sizes = "(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw";

  if (image?.avif) {
    const sourceAvif = document.createElement("source");
    sourceAvif.type = "image/avif";
    sourceAvif.srcset = image.srcset?.avif || image.avif;
    sourceAvif.sizes = sizes;
    picture.appendChild(sourceAvif);
  }

  if (image?.webp) {
    const sourceWebp = document.createElement("source");
    sourceWebp.type = "image/webp";
    sourceWebp.srcset = image.srcset?.webp || image.webp;
    sourceWebp.sizes = sizes;
    picture.appendChild(sourceWebp);
  }

  const img = document.createElement("img");
  img.src = image?.jpg || "";
  img.srcset = image?.srcset?.jpg || "";
  img.sizes = sizes;
  img.alt = alt || "";
  img.loading = "lazy";
  img.decoding = "async";
  picture.appendChild(img);

  return picture;
};

const buildTagList = (tags = []) => {
  const list = document.createElement("div");
  list.className = "card__tags";
  tags.filter(Boolean).forEach((tag) => {
    const item = document.createElement("span");
    item.className = "hash-tag";
    item.textContent = tag;
    list.appendChild(item);
  });
  return list;
};

const buildReactions = (reactions = []) => {
  const wrapper = document.createElement("div");
  wrapper.className = "card__reactions";

  const emojiRow = document.createElement("div");
  emojiRow.className = "emoji-row";

  reactions.forEach((reaction) => {
    const button = document.createElement("button");
    button.className = "emoji-reaction";
    button.type = "button";
    const emoji = reaction?.emoji || "✨";
    const count = reaction?.count ?? 0;
    button.setAttribute("aria-label", `Реакція: ${emoji} ${count}`);
    button.textContent = `${emoji} `;
    const countNode = document.createElement("span");
    countNode.textContent = count;
    button.appendChild(countNode);
    emojiRow.appendChild(button);
  });

  const commentButton = document.createElement("button");
  commentButton.className = "comment-button";
  commentButton.type = "button";
  commentButton.setAttribute("aria-label", "Коментарі");
  commentButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 18l-4 3v-3.5A7.5 7.5 0 1 1 18.5 10.5 7.5 7.5 0 0 1 11 18H7z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `;

  wrapper.append(emojiRow, commentButton);
  return wrapper;
};

const buildCard = (article, lang) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.variant = article.featured ? "featured" : "default";
  card.dataset.category = article.category;
  card.dataset.type = article.type;

  const articleHref = `article.html?id=${encodeURIComponent(article.id)}`;

  const media = document.createElement("a");
  media.className = "card__media card__link";
  media.href = articleHref;
  media.setAttribute("aria-label", article.title);
  media.appendChild(buildPicture(article.image, article.image?.alt));

  const body = document.createElement("div");
  body.className = "card__body";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = getCategoryLabel(article.category, lang);

  const title = document.createElement("h3");
  title.className = "card__title";
  const titleLink = document.createElement("a");
  titleLink.className = "card__link";
  titleLink.href = articleHref;
  titleLink.textContent = article.title;
  title.appendChild(titleLink);

  const excerpt = document.createElement("p");
  excerpt.className = "card__excerpt";
  excerpt.textContent = article.excerpt;

  const meta = document.createElement("div");
  meta.className = "card__meta";

  const date = document.createElement("span");
  date.textContent = article.dateLabel;

  const author = document.createElement("span");
  author.textContent = article.author;

  meta.append(date, author);

  const tags = article.tags?.length
    ? article.tags
    : DEFAULT_TAGS[article.category] || ["#цікаве"];

  const reactions = article.reactions?.length
    ? article.reactions
    : DEFAULT_REACTIONS;

  body.append(tag, title, excerpt, meta, buildTagList(tags), buildReactions(reactions));
  card.append(media, body);

  return card;
};

const buildSkeletonCard = () => {
  const card = document.createElement("article");
  card.className = "skeleton-card";
  card.dataset.skeleton = "true";
  card.setAttribute("aria-hidden", "true");

  const media = document.createElement("div");
  media.className = "skeleton-block skeleton-media";

  const body = document.createElement("div");
  body.className = "skeleton-body";

  const line1 = document.createElement("div");
  line1.className = "skeleton-block skeleton-line skeleton-line--short";

  const line2 = document.createElement("div");
  line2.className = "skeleton-block skeleton-line skeleton-line--title";

  const line3 = document.createElement("div");
  line3.className = "skeleton-block skeleton-line";

  const line4 = document.createElement("div");
  line4.className = "skeleton-block skeleton-line skeleton-line--short";

  body.append(line1, line2, line3, line4);
  card.append(media, body);

  return card;
};

const getReadingTime = (text, lang) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const suffixes = {
    uk: "хв читання",
    en: "min read",
    ru: "мин чтения",
  };
  const suffix = suffixes[lang] || suffixes.en;
  return `${minutes} ${suffix}`;
};

const normalizeArticles = (articles = []) =>
  articles.map((article) => ({
    ...article,
    dateLabel: formatDateTime(article.date, article.time),
    searchIndex: {
      uk: `${resolveText(article.title, "uk")} ${resolveText(article.excerpt, "uk")} ${article.author}`.toLowerCase(),
      en: `${resolveText(article.title, "en")} ${resolveText(article.excerpt, "en")} ${article.author}`.toLowerCase(),
      ru: `${resolveText(article.title, "ru")} ${resolveText(article.excerpt, "ru")} ${article.author}`.toLowerCase(),
    },
  }));

const debounce = (callback, delay = DEFAULT_QUERY_DELAY) => {
  let timerId;
  return (...args) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => callback(...args), delay);
  };
};

const initCatalog = () => {
  const catalog = document.querySelector("[data-catalog]");
  if (!catalog) return;

  const searchInputs = Array.from(document.querySelectorAll("[data-search]"));
  const searchClears = Array.from(document.querySelectorAll("[data-search-clear]"));
  const searchForms = Array.from(document.querySelectorAll("[data-search-form]"));
  const status = document.querySelector("[data-catalog-status]");
  const dataUrl = catalog.dataset.source || "data/articles.json";
  const pageSize = Number(catalog.dataset.pageSize) || DEFAULT_PAGE_SIZE;

  let page = 0;
  let articles = [];
  let query = "";
  let hasMore = false;
  let isLoadingMore = false;
  let loadMoreObserver;
  let loadMoreSentinel;
  let scrollFallbackHandler;
  let isAutoLoadActive = false;
  const supportsAutoLoad = "IntersectionObserver" in window;

  const setStatus = (message = "", { retry = false } = {}) => {
    if (!status) return;
    status.innerHTML = "";
    if (!message) return;

    const text = document.createElement("span");
    text.textContent = message;
    status.appendChild(text);

    if (retry) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn--ghost";
      button.dataset.retry = "true";
      button.textContent = getUiLabel("retry", getLang());
      status.appendChild(button);
    }
  };

  const stopAutoLoad = () => {
    isAutoLoadActive = false;
    if (loadMoreObserver) {
      loadMoreObserver.disconnect();
      loadMoreObserver = null;
    }
    if (scrollFallbackHandler) {
      window.removeEventListener("scroll", scrollFallbackHandler);
      window.removeEventListener("resize", scrollFallbackHandler);
      scrollFallbackHandler = null;
    }
  };

  const renderSkeletons = (count, append = false) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      fragment.appendChild(buildSkeletonCard());
    }

    if (!append) {
      catalog.innerHTML = "";
    }
    catalog.appendChild(fragment);
  };

  const applyFilters = () => {
    const lang = getLang();
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesQuery =
        !normalizedQuery || article.searchIndex[lang]?.includes(normalizedQuery);
      return matchesQuery;
    });
  };

  const renderPage = () => {
    const lang = getLang();
    const filtered = applyFilters();

    catalog.querySelectorAll("[data-skeleton]").forEach((node) => node.remove());
    setStatus("");

    if (!filtered.length) {
      catalog.dataset.state = "empty";
      hasMore = false;
      stopAutoLoad();
      catalog.innerHTML = "";
      setStatus(getUiLabel("empty", lang));
      if (loadMoreSentinel) {
        loadMoreSentinel.hidden = true;
      }
      return;
    }

    const start = page * pageSize;
    const end = start + pageSize;
    const slice = filtered.slice(start, end);
    const fragment = document.createDocumentFragment();

    if (page === 0) {
      catalog.innerHTML = "";
    }

    slice.forEach((article) => {
      fragment.appendChild(
        buildCard(
          {
            ...article,
            title: resolveText(article.title, lang),
            excerpt: resolveText(article.excerpt, lang),
            readingTime: getReadingTime(resolveText(article.excerpt, lang) || "", lang),
          },
          lang
        )
      );
    });
    catalog.appendChild(fragment);

    hasMore = end < filtered.length;
    if (loadMoreSentinel) {
      loadMoreSentinel.hidden = !hasMore;
    }
    if (!hasMore) {
      setStatus(getUiLabel("endList", lang));
      stopAutoLoad();
    } else {
      startAutoLoad();
    }
    if (hasMore && supportsAutoLoad) {
      window.requestAnimationFrame(() => {
        if (isSentinelNearViewport()) {
          loadNextPage();
        }
      });
    }
    catalog.dataset.state = "ready";
  };

  const loadNextPage = () => {
    if (isLoadingMore || !hasMore) return;
    isLoadingMore = true;
    catalog.dataset.state = "loading";
    renderSkeletons(Math.min(3, pageSize), true);

    window.setTimeout(() => {
      page += 1;
      renderPage();
      isLoadingMore = false;
    }, LOAD_MORE_DELAY);
  };

  const ensureSentinel = () => {
    if (loadMoreSentinel) return loadMoreSentinel;
    loadMoreSentinel = document.querySelector("[data-load-more-sentinel]");
    if (!loadMoreSentinel) {
      loadMoreSentinel = document.createElement("div");
      loadMoreSentinel.className = "load-more-sentinel";
      loadMoreSentinel.dataset.loadMoreSentinel = "true";
      loadMoreSentinel.setAttribute("aria-hidden", "true");
      catalog.insertAdjacentElement("afterend", loadMoreSentinel);
    }
    return loadMoreSentinel;
  };

  const isSentinelNearViewport = () => {
    if (!loadMoreSentinel || loadMoreSentinel.hidden) return false;
    const rect = loadMoreSentinel.getBoundingClientRect();
    return rect.top - window.innerHeight <= 200;
  };

  const startAutoLoad = () => {
    if (isAutoLoadActive) return;
    isAutoLoadActive = true;
    ensureSentinel();
    if (supportsAutoLoad) {
      loadMoreObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadNextPage();
            }
          });
        },
        {
          root: null,
          rootMargin: "200px 0px",
          threshold: 0.1,
        }
      );
      if (loadMoreSentinel) {
        loadMoreObserver.observe(loadMoreSentinel);
      }
    }
    scrollFallbackHandler = debounce(() => {
      if (isSentinelNearViewport()) {
        loadNextPage();
      }
    }, 120);
    window.addEventListener("scroll", scrollFallbackHandler, { passive: true });
    window.addEventListener("resize", scrollFallbackHandler);
  };

  const loadData = async () => {
    catalog.dataset.state = "loading";
    setStatus("");
    renderSkeletons(pageSize);
    if (loadMoreSentinel) {
      loadMoreSentinel.hidden = true;
    }

    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error("Failed to load catalog");
      }
      const data = await response.json();
      articles = normalizeArticles(data);
      page = 0;
      renderPage();
    } catch (error) {
      catalog.dataset.state = "error";
      catalog.innerHTML = "";
      setStatus(getUiLabel("error", getLang()), { retry: true });
    }
  };


  ensureSentinel();
  startAutoLoad();

  const syncInputs = (value) => {
    searchInputs.forEach((input) => {
      if (input.value !== value) {
        input.value = value;
      }
    });
  };

  const setClearVisibility = (value) => {
    const isVisible = value.length > 0;
    searchClears.forEach((button) => {
      button.hidden = !isVisible;
    });
  };

  const applySearch = (value) => {
    query = value;
    page = 0;
    renderPage();
  };

  searchForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("[data-search]");
      if (!input) return;
      const value = input.value;
      syncInputs(value);
      setClearVisibility(value);
      applySearch(value);
    });
  });

  searchInputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      const value = event.target.value;
      syncInputs(value);
      setClearVisibility(value);
    });
  });

  searchClears.forEach((button) => {
    button.addEventListener("click", () => {
      syncInputs("");
      setClearVisibility("");
      query = "";
      page = 0;
      renderPage();
    });
  });

  status?.addEventListener("click", (event) => {
    const retry = event.target.closest("[data-retry]");
    if (!retry) return;
    loadData();
  });

  loadData();

  return () => {
    page = 0;
    renderPage();
  };
};

export default initCatalog;
