import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayComponent } from './today/today.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TodayComponent, ForecastComponent],
  exports: [TodayComponent, ForecastComponent]
})
export class WeatherModule { }
