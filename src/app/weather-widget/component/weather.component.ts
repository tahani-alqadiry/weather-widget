import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
@Component({
    // moduleId:module.id,
    selector: 'weather-widget',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css'],
    providers:[WeatherService]
})

export class WeatherComponent implements OnInit{
    pos : Position;
    WeatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "kph";

    constructor(private service:WeatherService){}

    ngOnInit(){
        this.getCurrentLocation();

    }
    getCurrentLocation(){
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position
                this.getCurrentWeather()
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
            },
            err => console.error(err));
    }

}