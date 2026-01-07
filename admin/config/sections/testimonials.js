export default {
    label: "Témoignages",
    name: "testimonials",
    widget: "object",
    fields: [
        { label: "Titre de section", name: "sectionTitle", widget: "string" },
        { label: "Image de section", name: "image", widget: "image" },
        {
            label: "Témoignages",
            name: "items",
            widget: "list",
            fields: [
                { label: "ID", name: "id", widget: "string" },
                { label: "Nom", name: "name", widget: "string" },
                { label: "Poste", name: "position", widget: "string" },
                { label: "Photo", name: "photo", widget: "image" },
                { label: "Témoignage", name: "testimonial", widget: "text" },
            ],
        },
    ],
};
