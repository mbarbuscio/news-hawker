import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { ConfigService } from './config.service';
import { LatLong } from '../models/coordinates';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather';
import { ReplaySubject } from 'rxjs';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: ServicesModule
})
export class WeatherService {

  private show:boolean = false;
  ToggleForecast: ReplaySubject<boolean>;
  CurrentWeather: ReplaySubject<Weather>;
  FiveDayForecast: ReplaySubject<Array<Forecast>>;

  constructor(private configService: ConfigService, private http: HttpClient) { 
    this.CurrentWeather = new ReplaySubject<Weather>();
    this.ToggleForecast = new ReplaySubject<boolean>();
    this.FiveDayForecast = new ReplaySubject<Array<Forecast>>();

    this.ToggleForecast.subscribe(bool => {
      this.show = bool;
    });

    this.configService.coordinates.subscribe(coords => {
      this.getCurrentWeather(coords);
      this.getForecast(coords);
    });
  }

  private getCurrentWeather(coords: LatLong) {
    this.http.get<any>(`${environment.openWeather.baseUrl}/weather?lat=${coords.lat}&lon=${coords.long}&apiKey=${environment.openWeather.apiKey}`).subscribe(res => {

      this.CurrentWeather.next(new Weather(
        res.main.temp_min - 273.15,
        res.main.temp_max - 273.15,
        res.main.temp - 273.15,
        res.main.humidity,
        res.main.pressure,
        res.wind.speed,
        res.wind.deg,
        res.weather[0].main,
        res.name,
        res.sys.country
      ));

      this.configService.setCountryFromLocation(res.sys.country);
    });
  }

  private getForecast(coords: LatLong) {
    this.http.get<any>(`${environment.openWeather.baseUrl}/forecast?lat=${coords.lat}&lon=${coords.long}&apiKey=${environment.openWeather.apiKey}`).subscribe(res => {
      let dailyWeather = new Array<Forecast>();      
      res.list.forEach(item => {
        if(!dailyWeather.find(search => { return this.matchDt(item.dt, search)})) {
          let forecast = new Forecast();
          let dt = new Date(item.dt*1000);

          forecast.Year = dt.getFullYear();
          forecast.Month = dt.getMonth();
          forecast.Day = dt.getDate();
          dailyWeather.push(forecast);
        }

        let weather = new Weather(
          item.main.temp_min - 273.15,
          item.main.temp_max - 273.15,
          item.main.temp - 273.15,
          item.main.humidity,
          item.main.pressure,
          item.wind.speed,
          item.wind.deg,
          item.weather[0].main,
          res.city.name,
          res.city.country
        );

        dailyWeather.find(search => { return this.matchDt(item.dt, search)}).WeatherList.push(weather);
      });
      this.FiveDayForecast.next(this.aggregateWeather(dailyWeather));
    });
  }

  toggleForecast() {
    this.show = !this.show;
    this.ToggleForecast.next(this.show);
  }

  private matchDt(dateUTC, forecast:Forecast):boolean {
    let dt = new Date(dateUTC*1000);

    

    return (dt.getFullYear() == forecast.Year && dt.getMonth() == forecast.Month && dt.getDate() == forecast.Day);
  }

  private aggregateWeather(dailyWeather: Array<Forecast>) {

    let aggregatedForecast = new Array<Forecast>();

    dailyWeather.forEach(item => {

      let aggWeather = item.WeatherList.reduce((prev, next) => {
        var minTemp = prev.minTemp < next.minTemp ? prev.minTemp : next.minTemp;
        var maxTemp = prev.maxTemp > next.maxTemp ? prev.maxTemp : next.maxTemp;
        

        let result = new Weather(
          minTemp,
          maxTemp,
          next.currentTemp,
          next.humidity,
          next.pressure,
          next.windSpeed,
          next.windDirection,
          next.type,
          next.city,
          next.countryCd
        );

        return result;
      })

      let forecast = new Forecast();
      forecast.Year = item.Year;
      forecast.Month = item.Month;
      forecast.Day = item.Day;
      forecast.WeatherList.push(aggWeather);

      aggregatedForecast.push(forecast);
    });

    return aggregatedForecast;
  }
}
