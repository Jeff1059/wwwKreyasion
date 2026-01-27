// generate-blog.js
const fs = require('fs');
const path = require('path');

async function generate() {
  const blogData = JSON.parse(fs.readFileSync('./_data/blog.json', 'utf8'));
  
  // Crée dossier public/blog si pas existant
  const blogDir = path.join('public', 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  
  blogData.articles.forEach(article => {
    const slug = article.id || article.slug; // utilise id ou ajoute slug dans ton JSON
    const filePath = path.join(blogDir, `${slug}.html`);
    
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${article.title} | Blog Kreasyon Design</title>
  <meta name="description" content="${article.description}">
</head>
<body data-cms-page="blog-article" data-article-id="${article.id}">
  <!-- Copie le contenu de ton article.html ici, ou utilise un template -->
  <div id="article-detail">
    <h1 data-cms="article.title">${article.title}</h1>
    <img data-cms="article.image" src="${article.image}" alt="${article.title}">
    <!-- etc... -->
  </div>
  <script src="/js/blog-loader.js" defer></script>
</body>
</html>`;
    
    fs.writeFileSync(filePath, html);
    console.log(`✅ Généré: /blog/${slug}.html`);
  });
  
  console.log('🎉 Blog statique généré !');
}

generate().catch(console.error);
