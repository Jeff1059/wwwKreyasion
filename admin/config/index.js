import backend from './backend.js';
import settings from './settings.js';
import pages from './pages.js';

export default {
    backend,
    site_url: "https://www.kreasyon-design.fr",
    locale: "fr",
    media_folder: "assets/images",
    public_folder: "/assets/images",
    collections: [
        settings,
        pages,
    ],
};
