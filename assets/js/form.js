document.addEventListener("DOMContentLoaded", () => {
    const formEl = document.getElementById("contact-form");
    if (!formEl) return;

    formEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fd = new FormData(formEl);

        const payload = {
            nom: fd.get("Nom"),
            prenom: fd.get("Prenom"),
            entreprise: fd.get("Entreprise"),
            email: fd.get("email"),
            demande: fd.get("demande"),
            turnstileToken: fd.get("cf-turnstile-response"),
        };

        const r = await fetch("api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const txt = await r.text();
        if (r.ok) {
            formEl.reset();
            alert("Message envoyé.");
        } else {
            console.log("Erreur API:", r.status, txt);
            alert("Erreur d’envoi (captcha ou serveur).");
        }
    });
});