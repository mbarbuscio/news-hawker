import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() { }

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

}
