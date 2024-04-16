const apiKey = "63IRMceH21MoQsjJEHf74XKmrBFrf14acsLx9mJxvZ12TIn0CQMzP49s"; // Replace with your Pexels API key
const query = "240sx kouki"; // You can change this query to search for specific car brands

// Function to fetch images from Pexels API
// Jag har lagt per page till 0 så ändra när användning

let carBrands = [
  "Lamborghini Murcielago",
  "Mercedes-benz S-Class",
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
  // "Mazda MX-5",
  // "Subaru Impreza",
  // "Tesla Model S",
  // "Volvo XC90",
  // "Jeep Wrangler",
  // "Jaguar F-Type",
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

const corsProxyUrl = "https://corsproxy.io/?";

function fetchImage(query, containerIndex) {
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;
  const proxyUrl = corsProxyUrl + encodeURIComponent(apiUrl);

  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
    headers: {
      Authorization: apiKey,
    },
  })
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

      const button = document.createElement("button");
      button.textContent = "View Details";
      button.addEventListener("click", () => {
        // Redirect to another page passing the car brand as a query parameter
        window.location.href = `details.html?brand=${encodeURIComponent(
          query
        )}`;
      });
      container.appendChild(button);

      //texten för den exakta bilen
      const textElement = document.createElement("p");
      textElement.textContent = query;
      container.appendChild(textElement);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}
// Call fetchImages function when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
});
const searchInput = document.querySelector(".search-bar2 input");

const searchIcon = document.querySelector(".search-bar2 i.fa-magnifying-glass");

// Add event listener for keypress
searchInput.addEventListener("keypress", function (event) {
  // Check if the pressed key is Enter
  if (event.key === "Enter") {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the function to handle search
    handleSearch();
  }
});

searchIcon.addEventListener("click", function () {
  // Call the function to handle search
  handleSearch();
});

// Function to handle search
function handleSearch() {
  // Get the search query from the input field
  const query = searchInput.value.trim();
  // Redirect to the details page with the search query as a parameter
  window.location.href = `details.html?modelName=${encodeURIComponent(query)}`;
}
