import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from './services.module';
import { Country } from '../models/country';
import { ReplaySubject, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { UserSettings } from '../models/user-settings';
  
@Injectable({
  providedIn: ServicesModule
})
export class ConfigService {

  selectedCountry: Country;
  country: ReplaySubject<Country>;
  mobileView: ReplaySubject<boolean>;
  category: ReplaySubject<string>;
  sources: ReplaySubject<any[]>;
  showSideBar: ReplaySubject<boolean>;
  sideBarShown: boolean = false;
  darkTheme: boolean = false;
  isDarkTheme: ReplaySubject<boolean>;
  userEmail: string;
  userRecord:any;

  constructor(private db: AngularFirestore, http: HttpClient) { 
    this.country = new ReplaySubject<Country>();
    this.mobileView = new ReplaySubject<boolean>();
    this.category = new ReplaySubject<string>();
    this.sources = new ReplaySubject<any[]>();
    this.showSideBar = new ReplaySubject<boolean>();
    this.isDarkTheme = new ReplaySubject<boolean>();
    

    this.category.next("general");
    http.get<any>('https://extreme-ip-lookup.com/json/').subscribe(res => {
      db.collection<Country>('countries', ref => ref.where('flagCd', '==', res.countryCode)).valueChanges().subscribe(qry => {
        if(qry.length > 0) {
          this.selectedCountry = qry[0];
          this.country.next(qry[0])
        }else{
          this.selectedCountry = { countryCd: "ar", countryNm: "Argentina", flagCd: "AR" };
          this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
        }
      });
    })

    
    this.mobileView.next(window.innerWidth < 1024);
    this.sources.next([]);

    fromEvent(window, 'resize')
      .subscribe((event) => {
        this.mobileView.next(window.innerWidth < 1024);
      });
  }
 
  setCountry(_country:Country) {
    this.selectedCountry = _country;
    this.country.next(_country);
    this.saveUserSettings();
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

  toggleSideBar() {
    this.sideBarShown = !this.sideBarShown;
    this.showSideBar.next(this.sideBarShown);
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.isDarkTheme.next(this.darkTheme);
    this.saveUserSettings();
  }

  theme() {
    return this.isDarkTheme;
  }

  setUser(email: string) {
    this.userEmail = email;
  }

  getUserSettings() {
    this.db.collection<UserSettings>('userSettings', ref => ref.where('email', '==', this.userEmail)).snapshotChanges().subscribe(qry => {
      if(qry.length > 0) {
        this.userRecord = qry[0].payload.doc;

        this.darkTheme = this.userRecord.data().darkTheme;
        this.isDarkTheme.next(this.darkTheme);
        this.db.collection<Country>('countries', ref => ref.where('countryCd', '==', this.userRecord.data().countryCd)).valueChanges().subscribe(qry2 => {
          if(qry2.length > 0) {
            this.country.next(qry2[0])
          }else{
            this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
          }
        });
      }else{
        this.db.collection<UserSettings>('userSettings').add({
          email: this.userEmail,
          darkTheme: this.darkTheme,
          countryCd: this.selectedCountry.countryCd          
        }).then(record => {
          record.get().then(res => {
            this.userRecord = res;
          })
        });
        this.country.next({ countryCd: "ar", countryNm: "Argentina", flagCd: "AR" });
      }
    });
  }

  saveUserSettings() {

    this.db.doc(`userSettings/${this.userRecord.id}`).update({
      darkTheme: this.darkTheme,
      countryCd: this.selectedCountry.countryCd         
    });

  }
}