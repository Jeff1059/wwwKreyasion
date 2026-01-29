// /assets/js/loaders/legal.js
import { loadJSON, injectMeta, parseMD } from './utils.js';

/**
 * Loader pour les pages légales (mentions-légales, politique-confidentialité)
 * Un seul loader pour toutes les pages légales, adaptable selon le slug
 */
export async function init(page, sharedData) {
    console.log(`[LegalLoader] Chargement de la page: ${page}`);

    try {
        // Le nom de la page correspond au nom du fichier JSON
        const data = await loadJSON(`content/_data/legal/${page}.json`);

        // 1 Injecter les meta
        if (data.meta) {
            injectMeta(data.meta);
            console.log(`[LegalLoader] Meta injectées pour ${page} ✓`);
        }

        // 2 Render le contenu
        renderLegalContent(data);
        console.log(`[LegalLoader] Contenu de ${page} rendu ✓`);

    } catch (error) {
        console.error(`[LegalLoader] Erreur chargement ${page}:`, error);
        showError(`Impossible de charger la page ${page}`);
    }
}

/**
 * Affiche le contenu d'une page légale
 */
function renderLegalContent(data) {
    const cover = document.getElementById('cover');
    const container = document.querySelector('.container.boxed');

    if (cover) {
        // Correction du chemin d'image si nécessaire (enlever ../ si on est à la racine)
        const imagePath = data.coverImage.startsWith('../') ? data.coverImage.substring(3) : data.coverImage;

        cover.innerHTML = `
            <img alt="" src="${imagePath}">
            <div class="container">
                <div class="page-header">
                    <h1 class="section-title">${data.headerTitle}</h1>
                </div>
            </div>
        `;
    }

    if (container) {
        container.innerHTML = data.sections.map(section => `
            <div class="legal-item">
                <h2>${section.title}</h2>
                <div class="legal-content">
                    ${parseMD(section.content)}
                    ${section.subsections ? `
                        <div class="legal-subsections">
                            ${section.subsections.map(sub => `
                                <div class="legal-subsection">
                                    <h3>${sub.title}</h3>
                                    <div class="legal-content">${parseMD(sub.content)}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } else {
        console.warn('[LegalLoader] Aucun conteneur [data-cms="legal.sections"] trouvé');
    }
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="error-message" style="text-align:center; padding: 100px 20px;">
                <h2>Oups !</h2>
                <p>${message}</p>
                <a href="/" class="main-btn">Retour à l'accueil</a>
            </div>
        `;
    }
}
