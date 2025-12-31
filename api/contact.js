import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ ok: false });

    const { nom, prenom, entreprise, email, demande } = req.body || {};

    if (!nom || !prenom || !email) {
        return res.status(400).json({ ok: false, error: "Champs obligatoires manquants." });
    }

    const subject = `Contact site: ${prenom} ${nom}`;
    const text =
        `Nom: ${nom}
Prénom: ${prenom}
Entreprise: ${entreprise || "-"}
Email: ${email}

Demande:
${demande || "-"}`;

    const response = await resend.emails.send({
        from: "Kreasyon Design <contact@kreasyon-design.fr>",
        to: ["jeffry.clairicia@gmail.com"],
        subject,
        replyTo: email,
        text
    });

    return res.status(response.error ? 500 : 200).json(response);
}
