document.addEventListener("DOMContentLoaded", () => {
    // --- Menu burger ---
    const menuBurger = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navHeader = document.querySelector("header");

    function closeMenu() {
        if (!navLinks || !navHeader) return;
        navLinks.classList.remove("mobile-menu");
        navHeader.classList.remove("overlay");
    }

    if (menuBurger && navLinks && navHeader) {
        menuBurger.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-menu");
            navHeader.classList.toggle("overlay");
        });

        navHeader.addEventListener("click", (e) => {
            if (navHeader.classList.contains("overlay") && e.target === navHeader) {
                closeMenu();
            }
        });

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

    // --- Slider: NE PLUS initialiser ici ---
    document.querySelectorAll(".slider").forEach((slider) => {
        // Éviter double initialisation
        if (slider.dataset.sliderInit === 'true') {
            return;
        }

        const slides = slider.querySelectorAll(".slide");

        if (slides.length === 0) {
            console.warn('[Slider] Aucun slide trouvé dans', slider);
            return;
        }

        slides.forEach((slide) => {
            slide.addEventListener("click", () => {
                const active = slider.querySelector(".slide.active");
                if (active) active.classList.remove("active");
                slide.classList.add("active");
            });
        });

        slider.dataset.sliderInit = 'true';
        console.log('[Slider] Initialisé avec', slides.length, 'slides');
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