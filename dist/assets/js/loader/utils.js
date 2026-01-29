// /assets/js/utils.js

/**
 * Charge un fichier JSON via fetch
 * @param {string} url - Chemin du fichier JSON
 * @returns {Promise<Object>} - Données JSON parsées
 */
export async function loadJSON(url) {
    // Si l'URL ne commence pas par /, http:// ou https://, ajouter /
    let absoluteUrl = url;

    if (!url.startsWith('/') && !url.startsWith('http')) {
        absoluteUrl = '/' + url;
        console.warn(`[loadJSON] URL relative détectée "${url}", conversion en "${absoluteUrl}"`);
    }

    try {
        const response = await fetch(absoluteUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} pour ${absoluteUrl}`);
        }

        return response.json();

    } catch (error) {
        console.error(`[loadJSON] Erreur chargement "${absoluteUrl}":`, error);
        throw error; // Re-throw pour que le loader puisse gérer
    }
}

/**
 * Modifie ou crée une balise meta dans le <head>
 * @param {string} name - Nom ou property de la meta (ex: "description" ou "og:title")
 * @param {string} content - Contenu de la meta
 */

export function setMeta(name, content) {
    // Cherche si la meta existe déjà (name OU property pour Open Graph)
    let meta = document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);

    // Si elle n'existe pas, on la crée
    if (!meta) {
        meta = document.createElement('meta');
        // Open Graph utilise property, les autres utilisent name
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
    }

    // Mise à jour du contenu
    meta.setAttribute('content', content);
}

/**
 * Modifie ou crée la balise canonical dans le <head>
 * @param {string} url - URL canonique de la page
 */
export function setCanonical(url) {
    let link = document.querySelector('link[rel="canonical"]');

    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }

    link.setAttribute('href', url);
}

/**
 * Injecte toutes les meta d'un coup (wrapper pratique)
 * @param {Object} metaData - Objet contenant title, description, canonical, etc.
 */
export function injectMeta(metaData) {
    // Title (obligatoire)
    if (metaData.title) {
        document.title = metaData.title;
    }

    // Meta standards
    if (metaData.description) {
        setMeta('description', metaData.description);
    }

    // Canonical
    if (metaData.canonical) {
        setCanonical(metaData.canonical);
    }

    // Open Graph (optionnels avec fallback)
    const ogTitle = metaData['og:title'] || metaData.title;
    if (ogTitle) setMeta('og:title', ogTitle);

    const ogDesc = metaData['og:description'] || metaData.description;
    if (ogDesc) setMeta('og:description', ogDesc);
    if (metaData['og:image']) {
        setMeta('og:image', metaData['og:image']);
    }
    if (metaData['og:url']) {
        setMeta('og:url', metaData['og:url']);
    }

    // Twitter Cards (optionnels)
    if (metaData['twitter:card']) {
        setMeta('twitter:card', metaData['twitter:card']);
    }
    if (metaData['twitter:title']) {
        setMeta('twitter:title', metaData['twitter:title']);
    }
    if (metaData['twitter:description']) {
        setMeta('twitter:description', metaData['twitter:description']);
    }
    if (metaData['twitter:image']) {
        setMeta('twitter:image', metaData['twitter:image']);
    }
}

/**
 * Parse markdown en HTML (si marked.js est disponible)
 * Sinon fallback simple avec conversion des sauts de ligne
 * @param {string} text - Texte markdown
 * @returns {string} - HTML généré
 */
export function parseMD(text) {
    if (!text) return '';

    // Si marked.js est chargé (via CDN)
    if (typeof marked !== 'undefined' && marked.parse) {
        return marked.parse(text);
    }

    // Fallback basique : convertir sauts de ligne
    return text.replace(/\n/g, '<br>');
}

/**
 * Affiche un loader/spinner (optionnel)
 * @param {boolean} show - true pour afficher, false pour masquer
 */
export function toggleLoader(show) {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Scroll smooth vers un élément
 * @param {string} selector - Sélecteur CSS de l'élément cible
 */
export function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
