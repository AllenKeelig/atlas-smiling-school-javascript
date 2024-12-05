document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const carousel = document.getElementById("carouselExampleControls");
  const carouselInner = document.getElementById("carousel-quotes");
  const apiURL = "https://smileschool-api.hbtn.info/quotes";

  fetch(apiURL)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to fetch quotes");
          }
          return response.json();
      })
      .then((quotes) => {
          // Remove the loader after data is fetched
          loader.remove();

          quotes.forEach((quote, index) => {
              const carouselItem = document.createElement("div");
              carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

              // Add dynamic carousel item content
              carouselItem.innerHTML = `
                  <div class="row mx-auto align-items-center">
                      <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                          <img
                              src="${quote.pic_url}"
                              class="d-block align-self-center rounded-circle"
                              alt="Profile picture of ${quote.name}"
                          />
                      </div>
                      <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                          <div class="quote-text">
                              <p class="text-white">« ${quote.text}</p>
                              <h4 class="text-white font-weight-bold">${quote.name}</h4>
                              <span class="text-white">${quote.title}</span>
                          </div>
                      </div>
                  </div>
              `;

              // Append carousel item to carousel inner container
              carouselInner.appendChild(carouselItem);
          });

          // Initialize the Bootstrap carousel (relies on Bootstrap's JavaScript)
          $("#carouselExampleControls").carousel();
      })
      .catch((error) => {
          console.error("Error fetching quotes:", error);
          loader.textContent = "Failed to load quotes. Please try again later.";
      });
});
