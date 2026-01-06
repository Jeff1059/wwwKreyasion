import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const COLORS = {
    main: "#402729", // Branding main color
    accent: "#b25531", // Branding accent color
    bg: "#ffffff",
    text: "#402729",
    lightGray: "#f4f4f4"
};

/**
 * Generates an HTML email template styled with the site's branding.
 * 
 * @param {string} prenom 
 * @param {string} nom 
 * @param {object} details - { entreprise, email, demande }
 * @param {boolean} isClient - True if sending to client, False if sending to admin
 * @returns {string} HTML string
 */
function generateEmailHtml(prenom, nom, details, isClient) {
    const { entreprise, email, demande } = details;

    // Header text
    const title = isClient
        ? "Nous vous remercions pour votre message"
        : "Nouvelle demande de contact";

    // Intro message
    const intro = isClient
        ? `Bonjour ${prenom},<br><br>Nous avons bien reçu votre demande.<br><br>Nous reviendrons vers vous dans les plus brefs délais.<br><br>Voici un récapitulatif de votre message :`
        : `Vous avez reçu une nouvelle demande de la part de <strong>${prenom} ${nom}</strong>.`;

    // Fields to display
    const fields = [
        { label: "Nom complet", value: `${prenom} ${nom}` },
        { label: "Entreprise", value: entreprise || "-" },
        { label: "Email", value: email },
        { label: "Message", value: demande ? demande.replace(/\n/g, "<br>") : "-" }
    ];

    const rows = fields.map(field => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.lightGray};">
                <strong style="color: ${COLORS.accent};">${field.label}:</strong>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.lightGray}; color: ${COLORS.text};">
                ${field.value}
            </td>
        </tr>
    `).join("");

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; margin: 0; padding: 0; background-color: ${COLORS.bg}; color: ${COLORS.text}; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid ${COLORS.lightGray}; }
            .header { background-color: ${COLORS.main}; color: #ffffff; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: ${COLORS.lightGray}; color: ${COLORS.text}; padding: 15px; text-align: center; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background-color: ${COLORS.accent}; color: #ffffff; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .img { display: block; margin: 0 auto; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://kreasyon-design.com/assets/images/logo-kreasyon.png" alt="Logo Kreasyon Design" style="width: 105px; height: auto;">
            </div>
            <div class="content">
                <h2 style="color: ${COLORS.accent}; margin-top: 0;">${title}</h2>
                <p style="line-height: 1.6;">${intro}</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    ${rows}
                </table>

                ${isClient ? `<p style="margin-top: 30px; font-size: 14px; color: #888;">Ceci est un message automatique</p>` : ''}
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Kreasyon Design. Tous droits réservés.
            </div>
        </div>
    </body>
    </html>
    `;
}

export default async function handler(req, res) {
    // Enable CORS if needed, or stick to simple method check
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { nom, prenom, entreprise, email, demande } = req.body || {};

    // Basic validation
    if (!nom || !prenom || !email) {
        return res.status(400).json({ ok: false, error: "Champs obligatoires manquants." });
    }


    const token = req.body?.turnstileToken;
    if (!token) {
        return res.status(400).json({ ok: false, error: "Captcha manquant." });
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token
            // remoteip: req.headers["x-forwarded-for"] // optionnel
        })
    });

    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
        return res.status(403).json({
            ok: false,
            error: "Captcha invalide.",
            codes: verifyJson["error-codes"] || []
        });
    }

    try {
        const details = { entreprise, email, demande };

        // 1. Send Admin Notification
        const adminHtml = generateEmailHtml(prenom, nom, details, false);
        await resend.emails.send({
            from: "Kreasyon Design <contact@kreasyon-design.fr>",
            to: ["contact@kreasyon-design.fr"],
            reply_to: email,
            subject: `[Site] Nouveau message de ${prenom} ${nom}`,
            html: adminHtml
        });

        // 2. Send Client Confirmation
        const clientHtml = generateEmailHtml(prenom, nom, details, true);
        await resend.emails.send({
            from: "Kreasyon Design <contact@kreasyon-design.fr>",
            to: [email],
            subject: "Votre message à Kreasyon Design a bien été reçu",
            html: clientHtml
        });

        return res.status(200).json({ ok: true, message: "Emails sent successfully" });

    } catch (error) {
        console.error("Error sending emails:", error);
        return res.status(500).json({ ok: false, error: error.message || "Erreur interne lors de l'envoi." });
    }
}