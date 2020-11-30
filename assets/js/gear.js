const OWM_API_KEY= "01c1c8136d144790e3ed8e883ec940d2"

const urlParams = new URLSearchParams(window.location.search);
const trailName = urlParams.get('name');
const trailId = urlParams.get('id');
const trailLength = urlParams.get('length');
const trailLat = urlParams.get('lat');
const trailLong = urlParams.get('long');
const elevation = urlParams.get('elev')

$('.masthead-heading').text(trailName)
$('.estimated-time').text(trailLength + " miles")

const updateWeather = (weatherData) => {
    const parsedData = parseWeatherData(weatherData)
    const fullWeatherHeader = parsedData.temperature + "° & " + parsedData.weatherSummary
    $('.condition-status').text(fullWeatherHeader)
    $('.precip').text(parsedData.humidity)
    $('.wind').text(parsedData.windSpeed)
    $('.trail-elevation').text(elevation)
    const gearList = gearLookupByTemp(parsedData.temperature)
    renderGearList(gearList)
}

const parseWeatherData = (weatherData) => ({
        "weatherSummary": weatherData.weather[0].main,
        "temperature": weatherData.main.temp,
        "windSpeed": weatherData.wind.speed,
        "humidity": weatherData.main.humidity
});

const gearLookupByTemp = (temperature) => {
    const recommendedGear = []
    gearDb.forEach(item => {
        if (temperature >= item.Temperature) {
            recommendedGear.push(item)
            console.log(item)
        }
    })
    return recommendedGear;
}

const renderGearList = (recommendedGear) => {
    $('.weather-table-body').empty()
    recommendedGear.forEach(item => {
        $('.weather-table-body').append("<tr><td>" + item.Item + "</td></tr>")
    })
}

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const apiUrl = "http://api.openweathermap.org/data/2.5/weather";
        axios
            .get(`${apiUrl}`, {
                params: {
                lat: trailLat,
                lon: trailLong,
                units: "imperial",
                appid: OWM_API_KEY,
                },
            })
            .then(({ data }) => {
                updateWeather(data)
        })
    }
)
})();
