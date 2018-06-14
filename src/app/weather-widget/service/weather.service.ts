import {Injectable} from '@angular/core';
import {Jsonp, Http} from '@angular/http';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import {HttpHeaders} from "@angular/common/http";
import { HttpClient, HttpResponse } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import {FORCAST_KEY, FORCAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT} from '../constants/constants';
// private http:Http,



@Injectable()
export class WeatherService{
    constructor(private jsonp:Jsonp, private http: HttpClient){}
    getCurrentLocation() : Observable<any>{
        if(navigator.geolocation){
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos=>{
                    observer.next(pos);
                }
            ),
            err => { 
                return Observable.throw(err);}
            });
        }else{
            return Observable.throw("Geolaction is not available");
        }

    }

    getCurrentWeather(lat:number, long:number): Observable<any>{
        const url= FORCAST_ROOT+FORCAST_KEY+"/"+lat+","+long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url+queryParams)
        .pipe(map(data=>data.json()))
        // catchError(err=>{
        //     console.error("Unable to get weather data -", err);
        //     return Observable.throw(err.json())
        // })

        // .catch(err=>{
        //     console.error("Unable to get weather data -", err);
        //     return Observable.throw(err.json())
        // })

    }

   

    getLocationName(lat:number, long:number):Observable<any>{
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key="+ GOOGLE_KEY;
       
        return this.http.get(url+queryParams)
            .pipe(map(loc =>loc.json())


    }
}

