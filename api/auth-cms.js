// Endpoint OAuth pour Decap CMS avec GitHub
export default async function handler(req, res) {
  const { code } = req.query;

  // Étape 1: Si pas de code, rediriger vers GitHub pour autorisation
  if (!code) {
    const clientId = process.env.OAUTH_CLIENT_ID;
    const redirectUri = 'https://www.kreasyon-design.fr/api/auth-cms';
    const scope = 'repo,user';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

    return res.redirect(githubAuthUrl);
  }

  // Étape 2: Échanger le code contre un token d'accès
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code: code
      })
    });

    const data = await response.json();

    // Rediriger vers le CMS avec le token
    if (data.access_token) {
      res.redirect(`/admin/#access_token=${data.access_token}&token_type=bearer`);
    } else {
      console.error('GitHub OAuth error:', data);
      res.status(400).json({
        error: 'Échec de l\'authentification',
        details: data.error_description || data.error
      });
    }
  } catch (error) {
    console.error('Erreur OAuth:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
