import {
  DEFAULT_REACTIONS,
  DEFAULT_TAGS,
  buildPicture,
  buildReactions,
  formatDateTime,
  getCategoryLabel,
  getLang,
  getReadingTime,
  loadArticles,
  resolveText,
} from "./articles-helpers.js";

const getDateSortValue = (article) => {
  const date = new Date(article.date || 0);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const buildRelatedCard = (article, lang) => {
  const card = document.createElement("article");
  card.className = "card";
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
  tag.className = "tag";
  tag.textContent = getCategoryLabel(article.category, lang);

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

const initArticlePage = () => {
  const titleEl = document.querySelector("[data-article-title]");
  if (!titleEl) return null;

  const categoryEl = document.querySelector("[data-article-category]");
  const dateEl = document.querySelector("[data-article-date]");
  const authorEl = document.querySelector("[data-article-author]");
  const readingTimeEl = document.querySelector("[data-article-reading-time]");
  const excerptEl = document.querySelector("[data-article-excerpt]");
  const coverEl = document.querySelector("[data-article-cover]");
  const tagsEl = document.querySelector("[data-article-tags]");
  const reactionsEl = document.querySelector("[data-article-reactions]");
  const relatedGrid = document.querySelector("[data-related-grid]");

  const source =
    document.querySelector("[data-article-source]")?.dataset.articleSource ||
    "../data/articles.json";

  let cachedArticles = null;
  let currentArticle = null;

  const selectArticle = (articles) => {
    const params = new URLSearchParams(window.location.search);
    const idParam = Number(params.get("id"));
    const byId = articles.find((item) => item.id === idParam);
    if (byId) return byId;

    const featured = articles.find(
      (item) => item.featured && item.type === "article"
    );
    if (featured) return featured;

    return [...articles].sort((a, b) => getDateSortValue(b) - getDateSortValue(a))[0];
  };

  const updateMeta = (title, excerpt, imageUrl) => {
    if (title) {
      document.title = `${title} — BlogForge`;
    }

    const description = excerpt || "";
    const setContent = (selector, value) => {
      const el = document.querySelector(selector);
      if (!el || !value) return;
      el.setAttribute("content", value);
    };

    setContent("meta[name=\"description\"]", description);
    setContent("meta[property=\"og:title\"]", title);
    setContent("meta[property=\"og:description\"]", description);
    setContent("meta[property=\"og:image\"]", imageUrl);
    setContent("meta[property=\"og:url\"]", window.location.href);
  };

  const render = () => {
    if (!currentArticle) return;

    const lang = getLang();
    const title = resolveText(currentArticle.title, lang);
    const excerpt = resolveText(currentArticle.excerpt, lang);

    if (categoryEl) {
      categoryEl.textContent = getCategoryLabel(currentArticle.category, lang);
    }
    titleEl.textContent = title;
    if (dateEl) {
      dateEl.textContent = formatDateTime(currentArticle.date, currentArticle.time);
    }
    if (authorEl) {
      authorEl.textContent = currentArticle.author || "";
    }
    if (readingTimeEl) {
      readingTimeEl.textContent = getReadingTime(excerpt || "", lang);
    }
    if (excerptEl && excerpt) {
      excerptEl.textContent = excerpt;
    }

    if (tagsEl) {
      const tags = currentArticle.tags?.length
        ? currentArticle.tags
        : DEFAULT_TAGS[currentArticle.category] || ["#цікаве"];
      tagsEl.innerHTML = "";
      tags.filter(Boolean).forEach((tag) => {
        const item = document.createElement("span");
        item.className = "hash-tag";
        item.textContent = tag;
        tagsEl.appendChild(item);
      });
    }

    if (reactionsEl) {
      const reactions = currentArticle.reactions?.length
        ? currentArticle.reactions
        : DEFAULT_REACTIONS;
      const reactionsNode = buildReactions(reactions);
      reactionsEl.innerHTML = "";
      Array.from(reactionsNode.childNodes).forEach((node) => {
        reactionsEl.appendChild(node);
      });
    }

    if (coverEl) {
      coverEl.innerHTML = "";
      coverEl.appendChild(buildPicture(currentArticle.image, currentArticle.image?.alt || title));
    }

    updateMeta(title, excerpt, currentArticle.image?.jpg);

    if (relatedGrid && cachedArticles) {
      const relatedCount = Number(relatedGrid.dataset.count) || 3;
      const relatedItems = cachedArticles
        .filter((item) => item.type === "article" && item.id !== currentArticle.id)
        .sort((a, b) => getDateSortValue(b) - getDateSortValue(a))
        .slice(0, relatedCount);

      relatedGrid.innerHTML = "";
      const fragment = document.createDocumentFragment();
      relatedItems.forEach((item) => {
        fragment.appendChild(buildRelatedCard(item, lang));
      });
      relatedGrid.appendChild(fragment);
      const revealSection = relatedGrid.closest(".reveal");
      if (revealSection) {
        revealSection.setAttribute("data-visible", "true");
      }
    }
  };

  loadArticles(source)
    .then((data) => {
      cachedArticles = data;
      currentArticle = selectArticle(cachedArticles);
      render();
    })
    .catch(() => {});

  return render;
};

export default initArticlePage;
