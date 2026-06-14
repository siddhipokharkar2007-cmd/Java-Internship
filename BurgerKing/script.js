// ================= HERO SLIDER =================

const sliderImage = document.getElementById("sliderImage");

const images = [
    "./img/banner1.jpg",
    "./img/banner2.jpg",
    "./img/banner3.jpg",
    "./img/banner4.jpg"
];

let current = 0;

function changeSlide() {

    sliderImage.style.opacity = "0";

    setTimeout(() => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        sliderImage.src = images[current];
        sliderImage.style.opacity = "1";

    }, 500);

}

setInterval(changeSlide, 3000);


// ================= MENU SCROLL =================

const menuScroll = document.querySelector(".menu-scroll");

const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

if (leftBtn && rightBtn) {

    rightBtn.addEventListener("click", () => {

        menuScroll.scrollBy({
            left: 300,
            behavior: "smooth"
        });

    });

    leftBtn.addEventListener("click", () => {

        menuScroll.scrollBy({
            left: -300,
            behavior: "smooth"
        });

    });

}


// ================= DELIVERY TOGGLE =================

const toggle = document.querySelector(".switch input");

if (toggle) {

    toggle.addEventListener("change", () => {

        const deliveryText =
            document.querySelector(".delivery span:first-child");

        const dineText =
            document.querySelector(".delivery span:last-child");

        if (toggle.checked) {

            deliveryText.style.color = "#999";
            dineText.style.color = "#d62300";

        } else {

            deliveryText.style.color = "#502314";
            dineText.style.color = "#999";

        }

    });

}


// ================= SEARCH =================

const searchBtn = document.querySelector(".search");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        alert("🔍 Search Feature Coming Soon!");

    });

}


// ================= EXPLORE MENU BUTTON =================

const exploreBtn = document.querySelector(".menu-btn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    });

}


// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 4px 15px rgba(0,0,0,0.15)";

    } else {

        navbar.style.boxShadow = "none";

    }

});