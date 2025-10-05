import { Location } from "./location.js";

export class Weather {
    // location

    setLocation(location) {
        this.location = location;
    }

    async getWeather() {
        console.log(this.location.latitude);
        console.log(this.location.longitude);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.location.latitude}&longitude=${this.location.longitude}&timezone=auto&current=temperature_2m,is_day,cloud_cover,weather_code,precipitation,rain,showers,snowfall`;
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.temperature2m = result.current.temperature_2m;
            this.weatherCode = result.current.weather_code;
            this.time = result.current.time;
            this.timezone = result.timezone;
            this.is_day = result.current.is_day;
            this.cloud_cover = result.current.cloud_cover;

            // weather = result;
            // console.log(weather);
            console.log(this);
            // updateWeather();

            // return result;
        } catch (error) {
            console.error(error.message);
        }
    }
}

export let weather = new Weather();

// function changeGrades() {
//     if(temp_grades === "celsius") {
//         document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_f}</b>`;
//         document.getElementById("temp-grades").innerHTML = "°F";
//         temp_grades = "fanrenhein"
//     } else {
//         document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_c}</b>`;
//         document.getElementById("temp-grades").innerHTML = "°C";
//         temp_grades = "celsius";
//     }
// }