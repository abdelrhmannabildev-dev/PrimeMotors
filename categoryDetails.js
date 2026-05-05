import { cars } from "./data.js";
import { logos } from "./data.js";

const url = new URLSearchParams(window.location.search);
const carParam = url.get("name");
const categoryParam = url.get("category");
const car = cars.find((car) => car.name === carParam);
const container = document.querySelector(".cars-container");

// document.querySelector(".category-name").textContent = categoryParam;
// const carsContainer = document.createElement("div");
// carsContainer.classList.add("cars-container");
// container.appendChild(carsContainer);

cars.forEach((car) => {
    if (car.type === categoryParam) {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");
        carCard.dataset.name = car.name;
        carCard.dataset.type = car.type;
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h4>${car.name}</h4>
            <p>${car.specs || ""}</p>
            <p class="price">$${car.price}</p>
        `;
        container.appendChild(carCard);
    }
});

container.addEventListener("click", (e) => {
    const card = e.target.closest(".car-card");
    if (!card) return;
    const carName = card.dataset.name;
    const category = card.dataset.type;
    window.location.href = `carDetails.html?name=${encodeURIComponent(carName)}&category=${encodeURIComponent(category)}`;
});


const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.history.back();
});