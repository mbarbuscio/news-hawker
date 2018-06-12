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

  baseUrl: string;
  countrySub: Subscription;
  categoriesSub: Subscription;
  sourcesSub: Subscription;
  country: Country;
  news: ReplaySubject<any[]>;
  sources: ReplaySubject<any[]>;
  selectedCat: string;

  constructor(config: ConfigService, private http: HttpClient) {
    this.news = new ReplaySubject<any>();
    this.sources = new ReplaySubject<any>();
    this.baseUrl = environment.newsApi.baseUrl;
    this.countrySub = config.getCountry().subscribe( (c) => {
      this.country = c;
      this.refreshSources();
      this.getTopStories();
    });
    this.categoriesSub = config.getCategory().subscribe(cat => {
      this.selectedCat = cat;
      this.refreshSources();
      this.getTopStories();
    });
    this.sourcesSub = config.getSelectedSources().subscribe(sources => {
      if(sources.length > 0){
        this.getEverything(sources);
      }else{
        this.getTopStories();
      }
    })
  }

  ngOnDestroy() {
    this.countrySub.unsubscribe();
  }

  getTopStories() {
    var reqUrl = `${this.baseUrl}/v2/top-headlines?country=${this.country.countryCd}&category=${this.selectedCat || 'general'}&apiKey=${environment.newsApi.apiKey}`;
    this.http.get<any>(reqUrl).subscribe((res) => {
      this.news.next(res.articles);
    });
  }

  private refreshSources() {
    var reqUrl = `${this.baseUrl}/v2/sources?country=${this.country.countryCd}&category=${this.selectedCat || 'general'}&apiKey=${environment.newsApi.apiKey}`;
    this.http.get<any>(reqUrl).subscribe((res) => {
      this.sources.next(res.sources);
    });
  }

  getEverything(sources:any[]) {
    var ids = sources.map(a => a.id);
    var reqUrl = `${this.baseUrl}/v2/everything?sources=${ids.join(",")}&apiKey=${environment.newsApi.apiKey}`; 
    this.http.get<any>(reqUrl).subscribe(res => {
      this.news.next(res.articles);
    });
  }

  getSources(): Observable<any> {
    return this.sources;
  }

  getNews(): Observable<any> {
    return this.news;
  }
}
