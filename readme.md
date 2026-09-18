# WeatherWave 🌤️

A real-time weather dashboard I built personally from scratch using HTML, CSS, and JavaScript. No frameworks, no tutorials — just pure vanilla JS and a lot of problem solving.

---

## What it does

- Shows current weather for any city in the world
- Detects your location automatically via the browser's Geolocation API
- Displays a 3-day forecast with humidity
- Shows pressure and wind stats
- Temperature chart for the next 5 days (Chart.js)
- Background video changes based on weather condition (sunny, cloudy, rainy, night, etc.)
- Light/dark mode toggle
- Fully responsive — works on mobile, tablet, and desktop
- Loading screen while data fetches

---

## Built with

- **HTML & CSS** — structure and styling with frosted glass UI
- **JavaScript** — all logic, DOM manipulation, API calls
- **OpenWeatherMap API** — weather and forecast data
- **Chart.js** — temperature chart
- **Geolocation API** — browser-native location detection
- **Day.js** — date and time formatting with timezone support

---

## Features I'm proud of

- **Dynamic backgrounds** — videos swap based on weather condition and time of day (night detection using sunrise/sunset from the API)
- **Timezone-aware clock** — shows the correct local time for any searched city, not the browser's time
- **Clean architecture** — all API calls go through a single `loadWeather()` function
- **No dependencies** except Chart.js and Day.js — everything else is vanilla JS

---

## How to run

1. Clone the repo
2. Open `index.html` with a local server (e.g. Live Server in VS Code)
3. Allow location access for automatic weather detection

> Requires internet connection to fetch weather data from OpenWeatherMap.

---

## Project structure

```
weather-app/
├── index.html
├── scripts/
│   └── app.js
├── styles/
│   └── style.css
├── images/
│   └── (icons and logo)
└── videos/
    └── (background videos per weather condition)
```

---

*Built by Carl Amiel Balita // Junior Web Dev*