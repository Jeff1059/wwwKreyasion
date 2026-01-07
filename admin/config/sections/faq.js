export default {
    label: "FAQ",
    name: "faq",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        {
            label: "Questions",
            name: "items",
            widget: "list",
            fields: [
                { label: "ID", name: "id", widget: "string" },
                { label: "Question", name: "question", widget: "string" },
                { label: "Réponse", name: "answer", widget: "text" },
                { label: "Ordre", name: "order", widget: "number" },
            ],
        },
    ],
};
