import { Component, OnInit} from '@angular/core';
import { ForecastService } from './forecast.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'training';
  current= new Date();
  timeline = [];

  weatherData: any = [];
  forecastDetails: any;

  weatherNow: any;
  location: any;

mbData = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
owmData = 'https://api.openweathermap.org/data/2.5/onecall'

data:any;

  selectedIndex: number | any;
  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    const result = this.forecastService.getWeatherForeCast();
    result.subscribe(result =>{
      this.data = result;
      console.log(this.data);
    })

    this.forecastService.getWeatherForeCast().pipe(
      pluck('list')
    )
    .subscribe(data=>{
      this.futureForecast(data)
    })
  }

  futureForecast(data:any){
    for(let i = 0; i < data.length; i = i + 8){
      this.weatherData.push(data[i])
    }
    console.log(this.weatherData);
  }

  showDetails(data: any, i:number){
    this.forecastDetails = data;
    this.selectedIndex = i;
  }


  dateRange(){
    const start = new Date();
    start.setHours(start.getHours()+(start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to }
  }
  getTodayForecast(today: any){

    this.location = today.city;

    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push();

      const apiDate = new Date(forecast.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate){
          this.weatherNow = forecast;
          console.log(this.weatherNow);
      }

    }
  }
}
