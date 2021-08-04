import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  url = 'https://api.openweathermap.org/data/2.5/onecall';
  apiKey = '544f1467da5f4e31a83f8beddd848d9a';
  mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  cityName = 'makati'
  mapKey =
    'access_token=pk.eyJ1Ijoicm9vcmVuc3UyMCIsImEiOiJja3JxM28yajYzdm12MnJtNGk1M3g3Mm5jIn0.U_aFX7RnkyzCd8YrzhjgUA';
  responseType = '.json?';
  constructor(private http: HttpClient) {}

  getWeatherDataByCoords(lat: any, lon: any) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('exclude', 'minutely,hourly,alerts')
      .set('appid', this.apiKey);

    return this.http.get(this.url, { params });
  }

  getWeatherDataByCityName(): Observable<any> {
    return this.http.get(`${this.mapUrl}${this.cityName}${this.responseType}${this.mapKey}`);
  }



}
