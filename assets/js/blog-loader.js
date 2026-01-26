/**
 * Blog Loader - Gère l'affichage de la liste et des détails d'article
 */
const BlogLoader = {
    data: null,

    async init() {
        console.log('[Blog] Initialisation...');
        const pageType = document.body.dataset.cmsPage;

        // Charger les données des articles
        try {
            const response = await fetch('/_data/blog.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.data = await response.json();
            console.log('[Blog] Données chargées:', this.data);
        } catch (error) {
            console.error('[Blog] Impossible de charger blog.json:', error);
            return;
        }

        if (pageType === 'blog') {
            this.renderListing();
        } else if (pageType === 'blog-article') {
            this.renderArticle();
        }
    },

    /**
     * Rendu de la LISTE des articles
     */
    renderListing() {
        const container = document.querySelector('[data-cms="blog.articles"]');
        const categoriesContainer = document.querySelector('[data-cms="blog.categories"]');
        const coverImage = document.querySelector('[data-cms="page.coverImage"]');

        if (coverImage && this.data.coverImage) coverImage.src = this.data.coverImage;

        if (!container || !this.data.articles) return;

        const articlesHTML = this.data.articles.map(article => `
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
                        <span>${article.date}</span> • 
                        <span class="article-card_category">${article.category}</span>
                    </div>
                </div>
            </a>
        `).join('');

        container.innerHTML = articlesHTML || '<div class="blog-empty"><h3>Aucun article trouvé.</h3></div>';

        // Gérer les catégories
        if (categoriesContainer) {
            const categories = [...new Set(this.data.articles.map(a => a.category))];
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

            // Filtres
            categoriesContainer.querySelectorAll('a').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cat = btn.dataset.cat;

                    categoriesContainer.querySelectorAll('a').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (cat === 'all') {
                        this.renderListing();
                    } else {
                        const filtered = this.data.articles.filter(a => a.category === cat);
                        this.updateArticlesList(filtered);
                    }
                });
            });
        }
    },

    updateArticlesList(articles) {
        const container = document.querySelector('[data-cms="blog.articles"]');
        container.innerHTML = articles.map(article => `
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
                        <span>${article.date}</span> • 
                        <span class="article-card_category">${article.category}</span>
                    </div>
                </div>
            </a>
        `).join('');
    },

    /**
     * Rendu d'un article UNIQUE
     */
    renderArticle() {
        const urlParams = new URLSearchParams(window.location.search);
        // Priorité à l'attribut data-article-id sur le body, sinon paramètre URL
        const articleId = document.body.dataset.articleId || urlParams.get('id');

        const article = this.data.articles.find(a => a.id === articleId);

        if (!article) {
            document.querySelector('#article-detail').innerHTML = `
                <div class="container" style="text-align:center; padding: 5rem 0;">
                    <h1>Article introuvable</h1>
                    <a href="/blog" class="main-btn">Retour au blog</a>
                </div>
            `;
            return;
        }

        // Mettre à jour les meta
        document.title = `${article.title} | Blog Kreasyon Design`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', article.description);

        // Mettre à jour le header/cover
        const titleEl = document.querySelector('[data-cms="article.title"]');
        const imgEl = document.querySelector('[data-cms="article.image"]');
        const dateEl = document.querySelector('[data-cms="article.date"]');
        const readEl = document.querySelector('[data-cms="article.readTime"]');
        const catEl = document.querySelector('[data-cms="article.category"]');

        if (titleEl) titleEl.textContent = article.title;
        if (imgEl) imgEl.src = article.image;
        if (dateEl) dateEl.textContent = article.date;
        if (readEl) readEl.textContent = article.readTime;
        if (catEl) catEl.textContent = article.category;

        // Rendu du contenu Markdown
        const contentEl = document.querySelector('[data-cms="article.content"]');
        if (contentEl && typeof marked !== 'undefined') {
            contentEl.innerHTML = marked.parse(article.content);
        } else if (contentEl) {
            contentEl.textContent = article.content;
        }
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => BlogLoader.init());
