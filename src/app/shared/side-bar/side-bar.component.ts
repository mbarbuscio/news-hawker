import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @HostBinding('class.hidden') isHidden: boolean = true;
  
  @HostListener('document:click', ['$event.target']) onClickOutside(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement) || targetElement.innerText == 'menu';
      if (!clickedInside) {
        if(!this.isHidden) {
          this.hide();
        }
      }
    }
  

  loggedIn: boolean = false;

  constructor(private configService: ConfigService, private authService: AuthService, private _elementRef : ElementRef) {
    configService.showSideBar.subscribe(sub => {
      this.isHidden = !sub;
    });

    authService.loggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    })
  }

  ngOnInit() {
  }

  hide() {
    this.configService.toggleSideBar();
  }

}
