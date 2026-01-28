const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', '..', '..', 'content', '_data', 'blog', 'posts');
const BLOG_JSON_PATH = path.join(__dirname, '..', '..', '..', 'content', '_data', 'blog', 'blog.json');

function buildIndex() {
    console.log('[BuildIndex] Starting blog index generation...');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`[BuildIndex] Error: Posts directory not found at ${POSTS_DIR}`);
        return;
    }

    // 1. Read existing blog.json for global settings (meta, headerTitle, etc.)
    let blogData = {
        meta: {},
        headerTitle: "Mon Blog",
        coverImage: "",
        articles: []
    };

    if (fs.existsSync(BLOG_JSON_PATH)) {
        blogData = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));
    }

    // 2. Scan posts directory
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));
    const articles = [];

    files.forEach(file => {
        const filePath = path.join(POSTS_DIR, file);
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Extract only list metadata
            articles.push({
                id: content.id || path.basename(file, '.json'),
                title: content.title || "Sans titre",
                date: content.date || "",
                category: content.category || "Général",
                readTime: content.readTime || "",
                image: content.image || "",
                description: content.description || ""
            });
        } catch (e) {
            console.error(`[BuildIndex] Error parsing ${file}:`, e);
        }
    });

    // 3. Sort articles by date (descending)
    articles.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-')); // Support DD/MM/YYYY or YYYY-MM-DD
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
    });

    // 4. Update articles list
    blogData.articles = articles;

    // 5. Write back to blog.json
    fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(blogData, null, 4), 'utf8');

    console.log(`[BuildIndex] Success! ${articles.length} articles indexed in blog.json`);
}

buildIndex();
