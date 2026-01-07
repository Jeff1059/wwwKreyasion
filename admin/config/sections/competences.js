export default {
    label: "Compétences",
    name: "competences",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        {
            label: "Pills (catégories)",
            name: "pills",
            widget: "list",
            fields: [
                { label: "Catégorie", name: "category", widget: "string" },
                {
                    label: "Compétences",
                    name: "skills",
                    widget: "list",
                    field: { label: "Skill", name: "skill", widget: "string" },
                },
            ],
        },
        {
            label: "Cards (étapes)",
            name: "cards",
            widget: "list",
            fields: [
                { label: "ID", name: "id", widget: "string" },
                { label: "Icône", name: "icon", widget: "image" },
                { label: "Titre", name: "title", widget: "string" },
                {
                    label: "Éléments",
                    name: "items",
                    widget: "list",
                    field: { label: "Item", name: "item", widget: "string" },
                },
            ],
        },
    ],
};
