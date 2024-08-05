const apiKey = '1c3f461e7c1add65cae2e36a9be61df2'; // Your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherInfo = document.querySelector('.weather-info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value; // Use .value to get the input value
    if (city) {
        console.log(`Fetching weather data for: ${city}`);
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        console.log(`Response status: ${response.status}`);
        const data = await response.json();
        console.log('Received data:', data);
        if (data.cod === '404') {
            alert('City not found');
            weatherInfo.style.display = 'none';
            return;
        }
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching data:', error); // Debug log
        alert('Error fetching data');
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    weatherInfo.style.display = 'block';
    console.log('Weather info displayed');
}
