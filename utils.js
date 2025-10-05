
const wmoInterpretation = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",  
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
};

export function convertWeatherCode(code) {
    return wmoInterpretation[code] || "Unknown weather code";
}

export function getWeatherIcon(code, isDay) {
    let dayNight = isDay ? "d" : "n";
    return `assets/weathericons/classic/${code}${dayNight}.svg`;
}

export function getWeatherCollection(code, is_day) {
    if(code === 0) {
        if(is_day) {
            return "fLPc32CLztA"; // clear - day
        } else {
            return "dUFnK7L8cZs"; // clear - night
        }
    } else if(code === 1) {
        if(is_day) {
            return "cyeza2Za6u4"; // mainly clear - day
        } else {
            return "lB4dk-xLPS0"; // mainly clear - night
        }
    } else if(code === 2) {
        if(is_day) {
            return "cFeCqtB_7wg"; // partly cloudy - day
        } else {
            return "VT8miH-h2ds"; // partly cloudy - night
        }
    } else if(code === 3) {
        if(is_day) {
            return "wPpVau6yRVE"; // overcast - day
        } else {
            return "wYzVHRM_OrQ"; // overcast - night
        }
    } else if(code >= 45 && code <= 48) {
        return "wPpVau6yRVE"; // fog, depositing rime fog
    } else if(code >= 51 && code <= 57) {
        return "wPpVau6yRVE"; // drizzle
    } else if(code >= 61 && code <= 67) {
        if(is_day) {
            return "upZ-o2r0QSI"; // rain - day
        } else {
            return "tEhQ990GvPg"; // rain - night
        }
    } else if(code >= 71 && code <= 77) {
        if(is_day) {
            return "-ciINgSqagk"; // snow falls - day
        } else {
            return "4nh5Q8fA9rs"; // snow falls - night
        }
    } else if(code >= 80 && code <= 86) { // rain showers, snow showers
        if(is_day) {
            return "upZ-o2r0QSI"; // rain - day
        } else {
            return "tEhQ990GvPg"; // rain - night
        } 
    } else if(code >= 95 && code <= 99) {  // thunderstorm
        if(is_day) {
            return "upZ-o2r0QSI"; // rain - day
        } else {
            return "tEhQ990GvPg"; // rain - night
        }
    } else {
        return "fLPc32CLztA"; // default to clear
    }
}
export function celciusTofahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

export function fahrenheitToCelcius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}
