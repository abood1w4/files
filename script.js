const container = document.querySelector(".container");
const coffees = [
  { name: "Perspiciatis", image: "coffee.jpeg" },
  { name: "Voluptatem", image: "Chaga Reishi Cacao Elixir.jpeg" },
  { name: "Explicabo", image: "Cold Brew Cofffee photography ☕️(difotosamavalen).jpeg" },
  { name: "Rchitecto", image: "download (1).jpeg" },
  { name: "Beatae", image: "download (2).jpeg" },
  { name: "Vitae", image: "download (3).jpeg" },
  { name: "Inventore", image: "download.jpeg" },
  { name: "Veritatis", image: "Plastikowy filtr Hario V60-2.jpeg" },
  { name: "Accusantium", image: "pngtree-hot-coffee-image-background-image_15627251.jpg" },
];

const showCoffees = () => {
  const output = coffees.map(
    ({ name, image }) => `
      <div class="card">
        <img class="card--avatar" src="${image}" alt="${name}" />
        <h1 class="card--title">${name}</h1>
        <a class="card--link" href="#">Taste</a>
      </div>`
  ).join('');
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service Worker registered"))
      .catch(err => console.log("Service Worker not registered", err));
  });
}

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    }).catch(() => {
      return new Response("Network error", {
        status: 408,
        statusText: "Network error"
      });
    })
  );
});