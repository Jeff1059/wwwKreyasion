// /assets/js/page-loader.js

/**
 * Orchestrateur principal qui détecte la page et charge le bon loader
 */
const PageLoader = {
    /**
     * Mapping des pages vers leurs loaders
     * Ajouter une page = ajouter 1 ligne ici
     */
    loaderMap: {
        'test': './homepage.js',
        'mentions-legales': './legal.js',
        'politique-confidentialite': './legal.js',
        'blog': './blog.js',
        'blog-article': './blog.js'
    },

    /**
     * Données partagées entre toutes les pages
     * Chargées une seule fois au démarrage
     */
    sharedData: {
        footer: null
    },

    /**
     * Point d'entrée principal
     */
    async init() {
        // Détecte quelle page charger (depuis data-cms-page)
        const page = document.documentElement.dataset.cmsPage ||
            document.body.dataset.cmsPage ||
            'test';

        console.log(`[PageLoader] Page détectée: ${page}`);

        try {
            // 1️⃣ Charger le footer (partagé sur toutes les pages)
            if (!this.sharedData.footer) {
                await this.loadFooter();
            }

            // 2️⃣ Charger le loader spécifique à la page
            const loaderPath = this.loaderMap[page];

            if (!loaderPath) {
                console.warn(`[PageLoader] Aucun loader trouvé pour "${page}"`);
                return;
            }

            console.log(`[PageLoader] Chargement du loader: ${loaderPath}`);

            // Import dynamique du module
            const module = await import(loaderPath);

            // Vérification que le module a bien une fonction init()
            if (typeof module.init === 'function') {
                await module.init(page, this.sharedData);
                console.log(`[PageLoader] Page "${page}" chargée avec succès ✓`);
            } else {
                console.error(`[PageLoader] Le module ${loaderPath} n'exporte pas de fonction init()`);
            }

        } catch (error) {
            console.error(`[PageLoader] Erreur lors du chargement:`, error);
            this.showError();
        }
    },

    /**
     * Charge le footer partagé (une seule fois)
     */
    async loadFooter() {
        try {
            const response = await fetch('/content/_data/homepage/footer.json');

            if (!response.ok) {
                throw new Error(`Footer introuvable (HTTP ${response.status})`);
            }

            const footer = await response.json();
            this.sharedData.footer = footer;

            // Render le footer immédiatement
            this.renderFooter(footer);

            console.log('[PageLoader] Footer chargé et affiché ✓');
        } catch (error) {
            console.error('[PageLoader] Erreur chargement footer:', error);
            // Footer par défaut si erreur
            this.renderFooter({
                copyright: '© 2026 Kreasyon Design',
                links: [],
                social: []
            });
        }
    },

    /**
     * Affiche le footer dans le DOM
     */
    renderFooter(footer) {
        const footerEl = document.querySelector('footer');
        if (!footerEl) {
            console.warn('[PageLoader] Élément <footer> introuvable dans le HTML');
            return;
        }

        footerEl.innerHTML = `
            <div class="container">
                <div class="social">
                    ${footer.social.map(item => `<a href="${item.url}" class="${item.class}"><span>${item.platform}</span></a>`).join('')}
                </div>
                <div class="footer-bottom">
                    <div class="footer-nav">
                        ${footer.links.map(item => `<a href="${item.url}" class="${item.class}"><span>${item.label}</span></a>`).join('')}
                    </div>
                    <p class="footer-legal">
                        ${footer.copyright}
                    </p>
                </div>
            </div>
        `;
    },

    /**
     * Affiche un message d'erreur si le chargement échoue
     */
    showError() {
        const main = document.querySelector('main') || document.body;
        main.innerHTML = `
            <div class="error-message">
                <h1>Erreur de chargement</h1>
                <p>Impossible de charger le contenu de la page.</p>
                <button onclick="location.reload()">Recharger la page</button>
            </div>
        `;
    }
};

// Démarrage automatique quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    PageLoader.init();
});
