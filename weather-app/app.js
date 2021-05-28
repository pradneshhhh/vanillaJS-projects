let api = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=eec6f7041423fcf66d7be0c5702cfa9e";

const cityEl = document.querySelector("#city");
const btn = document.querySelector("#search");

function getWeather() {
    let city = cityEl.value;
    if(city=="") {
        alert("Please enter a city");
        return;
    }
    let url = createUrl(city);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod==404) {
                message.innerHTML = `${city} is not a valid city 🙁, please enter a valid city name`;
            }
            if(data.cod==200) {
                getHtmlTemplate(data);
            }
        });
}

function createUrl(city) {
    return api+city+apiKey;
}

function convertToCelcius(temp) {
    let temperature = parseFloat(temp, 10);
    return (temperature-273.15).toFixed(2);
}

function getHtmlTemplate(data){
    let temp = data.main.temp;
    temperature.textContent = convertToCelcius(temp) + "°C";
    description.textContent = data.weather[0].main;
    loc.textContent = data.name;
    getSvg(data.weather[0].main);
}

function getSvg(weatherType) {
    if(weatherType == "Clouds") {
        document.getElementById("bodystyle").style.background = "url(svg/overcast.svg)";
    }
    if(weatherType == "Clear") {
        document.getElementById("bodystyle").style.background = "url(svg/clear-day.svg)";
    }
    if(weatherType == "Rain") {
        document.getElementById("bodystyle").style.background = "url(svg/rain.svg)";
    }
    if(weatherType == "Snow") {
        document.getElementById("bodystyle").style.background = "url(svg/snow.svg)";
    }
    if(weatherType == "Drizzle") {
        document.getElementById("bodystyle").style.background = "url(svg/rain.svg)";
    }
    if(weatherType == "Thunderstorm") {
        document.getElementById("bodystyle").style.background = "url(svg/thunderstorms.svg)";
    }
    if(weatherType == "Haze") {
        document.getElementById("bodystyle").style.background = "url(svg/haze.svg)";
    }
    if(weatherType == "Smoke") {
        document.getElementById("bodystyle").style.background = "url(svg/smoke.svg)";
    }
}

btn.addEventListener("click", getWeather, false);