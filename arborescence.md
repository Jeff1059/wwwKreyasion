# 🌳 Arborescence du Site wwwKreyasion

## 📁 Structure Actuelle

```
wwwKreyasion/
├── 📄 index.html                          # Page d'accueil principale
├── 📄 maintenance.html                    # Page de maintenance
├── 📄 mentions-legales.html               # Mentions légales
├── 📄 politique-confidentialite.html      # Politique de confidentialité
├── 📄 package.json                        # Configuration NPM
├── 📄 package-lock.json                   # Verrouillage des dépendances
├── 📄 README.md                           # Documentation
│
├── 📂 admin/                              # Interface d'administration
│   ├── 📄 config.yml                      # Configuration admin
│   └── 📄 index.html                      # Page admin
│
├── 📂 api/                                # API Backend (JavaScript)
│   ├── 📄 auth.js                         # Authentification
│   ├── 📄 callback.js                     # Callback OAuth
│   └── 📄 contact.js                      # Formulaire de contact
│
├── 📂 assets/                             # Ressources statiques
│   ├── 📂 css/                            # Feuilles de style compilées
│   │   ├── 📄 style.css                   # CSS principal
│   │   └── 📄 style.min.css               # CSS minifié
│   │
│   ├── 📂 scss/                           # Sources SCSS
│   │   ├── 📄 style.scss                  # Point d'entrée SCSS
│   │   ├── 📄 _variables.scss             # Variables
│   │   ├── 📄 _resets.scss                # Reset CSS
│   │   ├── 📄 _text.scss                  # Typographie
│   │   ├── 📄 _header.scss                # Header
│   │   ├── 📄 _layouts.scss               # Layouts
│   │   ├── 📄 _components.scss            # Composants
│   │   └── 📄 _legal.scss                 # Pages légales
│   │
│   ├── 📂 images/                         # Images du site
│   │   ├── 📄 favicon.ico                 # Favicon
│   │   ├── 📄 apple-touch-icon.png        # Icône Apple
│   │   ├── 📄 logo-kreasyon.svg           # Logo SVG
│   │   ├── 📄 logo-kreasyon.png           # Logo PNG
│   │   ├── 📄 cover-head.png              # Image header
│   │   ├── 📄 service-*.png               # Images services
│   │   ├── 📄 *.jpg                       # Photos profils
│   │   └── 📂 maquette-sinbad/            # (vide)
│   │
│   ├── 📂 js/                             # JavaScript principal (vide)
│   │
│   └── 📂 sinbad/                         # Assets projet Sinbad
│       ├── 📂 css/
│       │   ├── 📄 style-sinbad.css        # CSS Sinbad
│       │   └── 📄 vendor-sinbad.css       # CSS vendors
│       ├── 📂 js/
│       │   ├── 📄 app.js                  # App principale
│       │   ├── 📄 carousel.js             # Carousel
│       │   ├── 📄 jobs.js                 # Gestion offres
│       │   └── 📄 vendor-sinbad.js        # JS vendors
│       └── 📂 uploads/
│           └── 📂 pdf/
│               └── 📄 maquette_sinbad_lot_2.pdf
│
├── 📂 sinbad/                             # Pages Sinbad
│   ├── 📄 maquette-candidat.html          # Maquette candidat
│   └── 📄 maquette-offres.html            # Maquette offres
│
├── 📂 node_modules/                       # Dépendances NPM
├── 📂 .git/                               # Git
└── 📂 .vscode/                            # Config VS Code
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
