import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(){
    return new Observable((observer)=>{
      navigator.geolocation.getCurrentPosition(
        (position)=> {
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any)=>{
        return new HttpParams()
        .set('lat', value.coords.latitude)
        .set('lon', value.coords.longitude)
        .set('units', 'metric')
        .set('exclude', 'minutely,hourly,alerts')
        .set('appid', '0875e24467d6fd28ffc047d6896c7379')
      }),
      switchMap((values)=>{
        return this.http.get('https://api.openweathermap.org/data/2.5/onecall', { params: values });
      })
    )
  }
}
