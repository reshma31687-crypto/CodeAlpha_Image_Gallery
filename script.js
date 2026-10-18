
const cards = document.querySelectorAll(".gallery-card");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Category filters
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        cards.forEach(function (card) {
            if (
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory
            ) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }
        });
    });
});

// Open the selected image
function openLightbox(index) {
    const visibleCards = getVisibleCards();

    if (visibleCards.length === 0) return;

    currentIndex = index;

    const selectedCard = visibleCards[currentIndex];
    const image = selectedCard.querySelector("img");

    lightboxImage.src = selectedCard.dataset.full;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = selectedCard.dataset.title;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
}

// Get only the images visible after filtering
function getVisibleCards() {
    return Array.from(cards).filter(function (card) {
        return !card.hidden;
    });
}

// Gallery image click
cards.forEach(function (card) {
    card.addEventListener("click", function () {
        const visibleCards = getVisibleCards();
        const index = visibleCards.indexOf(card);

        openLightbox(index);
    });
});

// Show the next or previous image
function changeImage(direction) {
    const visibleCards = getVisibleCards();

    if (visibleCards.length === 0) return;

    currentIndex =
        (currentIndex + direction + visibleCards.length) %
        visibleCards.length;

    const selectedCard = visibleCards[currentIndex];
    const image = selectedCard.querySelector("img");

    lightboxImage.src = selectedCard.dataset.full;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = selectedCard.dataset.title;
}

nextBtn.addEventListener("click", function () {
    changeImage(1);
});

prevBtn.addEventListener("click", function () {
    changeImage(-1);
});

// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
});
