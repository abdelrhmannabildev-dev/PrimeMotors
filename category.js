import {cars} from './data.js';
import {logos} from './data.js';
const container = document.querySelector(".container");

const categories = [...new Set(cars.map(car => car.type))].sort();

const categoryContainer = document.createElement("div");
categoryContainer.classList.add("category");
container.appendChild(categoryContainer);

categories.forEach(category => {
    const categoryCard = document.createElement("div");
    categoryCard.classList.add("category-label");
    categoryCard.dataset.type = category;
    const img = document.createElement('img');
    img.src = logos.find(car => car.type === category)?.logo;

    const text = document.createElement("span");
    text.textContent = category;

    categoryCard.appendChild(text);
    categoryCard.appendChild(img);
    

    categoryContainer.appendChild(categoryCard);
});
console.log(categories);


const categoryCards = document.querySelectorAll(".category-label");
categoryCards.forEach((card) => {
    card.addEventListener("click", (e) => {
        const card =e.target.closest('.category-label');
        if (!card) return;
        const category = card.dataset.type;
        console.log(category);
        window.location.href = `categoryDitails.html?category=${encodeURIComponent(category)}`;
    });
});