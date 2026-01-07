// Endpoint OAuth pour Decap CMS avec GitHub (mode popup)
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

    if (data.access_token) {
      // Pour Decap CMS en mode popup: envoyer le token au parent window via postMessage
      const script = `
        <html>
          <head><title>Authentification réussie</title></head>
          <body>
            <script>
              (function() {
                function receiveMessage(e) {
                  console.log("receiveMessage %o", e);
                  window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
                    e.origin
                  );
                  window.close();
                }
                window.addEventListener("message", receiveMessage, false);
                window.opener.postMessage("authorizing:github", "*");
              })();
            </script>
          </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.send(script);
    } else {
      console.error('GitHub OAuth error:', data);
      const errorScript = `
        <html>
          <head><title>Erreur d'authentification</title></head>
          <body>
            <script>
              window.opener.postMessage(
                'authorization:github:error:${JSON.stringify({ error: data.error_description || data.error || 'Unknown error' })}',
                '*'
              );
              window.close();
            </script>
          </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.send(errorScript);
    }
  } catch (error) {
    console.error('Erreur OAuth:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
