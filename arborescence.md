# 🌳 Arborescence du Site wwwKreyasion

## 📁 Structure Actuelle

```
wwwKreyasion/
├── 📄 index.html                          # Page d'accueil principale
├── 📄 maintenance.html                    # Page de maintenance
├── 📄 en-construction.html                # Page en construction
├── 📄 mentions-legales.html               # Mentions légales
├── 📄 politique-confidentialite.html      # Politique de confidentialité
├── 📄 package.json                        # Configuration NPM
├── 📄 README.md                           # Documentation
├── 📄 arborescence.md                     # Documentation de l'arborescence
├── 📄 vercel.json                         # Configuration Vercel
├── 📄 _vercel.json                        # Configuration Vercel alternative
├── 📄 robots.txt                          # Directives pour robots crawlers
├── 📄 sitemap.xml                         # Plan du site
├── 📄 maquette.png                        # Maquette du site
│
├── 📂 _data/                              # Données JSON structurées
│   ├── 📄 competences.json                # Compétences
│   ├── 📄 faq.json                        # Questions fréquentes
│   ├── 📄 profil.json                     # Profil
│   ├── 📄 realisations.json               # Réalisations
│   ├── 📄 services.json                   # Services
│   ├── 📄 site.json                       # Données du site
│   ├── 📄 testimonials.json               # Témoignages
│   ├── 📂 legal/                          # Données légales
│   └── 📂 services/                       # Données services détaillées
│
├── 📂 content/                            # Contenus structurés
│   ├── 📂 pages/                          # Contenus de pages
│   └── 📂 template/                       # Templates de contenu
│
├── 📂 admin/                              # Interface d'administration
│   ├── 📄 config.yml                      # Configuration admin principale
│   ├── 📄 index.html                      # Page admin
│   └── 📂 config/                         # Configurations détaillées
│
├── � api/                                # API Backend (JavaScript)
│   ├── 📄 contact.js                      # Formulaire de contact
│   └── 📄 test-contact.js                 # Tests formulaire de contact
│
├── 📂 assets/                             # Ressources statiques
│   ├── 📂 css/                            # Feuilles de style compilées
│   │   ├── 📄 style.css                   # CSS principal
│   │   └── 📄 style.min.css               # CSS minifié
│   │
│   ├── 📂 scss/                           # Sources SCSS (9 fichiers)
│   │   ├── 📄 style.scss                  # Point d'entrée SCSS
│   │   ├── 📄 _variables.scss             # Variables
│   │   ├── 📄 _resets.scss                # Reset CSS
│   │   ├── 📄 _text.scss                  # Typographie
│   │   ├── 📄 _header.scss                # Header
│   │   ├── 📄 _layouts.scss               # Layouts
│   │   ├── 📄 _components.scss            # Composants
│   │   ├── 📄 _legal.scss                 # Pages légales
│   │   └── ...                            # Autres fichiers SCSS
│   │
│   ├── 📂 images/                         # Images du site (14 fichiers)
│   │   ├── 📄 favicon.ico                 # Favicon
│   │   ├── 📄 apple-touch-icon.png        # Icône Apple
│   │   ├── 📄 logo-kreasyon.svg           # Logo SVG
│   │   ├── 📄 logo-kreasyon.png           # Logo PNG
│   │   ├── 📄 cover-head.png              # Image header
│   │   ├── 📄 service-*.png               # Images services
│   │   └── 📄 *.jpg                       # Photos profils
│   │
│   ├── 📂 js/                             # JavaScript principal (3 fichiers)
│   │   └── ...                            # Scripts JavaScript
│   │
│   └── 📂 sinbad/                         # Assets projet Sinbad
│       ├── 📂 css/                        # CSS Sinbad
│       │   ├── 📄 style-sinbad.css
│       │   └── 📄 vendor-sinbad.css
│       ├── 📂 js/                         # JavaScript Sinbad
│       │   ├── 📄 app.js
│       │   ├── 📄 carousel.js
│       │   ├── 📄 jobs.js
│       │   └── 📄 vendor-sinbad.js
│       └── 📂 uploads/                    # Fichiers uploadés
│           └── 📂 pdf/
│               └── 📄 maquette_sinbad_lot_2.pdf
│
├── 📂 css/                                # CSS supplémentaire (dossier racine)
│
├── 📂 sinbad/                             # Pages Sinbad
│   ├── 📄 maquette-candidat.html          # Maquette candidat
│   └── 📄 maquette-offres.html            # Maquette offres
│
├── 📂 tarteaucitron/                      # Gestion des cookies (48 fichiers)
│   ├── 📄 tarteaucitron.js                # Script principal
│   ├── 📄 tarteaucitron.min.js            # Version minifiée
│   ├── 📄 tarteaucitron.services.js       # Services
│   ├── 📄 tarteaucitron.services.min.js   # Services minifiés
│   ├── 📂 lang/                           # 36 langues
│   ├── 📂 css/                            # Styles tarteaucitron
│   └── ...                                # Autres fichiers
│
├── 📂 .git/                               # Contrôle de version Git
└── 📂 .vscode/                            # Configuration VS Code
```

---

## ✨ Arborescence Optimale Proposée

Voici une structure plus organisée et scalable pour votre projet :

```
wwwKreyasion/
├── 📄 index.html                          # Page d'accueil
├── 📄 package.json
├── 📄 README.md
│
├── 📂 pages/                              # 🆕 Toutes les pages HTML
│   ├── 📄 maintenance.html
│   ├── 📂 legal/                          # Pages légales groupées
│   │   ├── 📄 mentions-legales.html
│   │   └── 📄 politique-confidentialite.html
│   └── 📂 sinbad/                         # Projet Sinbad
│       ├── 📄 candidat.html
│       └── 📄 offres.html
│
├── 📂 admin/                              # Interface admin
│   ├── 📄 config.yml
│   └── 📄 index.html
│
├── 📂 api/                                # API Backend
│   ├── 📄 auth.js
│   ├── 📄 callback.js
│   └── 📄 contact.js
│
├── 📂 assets/
│   ├── 📂 css/                            # CSS compilé
│   │   ├── 📄 main.css
│   │   ├── 📄 main.min.css
│   │   └── 📂 sinbad/                     # 🆕 CSS Sinbad séparé
│   │       ├── 📄 style.css
│   │       └── 📄 vendors.css
│   │
│   ├── 📂 scss/                           # Sources SCSS
│   │   ├── 📄 main.scss                   # Point d'entrée
│   │   ├── 📂 base/                       # 🆕 Styles de base
│   │   │   ├── 📄 _reset.scss
│   │   │   ├── 📄 _variables.scss
│   │   │   └── 📄 _typography.scss
│   │   ├── 📂 components/                 # 🆕 Composants
│   │   │   ├── 📄 _buttons.scss
│   │   │   ├── 📄 _cards.scss
│   │   │   └── 📄 _forms.scss
│   │   ├── 📂 layouts/                    # 🆕 Layouts
│   │   │   ├── 📄 _header.scss
│   │   │   ├── 📄 _footer.scss
│   │   │   └── 📄 _grid.scss
│   │   └── 📂 pages/                      # 🆕 Styles par page
│   │       ├── 📄 _home.scss
│   │       └── 📄 _legal.scss
│   │
│   ├── 📂 js/                             # JavaScript
│   │   ├── 📄 main.js                     # 🆕 Script principal
│   │   ├── 📂 components/                 # 🆕 Composants JS
│   │   │   ├── 📄 carousel.js
│   │   │   └── 📄 forms.js
│   │   ├── 📂 sinbad/                     # JS Sinbad
│   │   │   ├── 📄 app.js
│   │   │   └── 📄 jobs.js
│   │   └── 📂 vendors/                    # 🆕 Librairies tierces
│   │       └── 📄 vendor.bundle.js
│   │
│   ├── 📂 images/
│   │   ├── 📂 icons/                      # 🆕 Icônes séparées
│   │   │   ├── 📄 favicon.ico
│   │   │   └── 📄 apple-touch-icon.png
│   │   ├── 📂 logos/                      # 🆕 Logos groupés
│   │   │   ├── 📄 logo-kreasyon.svg
│   │   │   ├── 📄 logo-kreasyon.png
│   │   │   └── 📄 sinbad-logo.png
│   │   ├── 📂 team/                       # 🆕 Photos équipe
│   │   │   ├── 📄 jg-profil.jpg
│   │   │   └── 📄 sophie-manou.jpg
│   │   ├── 📂 services/                   # 🆕 Images services
│   │   │   ├── 📄 dev.png
│   │   │   ├── 📄 uxui.png
│   │   │   └── 📄 web.png
│   │   └── 📂 decorative/                 # 🆕 Éléments décoratifs
│   │       ├── 📄 blob1.svg
│   │       └── 📄 blob2.svg
│   │
│   ├── 📂 fonts/                          # 🆕 Polices personnalisées
│   │   └── 📄 (polices.woff2)
│   │
│   └── 📂 uploads/                        # 🆕 Fichiers uploadés
│       └── 📂 pdf/
│           └── 📄 maquette_sinbad.pdf
│
├── 📂 config/                             # 🆕 Configuration centralisée
│   └── 📄 site.config.js
│
└── 📂 docs/                               # 🆕 Documentation
    └── 📄 ARCHITECTURE.md
```

---

## 📋 Améliorations Proposées

| Aspect | Actuel | Proposé |
|--------|--------|---------|
| **Pages HTML** | À la racine | Dossier `/pages` dédié |
| **SCSS** | Fichiers plats | Organisation 7-1 (base, components, layouts, pages) |
| **JavaScript** | Dossier vide + mixé | Structure modulaire avec vendors isolés |
| **Images** | Toutes mélangées | Catégorisées (icons, logos, team, services) |
| **Sinbad** | Assets dispersés | Groupés dans sous-dossiers dédiés |
| **Configuration** | Dispersée | Centralisée dans `/config` |

> [!TIP]
> Cette structure suit les conventions modernes et facilite la maintenance, le travail en équipe et le déploiement.
