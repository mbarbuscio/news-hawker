import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: ServicesModule
})
export class GlobalEventsService {

  private _swipeUp: ReplaySubject<boolean>;
  private _swipeDown: ReplaySubject<boolean>;
  constructor() { 
    this._swipeDown = new ReplaySubject<boolean>();
    this._swipeUp = new ReplaySubject<boolean>();
  }

  globalSwipeUp(state: boolean) {
    this._swipeUp.next(state);
  }

  globalSwipeUpEvent() {
    return this._swipeUp;
  }

  globalSwipeDown(state: boolean) {
    this._swipeDown.next(state);
  }

  globalSwipeDownEvent() {
    return this._swipeDown;
  }
}
