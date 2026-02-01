const he = require("he");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Filter: decode entities + escape for HTML attribute
  eleventyConfig.addFilter("attr", (v = "") =>
    he.decode(String(v))
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  );
    // Copy assets to dist
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/scripts");
    eleventyConfig.addPassthroughCopy("src/tarteaucitron");
    eleventyConfig.addPassthroughCopy("src/*.txt");
    eleventyConfig.addPassthroughCopy("src/*.png");
    eleventyConfig.addPassthroughCopy("src/*.ico");

    // Add filters
    const md = require("markdown-it")({
        html: true,
        breaks: true,
        linkify: true
    });

    eleventyConfig.addFilter("markdown", (content) => {
        return md.render(content);
    });

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        return DateTime.fromJSDate(new Date(dateObj), { zone: 'utc' }).setLocale('fr').toLocaleString(DateTime.DATE_FULL);
    });

    // Add Collections
    eleventyConfig.addCollection("blogPosts", function (collectionApi) {
        // Since blog posts are in _data/blog/posts as JSON, 
        // they are NOT part of the regular collectionApi.getAll()
        // We can access them via the global data object.
        const globalData = collectionApi.getAll()[0].data;
        const posts = globalData.blog.posts;

        if (!posts) return [];

        // Convert the blog.posts object to a sorted array
        return Object.values(posts).sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    });

    eleventyConfig.addCollection("categories", function (collectionApi) {
        const globalData = collectionApi.getAll()[0].data;
        const posts = globalData.blog.posts;
        if (!posts) return [];

        const categoryMap = {};
        Object.values(posts).forEach(post => {
            const cat = post.category || "Général";
            if (!categoryMap[cat]) {
                categoryMap[cat] = 0;
            }
            categoryMap[cat]++;
        });

        return Object.entries(categoryMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    });

    // Configuration
    return {
        dir: {
            input: "src",
            output: "_site",
            data: "_data",
            includes: "_includes"
        },
        templateFormats: ["njk", "html", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
