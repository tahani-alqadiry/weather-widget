import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import {WeatherComponent} from './weather-widget/component/weather.component'

@NgModule({
  declarations: [
    WeatherComponent,
    AppComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
