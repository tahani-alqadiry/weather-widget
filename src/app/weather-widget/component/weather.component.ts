import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons : any;

@Component({
    selector: 'weather-widget',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css'],
    providers:[WeatherService]
})

export class WeatherComponent implements OnInit{
    pos : Position;
    WeatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "kph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    icons = new Skycons({"color" : "#FFF"});

    constructor(private service:WeatherService){}

    ngOnInit(){
        this.getCurrentLocation();

    }
    getCurrentLocation(){
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();

            },
            err => console.error(err));
    }

    getCurrentWeather(){
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.WeatherData.temp = weather["currently"]["temperature"],
                this.WeatherData.summary = weather["currently"]["summary"],
                this.WeatherData.wind = weather["currently"]["windSpeed"],
                this.WeatherData.humidity = weather["currently"]["humidity"],
                this.WeatherData.icon = weather["currently"]["icon"]
                console.log("Weather:", this.WeatherData); //to remove
                console.log(this.pos.coords.latitude, this.pos.coords.longitude);
                this.setIcon();
            },
            err => console.error(err));
    }


    getLocationName(){
        this.service.getLocationName(40.714224,-73.961452)
            .subscribe(location => {
                console.log(location); //TODO: remove
                this.currentLocation = location["results"][9]["formatted_address"];
                console.log("name: ", this.currentLocation ); //TODO: remove
            }
        );
    }

    toggleUnits(){
        this.toggleSpeedUnit();
        this.toggleTempUnit();

    }

    toggleTempUnit(){
        if(this.currentTempUnit == "fahrenheit"){
            this.currentTempUnit = "celsius";
        }else{
            this.currentTempUnit = "fahrenheit";
        }

    }

    toggleSpeedUnit(){
        if(this.currentSpeedUnit == "kph"){
            this.currentSpeedUnit = "mph";
        }else{
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon(){
        this.icons.add("icon", this.WeatherData.icon);
        this.icons.play();
    }

}