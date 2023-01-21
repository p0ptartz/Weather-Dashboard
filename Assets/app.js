let currentDate = moment().format("MMMM DD, YYYY")
const currentDateEl = document.querySelector("#current-date")
// let APIKey = "f6db8585ff8265ffbd2cbb997c9856a7";
// let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=f6db8585ff8265ffbd2cbb997c9856a7"


currentDateEl.innerHTML = currentDate



function getWeather() {
    let city = document.querySelector("#city-input").value;
    let apiKey = "f6db8585ff8265ffbd2cbb997c9856a7";
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
            currentCity.innerHTML = data.name
            currentTemp.innerHTML = data.main.temp + " °F"
            wind.innerHTML = data.wind.speed + " MPH"
            humidity.innerHTML = data.main.humidity + "%"

        })
        .catch(error => console.error(error));

}




