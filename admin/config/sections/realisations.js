export default {
    label: "Réalisations",
    name: "realisations",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        {
            label: "Projets",
            name: "items",
            widget: "list",
            fields: [
                { label: "ID", name: "id", widget: "string" },
                { label: "Nom du client", name: "client", widget: "string" },
                { label: "Logo", name: "logo", widget: "image" },
                { label: "URL du site", name: "url", widget: "string", required: false },
                { label: "Description", name: "description", widget: "text" },
                {
                    label: "Technologies",
                    name: "technologies",
                    widget: "list",
                    field: { label: "Tech", name: "tech", widget: "string" },
                },
                {
                    label: "Slides",
                    name: "slides",
                    widget: "list",
                    fields: [
                        { label: "Numéro", name: "number", widget: "number" },
                        { label: "Titre", name: "title", widget: "string" },
                        { label: "Image", name: "image", widget: "image" },
                        { label: "Texte du lien", name: "linkText", widget: "string" },
                        { label: "URL du lien", name: "linkUrl", widget: "string" },
                    ],
                },
            ],
        },
    ],
};
