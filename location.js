export class Location {
    // admin1
    // admin2
    // country
    // countryCode
    // latitude
    // longitude
    // name
    // timezone

    setLocation(json) {
        this.admin1 = json.admin1;
        this.admin2 = json.admin2;
        this.country = json.country;
        this.countryCode = json.country_code;
        this.latitude = json.latitude;
        this.longitude = json.longitude;
        this.name = json.name;
        this.timezone = json.timezone;
    }
} 

export let location = new Location();