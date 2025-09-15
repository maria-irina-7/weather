import { apiKeys } from './env.js';

let search_cities = [];
let weather = {}

let temp_grades = "celsius"


window.refresh = refresh;
window.changeGrades = changeGrades;

//--------------------------------------------------------------//


function getUrl(cityName) {
    let url = { ow: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeys.openWeather}`,
                wapi: `http://api.weatherapi.com/v1/current.json?key=${apiKeys.weatherAPI}&q=${cityName}&aqi=no` };
    return url;
}



function updatePage(data) {
    weather = {
        condition: data[1].current.condition.text,
        temperature: { temp_c: data[1].current.temp_c, temp_f: data[1].current.temp_f},
        icon: data[0].weather[0].icon
    };
    let location = {city: data[1].location.name, region:data[1].location.region, country: data[1].location.country};
    let dateTime = new Date(data[1].location.localtime_epoch * 1000);

    document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_c}</b>`;
    document.getElementById("icon").src = `assets/weathericons/${weather.icon}.svg`;
    document.getElementById("location-text").innerHTML = `${location.city}, ${location.region}, ${location.country}`;
    document.getElementById("condition-text").innerHTML = `${weather.condition}`;
    document.getElementById("time-text").innerHTML = `${dateTime.getHours()}:${dateTime.getMinutes()} - 
                                        ${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
    document.getElementById("search-box-input").value = "";
    document.getElementById("weather-box").style.display = "block"; 

    document.getElementById("autocomplete-box").style.display = "none";
}



function refresh() {
    let cityName = getCity();
    let url = getUrl(cityName);
    console.log(url);
    
    Promise.all([
        fetch(url.ow).then(response => response.json()),
        fetch(url.wapi).then(response => response.json())
      ]).then(response => updatePage(response))
}

function changeGrades() {
    if(temp_grades === "celsius") {
        document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_f}</b>`;
        document.getElementById("temp-grades").innerHTML = "°F";
        temp_grades = "fanrenhein"
    } else {
        document.getElementById("temperature").innerHTML = `<b>${weather.temperature.temp_c}</b>`;
        document.getElementById("temp-grades").innerHTML = "°C";
        temp_grades = "celsius";
    }
}


/***
 * AUTOCOMPLETE LOCATION
 ***/

let locations;

async function getLocations(input) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        locations = result.results;
        console.log(locations);
        autocompleteLocations(locations)
    } catch (error) {
        console.error(error.message);
    }
}

function autocompleteLocations(locations) {
    const res = document.getElementById("autocomplete-box");
    res.innerHTML = '';
    let list = '';
    let terms = locations;

    for (let i = 0; i < terms.length; i++) {
      list += '<li>' + terms[i].name + '</li>';
    }
    if(list) {
        res.innerHTML = '<ul>' + list + '</ul>';    
    } else {
        res.style.display = "none";
    }
}

document.getElementById('location-input').addEventListener('input', (event) => {
    if(event.target.value.length > 2) {
        getLocations(event.target.value);
    }
})








