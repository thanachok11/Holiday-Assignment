
const apiKey = '6c18d58f6e36ba86485956c2ca5d2dd8'; // Replace with your actual API key
async function showSuggestions(value) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (value.length > 0) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch city data');
            }
            const data = await response.json();
            data.list.forEach(city => {
                const div = document.createElement('div');
                div.innerText = city.name;
                div.onclick = () => selectCity(city.name);
                suggestions.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    }
}

function selectCity(name) {
    document.getElementById('cityInput').value = name;
    document.getElementById('suggestions').innerHTML = '';
}

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid API key');
            } else if (response.status === 404) {
                showError('City not found');
                clearWeatherData();
                return;
            } else {
                throw new Error('Failed to fetch data');
            }
        }
        const data = await response.json();

        // Update DOM with weather data
        document.getElementById('temp').innerText = data.main.temp;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('windSpeed').innerText = data.wind.speed;
        document.getElementById('error').innerText = ''; // Clear any previous error
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.innerText = message;
}
function clearWeatherData() {
    document.getElementById('temp').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('windSpeed').innerText = '';
}
