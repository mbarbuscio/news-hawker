import { Injectable, OnDestroy } from '@angular/core';
import { ServicesModule } from './services.module';
import { Country } from '../models/country';
import { Subscription, Observable, ReplaySubject } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: ServicesModule
})
export class NewsService implements OnDestroy {

  constructor(config: ConfigService, private http: HttpClient) {
    this.countrySub = config.getCountry().subscribe( (c) => {
      this.country = c;
    });
    this.news = new ReplaySubject<any>();
    this.baseUrl = environment.newsApi.baseUrl;
  }

  baseUrl: string;
  countrySub: Subscription;
  country: Country;
  news: ReplaySubject<any[]>;

  ngOnDestroy() {
    this.countrySub.unsubscribe();
  }

  getTopStories(): Observable<any> {
    var reqUrl = this.baseUrl + "/v2/top-headlines?country=" + this.country.countryCd + "&apiKey=" + environment.newsApi.apiKey;
    return this.http.get(reqUrl);
  }

}
