export default {
    label: "Services",
    name: "services",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        {
            label: "Services",
            name: "items",
            widget: "list",
            fields: [
                { label: "ID", name: "id", widget: "string" },
                { label: "Titre", name: "title", widget: "string" },
                { label: "Description HTML", name: "description", widget: "text" },
                { label: "Image", name: "image", widget: "image" },
            ],
        },
    ],
};
