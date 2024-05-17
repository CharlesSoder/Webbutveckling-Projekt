const apiKey = "n43XbAobCpoDgMqfEUjQ5LRXbsQK5emlU0ORB1SX8p7O6mJAA1WbnTYP";
const query = "240sx kouki";

// Jag har lagt per page till 0 så ändra när användning

let carBrands = [
  "Lamborghini Murcielago",
  "Jaguar F-Type",
  "Nissan Sentra",
  "Chevrolet Corvette",
  "Volkswagen Passat",
  "Audi A4",
  "Honda Civic",
  "Hyundai Sonata",
  "Kia Sorento",
  "Ferrari F8 Tributo",
  "Porsche Cayenne",
  "Lexus ES",
];

for (let i = 0; i < 18; i++) {
  const element = carBrands[i];
}

function fetchImages() {
  // fetchImage(carBrands[0], 0); (Detta är vad for loopen gör här)
  for (let i = 0; i < carBrands.length; i++) {
    fetchImage(carBrands[i], i);
  }
}

function fetchImage(query, containerIndex) {
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
    headers: {
      Authorization: apiKey,
    },
  })
    //gör en HTTP request och använder response och sedan konverterar response till ett json objekt. Detta blir "data"
    .then((response) => response.json())
    .then((data) => {
      const images = data.photos;
      const container =
        document.querySelectorAll(".bil-container")[containerIndex];

      images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt_description;
        imgElement.loading = "lazy";
        container.appendChild(imgElement);
      });

      const a = document.createElement("a");
      a.href = `details.html?modelName=${encodeURIComponent(query)}`;
      a.classList.add("detailsClass");
      a.innerText = "view details";

      container.appendChild(a);
      //texten för den exakta bilen
      const textElement = document.createElement("p");
      textElement.textContent = query;
      container.appendChild(textElement);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}
// När window laddas kör fetchImages (alltså hämta bilderna)
document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
});
const searchInput = document.querySelector(".search-bar2 input");

const searchIcon = document.querySelector(".search-bar2 i.fa-magnifying-glass");

// Add event listener for keypress
searchInput.addEventListener("keypress", function (event) {
  // Check if the pressed key is Enter
  if (event.key === "Enter") {
    // basically "gör inte som du brukar göra, browser. Låt mig sköta det"
    event.preventDefault();
    // funktion för att imput ska sökas efter
    handleSearch();
  }
});

searchIcon.addEventListener("click", function () {
  // kalla på sök funktion
  handleSearch();
});

// Detta är funktionen för att söka
function handleSearch() {
  // Skaffa info från sök och gör det till query
  const query = searchInput.value.trim();
  // Redirect till details med query som sök parameter
  window.location.href = `details.html?modelName=${encodeURIComponent(query)}`;
}
