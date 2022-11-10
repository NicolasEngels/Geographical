import mapboxgl from "mapbox-gl";

const adressForm = document.getElementById("adressform");

adressForm.addEventListener("submit", (event) => {
  event.preventDefault();

    mapboxgl.accessToken =
      "pk.eyJ1IjoiamFjaW50aGU3IiwiYSI6ImNsYWF2ZmRsMzBibHozdXBsbGZqanptNWgifQ.Keosk23x6wwC8ta9daG4PA";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [5, 51], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });
});
