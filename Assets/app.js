let currentDate = moment().format("MMMM DD, YYYY")
const currentDateEl = document.querySelector("#current-date")
let apiKey = "a4e384b892a2d03639abac10e9554496";
const requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid={apiKey}"


currentDateEl.innerHTML = currentDate

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })


