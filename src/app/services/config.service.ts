import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from './services.module';
import { Country } from '../models/country';
import { ReplaySubject, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: ServicesModule
})
export class ConfigService {

  country: ReplaySubject<Country>;
  mobileView: ReplaySubject<boolean>;
  category: ReplaySubject<string>;
  sources: ReplaySubject<any[]>;

  constructor(db: AngularFirestore, http: HttpClient) { 
    this.country = new ReplaySubject<Country>();
    this.mobileView = new ReplaySubject<boolean>();
    this.category = new ReplaySubject<string>();
    this.sources = new ReplaySubject<any[]>();
    this.category.next("general");
    http.get<any>('https://extreme-ip-lookup.com/json/').subscribe(res => {
      db.collection<Country>('countries', ref => ref.where('flagCd', '==', res.countryCode)).valueChanges().subscribe(qry => {
        if(qry.length > 0) {
          this.country.next(qry[0])
        }else{
          this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
        }
      });
    })

    
    this.mobileView.next(window.innerWidth <= 768);
    this.sources.next([]);

    fromEvent(window, 'resize')
      .subscribe((event) => {
        this.mobileView.next(window.innerWidth <= 768);
      });
  }
 
  setCountry(_country:Country) {
    this.country.next(_country);
  }

  getCountry() :Observable<Country> {
    return this.country;
  }

  setCategory(_cat:string) {
    this.category.next(_cat);
  }

  getCategory() {
    return this.category;
  }

  setSources(_sources:any[]) {
    this.sources.next(_sources);
  }

  getSelectedSources() {
    return this.sources;
  }

  isMobile() :Observable<boolean> {
    return this.mobileView;
  }

}