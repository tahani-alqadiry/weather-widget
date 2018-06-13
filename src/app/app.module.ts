import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {WeatherComponent} from './weather-widget/component/weather.component'

@NgModule({
  declarations: [
    WeatherComponent,
    AppComponent
  ],
  imports: [
    JsonpModule,
    AngularFontAwesomeModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
