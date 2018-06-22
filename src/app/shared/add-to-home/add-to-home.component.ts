import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.component.html',
  styleUrls: ['./add-to-home.component.scss']
})
export class AddToHomeComponent implements OnInit {

  show: boolean = false;

  constructor() { 
    setTimeout(() => {
      if (!window.matchMedia('(display-mode:standalone)').matches) {
        var ua = window.navigator.userAgent;
        var env = ua.match(/(iPhone|iPad).*(Safari)/);
        if(env && env[1] && env[2]){
          var os = ua.match(/OS (\d*)_(\d*)/);
          if(Number(os[1]) >= 11 && Number(os[2]) >= 3) {
            this.show = true;
          }
        }
      }
    }, 45000)
  }

  ngOnInit() {
  }

  dismiss() {
    this.show = false;
  }
}
