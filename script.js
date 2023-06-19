const inputBox = document.querySelector('.inputBox')
const searchBtn = document.querySelector('#searchBtn')
const weather_img = document.querySelector('.weather-img')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#wind-speed')
const locationNotFound = document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body')

async function checkWeather(city_name){
    const api_key = "3b31951d7e81929eb85daf6e434dec90"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then(response=> response.json());

    if(weather_data.cod === '404'){
        locationNotFound.style.display = "flex"
        weatherBody.style.display = "none"
        return;
    }
    locationNotFound.style.display = "none"
    weatherBody.style.display = "flex"
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.14)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`
    humidity.innerHTML = `${weather_data.main.humidity}%`
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/h`

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloud.png"
            break;
        case 'Clear':
            weather_img.src = "clear.png"
            break;
        case 'Rain':
            weather_img.src = "rain.png"
            break;
        case 'Mist':
            weather_img.src = "mist.png"
            break;
        case 'Snow':
            weather_img.src = "snow.png"
            break;
    
        default:
            break;
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})