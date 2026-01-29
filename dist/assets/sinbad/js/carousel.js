let currentIsMobile = window.innerWidth < 768;

function initCarousel() {
    const cards = Array.from(document.querySelectorAll("#cardList .card"));
    const carouselInner = document.getElementById("carouselInner");

    // Clear existing content
    carouselInner.innerHTML = "";

    const chunkSize = currentIsMobile ? 1 : 3;

    for (let i = 0; i < cards.length; i += chunkSize) {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (i === 0) item.classList.add("active");

        const row = document.createElement("div");
        row.classList.add("row", "px-md-4", "pb-md-4", "px-1");

        for (let j = i; j < i + chunkSize && j < cards.length; j++) {
            const col = document.createElement("div");
            col.classList.add("col-12", "col-md-4", "mb-3");
            col.appendChild(cards[j].cloneNode(true));
            row.appendChild(col);
        }

        item.appendChild(row);
        carouselInner.appendChild(item);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCarousel();
});

window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== currentIsMobile) {
        currentIsMobile = isMobile;
        initCarousel();
    }
});
