import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { GlobalEventsService } from '../../services/global-events.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @HostBinding('class.shown') isShown:boolean = false;

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

  constructor(private _elementRef : ElementRef, private events:GlobalEventsService) {
    this.events.globalSwipeDownEvent().subscribe(evt => {
      if(this.isShown) {
        this.isShown = false;
      }
    })
  }

  ngOnInit() {
  }

  toggle(direction: boolean) {
      this.isShown = direction;
  }
}
