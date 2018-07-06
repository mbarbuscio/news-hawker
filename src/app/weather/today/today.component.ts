import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  Weather: Weather;

  constructor(private weather: WeatherService) { 

    this.Weather = undefined;

    this.weather.CurrentWeather.subscribe(weather => {
      this.Weather = weather;
    });

  }

  ngOnInit() {
  }

  weatherIcon() {
    return `.\\assets\\weather\\${this.Weather.type}.svg`;
  }

  toggleForecast() {
    this.weather.toggleForecast();
  }
}
