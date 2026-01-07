export default {
    label: "Profil",
    name: "profil",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        { label: "Photo de profil", name: "image", widget: "image" },
        { label: "Citation", name: "citation", widget: "string" },
        { label: "Description HTML", name: "description", widget: "text" },
        {
            label: "Parcours",
            name: "parcours",
            widget: "list",
            fields: [
                { label: "Icône", name: "icon", widget: "image" },
                { label: "Valeur", name: "value", widget: "string" },
                { label: "Description", name: "label", widget: "string" },
            ],
        },
    ],
};
