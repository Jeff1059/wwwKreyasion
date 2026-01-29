document.addEventListener('DOMContentLoaded', () => {
    const config = {
        offresParPage: 5,
        conteneurOffres: '.col-md-8',
        conteneurPagination: '#pagination-container',
        selecteurOffres: '.offre-item',
        compteurOffres: '#job-count-number'
    };

    const state = {
        currentPage: 1,
        totalOffres: 0,
        totalPages: 0,
        filtres: {
            localisation: '',
            secteur: '',
            domaine: '',
            teletravail: '',
            search: ''
        },
        offresFiltrees: []
    };

    function init() {
        updateTagText();
        initFiltres();
        filtrerEtAfficher(); // affichage initial
        initPagination();
    }

    function updateTagText() {
        document.querySelectorAll('.job-tag').forEach(tag => {
            const value = tag.dataset.value;
            let textElement = tag.querySelector('.tag-text');
            if (!textElement) {
                textElement = document.createElement('span');
                textElement.classList.add('tag-text');
                tag.appendChild(textElement);
            }
            textElement.textContent = (tag.dataset.filter === 'teletravail' && value === 'full')
                ? 'Full remote'
                : value;
        });
    }

    function initFiltres() {
        const selects = {
            localisation: document.getElementById('localisation-select'),
            secteur: document.getElementById('secteur-select'),
            domaine: document.getElementById('domaine-select'),
            teletravail: document.getElementById('teletravail-select')
        };
        const searchInput = document.querySelector('.search-section input');
        const searchButton = document.querySelector('.search-section button');
        const applyButton = document.getElementById('apply-filters');
        const clearButton = document.getElementById('clear-filters');

        populateFilters(selects);

        $('.filter-select').selectric({
            maxHeight: 300,
            disableOnMobile: true,
            nativeOnMobile: true
        });

        applyButton.addEventListener('click', () => {
            updateFiltres(selects, searchInput.value);
            filtrerEtAfficher();
        });

        clearButton.addEventListener('click', () => {
            Object.values(selects).forEach(select => {
                select.value = '';
                $(select).selectric('refresh');
            });
            searchInput.value = '';
            state.filtres = { localisation: '', secteur: '', domaine: '', teletravail: '', search: '' };
            filtrerEtAfficher();
        });

        searchButton.addEventListener('click', () => {
            state.filtres.search = searchInput.value.toLowerCase();
            filtrerEtAfficher();
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                state.filtres.search = searchInput.value.toLowerCase();
                filtrerEtAfficher();
            }
        });
    }

    function updateFiltres(selects, searchText) {
        state.filtres.localisation = selects.localisation.value;
        state.filtres.secteur = selects.secteur.value;
        state.filtres.domaine = selects.domaine.value;
        state.filtres.teletravail = selects.teletravail.value;
        state.filtres.search = searchText.toLowerCase();
    }

    function populateFilters(selects) {
        const sets = {
            localisation: new Set(),
            secteur: new Set(),
            domaine: new Set(),
            teletravail: new Set()
        };

        document.querySelectorAll(config.selecteurOffres).forEach(offre => {
            offre.querySelectorAll('.job-tag').forEach(tag => {
                const type = tag.dataset.filter;
                const value = tag.dataset.value;
                if (sets[type]) sets[type].add(value);
            });
        });

        for (const [key, select] of Object.entries(selects)) {
            const defaultOption = select.querySelector('option[value=""]')?.cloneNode(true);
            select.innerHTML = '';
            if (defaultOption) select.appendChild(defaultOption);

            Array.from(sets[key]).sort().forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                select.appendChild(option);
            });
        }
    }

    function filtrerEtAfficher() {
        const toutesOffres = Array.from(document.querySelectorAll(config.selecteurOffres));
        const visibles = [];

        toutesOffres.forEach(offre => {
            if (checkOffreVisibility(offre)) {
                visibles.push(offre);
                offre.style.display = 'block'; // affichage géré après par pagination
            } else {
                offre.style.display = 'none';
            }
        });

        state.offresFiltrees = visibles;
        state.totalOffres = visibles.length;
        state.totalPages = Math.ceil(visibles.length / config.offresParPage);
        state.currentPage = 1;

        afficherPage(1);
        genererPagination();
        document.querySelector(config.compteurOffres).textContent = visibles.length;
    }

    function checkOffreVisibility(offre) {
        const titre = offre.querySelector('h2').textContent.toLowerCase();
        const description = offre.querySelector('h3').textContent.toLowerCase();

        let contenuRecherche = `${titre} ${description}`;

        // 🔍 Ajout du contenu des tags à la recherche
        const tags = offre.querySelectorAll('.job-tag');
        tags.forEach(tag => {
            contenuRecherche += ' ' + tag.dataset.value.toLowerCase();
        });

        // Supprimer les accents
        const recherche = state.filtres.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const contenu = contenuRecherche.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (recherche && !contenu.includes(recherche)) {
            return false;
        }


        // 🔁 Vérification des filtres dropdowns
        for (const tag of tags) {
            const type = tag.dataset.filter;
            const value = tag.dataset.value;
            if (state.filtres[type] && state.filtres[type] !== value) {
                return false;
            }
        }

        return true;
    }

    function afficherPage(page) {
        const start = (page - 1) * config.offresParPage;
        const end = start + config.offresParPage;

        state.offresFiltrees.forEach((offre, index) => {
            offre.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    }

    function initPagination() {
        const container = document.querySelector(config.conteneurPagination);
        container.addEventListener('click', (e) => {
            e.preventDefault();
            if (!e.target.classList.contains('page-link')) return;

            const page = e.target.dataset.page;
            if (page === 'prev' && state.currentPage > 1) {
                changerPage(state.currentPage - 1);
            } else if (page === 'next' && state.currentPage < state.totalPages) {
                changerPage(state.currentPage + 1);
            } else if (!isNaN(parseInt(page))) {
                changerPage(parseInt(page));
            }
        });
    }

    function genererPagination() {
        const container = document.querySelector(config.conteneurPagination);
        if (!container) return;

        let html = `
            <nav aria-label="Pagination">
                <ul class="pagination justify-content-center w-100">
                    <li class="page-item ${state.currentPage === 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#" data-page="prev">Précédent</a>
                    </li>`;

        const pages = calculerPages();
        pages.forEach(p => {
            html += (p === '...')
                ? `<li class="page-item disabled"><span class="page-link">...</span></li>`
                : `<li class="page-item ${p === state.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${p}">${p}</a>
                   </li>`;
        });

        html += `
                    <li class="page-item ${state.currentPage === state.totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#" data-page="next">Suivant</a>
                    </li>
                </ul>
            </nav>`;

        container.innerHTML = html;
    }

    function calculerPages() {
        const total = state.totalPages;
        const current = state.currentPage;
        let pages = [];

        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > 3) pages.push('...');
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                pages.push(i);
            }
            if (current < total - 2) pages.push('...');
            pages.push(total);
        }

        return pages;
    }

    function changerPage(page) {
        if (page === state.currentPage) return;
        state.currentPage = page;
        afficherPage(page);
        genererPagination();
        document.querySelector(config.conteneurOffres).scrollIntoView({ behavior: 'smooth' });
    }

    init();
});
