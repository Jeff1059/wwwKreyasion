import backend from './backend.js';
import settings from './setting.js';
import pages from './page.js';

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
