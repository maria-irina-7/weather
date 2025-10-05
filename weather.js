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

    // document.getElementById("icon").src = `assets/weathericons/${weather.icon}.svg`;
    // document.getElementById("location-text").innerHTML = `${location.city}, ${location.region}, ${location.country}`;
    // document.getElementById("condition-text").innerHTML = `${weather.condition}`;
    // document.getElementById("time-text").innerHTML = `${dateTime.getHours()}:${dateTime.getMinutes()} - 
    //                                     ${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
    // document.getElementById("search-box-input").value = "";
    // document.getElementById("weather-box").style.display = "block"; 

    // document.getElementById("autocomplete-box").style.display = "none";

// window.refresh = refresh;
// window.changeGrades = changeGrades;



// function updatePage(data) {
//     weather = {
//         condition: data[1].current.condition.text,
//         temperature: { temp_c: data[1].current.temp_c, temp_f: data[1].current.temp_f},
//         icon: data[0].weather[0].icon
//     };
//     let location = {city: data[1].location.name, region:data[1].location.region, country: data[1].location.country};
//     let dateTime = new Date(data[1].location.localtime_epoch * 1000);

//     document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_c}</b>`;
//     document.getElementById("icon").src = `assets/weathericons/${weather.icon}.svg`;
//     document.getElementById("location-text").innerHTML = `${location.city}, ${location.region}, ${location.country}`;
//     document.getElementById("condition-text").innerHTML = `${weather.condition}`;
//     document.getElementById("time-text").innerHTML = `${dateTime.getHours()}:${dateTime.getMinutes()} - 
//                                         ${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
//     document.getElementById("search-box-input").value = "";
//     document.getElementById("weather-box").style.display = "block"; 

//     document.getElementById("autocomplete-box").style.display = "none";
// }




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