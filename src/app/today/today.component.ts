import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  weatherNow: any;
  location: any;
  currentTime = new Date();
  mbData ='https://api.mapbox.com/geocoding/v5/mapbox.places/caloocan.json';
  ownData = 'https://api.openweathermap.org/data/2.5/onecall';

  data: any;

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    const result = this.forecastService.getWeatherForecast();
    result.subscribe(result =>{
      this.data = result;
      console.log(this.data);
    })
  }

}
