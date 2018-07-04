import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  constructor(private configService:ConfigService) {
    this.mobileViewSub = configService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    })
  }

  mobileViewSub: Subscription;
  isMobile: boolean;

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.querySelector('div.ng-input>input').setAttribute('disabled','true');
  }

  ngOnDestroy() {
    this.mobileViewSub.unsubscribe();
  }

  toggleMenu() {
    this.configService.toggleSideBar();
  }
}
