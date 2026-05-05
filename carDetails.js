import { cars } from "./data.js";


const url= new URLSearchParams(window.location.search); 
const carParam= url.get('name');
const categoryParam = url.get('category');
const car = cars.find((car) => car.name === carParam);

console.log(carParam);

const carDetails = document.querySelector(".car-details");

function renderDetails(car) {
    const allImages = Array.isArray(car.images) && car.images.length ? car.images : [car.image].filter(Boolean);
    const price = typeof car.price === "number" ? `$${car.price.toLocaleString()}` : car.price;

    const infos = [
        car.engine ? { label: "Engine", value: car.engine } : null,
        car.fuel ? { label: "Fuel", value: car.fuel } : null,
        car.topSpeed ? { label: "Top speed", value: `${car.topSpeed} km/h` } : null,
        car.seats ? { label: "Seats", value: car.seats } : null,
    ].filter(Boolean);

    const galleryHtml = allImages.length > 1
        ? `
            <div class="car-gallery">
                ${allImages
                    .map(
                        (src, idx) =>
                            `<img class="car-img${idx === 0 ? " active" : ""}" src="${src}" alt="${car.name}" data-src="${src}">`
                    )
                    .join("")}
            </div>
        `
        : "";

    const detailsHtml = `
        <div class="container">

            <div class="left-section">
                <h1>${car.name}</h1>
                <h2>${price}</h2>
                ${infos.length
                    ? `
                        <div class="meta-infos">
                            ${infos
                                .map(
                                    (c) => `
                                        <div class="info">
                                            <span class="info-label">${c.label}</span>
                                            <span class="info-value">${c.value}</span>
                                        </div>
                                    `
                                )
                                .join("")}
                        </div>
                    `
                    : ""}
                <p>${car.description || ""}</p>
                <div class="buy"><button id="buy-button">add to card <span style="color: rgb(154, 255, 154);">$$</span></button></div>
            </div>
            <div class="right-section">
                <div class="category"><h3>${categoryParam || ""}</h3></div>
                <img class="car-main-image" src="${car.image}" alt="${car.name}">
                ${galleryHtml}
            </div>
        </div>
    `;

    carDetails.innerHTML = detailsHtml;

    const mainImage = carDetails.querySelector(".car-main-image");
    carDetails.querySelectorAll(".car-img").forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const src = thumb.getAttribute("data-src");
            if (src) mainImage.src = src;

            carDetails.querySelectorAll(".car-img").forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
    const buyButton = document.getElementById("buy-button");
    buyButton.addEventListener("click", () => {
        const inCart = JSON.parse(localStorage.getItem("inCart")) || [];
        inCart.push(car);
        localStorage.setItem("inCart", JSON.stringify(inCart));
        alert("Car added to cart!");
    });

}

if (!car) {
    carDetails.innerHTML = `<p>Car not found.</p>`;
} else {
    renderDetails(car);
}
// renderSimilar(car);
const button = document.getElementById("back-button");
button.addEventListener('click', () => {
    window.history.back();
});
