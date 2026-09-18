import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



//Weather functions
async function getWeather(query) {
    try{
       const response = await fetch( `/.netlify/functions/weather?${query}`);
        const weatherResponse = await response.json();
        console.log(weatherResponse);
        renderWeather(weatherResponse);
        renderStats(weatherResponse);
    } catch(error){
        console.log('Unexpected error. Please try again later.')
    }
}

function renderWeather(weatherResponse) {
    updateBackground(weatherResponse);
    const offsetMs = weatherResponse.timezone * 1000;
    const utcMs = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(utcMs + offsetMs);
    const dateTime = dayjs(localDate).format('h:mm A - dddd, MMMM D, YYYY');
    const iconUrl = `https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`;

    let weatherHTML = '';
    weatherHTML += `
    <div class="weather-card">
        <div class="temperature">${Math.round(weatherResponse.main.temp)}°C</div>
        <div class="city-info">
            <div class="city-name">${weatherResponse.name}</div>
            <div class="date-time">${dateTime}</div>
        </div>
        <div class="weather-icon">
            <img src="${iconUrl}">
            <div class="condition">${weatherResponse.weather[0].description}</div>
        </div>
    </div>
    `;
    document.querySelector('.js-current-weather').innerHTML = weatherHTML;
}
//Weather functions

//Forecast functions
async function getForecast(query) {
  try {
  const response = await fetch(
  `/.netlify/functions/weather?type=forecast&${query}`
        );

    const forecastResponse = await response.json();

    console.log(forecastResponse);

    renderForecast(forecastResponse);
    renderChart(forecastResponse);

  } catch (error) {
    console.error('Forecast error:', error);
  }
}

function renderForecast(forecastResponse){
    const dailyForecasts = forecastResponse.list.filter((item) => 
    item.dt_txt.includes('12:00:00')).slice(0, 3);

    let forecastHTML = '';
    dailyForecasts.forEach((forecast) => {
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const date = dayjs(forecast.dt_txt).format('MMMM D');
        forecastHTML += `
            <div class="forecast-card">
                <div class="forecast-date">${date}</div>
                <div class="forecast-bottom">
                    <img src="${iconUrl}" alt="weather icon">
                    <div class="forecast-right">
                        <div class="forecast-label">Humidity</div>
                        <div class="forecast-humidity">${forecast.main.humidity}%</div>
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector('.js-forecast').innerHTML = forecastHTML;
}
//Forecast functions

//Stats functions
function renderStats(weatherResponse){
    let statsHTML = '';
    statsHTML += `
        <div class="stats-card">
            <div class="stats-pressure"><img src="images/pressure.png" alt="pressure">Pressure <span>${weatherResponse.main.pressure} mb</span></div>
        </div>
        <div class="stats-card">
            <div class="stats-wind"><img src="images/wind.png" alt="wind">Wind <span>${weatherResponse.wind.speed} mph</span></div>
        </div>
    `;
    document.querySelector('.js-weather-stats').innerHTML = statsHTML;
}
//Stats functions

//Nav functions
function loadWeather(query) {
    getWeather(query);
    getForecast(query);
}

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    loadWeather(`lat=${lat}&lon=${lon}`);
}, () => {
    loadWeather('q=Manila');
});

document.querySelector('.js-search-btn').addEventListener('click', () => {
    const city = document.querySelector('.js-input-location').value;
    loadWeather('q=' + city);
    document.querySelector('.js-input-location').value = '';
});

document.querySelector('.js-input-location').addEventListener('keydown', (event) => {
    const city = document.querySelector('.js-input-location').value;
    if(event.key === 'Enter'){
        loadWeather('q=' + city);
        document.querySelector('.js-input-location').value = '';
    }
});

document.querySelector('.js-geolocate-btn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        loadWeather(`lat=${lat}&lon=${lon}`);
    }, (error) => {
        console.error('Geolocation error:', error);
    });
});
//Nav functions

//Chart functions
function renderChart(forecastResponse){
    const time = forecastResponse.list.map((item) => dayjs(item.dt_txt).format('HH:mm'));
    const temp = forecastResponse.list.map((item) => item.main.temp);

    const tempChart = document.getElementById('tempChart');

    new Chart(tempChart, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{   
                data: temp,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(100, 160, 255, 0.3)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: 'white'
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
//load function
document.getElementById('loading-screen').style.display = 'none';
//load function
}
//Chart functions

//Background functions
function updateBackground(weatherResponse){
    const condition = weatherResponse.weather[0].main;
    const bgVid = document.getElementById('bg-video');
    const currentTime = Math.floor(Date.now() / 1000);
    const sunrise = weatherResponse.sys.sunrise;
    const sunset = weatherResponse.sys.sunset;

    if(currentTime < sunrise || currentTime > sunset){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414353/night_h80lqb.mp4';
    } else if(condition === 'Clear'){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414479/sunny_bldkqe.mp4';
    } else if(condition === 'Clouds'){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414352/cloudy_dixfta.mp4';
    } else if(condition === 'Rain'){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414354/rainy_unyxpy.mp4';
    } else if(condition === 'Mist'){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414360/foggy_oflnu5.mp4';
    } else if(condition === 'Snow'){
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414358/snowy_bzkgqj.mp4';
    } else {
        bgVid.src = 'https://res.cloudinary.com/dvyn6kfzw/video/upload/v1780414358/default_m64sbp.mp4';
    }

    bgVid.load();
    if(bgVid.paused){
        bgVid.play();
    }
    
}

document.querySelector('.js-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
//Background functions

