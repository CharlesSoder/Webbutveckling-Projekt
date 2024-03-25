const apiKey = "63IRMceH21MoQsjJEHf74XKmrBFrf14acsLx9mJxvZ12TIn0CQMzP49s"; // Replace with your Pexels API key
const query = "240sx kouki"; // You can change this query to search for specific car brands

// Function to fetch images from Pexels API
// Jag har lagt per page till 0 så ändra när användning
function fetchImages() {
  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=0`, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const images = data.photos;
      const imageContainer = document.getElementById("image-container");

      images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt_description;
        imageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

// Call fetchImages function when the page loads
window.onload = fetchImages;
