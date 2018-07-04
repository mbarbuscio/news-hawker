import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { ConfigService } from './config.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: ServicesModule
})
export class AuthService {

  isLoggedIn: boolean = false;
  loggedIn: ReplaySubject<boolean>;
  authUser: any;
  currentUser: ReplaySubject<any>;

  constructor(public afAuth: AngularFireAuth, private configService: ConfigService) {
    this.currentUser = new ReplaySubject();
    this.loggedIn = new ReplaySubject<boolean>();
    this.loggedIn.next(this.isLoggedIn);

    this.afAuth.auth.setPersistence("local");

    this.afAuth.authState.subscribe(state => {
      if(state == null){
        this.isLoggedIn = false;
        this.loggedIn.next(this.isLoggedIn);
        this.configService.setUser("");
        this.currentUser.next(null);
        this.authUser = null;
      }else{
        this.authUser = state;
        this.currentUser.next(this.authUser);
        this.configService.setUser(this.authUser.email);
        this.configService.getUserSettings();
        this.isLoggedIn = true;
        this.loggedIn.next(this.isLoggedIn);
      }
    })
  }

  doFacebookLogin() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  doGoogleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
