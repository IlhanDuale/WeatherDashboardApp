$(document).ready(function() {
    let searchForm = $("#search-form");
    const API_key = '930477f5e46997d4da542d2d31298222';

    // Load search history from local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Form submission handler
    function handleFormSubmit(event) {
        event.preventDefault();

        // Gather inputs
        const city = $("#search-input").val();

        // The searchAPI has been called
        searchAPI(city);
    }

    // Button click handler
    function handleButton(event) {
        event.preventDefault();
        // Get city written inside the button
        const city = $(this).text();

        searchAPI(city);
    }

    // Search history button click listener
    $("#history").on("click", ".history-button", handleButton);

    // Form submission listener
    $("#search-form").submit(handleFormSubmit);

    function searchAPI(city) {
        var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;

        // Use fetch to make the API request
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Handle the data and update UI
                updateUI(data, city);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors (e.g., display an error message to the user)
            });
    }

    function updateUI(data, city) {
        // Display current weather
        const currentWeather = data.list[0];
        const cityName = data.city.name;
        const date = moment.unix(currentWeather.dt).format("MM/DD/YYYY");
        const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;

        $("#londonToday").html(`
            <div class="iconGroup">
                <h3 id="currentDay">${cityName} - ${date}</h3>
                <img src="${iconUrl}" alt="Weather Icon" class="currentIcon">
            </div>
            <p>Temp: <span id="temp">${currentWeather.main.temp}</span></p>
            <p>Wind: <span id="wind">${currentWeather.wind.speed}</span></p>
            <p>Humidity: <span id="humidity">${currentWeather.main.humidity}</span></p>
        `);

        // Display 5-day forecast
        $("#forecast").empty();
        for (let i = 1; i <= 5; i++) {
            const forecast = data.list[i * 8 - 1]; // Use data for every 24 hours (i * 8 - 1)
            const forecastDate = moment.unix(forecast.dt).format("MM/DD/YYYY");
            const forecastIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

            $("#forecast").append(`
                <div class="col-lg-6">
                    <div class="card bg-dark text-white">
                        <h5 class="card-title mt-3 px-2 mb-3">Forecast Details - ${forecastDate}</h5>
                        <img src="${forecastIconUrl}" alt="Weather Icon" class="icon${i}">
                        <p class="px-2">Temp: <span class="temp${i}">${forecast.main.temp}</span></p>
                        <p class="px-2">Wind: <span class="wind${i}">${forecast.wind.speed}</span></p>
                        <p class="px-2">Humidity: <span class="humidity${i}">${forecast.main.humidity}</span></p>
                    </div>
                </div>
            `);
        }

        // Add the searched city to the history
        if (!searchHistory.includes(city)) {
            searchHistory.unshift(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            renderSearchHistory();
        }
    }

    // Render search history
    function renderSearchHistory() {
        $("#history").empty();
        searchHistory.forEach(city => {
            $("#history").append(`<button class="list-group-item list-group-item-action history-button">${city}</button>`);
        });
    }

    // Initial render of search history
    renderSearchHistory();
});