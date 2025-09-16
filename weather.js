let weather;

export async function getWeather(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,weather_code`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        weather = result;
        console.log(weather);
    } catch (error) {
        console.error(error.message);
    }
}
