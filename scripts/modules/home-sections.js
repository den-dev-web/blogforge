import {
  DEFAULT_REACTIONS,
  DEFAULT_TAGS,
  buildPicture,
  buildReactions,
  buildTagList,
  formatDateTime,
  getCategoryLabel,
  getLang,
  getTypeLabel,
  loadArticles,
  resolveText,
} from "./articles-helpers.js";

const getDateSortValue = (article) => {
  const date = new Date(article.date || 0);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const buildHomeCard = (article, lang, { accentTag = false } = {}) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.variant = accentTag ? "featured" : "default";
  card.dataset.category = article.category;
  card.dataset.type = article.type;

  const articleHref = `article.html?id=${encodeURIComponent(article.id)}`;
  const titleText = resolveText(article.title, lang);

  const mediaLink = document.createElement("a");
  mediaLink.className = "card__media card__link";
  mediaLink.href = articleHref;
  mediaLink.setAttribute("aria-label", titleText);
  mediaLink.appendChild(buildPicture(article.image, article.image?.alt || titleText));

  const body = document.createElement("div");
  body.className = "card__body";

  const tag = document.createElement("span");
  tag.className = accentTag ? "tag tag--accent" : "tag";
  tag.textContent =
    article.type === "article"
      ? getCategoryLabel(article.category, lang)
      : getTypeLabel(article.type, lang);

  const title = document.createElement("h3");
  title.className = "card__title";
  const titleLink = document.createElement("a");
  titleLink.className = "card__link";
  titleLink.href = articleHref;
  titleLink.textContent = titleText;
  title.appendChild(titleLink);

  const excerpt = document.createElement("p");
  excerpt.className = "card__excerpt";
  excerpt.textContent = resolveText(article.excerpt, lang);

  const meta = document.createElement("div");
  meta.className = "card__meta";

  const date = document.createElement("span");
  date.textContent = formatDateTime(article.date, article.time);

  const author = document.createElement("span");
  author.textContent = article.author || "";

  meta.append(date, author);

  const tags = article.tags?.length
    ? article.tags
    : DEFAULT_TAGS[article.category] || ["#цікаве"];

  const reactions = article.reactions?.length
    ? article.reactions
    : DEFAULT_REACTIONS;

  body.append(tag, title, excerpt, meta, buildTagList(tags), buildReactions(reactions));
  card.append(mediaLink, body);

  return card;
};

const renderGrid = (grid, items, options) => {
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  items.forEach((article) => {
    fragment.appendChild(buildHomeCard(article, getLang(), options));
  });
  grid.appendChild(fragment);
};

const initHomeSections = () => {
  const popularGrid = document.querySelector("[data-popular-grid]");
  const mediaGrid = document.querySelector("[data-media-grid]");
  if (!popularGrid && !mediaGrid) return null;

  const source =
    popularGrid?.dataset.source ||
    mediaGrid?.dataset.source ||
    "../data/articles.json";

  let cachedArticles = null;

  const render = () => {
    if (!cachedArticles) return;

    const articles = cachedArticles.filter(Boolean);
    const sortedArticles = [...articles].sort(
      (a, b) => getDateSortValue(b) - getDateSortValue(a)
    );

    if (popularGrid) {
      const count = Number(popularGrid.dataset.count) || 3;
      const featured = articles.filter(
        (item) => item.featured && item.type === "article"
      );
      const featuredIds = new Set(featured.map((item) => item.id));
      const fallback = sortedArticles.filter(
        (item) => item.type === "article" && !featuredIds.has(item.id)
      );
      const popularItems = [...featured, ...fallback].slice(0, count);
      renderGrid(popularGrid, popularItems, { accentTag: true });
    }

    if (mediaGrid) {
      const count = Number(mediaGrid.dataset.count) || 2;
      const mediaItems = articles.filter((item) => item.type !== "article");
      const mediaIds = new Set(mediaItems.map((item) => item.id));
      const fallback = sortedArticles.filter(
        (item) => item.type === "article" && !mediaIds.has(item.id)
      );
      const filledMedia = [...mediaItems, ...fallback].slice(0, count);
      renderGrid(mediaGrid, filledMedia, { accentTag: false });
    }
  };

  loadArticles(source)
    .then((data) => {
      cachedArticles = data;
      render();
    })
    .catch(() => {
      if (popularGrid) popularGrid.innerHTML = "";
      if (mediaGrid) mediaGrid.innerHTML = "";
    });

  return render;
};

export default initHomeSections;
