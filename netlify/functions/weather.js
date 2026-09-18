exports.handler = async function (event) {
  const { q, lat, lon, type = 'weather' } = event.queryStringParameters;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    let query;

    if (lat && lon) {
      query = `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    } else if (q) {
      query = `q=${encodeURIComponent(q)}`;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Location is required' })
      };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/${type}?${query}&appid=${apiKey}&units=metric`
    );

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