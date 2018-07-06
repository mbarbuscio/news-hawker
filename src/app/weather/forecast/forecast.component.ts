import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather';
import { Forecast } from '../../models/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  @HostBinding('class.hidden') isHidden: boolean = true;
  
  @HostListener('document:click', ['$event.target']) onClickOutside(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement) || targetElement.classList.contains('toggle');
    if (!clickedInside) {
      if(!this.isHidden) {
        this.hide();
      }
    }
  }
  
  Weather: Weather;
  Forecast: Array<Forecast>;

  loggedIn: boolean = false;

  constructor(private _elementRef : ElementRef, private weather: WeatherService) {
    this.weather.ToggleForecast.subscribe(bool => {
      this.isHidden = !bool;
    });

    this.weather.CurrentWeather.subscribe(weather => {
      this.Weather = weather;
    });

    this.weather.FiveDayForecast.subscribe(forecast => {
      this.Forecast = forecast;
    });
  }

  ngOnInit() {
  }

  hide() {
    this.weather.ToggleForecast.next(false);
  }

  windDirection(deg: number) {
    if(deg < 22.5 || deg >= 337.5 ){
      return "E";
    }

    if(deg >= 22.5 && deg < 67.5) {
      return "NE";
    }

    if(deg >= 67.5 && deg <112.5) {
      return "N";
    }

    if(deg >= 112.5 && deg < 157.5) {
      return "NW";
    }

    if(deg >= 157.5 && deg < 202.5) {
      return "W";
    }

    if(deg >= 202.5 && deg < 247.5) {
      return "SW";
    }

    if(deg >= 247.5 && deg < 292.5) {
      return "S";
    }

    if(deg >= 292.5 && deg < 337.5) {
      return "SE";
    }

    return "";
  }

  weatherIcon(type) {
    return `.\\assets\\weather\\${type}.svg`;
  }
}
