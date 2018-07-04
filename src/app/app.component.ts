import { Component, OnDestroy } from '@angular/core';
import { NewsService } from './services/news.service';
import { Subscription } from 'rxjs';
import { ConfigService } from './services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  isDarkTheme: boolean = false;

  constructor(private newsService: NewsService, configService: ConfigService) {

    this.news = [];  

    this.countrySub = configService.getCountry().subscribe( (c) => {
      this.newsSub = newsService.getNews().subscribe( (n) => {
        this.news = n;
        
      });
    });

    configService.theme().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });

    this.mobileViewSub = configService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    }); 
  }

  mobileViewSub: Subscription;
  countrySub: Subscription;
  newsSub: Subscription;
  news: any[];
  isMobile: boolean;

  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.newsSub.unsubscribe();
  }

  getMoreNews() {
    this.newsService.getMore();
  }
  
}
