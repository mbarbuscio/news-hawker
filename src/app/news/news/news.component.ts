import { Component, OnInit, Input, SecurityContext, HostBinding } from '@angular/core';
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

  @HostBinding('class.nodesc') get noDesc():boolean {
    if(this.article) {
      if(this.article.description){
        return (this.article.description.length <= 0);
      }else{
        return true;
      }
    }else{
      return false;
    }
    
  }  
  
  ngOnInit() {
  }

  imgUrl(url:string) {
    if(url) {
      if(!url.includes("http")){
        url = "https:" + url;
      }
      // return this.sanitizer.sanitize(SecurityContext.URL, url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://somepage.com/broken-img.png");
    }
  }

  trustSrc(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
