const I18N = {
  uk: {
    categories: {
      technology: "Технології",
      business: "Бізнес",
      design: "Дизайн",
      science: "Наука",
      lifestyle: "Lifestyle",
    },
    labels: {
      podcast: "Подкаст",
      video: "Відео",
      article: "Стаття",
    },
  },
  en: {
    categories: {
      technology: "Technology",
      business: "Business",
      design: "Design",
      science: "Science",
      lifestyle: "Lifestyle",
    },
    labels: {
      podcast: "Podcast",
      video: "Video",
      article: "Article",
    },
  },
  ru: {
    categories: {
      technology: "Технологии",
      business: "Бизнес",
      design: "Дизайн",
      science: "Наука",
      lifestyle: "Lifestyle",
    },
    labels: {
      podcast: "Подкаст",
      video: "Видео",
      article: "Статья",
    },
  },
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

const cache = new Map();

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

const getTypeLabel = (type, lang) => {
  const dict = I18N[lang] || I18N.uk;
  return dict.labels[type] || type;
};

const formatDateTime = (value, time) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || "";
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

const loadArticles = async (source = "data/articles.json") => {
  if (cache.has(source)) {
    return cache.get(source);
  }

  const tryFetch = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to load articles data");
    }
    return response.json();
  };

  let data;
  try {
    data = await tryFetch(source);
  } catch (error) {
    const fallback =
      source.startsWith("../") ? source.replace(/^\.\.\//, "/") : null;
    if (!fallback || fallback === source) {
      throw error;
    }
    data = await tryFetch(fallback);
  }

  cache.set(source, data);
  return data;
};

export {
  DEFAULT_REACTIONS,
  DEFAULT_TAGS,
  buildPicture,
  buildReactions,
  buildTagList,
  formatDateTime,
  getCategoryLabel,
  getLang,
  getReadingTime,
  getTypeLabel,
  loadArticles,
  resolveText,
};
