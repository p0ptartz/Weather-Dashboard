let currentDate = moment().format("MMMM DD, YYYY")
const currentDateEl = document.querySelector("#current-date")
const apiKey = "f6db8585ff8265ffbd2cbb997c9856a7";
let fiveDayContainer = document.querySelector(".five-day-container")
let forecastEl = document.querySelector(".forecast")

forecastEl.style.display = "none"
fiveDayContainer.style.display = "none";

currentDateEl.innerHTML = currentDate

function getWeather() {
    fiveDayWeather()
    currentWeather()

}


function currentWeather() {
    let city = document.querySelector("#city-input").value;
    let currentCity = document.querySelector(".city")
    let currentTemp = document.querySelector("#temp")
    let wind = document.querySelector("#wind")
    let humidity = document.querySelector("#humidity")
    let weatherIcon = document.querySelector(".weather-icon")

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


    // Make the fetch request
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            let iconCode = data.weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            currentCity.innerHTML = data.name
            currentTemp.innerHTML = data.main.temp + " °F"
            wind.innerHTML = data.wind.speed + " MPH"
            humidity.innerHTML = data.main.humidity + "%"
            weatherIcon.innerHTML = `<img src="${iconUrl}">` + `<img src="${iconUrl}">` + `<img src="${iconUrl}">`

        })
        .catch(error => console.error(error));
}

function fiveDayWeather() {
    fiveDayContainer.removeAttribute("style")
    forecastEl.removeAttribute("style")


    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    // let icon = document.querySelector(".icon-div")
    // let date = document.querySelector(".date-p")
    // let temp = document.querySelector(".temp-p")
    // let wind = document.querySelector(".wind-p")
    // let humid = document.querySelector(".humid-p")

    let iconOne = document.querySelector(".icon-one")
    let iconTwo = document.querySelector(".icon-two")
    let iconThree = document.querySelector(".icon-three")
    let iconFour = document.querySelector(".icon-four")
    let iconFive = document.querySelector(".icon-five")


    let dateOne = document.querySelector(".date-one")
    let dateTwo = document.querySelector(".date-two")
    let dateThree = document.querySelector(".date-three")
    let dateFour = document.querySelector(".date-four")
    let dateFive = document.querySelector(".date-five")

    let tempOne = document.querySelector(".temp-one")
    let tempTwo = document.querySelector(".temp-two")
    let tempThree = document.querySelector(".temp-three")
    let tempFour = document.querySelector(".temp-four")
    let tempFive = document.querySelector(".temp-five")

    let windOne = document.querySelector(".wind-one")
    let windTwo = document.querySelector(".wind-two")
    let windThree = document.querySelector(".wind-three")
    let windFour = document.querySelector(".wind-four")
    let windFive = document.querySelector(".wind-five")

    let humidOne = document.querySelector(".humid-one")
    let humidTwo = document.querySelector(".humid-two")
    let humidThree = document.querySelector(".humid-three")
    let humidFour = document.querySelector(".humid-four")
    let humidFive = document.querySelector(".humid-five")


    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            let iconCodeOne = data.list[8].weather[0].icon;
            let iconUrlOne = `http://openweathermap.org/img/wn/${iconCodeOne}@2x.png`;
            let iconCodeTwo = data.list[16].weather[0].icon;
            let iconUrlTwo = `http://openweathermap.org/img/wn/${iconCodeTwo}@2x.png`;
            let iconCodeThree = data.list[24].weather[0].icon;
            let iconUrlThree = `http://openweathermap.org/img/wn/${iconCodeThree}@2x.png`;
            let iconCodeFour = data.list[32].weather[0].icon;
            let iconUrlFour = `http://openweathermap.org/img/wn/${iconCodeFour}@2x.png`;
            let iconCodeFive = data.list[39].weather[0].icon;
            let iconUrlFive = `http://openweathermap.org/img/wn/${iconCodeFour}@2x.png`;


            iconOne.innerHTML = `<img src="${iconUrlOne}">` + `<img src="${iconUrlOne}">` + `<img src="${iconUrlOne}">`
            iconTwo.innerHTML = `<img src="${iconUrlTwo}">` + `<img src="${iconUrlTwo}">` + `<img src="${iconUrlTwo}">`
            iconThree.innerHTML = `<img src="${iconUrlThree}">` + `<img src="${iconUrlThree}">` + `<img src="${iconUrlThree}">`
            iconFour.innerHTML = `<img src="${iconUrlFour}">` + `<img src="${iconUrlFour}">` + `<img src="${iconUrlFour}">`
            iconFive.innerHTML = `<img src="${iconUrlFive}">` + `<img src="${iconUrlFive}">` + `<img src="${iconUrlFive}">`


            dateOne.innerHTML = moment(data.list[8].dt_txt).format("MM-DD-YYYY")
            dateTwo.innerHTML = moment(data.list[16].dt_txt).format("MM-DD-YYYY")
            dateThree.innerHTML = moment(data.list[24].dt_txt).format("MM-DD-YYYY")
            dateFour.innerHTML = moment(data.list[32].dt_txt).format("MM-DD-YYYY")
            dateFive.innerHTML = moment(data.list[39].dt_txt).format("MM-DD-YYYY")

            tempOne.innerHTML = "Temp: " + data.list[8].main.temp
            tempTwo.innerHTML = "Temp: " + data.list[16].main.temp
            tempThree.innerHTML = "Temp: " + data.list[24].main.temp
            tempFour.innerHTML = "Temp: " + data.list[32].main.temp
            tempFive.innerHTML = "Temp: " + data.list[39].main.temp

            windOne.innerHTML = "Wind: " + data.list[8].wind.speed + " mph"
            windTwo.innerHTML = "Wind: " + data.list[16].wind.speed + " mph"
            windThree.innerHTML = "Wind: " + data.list[24].wind.speed + " mph"
            windFour.innerHTML = "Wind: " + data.list[32].wind.speed + " mph"
            windFive.innerHTML = "Wind: " + data.list[39].wind.speed + " mph"

            humidOne.innerHTML = "Hum: " + data.list[8].main.humidity + "%"
            humidTwo.innerHTML = "Hum: " + data.list[16].main.humidity + "%"
            humidThree.innerHTML = "Hum: " + data.list[24].main.humidity + "%"
            humidFour.innerHTML = "Hum: " + data.list[32].main.humidity + "%"
            humidFive.innerHTML = "Hum: " + data.list[39].main.humidity + "%"
        })
}



