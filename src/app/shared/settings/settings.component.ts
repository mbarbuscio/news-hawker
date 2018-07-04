import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isDarkTheme: boolean = false;
  
  @HostBinding('class.shown') isShown:boolean = false;

  @HostBinding('class.dark') get isDark():boolean {
    return this.isDarkTheme;
  }

  @HostListener('click') onClick() {
    if(!this.isShown) {
      this.isShown = true;
    }
  }

  @HostListener('document:click', ['$event.target']) onClickOutside(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if(this.isShown) {
        this.isShown = false;
      }
    }
  }

  constructor(private _elementRef : ElementRef, private configService: ConfigService) { 
    configService.theme().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit() {
  }

}
