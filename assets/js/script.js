// Acceptance Criteria

//     *
//     Create a weather dashboard with form inputs.*When a user searches
// for a city they are presented with current and future conditions
// for that city and that city is added to the search history
//     *
//     When a user views the current weather conditions
// for that city they are presented with:
//     *
//     The city name *
//     The date *
//     An icon representation of weather conditions *
//     The temperature *
//     The humidity *
//     The wind speed *
//     When a user view future weather conditions
// for that city they are presented with a 5 - day forecast that displays:
//     *
//     The date *
//     An icon representation of weather conditions *
//     The temperature *
//     The humidity *
//     When a user click on a city in the search history they are again presented with current and future conditions
// for that city.
var API_key = '930477f5e46997d4da542d2d31298222'

function handleFormSumbit(event) {
    event.preventDefault()
    console.log("submit")

    //gather inputs

    //
    searchAPI("London")
}

let searchForm = $("#search-form")

searchForm.submit(handleFormSumbit)

function searchAPI(city) {
    var url = `https://www.api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`
}