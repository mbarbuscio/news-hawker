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

  constructor(private newsService: NewsService, configService: ConfigService) {

    this.countrySub = configService.getCountry().subscribe( (c) => {
      this.newsSub = newsService.getTopStories().subscribe( (n) => {
        this.news = n.articles;
      });
    });
  }

  countrySub: Subscription;
  newsSub: Subscription;
  news: any[];

  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.newsSub.unsubscribe();
  }
}