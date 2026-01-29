// /assets/js/loader/homepage.js
import { loadJSON, injectMeta, parseMD } from './utils.js';

/**
 * Loader pour la page d'accueil
 * Charge toutes les sections depuis des JSON séparés
 */
export async function init(page, sharedData) {
    console.log('[HomeLoader] Initialisation de la page d\'accueil...');

    try {
        // 1️⃣ PRIORITÉ : Charger et injecter les meta (SEO)
        const meta = await loadJSON('/content/_data/homepage/head.json');
        injectMeta(meta);
        console.log('[HomeLoader] Meta injectées ✓');

        // 2️⃣ Charger toutes les sections en PARALLÈLE (optimisation)
        console.log('[HomeLoader] Chargement des sections...');

        const [hero, profil, services, competences, realisations, testimonials, faq] = await Promise.all([
            loadJSON('/content/_data/homepage/hero.json'),
            loadJSON('/content/_data/homepage/profil.json'),
            loadJSON('/content/_data/homepage/services.json'),
            loadJSON('/content/_data/homepage/competences.json'),
            loadJSON('/content/_data/homepage/realisations.json'),
            loadJSON('/content/_data/homepage/testimonials.json'),
            loadJSON('/content/_data/homepage/faq.json')
        ]);

        console.log('[HomeLoader] Toutes les sections chargées ✓');

        // 3️⃣ Render séquentiel (ordre visuel de la page)
        renderHero(hero);
        renderProfil(profil);
        renderServices(services);
        renderCompetences(competences);
        renderRealisations(realisations);
        renderTestimonials(testimonials);
        renderFAQ(faq);

        console.log('[HomeLoader] Page d\'accueil rendue ✓');

        // 🔥 IMPORTANT : Initialiser les composants APRÈS render
        if (typeof initSliders === 'function') {
            initSliders();
        }

        if (typeof initFAQToggles === 'function') {
            initFAQToggles();
        }

        if (typeof initRevealAnimations === 'function') {
            initRevealAnimations();
        }

        // 🆕 Initialisation du formulaire de contact
        initContactForm();

        console.log('[HomeLoader] Page chargée et composants initialisés ✓');

    } catch (error) {
        console.error('[HomeLoader] Erreur lors du chargement:', error);
        showError('Impossible de charger la page d\'accueil');
    }
}

/**
 * Affiche la section Hero/Banner
 */
function renderHero(data) {
    const heroEl = document.getElementById('banner');
    if (!heroEl) {
        console.warn('[HomeLoader] Élément .banner introuvable');
        return;
    }

    heroEl.innerHTML = `
        <div class="container">
            <div class="banner-content">
                <img class="banner-content_image" src="${data.image}" alt="bannière" preload="true">
                <div class="banner-content_text">
                    <h1>${data.title}</h1>
                    <p>${data.subtitle}</p>
                    ${data.cta ? `
                        <a class="main-btn" href="${data.cta.link}">${data.cta.text}</a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Affiche la section Profil
 */
function renderProfil(data) {
    const profilEl = document.getElementById('profil');
    if (!profilEl) {
        console.warn('[HomeLoader] Élément .profil introuvable');
        return;
    }

    profilEl.innerHTML = `
        <div class="container">
            <h2 class="undertitle">${data.sectionTitle}</h2>
            <div class="flex">
                <div class="profil-design">
                    <img class="profil-card_image" src="${data.image}" alt="" height="215" width="153">
                    <div class="profil-card">
                            <div class="profil-card_content">
                                <div class="profil-card_text">
                                    <h3>${data.citation}</h3>
                                    <p>${data.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="parcours">
                    <div class="story">
                        <div class="icon"><img src="${data.parcours[0].icon}" alt=""></div>
                        <div class="story-text">
                            <p><span>${data.parcours[0].value}</span></p>
                            <p>${data.parcours[0].label}</p>
                        </div>
                    </div>
      
                    <div class="story">
                        <div class="icon"><img src="${data.parcours[1].icon}" alt=""></div>
                        <div class="story-text">
                            <p><span>${data.parcours[1].value}</span></p>
                            <p>${data.parcours[1].label}</p>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

/**
 * Affiche la section Services
 */
function renderServices(data) {
    const servicesEl = document.getElementById('services');
    if (!servicesEl) {
        console.warn('[HomeLoader] Élément #services introuvable');
        return;
    }

    servicesEl.innerHTML = `
        <div class="container">
        <h2 class="undertitle">${data.sectionTitle}</h2>
            <div class="services-area">
                <div class="services-card">
                    <div class="services-card_head">
                        <img src="${data.items[0].image}" alt="Création de votre site vitrine">
                        <h3>${data.items[0].title}</h3>
                    </div>
                    <div class="description"><p>${data.items[0].description}</p>
                    </div>
                </div>
      
                <div class="services-card">
                    <div class="services-card_head">
                        <img src="${data.items[1].image}" alt="Refonte &amp; amélioration UX">
                        <h3>${data.items[1].title}</h3>
                    </div>
                    <div class="description"><p>${data.items[1].description}</p>
                    </div>
                </div>
      
                <div class="services-card">
                    <div class="services-card_head">
                        <img src="${data.items[2].image}" alt="Intégration HTML / CSS / Javascript">
                        <h3>${data.items[2].title}</h3>
                    </div>
                    <div class="description"><p>${data.items[2].description}</p>
                    </div>
                </div>
            </div>
        </div>

    `;
}

/**
 * Affiche la section Competences
 */
function renderCompetences(data) {
    const competencesEl = document.getElementById('competences');
    if (!competencesEl) {
        console.warn('[HomeLoader] Élément #competences introuvable');
        return;
    }

    competencesEl.innerHTML = `
       <div class="container">
            <h2 class="undertitle">${data.sectionTitle}</h2>
            <div class="competences-content">
                <div class="competences-pills">
                    <div class="pills-area">
                        <div class="pill-section">${data.pills[0].category}</div>
                        <div class="pill-name">
                            ${data.pills[0].skills.map(item => `<a href="" class="margin-none">${item}</a>`).join('')}
                        </div>
                    </div>
                    <div class="pills-area">
                        <div class="pill-section">${data.pills[1].category}</div>
                        <div class="pill-name">
                            ${data.pills[1].skills.map(item => `<a href="" class="margin-none">${item}</a>`).join('')}
                        </div>
                    </div>
                    <div class="pills-area">
                        <div class="pill-section">${data.pills[2].category}</div>
                        <div class="pill-name">
                            ${data.pills[2].skills.map(item => `<a href="" class="margin-none">${item}</a>`).join('')}
                        </div>
                    </div>
                    <div class="pills-area">
                        <div class="pill-section">${data.pills[3].category}</div>
                        <div class="pill-name">
                            ${data.pills[3].skills.map(item => `<a href="" class="margin-none">${item}</a>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="competences-grid">
                    <div class="card">
                        <div class="icon"><img src="${data.cards[0].icon}" alt=""></div>
                        <div class="card-content">
                            <div class="card-content_text">
                                <h3>${data.cards[0].title}</h3>
                                <p>${data.cards[0].items}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="icon"><img src="${data.cards[1].icon}" alt=""></div>
                        <div class="card-content">
                            <div class="card-content_text">
                                <h3>${data.cards[1].title}</h3>
                                <p>${data.cards[1].items}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="icon"><img src="${data.cards[2].icon}" alt=""></div>
                        <div class="card-content">
                            <div class="card-content_text">
                                <h3>${data.cards[2].title}</h3>
                                <p>${data.cards[2].items}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRealisations(data) {
    const realisationsEl = document.getElementById('realisations');
    if (!realisationsEl) {
        console.warn('[HomeLoader] Élément #realisations introuvable');
        return;
    }

    realisationsEl.innerHTML = `
        <div class="container">
            <h2 class="undertitle">${data.sectionTitle}</h2>
            <div class="work-content">
                <div class="work-content_text">
                    <a href="${data.items[0].url}">
                        <div class="work-content_client_desc">
                            <h3 class="client">${data.items[0].client}</h3>
                            <div class="wrapper-logo">
                                <img src="${data.items[0].logo}" class="client-logo" alt="${data.items[0].client}">
                            </div>
                        </div>
                    </a>
                    <div class="description">
                        ${data.items[0].description}
                    </div>
                    <div class="pill-name">
                        ${data.items[0].technologies.map(item => `<div class="margin-none">${item}</div>`).join('')}
                    </div>
                </div>

                <div class="slider">
                    <div class="slide active">
                        <em class="slide-badge">Voir</em>
                        <div class="slide-content">
                            <img src="${data.items[0].slides[0].image}" alt="slide-1">
                            <div class="slide-content_text">
                                <h3>${data.items[0].slides[0].title}</h3>
                                <a href="${data.items[0].slides[0].linkUrl}" target="_blank" rel="noopener noreferrer">${data.items[0].slides[0].linkText}</a>
                            </div>
                        </div>
                        <div class="slide-number">1</div>
                    </div>
                    <div class="slide">
                        <em class="slide-badge">Voir</em>
                        <div class="slide-content">
                            <img src="${data.items[0].slides[1].image}" alt="slide-2">
                            <div class="slide-content_text">
                                <h3>${data.items[0].slides[1].title}</h3>
                                <a href="${data.items[0].slides[1].linkUrl}" target="_blank" rel="noopener noreferrer">${data.items[0].slides[1].linkText}</a>
                            </div>
                        </div>
                        <div class="slide-number">2</div>
                    </div>
                    <div class="slide">
                        <em class="slide-badge">Voir</em>
                        <div class="slide-content">
                            <img src="${data.items[0].slides[2].image}" alt="slide-3">
                            <div class="slide-content_text">
                                <h3>${data.items[0].slides[2].title}</h3>
                                <a href="${data.items[0].slides[2].linkUrl}" target="_blank" rel="noopener noreferrer">${data.items[0].slides[2].linkText}</a>
                            </div>
                        </div>
                        <div class="slide-number">3</div>
                    </div>
                </div>
            </div>
        </div>
            </div>
    `;
}

/**
 * Affiche la section Testimonials
 */
function renderTestimonials(data) {
    const testimonialsEl = document.getElementById('testimonials');
    if (!testimonialsEl) {
        console.warn('[HomeLoader] Élément #testimonials introuvable');
        return;
    }

    testimonialsEl.innerHTML = `
            <div class="container">
                <div class="testimonial-title">
                    <h2 class="undertitle">${data.sectionTitle}</h2>
                    <img src="${data.image}" alt="avis-image">
                </div>
                ${data.items.map(item => `<div class="testimonial">
                    <div class="testimonial-card">  
                        <p class="testimonial-feedback">${item.testimonial}</p>
                        <div class="testimonial-profile">
                            <img src="${item.photo}" alt="${item.name}">
                            <div class="testimonial-profile_text">
                                <p class="testimonial-name">${item.name}</p>
                                <p class="testimonial-position">${item.position}</p>
                            </div>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
    `;
}


/**
 * Affiche la section FAQ
 */
function renderFAQ(data) {
    const faqEl = document.getElementById('faq');
    if (!faqEl) {
        console.warn('[HomeLoader] Élément #faq introuvable');
        return;
    }

    faqEl.innerHTML = `
        <div class="faq-area">
            <img src="${data.image}" alt="faq-image">
            <h3>${data.sectionTitle}</h3>
            <div data-cms="faq.items">
                ${data.items.map(item => `
                        <div class="faq-content">
                            <h4 class="faq-title">${item.question}</h4>
                            <div class="faq-text">
                                <div><p>${item.answer}</p></div>
                            </div>
                        </div>
                    `).join('')}
            </div>
        </div>

    `;
}

/**
 * Initialise la gestion du formulaire de contact
 */
function initContactForm() {
    const formEl = document.getElementById("contact-form");
    if (!formEl) return;

    console.log('[HomeLoader] Initialisation du formulaire de contact...');

    formEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fd = new FormData(formEl);
        const payload = {
            nom: fd.get("Nom"),
            prenom: fd.get("Prenom"),
            entreprise: fd.get("Entreprise"),
            email: fd.get("email"),
            demande: fd.get("demande"),
            turnstileToken: fd.get("cf-turnstile-response"),
        };

        const r = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const txt = await r.text();
        if (r.ok) {
            formEl.reset();
            // Reset Turnstile (important si on veut renvoyer un message)
            if (window.turnstile) turnstile.reset();
            // Désactiver le bouton à nouveau
            const btn = document.getElementById('submit-button');
            if (btn) btn.disabled = true;

            alert("Message envoyé.");
        } else {
            console.log("Erreur API:", r.status, txt);
            alert("Erreur d’envoi (captcha ou serveur).");
        }
    });
}

/**
 * Affiche un message d'erreur dans le contenu principal
 */
function showError(message) {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button onclick="location.reload()">Réessayer</button>
            </div>
        `;
    }
}
