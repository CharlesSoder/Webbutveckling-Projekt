// Den tar ut car brand från url query
const urlParams = new URLSearchParams(window.location.search);
const carBrand = urlParams.get("modelName");
const modelName = carBrand.split(" ").pop(); // API tar bara model name, inte BMW men "BMW X5" eller "X5" går bra.

// Tar car brand och fetchar från ninja API
const api_ninjas_key = "SMYcP8gAQ5Oqu0QQRbo3dw==Cn8ldHsxKNwhRaRU";
const pexels_key = "63IRMceH21MoQsjJEHf74XKmrBFrf14acsLx9mJxvZ12TIn0CQMzP49s";
const apiUrl = `https://api.api-ninjas.com/v1/cars?model=${modelName}`;

fetch(apiUrl, {
  headers: {
    "X-Api-Key": api_ninjas_key,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const carDetailsDiv = document.getElementById("carName");
    const carDescriptionDiv = document.getElementById("carDescription");

    if (data.length > 0) {
      const car = data[0];
      const carDiv = document.createElement("div");
      carDiv.innerHTML = `
                    <h2> ${car.make}, ${car.model}</h2>
                    <p>Vehicle manufacturer: ${car.make}</p>
                    <p>Year: ${car.year}</p>
                    <p>Drive type: ${car.drive}</p>
                    <p>Fuel type: ${car.fuel_type}</p>
                    <p>Transmission: ${car.transmission}</p>
                    <p>Cylinders: ${car.cylinders}</p>
                    <!-- Add more information as needed -->
                `;
      carDetailsDiv.appendChild(carDiv);
    }

    if (data.length > 0) {
      const car = data[0];
      const carDiv = document.createElement("div");
      carDiv.innerHTML = `
            The ${car.make} ${car.model} is a ${car.class} with a fuel type of ${car.fuel_type}, a consumption of ${car.city_mpg} (miles per gallon).
            The ${car.make} ${car.model} made ${car.year} by ${car.make} is ${car.transmission} (transmission) and will suit every user differently.
            More specific this car has ${car.cylinders} cylinders
                `;
      carDescriptionDiv.appendChild(carDiv);
    }
    console.log("data is:", data); // visar datan som den tar
  })
  .catch((error) => {
    console.error("Error fetching car information:", error);
  });

const apiKey = pexels_key;
fetch(`https://api.pexels.com/v1/search?query=${modelName}&per_page=1`, {
  headers: {
    Authorization: apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const carImageDiv = document.getElementById("carImage");
    const carImageContainerDiv = document.getElementById("carImageContainer");
    const carImage = data.photos[0];
    const imgElement = document.createElement("img");
    imgElement.src = carImage.src.medium;
    imgElement.alt = carImage.alt_description;

    carImageDiv.appendChild(imgElement);
    let bgImage = imgElement.cloneNode(true);

    bgImage.style.width = "100%";
    bgImage.style.height = "350px";
    bgImage.style.filter = "brightness(0.5) blur(4px)";
    carImageContainerDiv.appendChild(bgImage);
  })
  .catch((error) => {
    console.error("Error fetching car image:", error);
  });

// Kalla på fetchImages när window har laddats, samma som app.js
document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
});
const searchInput = document.querySelector(".search-bar2 input");

const searchIcon = document.querySelector(".search-bar2 i.fa-magnifying-glass");

//detta är för att sök funktion ska också funka i details.html:

// Event listener när man trycker
searchInput.addEventListener("keypress", function (event) {
  // Check if the pressed key is Enter
  if (event.key === "Enter") {
    // Som app.js, basically "gör inte som du brukar göra, browser. Låt mig sköta det"
    event.preventDefault();
    // Kalla på sök funktion
    handleSearch();
  }
});

searchIcon.addEventListener("click", function () {
  // kalla på sök funktion
  handleSearch();
});

// Sök funktion
function handleSearch() {
  // Skaffa info från sök och gör det till query
  const query = searchInput.value.trim();
  // Redirect till details med query som sök parameter
  window.location.href = `details.html?modelName=${encodeURIComponent(query)}`;
}
