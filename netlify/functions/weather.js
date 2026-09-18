exports.handler = async function (event) {
  const query = event.queryStringParameters.q;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    let weatherUrl;

    if (query.startsWith('lat=')) {
      weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    } else {
      weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;
    }

    const response = await fetch(weatherUrl);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch weather data'
      })
    };
  }
};