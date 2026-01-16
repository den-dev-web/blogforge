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
      menu: "Меню",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      searchAction: "Пошук...",
      languageLabel: "Мова",
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук статей",
      searchScopeLabel: "Де шукати",
      searchScopePosts: "Пости",
      searchScopePeople: "Люди",
      searchScopeTags: "Теги",
      searchScopeComments: "Коментарі",
      searchFiltersLabel: "Пошук і фільтри",
      filtersCurrent: "Актуальне",
      filtersLatest: "Останнє",
      filtersBest: "Найкраще",
      filtersPeriodLabel: "Період",
      filtersWeek: "Тиждень",
      filtersMonth: "Місяць",
      filtersYear: "Рік",
      filtersAll: "Усі",
      clear: "Очистити",
      endList: "Кінець списку",
      empty: "Немає матеріалів за фільтром.",
      error: "Не вдалося завантажити матеріали.",
      retry: "Спробувати ще",
      subscribeSuccess: "Дякуємо! Ми на звʼязку.",
      commentSuccess: "Коментар отримано. Очікує модерації.",
    },
    hero: {
      tag: "Вибір редакції",
      title: "BlogForge медіа-платформа",
      subtitle:
        "Лонгріди, практичні гіди та нотатки для технологій, бізнесу й культури.",
    },
    sections: {
      categories: "Категорії",
      popular: "Популярне зараз",
      media: "Подкасти та відео",
      subscribe: "Підписатися на оновлення",
      related: "Схожі статті",
      comments: "Залишити коментар",
    },
    buttons: {
      startReading: "Почати читати",
      subscribe: "Підписатися",
      joinList: "Приєднатися",
      submit: "Надіслати",
      auth: "Увійдіть",
      toggleTheme: "Перемкнути тему",
    },
    forms: {
      emailLabel: "Email",
      emailHint: "Щотижневий дайджест без спаму.",
      nameLabel: "Ім'я",
      commentLabel: "Коментар",
    },
    footer: {
      catalog: "Каталог",
      subscribe: "Підписка",
      article: "Стаття",
      meta: "Незалежна редакційна студія. Всі права захищені.",
    },
    labels: {
      podcast: "Подкаст",
      video: "Відео",
    },
    cards: {
      popular1: {
        title: "Сигнали з передової",
        excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
      },
      popular2: {
        title: "Ритуали сфокусованої роботи",
        excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
      },
      popular3: {
        title: "Нотатки оператора зростання",
        excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
      },
      media1: {
        title: "Щотижневий редакційний дайджест",
        excerpt: "Короткий анонс для медіа-епізоду.",
      },
      media2: {
        title: "Глибинні огляди до 10 хвилин",
        excerpt: "Короткий анонс для медіа-епізоду.",
      },
    },
    article: {
      title: "Проєктування стійких систем",
      date: "12 січня",
      readingTime: "8 хв читання",
      coverLabel: "Обкладинка статті",
      section1Title: "Редакційна теза",
      section1Text:
        "Будуйте системи, що тримають удар, масштабуються з наміром і залишають місце для людських рішень.",
      section2Title: "Про що команди забувають",
      section2Text:
        "Стійкість — це не лише аптайм. Це навчальні цикли та чіткі межі.",
      quote:
        "Команди, що фіксують рішення, живуть довше за ті, що фіксують лише задачі.",
      section3Title: "Сигнали, за якими варто стежити",
      list1: "Стрибки латентності під час пікової співпраці.",
      list2: "Непризначені сервіси без on-call чергування.",
      list3: "Відсутність дизайн-рев'ю перед продакшен-змінами.",
      caption: "Системи ростуть, коли команда бачить повну мапу.",
      related1Title: "Операторський довідник для масштабу",
      related1Excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
      related2Title: "Редакційна майстерність для команд",
      related2Excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
      related3Title: "Сигнали з передової",
      related3Excerpt: "Короткий анонс для матеріалу з найближчим дедлайном.",
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
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      searchAction: "Search...",
      languageLabel: "Language",
      searchLabel: "Search",
      searchPlaceholder: "Search articles",
      searchScopeLabel: "Search in",
      searchScopePosts: "Posts",
      searchScopePeople: "People",
      searchScopeTags: "Tags",
      searchScopeComments: "Comments",
      searchFiltersLabel: "Search & filters",
      filtersCurrent: "Trending",
      filtersLatest: "Latest",
      filtersBest: "Best",
      filtersPeriodLabel: "Period",
      filtersWeek: "Week",
      filtersMonth: "Month",
      filtersYear: "Year",
      filtersAll: "All",
      clear: "Clear",
      endList: "End of list",
      empty: "No articles match your filters yet.",
      error: "Unable to load articles.",
      retry: "Retry",
      subscribeSuccess: "Thanks! We'll be in touch.",
      commentSuccess: "Comment received. Moderation pending.",
    },
    hero: {
      tag: "Editorial picks",
      title: "BlogForge media platform",
      subtitle:
        "Longform reads, practical playbooks, and creator notes across tech, business, and culture.",
    },
    sections: {
      categories: "Categories",
      popular: "Popular now",
      media: "Podcasts and video",
      subscribe: "Subscribe for updates",
      related: "Related stories",
      comments: "Leave a comment",
    },
    buttons: {
      startReading: "Start reading",
      subscribe: "Subscribe",
      joinList: "Join the list",
      submit: "Submit",
      auth: "Sign in",
      toggleTheme: "Toggle theme",
    },
    forms: {
      emailLabel: "Email",
      emailHint: "Weekly digest, no spam.",
      nameLabel: "Name",
      commentLabel: "Comment",
    },
    footer: {
      catalog: "Catalog",
      subscribe: "Subscribe",
      article: "Article",
      meta: "Independent editorial studio. All rights reserved.",
    },
    labels: {
      podcast: "Podcast",
      video: "Video",
    },
    cards: {
      popular1: {
        title: "Signals from the frontier",
        excerpt: "Short preview text for the feature article goes here.",
      },
      popular2: {
        title: "Rituals for focused work",
        excerpt: "Short preview text for the feature article goes here.",
      },
      popular3: {
        title: "Operator notes on growth",
        excerpt: "Short preview text for the feature article goes here.",
      },
      media1: {
        title: "The weekly editorial desk",
        excerpt: "Short preview text for the feature media goes here.",
      },
      media2: {
        title: "Deep dives in under 10",
        excerpt: "Short preview text for the feature media goes here.",
      },
    },
    article: {
      title: "Designing resilient systems",
      date: "Jan 12",
      readingTime: "8 min read",
      coverLabel: "Article cover",
      section1Title: "The editorial thesis",
      section1Text:
        "Build systems that hold steady under pressure, scale with intent, and make room for human judgment.",
      section2Title: "What teams forget",
      section2Text:
        "Resilience is not just about uptime. It is about learning loops and clear boundaries.",
      quote:
        "Teams that document decisions outlast teams that only document tasks.",
      section3Title: "Signals to watch",
      list1: "Latency spikes during peak collaboration hours.",
      list2: "Unowned services with no on-call rotation.",
      list3: "Missing design reviews before production changes.",
      caption: "Systems grow when the team sees the whole map.",
      related1Title: "Operators handbook for scale",
      related1Excerpt: "Short preview text for the feature article goes here.",
      related2Title: "Editorial craft for modern teams",
      related2Excerpt: "Short preview text for the feature article goes here.",
      related3Title: "Signals from the frontier",
      related3Excerpt: "Short preview text for the feature article goes here.",
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
      menu: "Меню",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      searchAction: "Поиск...",
      languageLabel: "Язык",
      searchLabel: "Поиск",
      searchPlaceholder: "Поиск статей",
      searchScopeLabel: "Где искать",
      searchScopePosts: "Посты",
      searchScopePeople: "Люди",
      searchScopeTags: "Теги",
      searchScopeComments: "Комментарии",
      searchFiltersLabel: "Поиск и фильтры",
      filtersCurrent: "Актуальное",
      filtersLatest: "Последнее",
      filtersBest: "Лучшее",
      filtersPeriodLabel: "Период",
      filtersWeek: "Неделя",
      filtersMonth: "Месяц",
      filtersYear: "Год",
      filtersAll: "Все",
      clear: "Очистить",
      endList: "Конец списка",
      empty: "Нет материалов по фильтру.",
      error: "Не удалось загрузить материалы.",
      retry: "Повторить",
      subscribeSuccess: "Спасибо! Мы на связи.",
      commentSuccess: "Комментарий получен. Ожидает модерации.",
    },
    hero: {
      tag: "Выбор редакции",
      title: "BlogForge медиа-платформа",
      subtitle:
        "Лонгриды, практические гиды и заметки о технологиях, бизнесе и культуре.",
    },
    sections: {
      categories: "Категории",
      popular: "Популярное сейчас",
      media: "Подкасты и видео",
      subscribe: "Подписаться на обновления",
      related: "Похожие статьи",
      comments: "Оставить комментарий",
    },
    buttons: {
      startReading: "Начать читать",
      subscribe: "Подписаться",
      joinList: "Присоединиться",
      submit: "Отправить",
      auth: "Войти",
      toggleTheme: "Переключить тему",
    },
    forms: {
      emailLabel: "Email",
      emailHint: "Еженедельный дайджест без спама.",
      nameLabel: "Имя",
      commentLabel: "Комментарий",
    },
    footer: {
      catalog: "Каталог",
      subscribe: "Подписка",
      article: "Статья",
      meta: "Независимая редакционная студия. Все права защищены.",
    },
    labels: {
      podcast: "Подкаст",
      video: "Видео",
    },
    cards: {
      popular1: {
        title: "Сигналы с передовой",
        excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
      },
      popular2: {
        title: "Ритуалы сфокусированной работы",
        excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
      },
      popular3: {
        title: "Заметки оператора роста",
        excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
      },
      media1: {
        title: "Еженедельный редакционный дайджест",
        excerpt: "Короткий анонс для медиа-эпизода.",
      },
      media2: {
        title: "Глубокие обзоры до 10 минут",
        excerpt: "Короткий анонс для медиа-эпизода.",
      },
    },
    article: {
      title: "Проектирование устойчивых систем",
      date: "12 янв",
      readingTime: "8 мин чтения",
      coverLabel: "Обложка статьи",
      section1Title: "Редакционная тезис",
      section1Text:
        "Стройте системы, которые держат удар, масштабируются осознанно и оставляют место для человеческих решений.",
      section2Title: "О чем команды забывают",
      section2Text:
        "Устойчивость — это не только аптайм. Это циклы обучения и четкие границы.",
      quote:
        "Команды, которые фиксируют решения, живут дольше тех, кто фиксирует только задачи.",
      section3Title: "Сигналы, за которыми стоит следить",
      list1: "Скачки задержки в часы пиковой совместной работы.",
      list2: "Сервисы без владельцев и on-call ротации.",
      list3: "Отсутствие дизайн-ревью перед продакшен-изменениями.",
      caption: "Системы растут, когда команда видит полную карту.",
      related1Title: "Операторский справочник для масштаба",
      related1Excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
      related2Title: "Редакционное мастерство для команд",
      related2Excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
      related3Title: "Сигналы с передовой",
      related3Excerpt: "Короткий анонс для материала с ближайшим дедлайном.",
    },
  },
};

const getLang = () => document.documentElement.dataset.lang || "uk";

const getUiLabel = (key, lang = getLang()) => {
  const dict = I18N[lang] || I18N.uk;
  return dict.ui[key] || key;
};

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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

const resolveText = (value, lang) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.uk || value.en || value.ru || "";
};

const getCategoryLabel = (category, lang) => {
  const dict = I18N[lang] || I18N.uk;
  return dict.categories[category] || category;
};

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

const buildCard = (article, lang) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.variant = article.featured ? "featured" : "default";
  card.dataset.category = article.category;
  card.dataset.type = article.type;

  const media = document.createElement("div");
  media.className = "card__media";
  media.appendChild(buildPicture(article.image, article.image?.alt));

  const body = document.createElement("div");
  body.className = "card__body";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = getCategoryLabel(article.category, lang);

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = article.title;

  const excerpt = document.createElement("p");
  excerpt.className = "card__excerpt";
  excerpt.textContent = article.excerpt;

  const meta = document.createElement("div");
  meta.className = "card__meta";

  const date = document.createElement("span");
  date.textContent = article.dateLabel;

  const author = document.createElement("span");
  author.textContent = article.author;

  const reading = document.createElement("span");
  reading.textContent = article.readingTime;

  meta.append(date, author, reading);
  body.append(tag, title, excerpt, meta);
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

const normalizeArticles = (articles = []) =>
  articles.map((article) => ({
    ...article,
    dateLabel: formatDate(article.date),
    searchIndex: {
      uk: `${resolveText(article.title, "uk")} ${resolveText(
        article.excerpt,
        "uk"
      )} ${article.author}`.toLowerCase(),
      en: `${resolveText(article.title, "en")} ${resolveText(
        article.excerpt,
        "en"
      )} ${article.author}`.toLowerCase(),
      ru: `${resolveText(article.title, "ru")} ${resolveText(
        article.excerpt,
        "ru"
      )} ${article.author}`.toLowerCase(),
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
  const searchClears = Array.from(
    document.querySelectorAll("[data-search-clear]")
  );
  const searchForms = Array.from(
    document.querySelectorAll("[data-search-form]")
  );
  const status = document.querySelector("[data-catalog-status]");
  const dataUrl = catalog.dataset.source || "../data/articles.json";
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
        !normalizedQuery ||
        article.searchIndex[lang]?.includes(normalizedQuery);
      return matchesQuery;
    });
  };

  const renderPage = () => {
    const lang = getLang();
    const filtered = applyFilters();

    catalog
      .querySelectorAll("[data-skeleton]")
      .forEach((node) => node.remove());
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
            readingTime: getReadingTime(
              resolveText(article.excerpt, lang) || "",
              lang
            ),
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

const applyTranslations = () => {
  const lang = getLang();
  const dict = I18N[lang] || I18N.uk;
  const resolveKey = (path) =>
    path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), dict);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const value = resolveKey(key);
    if (value) {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    const value = resolveKey(key);
    if (value) {
      node.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    const mappings = node.dataset.i18nAttr.split(";");
    mappings.forEach((entry) => {
      const [attr, key] = entry.split(":");
      if (!attr || !key) return;
      const value = resolveKey(key);
      if (value) {
        node.setAttribute(attr, value);
      }
    });
  });
};

const initLanguage = (onChange) => {
  const switches = document.querySelectorAll("[data-lang-switch]");
  if (!switches.length) return;

  const switchers = document.querySelectorAll("[data-lang-switcher]");
  const getToggle = (switcher) => switcher.querySelector("[data-lang-toggle]");

  const setOpenState = (switcher, isOpen) => {
    switcher.dataset.open = String(isOpen);
    const toggle = getToggle(switcher);
    toggle?.setAttribute("aria-expanded", String(isOpen));
  };

  const updateSwitchers = (lang) => {
    switchers.forEach((switcher) => {
      const current = switcher.querySelector("[data-lang-current]");
      const active = switcher.querySelector(`[data-lang-switch="${lang}"]`);
      if (current && active) {
        current.textContent = active.textContent;
      }
      switcher.querySelectorAll("[data-lang-switch]").forEach((btn) => {
        const isActive = btn.dataset.langSwitch === lang;
        btn.setAttribute("aria-selected", String(isActive));
      });
    });
  };

  const setLanguage = (lang) => {
    document.documentElement.dataset.lang = lang;
    document.documentElement.setAttribute("lang", lang);
    updateSwitchers(lang);
    applyTranslations();
    if (typeof onChange === "function") {
      onChange(lang);
    }
  };

  switchers.forEach((switcher) => {
    const toggle = getToggle(switcher);
    if (!toggle) return;
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = switcher.dataset.open === "true";
      switchers.forEach((other) => setOpenState(other, false));
      setOpenState(switcher, !isOpen);
    });
  });

  switches.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.langSwitch);
      switchers.forEach((switcher) => setOpenState(switcher, false));
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-lang-switcher]")) return;
    switchers.forEach((switcher) => setOpenState(switcher, false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    switchers.forEach((switcher) => setOpenState(switcher, false));
  });

  setLanguage(getLang());
};

const initReveal = () => {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.setAttribute("data-visible", "true"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "true");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
};

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
        if (input) {
          input.focus({ preventScroll: true });
        }
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

const initForms = () => {
  const subscribeForm = document.querySelector("[data-subscribe]");
  const subscribeStatus = document.querySelector("[data-subscribe-status]");

  if (subscribeForm && subscribeStatus) {
    subscribeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      subscribeStatus.textContent = getUiLabel("subscribeSuccess", getLang());
      subscribeForm.reset();
    });
  }

  const commentForm = document.querySelector("[data-comment-form]");
  const commentStatus = document.querySelector("[data-comment-status]");

  if (commentForm && commentStatus) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      commentStatus.textContent = getUiLabel("commentSuccess", getLang());
      commentForm.reset();
    });
  }
};

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
    '[data-filter-subitem][aria-pressed="true"]'
  );
  if (initialSub) {
    setSubActive(initialSub);
  }
};

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
  initReveal();
  initMenu();
  initForms();
  initFiltersBar();
  initLanguage(() => {
    if (typeof rerenderCatalog === "function") {
      rerenderCatalog();
    }
  });
});
