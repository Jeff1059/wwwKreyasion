export default {
    name: "settings",
    label: "⚙️ Configuration globale",
    files: [
        {
            label: "Site",
            name: "site",
            file: "_data/site.json",
            fields: [
                { label: "Titre du site", name: "title", widget: "string" },
                { label: "Description SEO", name: "description", widget: "text" },
                { label: "URL canonique", name: "canonical", widget: "string" },
                {
                    label: "Bannière d'accueil",
                    name: "banner",
                    widget: "object",
                    fields: [
                        { label: "Titre principal", name: "title", widget: "string" },
                        { label: "Sous-titre", name: "subtitle", widget: "text" },
                        { label: "Image", name: "image", widget: "image" },
                    ],
                },
                {
                    label: "Footer",
                    name: "footer",
                    widget: "object",
                    fields: [
                        { label: "Texte marque", name: "trademark", widget: "string" },
                    ],
                },
            ],
        },
    ],
};
