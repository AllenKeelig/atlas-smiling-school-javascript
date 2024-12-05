document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader")
  const carousel = document.getElementById("carouselExampleControls");
  const carouselInner = document.getElementById("carousel-quotes");
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((quotes) => {
    loader.style.display = "none";
    carousel.style.display = "block";
    quotes.forEach((quote, index) => {
      const activeClass = index === 0 ? "active" : "";
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${activeClass}`;
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
      </div>
      `;
      carouselInner.appendChild(carouselItem);
    });
    $('#carouselExampleControls').carousel();
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
    loader.innerHTML = "<p class='text-white'>Failed to load quotes.</p>";
  });
});