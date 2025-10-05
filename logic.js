import { weather } from './weather.js';
import { location } from './location.js';
import { convertWeatherCode, getWeatherCollection, getWeatherIcon } from './utils.js';
import { apiKeys } from './env.js';

/***
 * AUTOCOMPLETE LOCATION
 ***/

let locations = "";
let autocompleteFocus = 0;
let locationListLenght = 0;
let isList = false;

async function getRandomImage(collectionId) {
    const url = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${apiKeys.unsplashAccess}`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }
        const result = await response.json();
        const randomIndex = Math.floor(Math.random() * result.length);
        const imageUrl = result[randomIndex].urls.full;
        document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
        console.error(error.message);
    }
}

async function getLocations(input) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        locations = result.results;
        return locations;
    } catch (error) {
        console.error(error.message);
    }
}

function autocompleteLocations(locations) {
    const res = document.getElementById("autocomplete-box");
    res.innerHTML = '';
    let list = '';
    let terms = locations;
    if(typeof terms === 'undefined') {
        terms = [];
    }

    locationListLenght = terms.length;

    for (let i = 0; i < locationListLenght; i++) {
      list += `<li id="loc-${i}">` + terms[i].name + `, `+ terms[i].admin1 + '</li>';
    }
    if(list) {
        res.style.display = "block";
        res.innerHTML = '<ul id="locations-list">' + list + '</ul>';
        isList = true;
        changeFocusStyle();
    } else {
        res.style.display = "none";
    }

    autocompleteFocus = 0;
}

function changeFocusStyle() {
    console.log(autocompleteFocus);
    for(let i = 0; i < locationListLenght; i++) {
        if(autocompleteFocus === i) {
            document.getElementById(`loc-${i}`).style.color = "red";
        } else { 
            document.getElementById(`loc-${i}`).style.color = "black";
        }
    }
}

// Arrow Autocomplete Select
document.getElementById('location-input').addEventListener('keydown', (event) => {
    switch(event.key) {
        case "ArrowUp" :
            if(autocompleteFocus > 0) {
                autocompleteFocus = autocompleteFocus - 1;
            }
            break;
        case "ArrowDown" :
            if (autocompleteFocus < locationListLenght) {
                autocompleteFocus = autocompleteFocus + 1;
            }     
            break;

        case "Enter" :
            event.preventDefault();            
            location.setLocation(locations[autocompleteFocus]);

            // getWeather(location.latitude, location.longitude);
            document.getElementById('location-input').value = location.name;

            weather.setLocation(location);
            weather.getWeather().then(() => {
                updateWeather();
            })

            break;

    };
    if(isList) {
        changeFocusStyle();
    }
})

function updateWeather() {
    document.getElementById("autocomplete-box").style.display = "none";
    console.log(weather.temperature2m);

    document.getElementById("temperature").innerHTML = `<b>${weather.temperature2m}</b>`;
    document.getElementById("condition-text").innerHTML = `${convertWeatherCode(weather.weatherCode)}`;
    document.getElementById("icon").src = getWeatherIcon(weather.weatherCode, weather.is_day);
    document.getElementById("location-text").innerHTML = `${weather.location.name}, ${weather.location.admin1}, ${weather.location.country}`;

    let dateTime = new Date(weather.time).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: '2-digit', hour12: false });
    document.getElementById("time-text").innerHTML = dateTime;
    document.getElementById("weather-box").style.display = "block";

    const collectionId = "fLPc32CLztA";
    getRandomImage(getWeatherCollection(weather.weatherCode, weather.is_day));
}

// Get input and autocomplete
document.getElementById('location-input').addEventListener('input', (event) => {
    getLocations(event.target.value).then(value => {
        locations = value; 
        autocompleteLocations(locations); 
    });
})












