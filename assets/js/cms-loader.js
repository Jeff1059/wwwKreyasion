/**
 * CMS Loader - Charge le contenu JSON et l'injecte dans le DOM
 * Pour Kreasyon Design avec Decap CMS
 */

const CMS = {
  dataCache: {},
  basePath: '/_data',

  /**
   * Charge un fichier JSON
   */
  async loadJSON(filename) {
    if (this.dataCache[filename]) {
      return this.dataCache[filename];
    }
    try {
      const response = await fetch(`${this.basePath}/${filename}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.dataCache[filename] = data;
      return data;
    } catch (error) {
      console.warn(`[CMS] Impossible de charger ${filename}:`, error.message);
      return null;
    }
  },

  /**
   * Initialise le chargement du contenu pour la page
   */
  async init() {
    const page = document.body.dataset.cmsPage || 'index';
    console.log(`[CMS] Initialisation pour la page: ${page}`);

    switch (page) {
      case 'index':
        await this.loadHomePage();
        break;
      case 'mentions-legales':
        await this.loadLegalPage('mentions-legales');
        break;
      case 'confidentialite':
        await this.loadLegalPage('confidentialite');
        break;
    }
  },

  /**
   * Charge la page d'accueil
   */
  async loadHomePage() {
    // Charger toutes les données en parallèle
    const [site, profil, services, competences, realisations, testimonials, faq] = await Promise.all([
      this.loadJSON('site.json'),
      this.loadJSON('profil.json'),
      this.loadJSON('services.json'),
      this.loadJSON('competences.json'),
      this.loadJSON('realisations.json'),
      this.loadJSON('testimonials.json'),
      this.loadJSON('faq.json')
    ]);

    if (site) this.renderSite(site);
    if (profil) this.renderProfil(profil);
    if (services) this.renderServices(services);
    if (competences) this.renderCompetences(competences);
    if (realisations) this.renderRealisations(realisations);
    if (testimonials) this.renderTestimonials(testimonials);
    if (faq) this.renderFAQ(faq);
  },

  /**
   * Render - Site global (banner, etc.)
   */
  renderSite(data) {
    // Banner
    const bannerTitle = document.querySelector('[data-cms="banner.title"]');
    const bannerSubtitle = document.querySelector('[data-cms="banner.subtitle"]');
    const bannerImage = document.querySelector('[data-cms="banner.image"]');

    if (bannerTitle && data.banner?.title) bannerTitle.textContent = data.banner.title;
    if (bannerSubtitle && data.banner?.subtitle) bannerSubtitle.textContent = data.banner.subtitle;
    if (bannerImage && data.banner?.image) bannerImage.src = data.banner.image;

    // Footer
    const trademark = document.querySelector('[data-cms="footer.trademark"]');
    if (trademark && data.footer?.trademark) trademark.innerHTML = `<strong>Kreasyon</strong> ${data.footer.trademark}`;
  },

  /**
   * Render - Section Profil
   */
  renderProfil(data) {
    const section = document.querySelector('#profil');
    if (!section) return;

    const title = section.querySelector('[data-cms="profil.title"]');
    const image = section.querySelector('[data-cms="profil.image"]');
    const citation = section.querySelector('[data-cms="profil.citation"]');
    const description = section.querySelector('[data-cms="profil.description"]');

    if (title && data.sectionTitle) title.innerHTML = data.sectionTitle.replace(/(\w+)$/, '<span>$1</span>');
    if (image && data.image) image.src = data.image;
    if (citation && data.citation) citation.textContent = `"${data.citation}"`;
    if (description && data.description) description.innerHTML = data.description;

    // Parcours
    const parcoursContainer = section.querySelector('[data-cms="profil.parcours"]');
    if (parcoursContainer && data.parcours) {
      const parcoursHTML = data.parcours.map(item => `
        <div class="story">
          <div class="icon"><img src="${item.icon}" alt=""></div>
          <div class="story-text">
            <p><span>${item.value}</span></p>
            <p>${item.label}</p>
          </div>
        </div>
      `).join('');
      parcoursContainer.innerHTML = parcoursHTML;
    }
  },

  /**
   * Render - Section Services
   */
  renderServices(data) {
    const section = document.querySelector('#services');
    if (!section) return;

    const title = section.querySelector('[data-cms="services.title"]');
    if (title && data.sectionTitle) title.innerHTML = data.sectionTitle.replace(/(\w+)$/, '<span>$1</span>');

    const container = section.querySelector('[data-cms="services.items"]');
    if (container && data.items) {
      const servicesHTML = data.items.map(item => `
        <div class="services-card">
          <img src="${item.image}" alt="${item.title}">
          <div class="services-card_text">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
      container.innerHTML = servicesHTML;
    }
  },

  /**
   * Render - Section Compétences
   */
  renderCompetences(data) {
    const section = document.querySelector('#competences');
    if (!section) return;

    const title = section.querySelector('[data-cms="competences.title"]');
    if (title && data.sectionTitle) title.innerHTML = data.sectionTitle.replace(/(\w+)$/, '<span>$1</span>');

    // Pills
    const pillsContainer = section.querySelector('[data-cms="competences.pills"]');
    if (pillsContainer && data.pills) {
      const pillsHTML = data.pills.map(cat => `
        <div class="pills-area">
          <div class="pill-section"><p>${cat.category} :</p></div>
          <div class="pill-name">
            ${cat.skills.map(skill => `<a href="" class="margin-none">${skill}</a>`).join('')}
          </div>
        </div>
      `).join('');
      pillsContainer.innerHTML = pillsHTML;
    }

    // Cards
    const cardsContainer = section.querySelector('[data-cms="competences.cards"]');
    if (cardsContainer && data.cards) {
      const cardsHTML = data.cards.map(card => `
        <div class="card">
          <div class="icon">${card.icon}</div>
          <div class="card-content">
            <div class="card-content_text">
              <h3>${card.title}</h3>
              ${card.items.map(item => `<p>- ${item}</p>`).join('')}
            </div>
            <div class="card-content_btn">
              <a class="main-btn" href="#contact">${card.cta}</a>
            </div>
          </div>
        </div>
      `).join('');
      cardsContainer.innerHTML = cardsHTML;
    }
  },

  /**
   * Render - Section Réalisations
   */
  renderRealisations(data) {
    const section = document.querySelector('#realisations');
    if (!section) return;

    const title = section.querySelector('[data-cms="realisations.title"]');
    if (title && data.sectionTitle) title.innerHTML = data.sectionTitle.replace(/(\w+)$/, '<span>$1</span>');

    // Pour l'instant, on gère le premier item
    const item = data.items?.[0];
    if (!item) return;

    const clientName = section.querySelector('[data-cms="realisations.client"]');
    const clientLogo = section.querySelector('[data-cms="realisations.logo"]');
    const description = section.querySelector('[data-cms="realisations.description"]');
    const techContainer = section.querySelector('[data-cms="realisations.technologies"]');
    const sliderContainer = section.querySelector('[data-cms="realisations.slides"]');

    if (clientName) clientName.textContent = item.client;
    if (clientLogo) clientLogo.src = item.logo;
    if (description) description.textContent = item.description;

    if (techContainer && item.technologies) {
      techContainer.innerHTML = item.technologies.map(tech =>
        `<div class="margin-none">${tech}</div>`
      ).join('');
    }

    if (sliderContainer && item.slides) {
      sliderContainer.innerHTML = item.slides.map((slide, idx) => `
        <div class="slide${idx === 0 ? ' active' : ''}">
          <div class="slide-content">
            <img src="${slide.image}" alt="${slide.title}">
            <div class="slide-content_text">
              <h3>${slide.title}</h3>
              <a href="${slide.linkUrl}" target="_blank" rel="noopener noreferrer">${slide.linkText}</a>
            </div>
          </div>
          <div class="slide-number">${slide.number}</div>
        </div>
      `).join('');

      // Réinitialiser le slider
      this.initSlider(sliderContainer);
    }
  },

  /**
   * Render - Section Témoignages
   */
  renderTestimonials(data) {
    const section = document.querySelector('#testimonials');
    if (!section) return;

    const title = section.querySelector('[data-cms="testimonials.title"]');
    if (title && data.sectionTitle) title.innerHTML = `<span>${data.sectionTitle}</span>`;

    const container = section.querySelector('[data-cms="testimonials.items"]');
    if (container && data.items) {
      const testimonialHTML = data.items.map(item => `
        <div class="testimonial-card">
          <p class="testimonial-feedback">" ${item.testimonial} "</p>
          <div class="testimonial-profile">
            <img src="${item.photo}" alt="${item.name}">
            <div class="testimonial-profile_text">
              <p class="testimonial-name">${item.name}</p>
              <p class="testimonial-position">${item.position}</p>
            </div>
          </div>
        </div>
      `).join('');
      container.innerHTML = testimonialHTML;
    }
  },

  /**
   * Render - Section FAQ
   */
  renderFAQ(data) {
    const section = document.querySelector('#faq');
    if (!section) return;

    const faqArea = section.querySelector('[data-cms="faq.items"]');
    if (faqArea && data.items) {
      // Trier par ordre
      const sortedItems = [...data.items].sort((a, b) => a.order - b.order);

      const faqHTML = sortedItems.map((item, idx) => `
        <div class="faq-content">
          <h4 class="faq-title">${item.question}</h4>
          <div class="faq-text${idx === 0 ? ' active' : ''}">
            <div><p>${item.answer}</p></div>
          </div>
        </div>
      `).join('');
      faqArea.innerHTML = faqHTML;

      // Réinitialiser les accordéons
      this.initFAQ(faqArea);
    }
  },

  /**
   * Charge une page légale
   */
  async loadLegalPage(pageName) {
    const data = await this.loadJSON(`legal/${pageName}.json`);
    if (!data) return;

    const title = document.querySelector('[data-cms="legal.title"]');
    const container = document.querySelector('[data-cms="legal.sections"]');

    if (title && data.headerTitle) title.textContent = data.headerTitle;

    if (container && data.sections) {
      const sectionsHTML = data.sections.map(section => `
        <div class="legal-item">
          <h2>${section.title}</h2>
          <p>${section.content}</p>
        </div>
      `).join('');
      container.innerHTML = sectionsHTML;
    }
  },

  /**
   * Initialise le slider après rendu
   */
  initSlider(container) {
    const slides = container.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.addEventListener('click', function () {
        const active = container.querySelector('.slide.active');
        if (active) active.classList.remove('active');
        slide.classList.add('active');
      });
    });
  },

  /**
   * Initialise la FAQ après rendu
   */
  initFAQ(container) {
    container.querySelectorAll('.faq-content').forEach(item => {
      const title = item.querySelector('.faq-title');
      const text = item.querySelector('.faq-text');
      if (title && text) {
        title.addEventListener('click', () => {
          text.classList.toggle('active');
        });
      }
    });
  }
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => CMS.init());
