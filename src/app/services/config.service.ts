import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { Country } from '../models/country';
import { ReplaySubject, Observable } from 'rxjs';


@Injectable({
  providedIn: ServicesModule
})
export class ConfigService {

  constructor() { 
    this.country = new ReplaySubject<Country>();
    this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
    
  }
 
  country: ReplaySubject<Country>;

  setCountry(_country:Country) {
    this.country.next(_country);
  }

  getCountry() :Observable<Country> {
    return this.country;
  }
}
