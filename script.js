const submit = document.getElementById("submit");

const weather = document.createElement("button");
weather.textContent = "show weather";
weather.style.margin = "auto";

const showWeather = document.createElement("div");

const displayWeather = (long, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=91fdbdaf4673e7160a4cc9733787aacd&units=metric`)
    .then((response) => response.json())
    .then((json) => {
        const temp = json.main.temp;
        const tempFeelsLike = json.main.feels_like;
        const humidity = json.main.humidity;
        const weatherType = json.weather[0].main;
        const windSpeed = json.wind.speed;

        let windDirection = "";
        if (json.wind.deg >= 0 && json.wind.deg < 22.4) {
            windDirection = "North";
        } else if (json.wind.deg > 22.5 && json.wind.deg < 67.4) {
            windDirection = "North-East";
        } else if (json.wind.deg > 67.5 && json.wind.deg < 112.4) {
            windDirection = "East";
        } else if (json.wind.deg > 112.5 && json.wind.deg < 157.4) {
            windDirection = "South-East";
        } else if (json.wind.deg > 157.5 && json.wind.deg < 202.4) {
            windDirection = "South";
        } else if (json.wind.deg > 202.5 && json.wind.deg < 247.4) {
            windDirection = "South-West";
        } else if (json.wind.deg > 247.5 && json.wind.deg < 292.4) {
            windDirection = "West";
        } else if (json.wind.deg > 292.5 && json.wind.deg < 337.4) {
            windDirection = "North-West";
        } else if (json.wind.deg > 337.5 && json.wind.deg <= 360) {
            windDirection = "North";
        }

        showWeather.style.border = "solid 2px whitesmoke";
        showWeather.style.borderRadius = "3px";
        showWeather.style.color = "whitesmoke";
        showWeather.style.padding = "15px";
        showWeather.style.lineHeight = "25px";

        showWeather.innerHTML = `<h2>WEATHER</h2>
         <p>temp : ${temp}° (feels like : ${tempFeelsLike}°)</p>
         <p>humidity : ${humidity}%</p>
         <p>weather type : ${weatherType}</p>
         <p>wind : ${windSpeed}km/h - from ${windDirection}</p>`;

        document.getElementById("weather").appendChild(showWeather);
        weather.style.display = "none";
    });
};

const displayMap = (long, lat) => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmljb2xhcy1lbmdlbHMiLCJhIjoiY2xhODJhY3JkMDI2ODNwcjIzZzBtMmdlYSJ9.Y09hza2HI1nGzg7a3bAzoA";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: 11, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    weather.style.display = 'block';
    document.getElementById("weather").appendChild(weather);

    weather.addEventListener("click", () => {
      displayWeather(long, lat);
    });
};

submit.addEventListener('click', () => {
    const address = document.getElementById("address").value;
    document.getElementById("map").innerHTML="";
    document.getElementById("weather").innerHTML = "";
    fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${address}&apiKey=RVVfMzhiZWE0MTYzNzEyNGMwYWE0ZDNmZGJjNGVkNGQ4NDA6NzFiZDcyMDktODcwYy00MTIyLThhZDktNDJlMjJiYTY5NjUz`)
    .then(response => response.json())
	.then((data) => {
        const lat = data.locations[0].referencePosition.latitude;
        const long = data.locations[0].referencePosition.longitude;

        displayMap(long, lat);
    })

    
})

