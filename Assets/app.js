let currentDate = moment().format("MMMM DD, YYYY")
const currentDateEl = document.querySelector("#current-date")
const apiKey = "f6db8585ff8265ffbd2cbb997c9856a7";
let fiveDayContainer = document.querySelector(".five-day-container")
let forecastEl = document.querySelector(".forecast")
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
let currentCityInput;

forecastEl.style.display = "none"
fiveDayContainer.style.display = "none";
currentDateEl.innerHTML = currentDate

// function that grabs all the data when clicking search
function getWeather() {
    // targets the value the user input
    currentCityInput = document.querySelector("#city-input").value
    // will only grab data if input is defined
    if (currentCityInput !== undefined && currentCityInput !== null && currentCityInput !== "") {
        currentWeather(currentCityInput)
        fiveDayWeather(currentCityInput)
    } else {
        alert("ENTER A VALUE :O")
    }
}


// function that takes the user input and stores it in local storage to create search history buttons that can display previous searches
function handleSearchHistory(currentCityInput) {
    // stores the most recent searches first
    searchHistory.unshift(currentCityInput)
    // removes oldest search when exceeding 10 total searches
    if (searchHistory.length > 10) {
        searchHistory.pop()
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    // targets element that will contain search history buttons
    let buttonContainer = document.querySelector(".history-buttons")
    buttonContainer.innerHTML = ""; s
    // looping search history to create new btn for each search
    for (let i = 0; i < searchHistory.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = searchHistory[i];
        button.classList.add("search-history");
        buttonContainer.appendChild(button)
        button.onclick = function () {
            currentWeather(this.innerHTML)
            fiveDayWeather(this.innerHTML)
        };
    }
}

// function which grbs the current day's weather
function currentWeather(city) {

    let currentCity = document.querySelector(".city")
    let currentTemp = document.querySelector("#temp")
    let wind = document.querySelector("#wind")
    let humidity = document.querySelector("#humidity")
    let weatherIcon = document.querySelector(".weather-icon")
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    // fetching data from API
    fetch(apiUrl)
        .then(function (response) {
            if (response.status === 404) {
                alert("ENTER A VALID CITY")
                return;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // if the user inputs data that the API doesn't recognize then nothing will store
            if (data.cod !== 200) {
                alert("ENTER A VALID CITY")
            }
            handleSearchHistory(city)
            // grabbing the icon data to display 
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

// function which gets data for the next 5 days
function fiveDayWeather(city) {
    // removing whatever style already exists
    fiveDayContainer.removeAttribute("style")
    forecastEl.removeAttribute("style")

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    // grabbing API data
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            fiveDayContainer.innerHTML = ""
            // array to store the index of each day since API updates every 3 hours and not 24 hours
            let count = [0, 8, 16, 24, 32]
            count.forEach((idx) => {
                let iconCodeOne = data.list[idx].weather[0].icon;
                let iconUrlOne = `http://openweathermap.org/img/wn/${iconCodeOne}@2x.png`;
                let forecastDiv = document.createElement("div")
                forecastDiv.classList.add("card")
                forecastDiv.innerHTML = `
                
                <p class="date-p">${moment(data.list[idx].dt_txt).format("MM-DD-YYYY")}</p>
                <p class="temp-p">Temp: ${data.list[idx].main.temp} °F</p>
                <p class="wind-p">Wind: ${data.list[idx].wind.speed}  mph</p>
                <p class="humid-p">Hum: ${data.list[idx].main.humidity} %</p>
                <div class="icon-div"><img src="${iconUrlOne}"></div>
                `
                fiveDayContainer.append(forecastDiv)

            })
        })
}

function clearSearch() {
    localStorage.removeItem("searchHistory")
    searchHistory = []
    let searchButtons = document.querySelectorAll(".search-history")
    searchButtons.forEach(btn => btn.remove())
}


