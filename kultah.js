/* ================= MENU ================= */
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) menu.classList.toggle("show");
}

/* ================= MODE TERANG / GELAP ================= */
function toggleMode() {
    const body = document.body;
    const icon = document.getElementById("modeIcon");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        if (icon) icon.textContent = "☀️";
        localStorage.setItem("mode", "dark");
        startSnow();
    } else {
        if (icon) icon.textContent = "🌙";
        localStorage.setItem("mode", "light");
        stopSnow();
    }
}

/* Load mode saat halaman dibuka */
(function loadMode() {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark");
        const icon = document.getElementById("modeIcon");
        if (icon) icon.textContent = "☀️";
        startSnow();
    }
})();

/* ================= SALJU ================= */
let snowInterval = null;

function startSnow() {
    stopSnow();
    snowInterval = setInterval(() => {
        const snow = document.createElement("div");
        snow.className = "snow";
        snow.textContent = "❄";
        snow.style.left = Math.random() * window.innerWidth + "px";
        snow.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(snow);

        setTimeout(() => snow.remove(), 5000);
    }, 200);
}

function stopSnow() {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
    document.querySelectorAll(".snow").forEach(s => s.remove());
}

/* ================= PAGE NAVIGATION (OPSIONAL) ================= */
let currentPage = 0;
const pages = document.querySelectorAll(".page");

function showPage(index) {
    if (!pages.length) return;
    pages.forEach((p, i) => p.classList.toggle("active", i === index));
}

if (pages.length) showPage(currentPage);

/* ================= AUTO SAVE (OPSIONAL) ================= */
["judul", "page1", "page2", "page3"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.value = localStorage.getItem(id) || "";
    el.addEventListener("input", () => {
        localStorage.setItem(id, el.value);
    });
});

/* ================= CONFETTI ================= */
const confettiContainer = document.querySelector(".confetti-container");
const birthdayText = document.querySelector(".birthday-text");

function createConfetti(amount = 30) {
    if (!confettiContainer) return;

    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360},100%,60%)`;
        confetti.style.animationDuration =
            Math.random() * 3 + 2 + "s";

        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

if (confettiContainer) {
    setInterval(() => createConfetti(15), 1000);
}

if (birthdayText) {
    birthdayText.addEventListener("click", () => {
        birthdayText.style.animation =
            "floatText 0.8s infinite, glowText 0.5s infinite alternate";
        createConfetti(80);
    });
}

/* ================= SLIDER STORY ================= */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

if (slides.length) {
    setInterval(nextSlide, 3000);
    slides.forEach(slide =>
        slide.addEventListener("click", nextSlide)
    );
}

/* ================= HADIAH ================= */
function openGift() {
    const box = document.querySelector(".gift-box");
    const content = document.querySelector(".gift-content");
    const music = document.getElementById("giftMusic");
    const effectContainer = document.querySelector(".effect-container");

    if (!box || !content) return;

    box.classList.add("hidden");
    content.classList.remove("hidden");

    if (music) {
        music.currentTime = 0;
        music.play();
    }

    createConfetti(80);

    if (!effectContainer) return;

    /* LOVE */
    for (let i = 0; i < 20; i++) {
        const love = document.createElement("div");
        love.className = "love";
        love.textContent = "❤️";
        love.style.left = Math.random() * 100 + "vw";
        love.style.bottom = "0px";
        effectContainer.appendChild(love);
        setTimeout(() => love.remove(), 3000);
    }

    /* PETASAN */
    for (let i = 0; i < 15; i++) {
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = Math.random() * 100 + "vw";
        firework.style.top = Math.random() * 100 + "vh";
        firework.style.backgroundColor =
            `hsl(${Math.random() * 360},100%,60%)`;
        effectContainer.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}

/* ================= LIGHTBOX ================= */
function openLightbox(src) {
    const lightbox = document.querySelector(".lightbox");
    const img = document.getElementById("lightbox-img");
    if (!lightbox || !img) return;

    img.src = src;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    if (lightbox) lightbox.classList.add("hidden");
}

/* ================= MUSIC ================= */
document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("albumMusic");
    const btn = document.getElementById("musicBtn");

    if (!music || !btn) return;

    let playing = false;

    btn.addEventListener("click", () => {

        if (!playing) {
            music.play()
                .then(() => {
                    btn.textContent = "🔊";
                    playing = true;
                })
                .catch(() => {
                    console.log("Browser blocked autoplay");
                });

        } else {
            music.pause();
            btn.textContent = "🔇";
            playing = false;
        }
    });
});