// /assets/js/loaders/blog.js
import { loadJSON, injectMeta, parseMD } from './utils.js';

export async function init(page, sharedData) {
    console.log(`[BlogLoader] Initialisation mode: ${page}`);

    try {
        if (page === 'blog') {
            await loadBlogListing();
        } else if (page === 'blog-article') {
            await loadBlogArticle();
        }
    } catch (error) {
        console.error('[BlogLoader] Erreur:', error);
        showError('Impossible de charger le blog');
    }
}

/**
 * Charge et affiche la page LISTE des articles
 */
async function loadBlogListing() {
    console.log('[BlogLoader] Chargement de la liste...');

    // Charger blog.json (contient meta + articles)
    const data = await loadJSON('content/_data/blog/blog.json');

    // 1️⃣ Injecter les meta de la page blog
    if (data.meta) {
        injectMeta(data.meta);
        console.log('[BlogLoader] Meta page liste injectées ✓');
    }

    // 2️⃣ Render
    renderListing(data);
    setupCategoryFilters(data);

    console.log('[BlogLoader] Liste affichée ✓');
}

/**
 * Charge et affiche un article UNIQUE
 */
async function loadBlogArticle() {
    console.log('[BlogLoader] Chargement d\'un article...');

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = document.body.dataset.articleId || urlParams.get('id');

    if (!articleId) {
        showError('Aucun article spécifié');
        return;
    }

    try {
        // Charger l'article individuel
        const article = await loadJSON(`content/_data/blog/posts/${articleId}.json`);

        console.log('[BlogLoader] Article chargé:', article);

        // 1️⃣ Injecter les meta DE L'ARTICLE
        if (article.meta) {
            injectMeta(article.meta);
            console.log('[BlogLoader] Meta article injectées ✓');
        }

        // 2️⃣ Render l'article
        renderArticle(article);

    } catch (error) {
        console.error(`[BlogLoader] Article "${articleId}" introuvable:`, error);
        showArticleNotFound();
    }
}

/**
 * Affiche la liste des articles
 */
function renderListing(data) {
    const container = document.querySelector('[data-cms="blog.articles"]');
    const coverImage = document.querySelector('[data-cms="page.coverImage"]');

    if (coverImage && data.coverImage) {
        coverImage.src = data.coverImage;
    }

    if (!container || !data.articles || data.articles.length === 0) {
        if (container) {
            container.innerHTML = '<div class="blog-empty"><h3>Aucun article trouvé.</h3></div>';
        }
        return;
    }

    const articlesHTML = data.articles.map(article => `
        <a href="/blog/article.html?id=${article.id}" class="article-card">
            <div class="article-card_image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="article-card_content">
                <div class="article-card_header">
                    <h2 class="article-card_title">${article.title}</h2>
                    <span class="article-card_read-time">${article.readTime}</span>
                </div>
                <p class="article-card_description">${article.description}</p>
                <div class="article-card_meta">
                    <span>${formatDate(article.date)}</span> • 
                    <span class="article-card_category">${article.category}</span>
                </div>
            </div>
        </a>
    `).join('');

    container.innerHTML = articlesHTML;
}

/**
 * Met en place les filtres par catégorie
 */
function setupCategoryFilters(data) {
    const categoriesContainer = document.querySelector('[data-cms="blog.categories"]');

    if (!categoriesContainer || !data.articles) return;

    const categories = [...new Set(data.articles.map(a => a.category))];

    const categoriesHTML = `
        <ul>
            <li class="blog-toc_category">
                <a href="#" class="active" data-cat="all">Tous les articles</a>
            </li>
            ${categories.map(cat => `
                <li class="blog-toc_category">
                    <a href="#" data-cat="${cat}">${cat}</a>
                </li>
            `).join('')}
        </ul>
    `;

    categoriesContainer.innerHTML = categoriesHTML;

    categoriesContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.dataset.cat;

            categoriesContainer.querySelectorAll('a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (cat === 'all') {
                renderListing(data);
            } else {
                const filtered = {
                    ...data,
                    articles: data.articles.filter(a => a.category === cat)
                };
                renderListing(filtered);
            }
        });
    });
}

/**
 * Affiche un article complet
 */
function renderArticle(article) {
    const titleEl = document.querySelector('[data-cms="article.title"]');
    const imgEl = document.querySelector('[data-cms="article.image"]');
    const dateEl = document.querySelector('[data-cms="article.date"]');
    const readEl = document.querySelector('[data-cms="article.readTime"]');
    const catEl = document.querySelector('[data-cms="article.category"]');

    if (titleEl) titleEl.textContent = article.title;
    if (imgEl) imgEl.src = article.image;
    if (dateEl) dateEl.textContent = formatDate(article.date);
    if (readEl) readEl.textContent = article.readTime;
    if (catEl) catEl.textContent = article.category;

    const contentEl = document.querySelector('[data-cms="article.content"]');
    if (contentEl) {
        contentEl.innerHTML = parseMD(article.content);
    }

    console.log('[BlogLoader] Article rendu ✓');
}

function showArticleNotFound() {
    const detailContainer = document.querySelector('#article-detail') ||
        document.querySelector('main');

    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="container" style="text-align:center; padding: 5rem 0;">
                <h1>Article introuvable</h1>
                <p>Cet article n'existe pas ou a été supprimé.</p>
                <a href="/blog" class="main-btn">Retour au blog</a>
            </div>
        `;
    }
}

function showError(message) {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="error-message">
                <h2>Erreur</h2>
                <p>${message}</p>
                <a href="/blog" class="btn">Retour au blog</a>
            </div>
        `;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}
