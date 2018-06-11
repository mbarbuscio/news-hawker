import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from './services.module';
import { Country } from '../models/country';
import { ReplaySubject, Observable, BehaviorSubject, fromEvent } from 'rxjs';
  
@Injectable({
  providedIn: ServicesModule
})
export class ConfigService {

  constructor() { 
    this.country = new ReplaySubject<Country>();
    this.mobileView = new ReplaySubject<boolean>();
    this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
    this.mobileView.next(window.innerWidth <= 768);

    fromEvent(window, 'resize')
      .subscribe((event) => {
        this.mobileView.next(window.innerWidth <= 768);
      });
  }
 
  country: ReplaySubject<Country>;
  mobileView: ReplaySubject<boolean>;

  setCountry(_country:Country) {
    this.country.next(_country);
  }

  getCountry() :Observable<Country> {
    return this.country;
  }

  isMobile() :Observable<boolean> {
    return this.mobileView;
  }
}