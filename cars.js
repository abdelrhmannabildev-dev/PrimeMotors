import { cars} from './data.js';
const categories = [...new Set(cars.map(car => car.type))];

const categoryContainer = document.querySelector('.category');
const cardsContainer = document.querySelector('.car-cards');

const engineTypeFilter = document.getElementById("engine-type");
const maxPriceFilter = document.getElementById("max-price");
const priceValueDisplay = document.getElementById("price-value");
const searchInput = document.getElementById("search");

let selectedCategory = 'all';

//  desplay cars 
displayCategory(categories);
displayCars(cars);

//  category listener 
categoryContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('category-label')) return;

    document.querySelectorAll('.category-label')
        .forEach(el => el.classList.remove('active'));

    e.target.classList.add('active');

    selectedCategory = e.target.textContent.toLowerCase();

    filterCars();
});

//  filtering 
maxPriceFilter.addEventListener('input', () => {
    priceValueDisplay.textContent = maxPriceFilter.value;
    filterCars();
});

engineTypeFilter.addEventListener('change', filterCars);
searchInput.addEventListener('input', filterCars);

//  show category 
function displayCategory(categories) {
    categoryContainer.innerHTML = '';

    const allCard = document.createElement('div');
    allCard.classList.add('category-label', 'active');
    allCard.textContent = 'All';
    categoryContainer.appendChild(allCard);

    categories.forEach(type => {
        const typeCard = document.createElement('div');
        typeCard.classList.add('category-label');
        typeCard.textContent = type;
        categoryContainer.appendChild(typeCard);
    });
}

//  displaying cards 
function displayCars(list) {
    cardsContainer.innerHTML = '';

    const carNums = document.querySelector('.carnums');
    carNums.textContent = `${list.length} Cars`;

    list.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');


        carCard.dataset.name = car.name;
        carCard.dataset.type = car.type;

        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h4>${car.name}</h4>
            <p>${car.specs || ''}</p>
            <p class="price">$${car.price}</p>
        `;

        cardsContainer.appendChild(carCard);
    });
}
//  FILTER logic
function filterCars() {
    const selectedEngine = engineTypeFilter.value;
    const maxPrice = parseInt(maxPriceFilter.value);
    const searchTerm = searchInput.value.toLowerCase();

    const result = cars.filter(car => {
    const matchesEngine =
        selectedEngine === 'all' ||
        car.engine.toLowerCase() === selectedEngine.toLowerCase();
        const matchesPrice = car.price <= maxPrice;

        const matchesSearch = car.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === 'all' || car.type.toLowerCase() === selectedCategory;

        return matchesEngine && matchesPrice && matchesSearch && matchesCategory;
    });

    displayCars(result);
}


// car details 
cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.car-card');
    if (!card) return;
    const carName=card.dataset.name;
    const category = card.dataset.type;
    console.log(carName);
    window.location.href = `carDetails.html?name=${encodeURIComponent(carName)}&category=${encodeURIComponent(category)}`;
});
