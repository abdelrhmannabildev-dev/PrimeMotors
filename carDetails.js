import { cars } from "./data.js";


const url= new URLSearchParams(window.location.search); 
const carParam= url.get('name');
const car = cars.find((car) => car.name === carParam);

console.log(carParam);

const carDetails = document.querySelector(".car-details");


//  car details page
function renderDetails(car) {
    const allImages =car.images;
    const price = `$${car.price}`;

    const infos = [
        { label: "Engine", value: car.engine } ,
        { label: "Fuel", value: car.fuel },
        { label: "Top speed", value: `${car.topSpeed} km/h` },
        { label: "Seats", value: car.seats },
    ]

    let galleryHtml = "";

    if (allImages.length > 1) {
        let imagesHtml = "";

        for (let i = 0; i < allImages.length; i++) {
            let src = allImages[i];

            let className = "car-img";
            if (i === 0) {
                className = "car-img active";
            }

            imagesHtml += `
                <img class="${className}" src="${src}" alt="${car.name}" >
            `;
        }

        galleryHtml = `
            <div class="car-gallery">
                ${imagesHtml}
            </div>
        `;
    }

    let infosHtml = "";

    for (let i = 0; i < infos.length; i++) {
        let item = infos[i];

        infosHtml += `
            <div class="info">
                <span class="info-label">${item.label}</span>
                <span class="info-value">${item.value}</span>
            </div>
        `;
    }

    let descriptionText = car.description;

    let detailsHtml = `
        <div class="container">

            <div class="left-section">
                <h1>${car.name}</h1>
                <h2>${price}</h2>

                <div class="infos-container">
                    ${infosHtml}
                </div>

                <p>${descriptionText}</p>

                <div class="buy">
                    <button id="buy-button">
                        add to card <span style="color: rgb(154, 255, 154);">$$</span>
                    </button>
                </div>
            </div>

            <div class="right-section">
                <div class="category">
                    <h3>${car.type}</h3>
                </div>

                <img class="car-main-image" src="${car.image}" alt="${car.name}">

                ${galleryHtml}
            </div>

        </div>
    `;

    carDetails.innerHTML = detailsHtml;

    const mainImage = carDetails.querySelector(".car-main-image");
    carDetails.querySelectorAll(".car-img").forEach((img) => {
        img.addEventListener("click", () => {
            const src = img.src;
            if (src) mainImage.src = src;

            carDetails.querySelectorAll(".car-img").forEach((t) => t.classList.remove("active"));
            img.classList.add("active");
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
    carDetails.innerHTML = `<h4>Car not found.</h4>`;
} else {
    renderDetails(car);
}
// history / back button
const button = document.getElementById("back-button");
button.addEventListener('click', () => {
    window.history.back();
});
