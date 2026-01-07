import profil from './sections/profil.js';
import services from './sections/services.js';
import competences from './sections/competences.js';
import realisations from './sections/realisations.js';
import testimonials from './sections/testimonials.js';
import faq from './sections/faq.js';

export default {
    name: "page",
    label: "📄 Page",
    label_singular: "Page",
    folder: "content/pages",
    create: true,
    format: "json",
    extension: "json",

    nested: {
        depth: 50,
        summary: "{{title}}",
    },

    meta: {
        path: {
            widget: "string",
            label: "Chemin (URL)",
            index_file: "index",
        },
    },

    fields: [
        { label: "Titre interne", name: "title", widget: "string" },

        {
            label: "Template",
            name: "template",
            widget: "select",
            options: ["home", "legal", "default"],
            default: "default",
        },

        {
            label: "SEO",
            name: "seo",
            widget: "object",
            fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Description", name: "description", widget: "text", required: false },
                { label: "Canonical", name: "canonical", widget: "string" },
            ],
        },

        // ========== TEMPLATE LEGAL ==========
        { label: "Titre affiché (H1)", name: "headerTitle", widget: "string", required: false },

        {
            label: "Sections",
            name: "sections",
            widget: "list",
            required: false,
            fields: [
                { label: "ID", name: "id", widget: "string", required: false },
                { label: "Titre", name: "title", widget: "string" },
                { label: "Contenu HTML", name: "content", widget: "text" },
            ],
        },

        // ========== TEMPLATE HOME ==========
        {
            label: "Contenu Home",
            name: "home",
            widget: "object",
            required: false,
            fields: [
                profil,
                services,
                competences,
                realisations,
                testimonials,
                faq,
            ],
        },
    ],
};
