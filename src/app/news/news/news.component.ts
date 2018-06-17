import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  article: any;

  ngOnInit() {
  }

  imgUrl(url:string) {
    if(!url.includes("http")){
      return "https:" + url;
    }

    return url;
  }

  trust(url) {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }
}
