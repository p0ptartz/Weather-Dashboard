let currentDate = moment().format("MMMM DD, YYYY")
const currentDateEl = document.querySelector("#current-date")
const apiKey = "f6db8585ff8265ffbd2cbb997c9856a7";


currentDateEl.innerHTML = currentDate

function getWeather() {
    currentWeather()
    fiveDayWeather()
}


function currentWeather() {
    let city = document.querySelector("#city-input").value;
    let currentCity = document.querySelector(".city")
    let currentTemp = document.querySelector("#temp")
    let wind = document.querySelector("#wind")
    let humidity = document.querySelector("#humidity")
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    // Make the fetch request
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentCity.innerHTML = data.name + data.weather[0].icon
            currentTemp.innerHTML = data.main.temp + " °F"
            wind.innerHTML = data.wind.speed + " MPH"
            humidity.innerHTML = data.main.humidity + "%"

        })
        .catch(error => console.error(error));
}

function fiveDayWeather() {
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}





