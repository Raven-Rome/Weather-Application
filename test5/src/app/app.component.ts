import { Component, OnInit} from '@angular/core';
import { ForecastService } from './forecast.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'training';


  unixSunrise = 0;
  unixSunset = 0;
  sunrise: string = '';
  sunset: string = '';
  dlHours: number = 0;
  dayLight = '';
  data: any;
  datas: any;
  cityData: any;
  lat: any;
  lon: any;
  dataCity: any;
  mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  cityName = '';
  mapKey =
    'access_token=pk.eyJ1Ijoicm9vcmVuc3UyMCIsImEiOiJja3JxM28yajYzdm12MnJtNGk1M3g3Mm5jIn0.U_aFX7RnkyzCd8YrzhjgUA';
  responseType = '.json?';
  test = '';
  comma = ',';
  day:any = [];
  dateToday = new Date().getDate();
  date:any = [];
  constructor(
    private forecastService: ForecastService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getLocation();
    this.getCurrentLocation();
    // this.getCurrentLocation();

    for(let i = 1; i <= 5; i++){
      this.dateToday++;
      this.day[i] =
        this.switchFunction(new Date().getDay() + i)+ ' '+ this.dateToday;
    }

    for(let i = 1; i <=5; i++){
      this.date[i] = new Date(new Date().getTime()).toString();
    }
  }

  switchFunction(day: number){
    let today = ''

    switch(day) {
      case 1:
        today='Mon'
        break;

      case 2:
        today='Tues'
        break;

      case 3:
        today='Wed'
        break;

      case 4:
        today='Thurs'
        break;

      case 5:
        today='Fri'
        break;

      case 6:
        today='Sat'
        break;

      case 7:
        today='Sun'
        break;
    }

    return today;
  }


  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        this.lat = currentLocation.coords.latitude;
        this.lon = currentLocation.coords.longitude;
        // console.log(this.lat);
        // console.log(this.lon);
        this.getCurrentCityName(this.lon, this.lat).subscribe((test) => {
          this.data = test;
          // console.log(this.data.features[1].place_name);
        });
        this.forecastService
          .getWeatherDataByCoords(this.lat, this.lon)
          .subscribe((result) => {
            this.datas = result;
           this.unixSunrise = this.datas.current.sunrise;
           this.unixSunset = this.datas.current.sunset;
           this.sunrise = new Date(this.unixSunrise * 1000).toString();
           this.sunset = new Date(this.unixSunset * 1000).toString();
           this.dlHours =
             new Date(this.unixSunset * 1000).getTime() -
             new Date(this.unixSunrise * 1000).getTime();
           var days = Math.floor(this.dlHours / (60 * 60 * 24 * 1000));
           var hours = Math.floor(this.dlHours / (60 * 60 * 1000)) - days * 24;
           var minutes =
             Math.floor(this.dlHours / (60 * 1000)) -
             (days * 24 * 60 + (hours = 60));
           this.dayLight = hours + ' hr ' + minutes + ' min ';
           console.log(this.datas);
          });
      });
    }
  }
  getSearchedLocation() {
    const result = this.getWeatherDataByCityName();
    result.subscribe((result) => {
      this.dataCity = result;
      // console.log(this.dataCity.features[1].place_name);
      this.lat = this.dataCity.features[0].center[1];
      this.lon = this.dataCity.features[0].center[0];
      this.getCurrentCityName(this.lon, this.lat).subscribe((result) => {
        this.data = result;
      });
      this.forecastService
        .getWeatherDataByCoords(this.lat, this.lon)
        .subscribe((result) => {
          this.datas = result;

          // console.log(this.datas);
        });
    });
  }
  getCurrentLocation() {
    const result = this.getCurrentCityName(this.lon, this.lat);
    result.subscribe((result) => {
      this.data = result;
      // console.log(this.data);
    });
  }

  getCurrentCityName(lon: any, lat: any): Observable<any> {
    return this.http.get(
      `${this.mapUrl}${lon},${lat}${this.responseType}${this.mapKey}`
    );
  }
  getWeatherDataByCityName(): Observable<any> {
    return this.http.get(
      `${this.mapUrl}${this.cityName}${this.responseType}${this.mapKey}`
    );
  }
}





