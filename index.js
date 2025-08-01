const weatherBox = document.querySelector(".main-weather-area");
const searchInput = document.querySelector(".search-input");
const userWeatherBox = document.querySelector(".user-location-box");
const searchButton = document.querySelector(".search-btn");
const userLocationText = document.querySelector(".user-loc-text");
let searchInputValue = searchInput.value;

const API_KEY ='b73fbb036d3fc8d3a1706fcf355ffce9';
const OPENCAGE_API_KEY = '70635330bc53429a8e406d2a9b95955e';

const weatherIconMap = {
  "01d": { icon: "fas fa-sun", color: "#FDB813" },             // Clear day
  "01n": { icon: "fas fa-moon", color: "#A3C4F3" },            // Clear night
  "02d": { icon: "fas fa-cloud-sun", color: "#F6C065" },       // Few clouds day
  "02n": { icon: "fas fa-cloud-moon", color: "#B0C6E8" },      // Few clouds night
  "03d": { icon: "fas fa-cloud", color: "#C0C0C0" },           // Scattered clouds
  "03n": { icon: "fas fa-cloud", color: "#A9A9A9" },
  "04d": { icon: "fas fa-cloud-meatball", color: "#999999" },  // Broken clouds
  "04n": { icon: "fas fa-cloud-meatball", color: "#777777" },
  "09d": { icon: "fas fa-cloud-showers-heavy", color: "#4A90E2" }, // Shower rain
  "09n": { icon: "fas fa-cloud-showers-heavy", color: "#4178BE" },
  "10d": { icon: "fas fa-cloud-sun-rain", color: "#4A90E2" },   // Rain day
  "10n": { icon: "fas fa-cloud-moon-rain", color: "#4178BE" }, // Rain night
  "11d": { icon: "fas fa-bolt", color: "#FFD700" },            // Thunderstorm
  "11n": { icon: "fas fa-bolt", color: "#FFAA00" },
  "13d": { icon: "fas fa-snowflake", color: "#B3E5FC" },       // Snow
  "13n": { icon: "fas fa-snowflake", color: "#81D4FA" },
  "50d": { icon: "fas fa-smog", color: "#9E9E9E" },            // Mist
  "50n": { icon: "fas fa-smog", color: "#616161" }
};

function CalculateWeatherDetails(data) {
 let cityWeatherData = [];
 //for todays weather
 const cityName = data.city.name;
 const main = data.list[0].main;
 const weather = data.list[0].weather[0];
 const wind = data.list[0].wind;
 const cords = data.cod;
 const cordobj = data.city.coord;

 //for next 3 days
 const forecastList = data.list;
 const uniqueDates = [];
 const groupedDates = {};

 forecastList.forEach((item) => {
     const dayDate = item.dt_txt.split(" ")[0];
     if(!uniqueDates.includes(dayDate)) {
         uniqueDates.push(dayDate);
         if(!groupedDates[dayDate]) {
             groupedDates[dayDate] = [];
             groupedDates[dayDate].push(item);
         }
     }
 })
 const next3Days = uniqueDates.slice(1,6);
 cityWeatherData.push({
    city: cityName,
    main,
    weather,
    wind,
    cords,
    cordobj,
    day1: groupedDates[next3Days[0]],
    day2: groupedDates[next3Days[1]],
    day3: groupedDates[next3Days[2]],
    day4: groupedDates[next3Days[3]]
  })

  let html = ``;

  cityWeatherData.forEach((data) => {
    const weatherIcon = weatherIconMap[data.weather.icon].icon;

    html += `<div class="weather-fetch-area">
                <div class="fetch-top-area">
                    <div class="weather-icon-area">
                        <i class="${weatherIcon}"></i>
                    </div>
                    <div class="right-top-area">
                        <h1>${data.city}</h1>
                        <span class = "desc-span">${data.weather.description}</span>
                        <span><i class="fas fa-temperature-high"></i> Feels Like: <span class="feels-like">${data.main.feels_like}°</span></span>
                    </div>
                    <div class="temp-area">
                        <h1>🌡️ ${data.main.temp}°</h1>
                        <span><i class="fas fa-tint"></i> Humidity: <span class="feels-like">${data.main.humidity}%</span></span>
                    </div>
            </div>
            <div class="middle-fetch-area">
                <div class="weather-middle">
                <div class="weather-info-box">
                    <p>	<i class="fas fa-bolt"></i> Weather Condition: <span class="weather-info-span">${data.weather.main}</span></p>
                </div>
                <div class="weather-info-box">
                    <p><i class="fas fa-wind"></i> Wind Speed: <span class="weather-info-span">${data.wind.speed}</span></p>
                </div>
                <div class="weather-info-box">
                    <p><i class="fas fa-compress-arrows-alt"></i> Pressure (ATM): <span class="weather-info-span">${data.main.pressure}</span></p>
                </div>
                <div class="weather-info-box">
                    <p><i class="fas fa-temperature-high"> </i> Max Temp: <span class="weather-info-span">${data.main.temp_max}°</span></p>
                </div>
                <div class="weather-info-box">
                    <p><i class="fas fa-tint"></i> </i> Humidity: <span class="weather-info-span">${data.main.humidity}%</span></p>
                </div>
            </div>
            <div class="middle-location">
                <div class="location-box">
                <h1><i class="fas fa-map-marker-alt"></i> Location : <span class="city-name">${data.city}</span></h1>
               </div>
               <div class="weather-info-box">
                <p><i class="fas fa-crosshairs"></i> Cordinates: <span class="weather-info-span">${data.cords}</span></p>
            </div>
               <div class="weather-info-box">
                <p>📍 Latitude: <span class="weather-info-span">${data.cordobj.lat}</span></p>
            </div>
            <div class="weather-info-box">
                <p>📍 Longitude: <span class="weather-info-span">${data.cordobj.lon}</span></p>
            </div>
            </div>
        </div>
        <div class="forecast-cards-area">
            <div class="forecast-head">
                <h2>❄️ Next 4 Days Forecast</h2>
            </div>
            <div class="cards-area">
                <div class="weather-card">
                    <span class="weather-date">${data.day1[0].dt_txt.split(" ")[0]}</span>
                    <div class="main-card">
                        <div class="icon-area">
                            <i class="${weatherIconMap[data.day1[0].weather[0].icon].icon}"></i>
                              <span>${data.day1[0].weather[0].description}</span>
                        </div>
                        <div class="card-temp-area">
                            <h2>${data.day1[0].main.temp}°</h2>
                        </div>
                    </div>
                </div>
                <div class="weather-card">
                    <span class="weather-date">${data.day2[0].dt_txt.split(" ")[0]}</span>
                    <div class="main-card">
                        <div class="icon-area">
                            <i class="${weatherIconMap[data.day2[0].weather[0].icon].icon}"></i>
                              <span>${data.day2[0].weather[0].description}</span>
                        </div>
                        <div class="card-temp-area">
                            <h2>${data.day2[0].main.temp}°</h2>
                        </div>
                    </div>
                </div>
                <div class="weather-card">
                    <span class="weather-date">${data.day3[0].dt_txt.split(" ")[0]}</span>
                    <div class="main-card">
                        <div class="icon-area">
                            <i class="${weatherIconMap[data.day3[0].weather[0].icon].icon}"></i>
                              <span>${data.day3[0].weather[0].description}</span>
                        </div>
                        <div class="card-temp-area">
                            <h2>${data.day3[0].main.temp}°</h2>
                        </div>
                    </div>
                </div>
                <div class="weather-card">
                    <span class="weather-date">${data.day4[0].dt_txt.split(" ")[0]}</span>
                    <div class="main-card">
                        <div class="icon-area">
                            <i class="${weatherIconMap[data.day4[0].weather[0].icon].icon}"></i>
                              <span>${data.day4[0].weather[0].description}</span>
                        </div>
                        <div class="card-temp-area">
                            <h2>${data.day4[0].main.temp}°</h2>
                        </div>
                    </div>
                </div>
        </div>
        </div>`
  });
  data.user ? userWeatherBox.innerHTML = html :  weatherBox.innerHTML = html;
}

async function fetchWeather(city) {
    try {
        Swal.fire({
            title: `Fetching weather`,
            text: 'Please wait',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    const cityWeatherData = []; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    Swal.close();
    if(data.cod && data.message === "city not found") {
        Swal.fire({
            title: 'Place Isn"t Found!',
            text: 'Try Fixing Your Typos In The Search Input',
            icon: 'info',
            confirmButtonText: 'Okay'
          });
          return;
    }
    CalculateWeatherDetails(data);
    } catch (error) {
        console.error(error);
    }
} 

fetchWeather("Australia");
loadUserLocationWeather();
setTimeout(loadUserLocationWeather,5000)

//function for three cities auto weather 

const cities = ["Islamabad","Lahore","Multan"];

async function fetchMultipleCitiesWeather(cities) {
   const citiesWeatherData = [];
   for(const city of cities) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    const cityName = data.city.name;
    const main = data.list[0].main;
    const weather = data.list[0].weather[0];
    const wind = data.list[0].wind;
    
    const forecastList = data.list;
    const uniqueDates = [];
    const groupedDates = {};

    forecastList.forEach((item) => {
        const dayDate = item.dt_txt.split(" ")[0];
        if(!uniqueDates.includes(dayDate)) {
            uniqueDates.push(dayDate);
            if(!groupedDates[dayDate]) {
                groupedDates[dayDate] = [];
                groupedDates[dayDate].push(item);
            }
        }
    })
    const next3Days = uniqueDates.slice(1,4);
    citiesWeatherData.push({
            city: cityName,
            main,
            weather,
            wind,
            day1: groupedDates[next3Days[0]],
            day2: groupedDates[next3Days[1]],
            day3: groupedDates[next3Days[2]]
        })
   }

   console.log("thee three days data", citiesWeatherData);
   return citiesWeatherData;
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser");
        Swal.fire({
            title: 'Your Location Isn"t Found!, Auto Detection Failed!',
            text: 'We Dont Support Your Location Forecast:( Sorry, You Can Try Searching Other Places',
            icon: 'info',
            confirmButtonText: 'Okay'
          });
          return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve({ lat, lon });
        },
        (error) => {
          console.error("Location error:", error);
          reject("User denied location or error occurred");
          if (error.code === error.PERMISSION_DENIED) {
            Swal.fire({
                title: 'Your Location Isn"t Found!, Auto Detection Failed!',
                icon: 'info',
                confirmButtonText: 'Okay'
              });
              userWeatherBox.classList.add("hide")
              userLocationText.classList.add("hide");
              return;
          }
        }
      );
    });
  }



async function fetchWeatherByCords(lat,lon) {

  async function getCityName(lat, lon) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`);
    const data = await response.json();
    const city = data.results[0].components.city.split(" ")[0]
    return city;
  }
    const city = await getCityName(lat,lon);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    return data;
}

async function loadUserLocationWeather() {
   const cityWeatherData = []
   const {lat,lon} = await getUserLocation();
   console.log(lat,lon)
   const data = await fetchWeatherByCords(lat,lon);
   if(data.cod && data.message === "city not found") {
     userWeatherBox.classList.add("hide")
     userLocationText.classList.add("hide");
     Swal.fire({
        title: 'Your Location Isn"t Found!, Auto Detection Failed!',
        text: 'We Dont Support Your Location Forecast:( Sorry, You Can Try Searching Other Places',
        icon: 'info',
        confirmButtonText: 'Okay'
      });
      return;
   }
   if(!data.user) {
    data.user = true;
   }
   console.log(data);
   return CalculateWeatherDetails(data);
}


searchInput.addEventListener("keydown", (e) => {
    searchInputValue = searchInput.value.toLowerCase().trim();
    if(e.key === "Enter") {
        if(searchInputValue) {
            fetchWeather(searchInputValue);
        }
    }
});

searchButton.addEventListener("click", (e) => {
    searchInputValue = searchInput.value.toLowerCase().trim();
        if(searchInputValue) {
            fetchWeather(searchInputValue);
        }
});