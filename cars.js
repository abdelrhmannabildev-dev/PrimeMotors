import { cars } from './data.js';

const categoryContainer = document.querySelector('.category');
const cardsContainer = document.querySelector('.car-cards');

const engineFilter = document.getElementById("engine-type");
const priceFilter = document.getElementById("max-price");
const priceText = document.getElementById("price-value");
const searchBox = document.getElementById("search");

let activeCategory = 'all';

let categories = [];

for (let i = 0; i < cars.length; i++) {
    if (!categories.includes(cars[i].type)) {
        categories.push(cars[i].type);
    }
}

displayCategories(categories);
displayCars(cars);

// category click
categoryContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.category-label');
    if (!item) return;

    const allItems = document.querySelectorAll('.category-label');
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('active');
    }

    item.classList.add('active');

    activeCategory = item.textContent.toLowerCase();
    filterCars();
});

// filters
priceFilter.addEventListener('input', () => {
    priceText.textContent = priceFilter.value;
    filterCars();
});

engineFilter.addEventListener('change', filterCars);
searchBox.addEventListener('input', filterCars);

// show categories
function displayCategories(list) {
    categoryContainer.innerHTML = '';

    const allBtn = document.createElement('div');
    allBtn.classList.add('category-label', 'active');
    allBtn.textContent = 'All';
    categoryContainer.appendChild(allBtn);

    for (let i = 0; i < list.length; i++) {
        const item = document.createElement('div');
        item.classList.add('category-label');
        item.textContent = list[i];

        categoryContainer.appendChild(item);
    }
}

// show cars
function displayCars(list) {
    cardsContainer.innerHTML = '';

    const counter = document.querySelector('.carnums');
    counter.textContent = list.length + ' Cars';

    for (let i = 0; i < list.length; i++) {
        const car = list[i];

        const card = document.createElement('div');
        card.classList.add('car-card');

        card.dataset.name = car.name;

        let specs = car.specs ? car.specs : '';

        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h4>${car.name}</h4>
            <p>${specs}</p>
            <p class="price">$${car.price}</p>
        `;

        cardsContainer.appendChild(card);
    }
}

// filter logic
function filterCars() {
    const engine = engineFilter.value;
    const maxPrice = Number(priceFilter.value);
    const search = searchBox.value.toLowerCase();

    let filtered = [];

    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];

        let matchEngine =
            engine === 'all' ||
            car.engine.toLowerCase() === engine.toLowerCase();

        let matchPrice = car.price <= maxPrice;

        let matchSearch = car.name.toLowerCase().includes(search);

        let matchCategory =
            activeCategory === 'all' ||
            car.type.toLowerCase() === activeCategory;

        if (matchEngine && matchPrice && matchSearch && matchCategory) {
            filtered.push(car);
        }
    }

    displayCars(filtered);
}

// go to details
cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.car-card');
    if (!card) return;

    const name = card.dataset.name;

    window.location.href =
        `carDetails.html?name=${encodeURIComponent(name)}`;
});