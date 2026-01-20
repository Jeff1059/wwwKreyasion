// main.js
document.addEventListener("DOMContentLoaded", () => {
    // --- Menu burger ---
    const menuBurger = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navHeader = document.querySelector("header");
    const headerText = document.querySelector(".banner-content_text");

    function closeMenu() {
        if (!navLinks || !navHeader) return;
        navLinks.classList.remove("mobile-menu");
        navHeader.classList.remove("overlay");
    }

    if (menuBurger && navLinks && navHeader) {
        menuBurger.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-menu");
            navHeader.classList.toggle("overlay");
            // Ligne supprimée: navLinks.querySelector.toggle('li'); (invalide)
        });

        // Fermer le menu quand on clique sur l'overlay
        navHeader.addEventListener("click", (e) => {
            if (navHeader.classList.contains("overlay") && e.target === navHeader) {
                closeMenu();
            }
        });

        // Fermer le menu quand on clique sur un lien/bouton du header
        navLinks.addEventListener("click", (e) => {
            if (e.target.closest("a")) {
                closeMenu();
            }
        });
    }

    // --- Header dynamique au scroll ---
    function toggleBackgroundHeader() {
        if (!navHeader) return;

        const scroll = window.scrollY;
        const boxHeight = navHeader.offsetHeight;
        const headerHeight = navHeader.offsetHeight;
        const offset = 300;

        if (scroll >= boxHeight - headerHeight + offset) {
            navHeader.classList.add("bg-scroll");
        } else {
            navHeader.classList.remove("bg-scroll");
        }
    }

    window.addEventListener("scroll", toggleBackgroundHeader);
    window.addEventListener("load", toggleBackgroundHeader);
    window.addEventListener("resize", toggleBackgroundHeader);
    toggleBackgroundHeader();

    // --- Slider: activer une slide au clic ---
    document.querySelectorAll(".slider").forEach((slider) => {
        const slides = slider.querySelectorAll(".slide");

        slides.forEach((slide) => {
            slide.addEventListener("click", () => {
                const active = slider.querySelector(".slide.active");
                if (active) active.classList.remove("active");
                slide.classList.add("active");
            });
        });
    });

    // --- FAQ: toggle ---
    document.querySelectorAll(".faq-content").forEach((item) => {
        const title = item.querySelector(".faq-title");
        const text = item.querySelector(".faq-text");

        if (!title || !text) return;

        title.addEventListener("click", () => {
            text.classList.toggle("active");
        });
    });

    // --- Reveal animation: IntersectionObserver ---
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});