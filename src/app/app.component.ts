import { Component, OnDestroy, HostListener } from '@angular/core';
import { NewsService } from './services/news.service';
import { Subscription } from 'rxjs';
import { ConfigService } from './services/config.service';
import { GlobalEventsService } from './services/global-events.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @HostListener('pandown') onPanDown() {
    this.swipedown();
  }

  @HostListener('swipedown') onSwipeDown() {
    this.swipedown();
  }
  
  
  constructor(private newsService: NewsService, configService: ConfigService, private events:GlobalEventsService) {

    this.countrySub = configService.getCountry().subscribe( (c) => {
      this.newsSub = newsService.getNews().subscribe( (n) => {
        this.news = n;
      });
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

  swipedown() {
    this.events.globalSwipeDown(true);
  }
}
