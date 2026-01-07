// Endpoint OAuth pour Decap CMS avec GitHub
export default async function handler(req, res) {
  const { code } = req.query;

  // Vérifier que le code OAuth est présent
  if (!code) {
    return res.status(400).json({ error: 'Code OAuth manquant' });
  }

  try {
    // Échanger le code contre un token d'accès
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_SECRET,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code: code
      })
    });

    const data = await response.json();

    // Rediriger vers le CMS avec le token
    if (data.access_token) {
      res.redirect(`/admin/#access_token=${data.access_token}&token_type=bearer`);
    } else {
      res.status(400).json({ error: 'Échec de l\'authentification' });
    }
  } catch (error) {
    console.error('Erreur OAuth:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
