const apiKey = "63IRMceH21MoQsjJEHf74XKmrBFrf14acsLx9mJxvZ12TIn0CQMzP49s"; // Replace with your Pexels API key
const query = "240sx kouki"; // You can change this query to search for specific car brands

// Function to fetch images from Pexels API
// Jag har lagt per page till 0 så ändra när användning

let carBrands = [
  "Lamborghini",
  "Mercedes",
  "Nissan",
  "Chevrolet",
  "Volkswagen",
  "Audi",
  "Honda",
  "Hyundai",
  "Kia",
  "Ferrari",
  "Porsche",
  "Lexus",
  "Mazda",
  "Subaru",
  "Tesla",
  "Volvo",
  "Jeep",
  "Jaguar",
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
        container.appendChild(imgElement);
      });

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
window.onload = fetchImages;
