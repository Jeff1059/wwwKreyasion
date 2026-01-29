const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Copy assets to dist
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/scripts");
    eleventyConfig.addPassthroughCopy("src/tarteaucitron");
    eleventyConfig.addPassthroughCopy("src/*.xml");
    eleventyConfig.addPassthroughCopy("src/*.txt");
    eleventyConfig.addPassthroughCopy("src/*.png");
    eleventyConfig.addPassthroughCopy("src/*.ico");

    // Add filters
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

    // Configuration
    return {
        dir: {
            input: "src",
            output: "dist",
            data: "_data",
            includes: "_includes"
        },
        templateFormats: ["njk", "html", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
